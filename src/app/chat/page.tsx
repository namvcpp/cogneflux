'use client';

import { useRef, useState, useEffect } from 'react';
import { FiSend, FiUser, FiMessageCircle } from 'react-icons/fi';

type Message = {
  id: number;
  role: 'user' | 'ai';
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'ai', content: "Hi! I'm an AI assistant. How can I help you today?" }
  ]);
  
  // For debugging API calls
  const debugApiCall = async (url: string, options: RequestInit) => {
    console.log('API Request URL:', url);
    console.log('API Request Headers:', options.headers);
    console.log('API Request Body:', options.body);
    
    try {
      const response = await fetch(url, options);
      const responseText = await response.text();
      console.log('API Response Status:', response.status);
      console.log('API Response Headers:', [...response.headers.entries()]);
      console.log('API Raw Response:', responseText);
      return { response, responseText };
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  };
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    setMessages(msgs => [
      ...msgs,
      { id: msgs.length + 1, role: 'user', content: input }
    ]);
    setInput('');
    // Simulate AI response
    // Make actual API call to Gemini
    const messageId = messages.length + 2;
    const aiMessage: Message = { id: messageId, role: 'ai', content: "Thinking..." };
    setMessages(msgs => [...msgs, aiMessage]);

    // Use environment variable for API key
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBJ5Fjnm7bmsDCtF-tbG9i9ImcAGUPnPTQ';
    
    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    // Updated to use the gemini-2.0-flash model for free subscription
    fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: input }
            ]
          }
        ]
      }),
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeoutId); // Clear timeout on response
      
      // First check if response is ok
      if (!response.ok) {
        // For HTTP errors, try to get error details from response
        return response.text().then(text => {
          let errorMessage = `HTTP error ${response.status}: ${response.statusText}`;
          
          // Try to parse as JSON to get detailed error message
          try {
            const errorData = JSON.parse(text);
            if (errorData.error && errorData.error.message) {
              errorMessage = `API error (${response.status}): ${errorData.error.message}`;
            }
          } catch (e) {
            // If not valid JSON, use the text content if available
            if (text && text.trim().length > 0) {
              errorMessage += ` - ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`;
            }
          }
          
          throw new Error(errorMessage);
        });
      }
      
      // For successful responses, also use text() then parse to handle JSON parsing errors gracefully
      return response.text().then(text => {
        try {
          console.log('API Response text:', text.substring(0, 500) + (text.length > 500 ? '...' : ''));
          const parsedData = JSON.parse(text);
          console.log('Parsed API response:', JSON.stringify(parsedData, null, 2).substring(0, 500) + '...');
          return parsedData;
        } catch (e: unknown) {
          const error = e as Error;
          console.error('JSON parse error:', error);
          console.error('Raw response text:', text);
          throw new Error(`Invalid JSON response: ${error.message}`);
        }
      });
    })
    .then(data => {
      // Check if we have valid response data with better error messages
      if (!data) {
        throw new Error('Empty response from API');
      }
      
      if (!data.candidates) {
        throw new Error('Missing candidates in API response');
      }
      
      if (!data.candidates[0]) {
        throw new Error('Empty candidates array in API response');
      }
      
      if (!data.candidates[0].content) {
        throw new Error('Missing content in API response candidate');
      }
      
      if (!data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
        throw new Error('Missing parts in API response content');
      }
      
      const aiResponse = data.candidates[0].content.parts[0].text || 'No response text received';
      setMessages(msgs => 
        msgs.map(msg => 
          msg.id === aiMessage.id 
          ? { ...msg, content: aiResponse } 
          : msg
        )
      );
    })
    .catch(error => {
      clearTimeout(timeoutId); // Also clear timeout on error
      
      // Handle specific types of errors
      let errorMessage = 'Sorry, I encountered an error';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = `${errorMessage}: ${error.message}`;
      }
      
      console.error('API Error:', error);
      
      setMessages(msgs => 
        msgs.map(msg => 
          msg.id === messageId
          ? { ...msg, content: errorMessage } 
          : msg
        )
      );
    });
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-subtle">
      <div className="w-full max-w-4xl flex flex-col rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-[80vh] overflow-hidden transition-all duration-500">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <FiMessageCircle className="text-blue-600 dark:text-blue-400" size={24} />
          <span className="font-bold text-lg text-gray-900 dark:text-gray-100">Claude Chat</span>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 bg-subtle">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[80%] px-5 py-4 rounded-2xl shadow-sm transition-all duration-150
                ${msg.role === 'user'
                  ? 'bg-blue-600 dark:bg-blue-700 text-white rounded-br-none'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                }
                flex items-start gap-3
              `}>
                {msg.role === 'ai' && (
                  <span className="pt-1 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <FiMessageCircle className="text-purple-600 dark:text-purple-400" size={16} />
                    </div>
                  </span>
                )}
                <div>
                  <div className="text-xs opacity-70 mb-1">
                    {msg.role === 'user' ? 'You' : 'Claude'}
                  </div>
                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.content}
                  </div>
                </div>
                {msg.role === 'user' && (
                  <span className="pt-1 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <FiUser className="text-blue-600 dark:text-blue-400" size={16} />
                    </div>
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <form
          className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
          onSubmit={e => { e.preventDefault(); handleSend(); }}
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="flex-1 px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-gray-100 transition-all"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              autoFocus
            />
            <button
              type="submit"
              className="rounded-xl p-4 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send"
              disabled={!input.trim()}
            >
              <FiSend size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
