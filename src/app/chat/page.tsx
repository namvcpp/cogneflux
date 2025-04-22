'use client';

import { useRef, useState, useEffect } from 'react';
import { FiSend, FiUser, FiMessageCircle, FiFilm, FiMessageSquare } from 'react-icons/fi';
import ManimRenderer from '@/components/manim/ManimRenderer';
import LessonView from '@/components/lessons/LessonView';
import { extractManimCode, containsManimContent } from '@/utils/manimUtils';

type Message = {
  id: number;
  role: 'user' | 'ai';
  content: string;
};

type Mode = 'chat' | 'animation';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'ai', content: "Hi! I'm an AI assistant. How can I help you learn mathematics today? I can generate Manim animations to help visualize concepts." }
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
  const [currentManimCode, setCurrentManimCode] = useState<string | null>(null);
  const [showRightPanel, setShowRightPanel] = useState<boolean>(false);
  const [lessonContent, setLessonContent] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('animation');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check for Manim code in AI responses
  useEffect(() => {
    const aiMessages = messages.filter(msg => msg.role === 'ai');
    if (aiMessages.length === 0) return;
    
    const latestAiMessage = aiMessages[aiMessages.length - 1];
    
    if (mode === 'animation' || containsManimContent(latestAiMessage.content)) {
      const code = extractManimCode(latestAiMessage.content);
      if (code) {
        setCurrentManimCode(code);
        setShowRightPanel(true);
      }
      
      // Only extract lesson content in chat mode
      if (mode === 'chat') {
        // Extract lesson content (everything except the code blocks)
        const content = latestAiMessage.content.replace(/```[\s\S]*?```/g, '').trim();
        if (content) {
          setLessonContent(content);
        }
      }
    }
  }, [messages, mode]);

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
    
    // Construct the prompt based on the current mode
    let prompt = input;
    if (mode === 'animation') {
      prompt = `Create a elegant Manim animation for the following concept using 3blue1brown style: "${input}". 
      Your response should ONLY include Python code for Manim animation with no explanations. 
      Ensure your code is complete and includes all necessary imports. 
      The code should be a self-contained class that inherits from Scene.
      Do not include any text explanation, only valid Python code for Manim.`;
    }
    
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
              { text: prompt }
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
      
      let aiResponse = data.candidates[0].content.parts[0].text || 'No response text received';
      
      // If we're in animation mode, replace the response text with a simple message
      if (mode === 'animation' && extractManimCode(aiResponse)) {
        // Store the code but display a simpler message in chat
        const code = extractManimCode(aiResponse);
        if (code) {
          setCurrentManimCode(code);
          aiResponse = "Rendering animation...";
        }
      }
      
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
    <div className="flex min-h-screen bg-slate-50 dark:bg-gray-900">
      {/* Left sidebar with logo */}
      <div className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-6">
        <div className="w-10 h-10 bg-blue-600 rounded-full mb-8 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 13.25L19.25 9L12 13.25L4.75 9L12 13.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 13.25V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.25 12V16L12 19.25L5.75 16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex flex-col space-y-6">
          <button className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 flex items-center justify-center">
            <FiMessageCircle size={20} />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center">
            <FiUser size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        {/* Chat panel */}
        <div className="w-1/2 flex flex-col border-r border-gray-200 dark:border-gray-700">
          {/* Chat header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cogneflux
            </h1>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 dark:bg-gray-900">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[85%] p-4 rounded-2xl shadow-sm
                  ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                  }
                `}>
                  {msg.role === 'ai' && (
                    <div className="flex items-start mb-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none">
                          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <span className="font-medium text-sm text-gray-900 dark:text-white">Cogneflux</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="relative">
              <input
                type="text"
                className="w-full p-4 pr-12 rounded-xl bg-slate-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                placeholder="Give me a topic and I'll animate it for you"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg p-2 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!input.trim()}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5004 12H5.00043M5.29088 12.29L3.76256 17.5547C3.34211 19.2495 3.13188 20.0968 3.3525 20.6211C3.54482 21.0741 3.92567 21.4155 4.39442 21.5567C4.93678 21.7188 5.7526 21.4357 7.38424 20.8694L17.8235 17.1169C19.3158 16.5899 20.062 16.3264 20.4124 15.896C20.7213 15.5131 20.8832 15.0407 20.8728 14.5569C20.8611 14.0136 20.5346 13.4678 19.8816 12.3763L16.4591 6.53233C15.8353 5.50175 15.5235 4.98646 15.0839 4.77834C14.6978 4.59629 14.2551 4.59549 13.8681 4.77583C13.4276 4.98211 13.1126 5.49572 12.4826 6.52292L10.5004 9.99997" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        {/* Animation panel */}
        <div className="w-1/2 flex flex-col bg-black">
          {/* Animation header */}
          <div className="p-4 flex justify-between items-center bg-gray-900">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">
                {currentManimCode ? 'Visualizing concept' : 'Ready to animate'}
              </span>
              {currentManimCode && (
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              )}
            </div>
          </div>
          
          {/* Animation content */}
          <div className="flex-1 flex items-center justify-center">
            {currentManimCode ? (
              <ManimRenderer 
                manimCode={currentManimCode}
                isVisible={true}
                mode={mode}
                className="w-full h-full"
              />
            ) : (
              <div className="text-center p-6">
                <svg className="w-20 h-20 mx-auto mb-4 text-blue-500 opacity-50" viewBox="0 0 24 24" fill="none">
                  <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="text-xl font-medium text-gray-300 mb-2">Ready to visualize</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Ask me about a math concept and I'll create an interactive visualization to help you understand it
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
