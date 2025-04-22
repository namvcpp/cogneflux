import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiUser, FiSend } from 'react-icons/fi';

interface Message {
    id: number;
    role: 'user' | 'ai';
    content: string;
}

interface LessonAssistantProps {
    lessonId?: string;
    lessonContent?: string;
    currentSection?: string;
}

export default function LessonAssistant({ lessonId, lessonContent, currentSection }: LessonAssistantProps) {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: 'ai', content: "Hi! I'm your AI learning assistant. Ask me questions about this lesson and I'll help explain the concepts!" }
    ]);
    
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

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
        
        // Set up AI response
        const messageId = messages.length + 2;
        const aiMessage: Message = { id: messageId, role: 'ai', content: "Thinking..." };
        setMessages(msgs => [...msgs, aiMessage]);

        // API key from environment variable
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBJ5Fjnm7bmsDCtF-tbG9i9ImcAGUPnPTQ';
        
        // Create AbortController for timeout handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        // Include lesson context in the prompt
        const contextPrompt = `
            You are a helpful educational assistant in the style of Grant Sanderson (3Blue1Brown).
            You specialize in explaining complex topics with clarity and visual intuition.
            
            The user is studying: ${lessonId || 'a lesson'}
            Current section: ${currentSection || 'not specified'}
            
            Lesson content: ${lessonContent || 'not provided'}
            
            Answer this question related to their lesson: ${input}
            
            Focus on building intuition rather than formalism. Use clear, concise explanations.
            If appropriate, suggest how the concept might be visualized.
            If you don't know, say so rather than making up information.
        `;
        
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
                            { text: contextPrompt }
                        ]
                    }
                ]
            }),
            signal: controller.signal
        })
        .then(response => {
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                return response.text().then(text => {
                    let errorMessage = `HTTP error ${response.status}: ${response.statusText}`;
                    try {
                        const errorData = JSON.parse(text);
                        if (errorData.error && errorData.error.message) {
                            errorMessage = `API error (${response.status}): ${errorData.error.message}`;
                        }
                    } catch (e) {
                        if (text && text.trim().length > 0) {
                            errorMessage += ` - ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`;
                        }
                    }
                    throw new Error(errorMessage);
                });
            }
            
            return response.text().then(text => {
                try {
                    const parsedData = JSON.parse(text);
                    return parsedData;
                } catch (e: unknown) {
                    const error = e as Error;
                    console.error('JSON parse error:', error);
                    throw new Error(`Invalid JSON response: ${error.message}`);
                }
            });
        })
        .then(data => {
            // Validate response data
            if (!data || !data.candidates || !data.candidates[0] || 
                    !data.candidates[0].content || !data.candidates[0].content.parts || 
                    !data.candidates[0].content.parts[0]) {
                throw new Error('Invalid response structure from API');
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
            clearTimeout(timeoutId);
            
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

    // If not expanded, show minimized version
    if (!isExpanded) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button 
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-2 py-3 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all"
                >
                    <FiMessageCircle size={18} />
                    <span>Ask About This Lesson</span>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-[500px] flex flex-col rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <FiMessageCircle className="text-blue-600 dark:text-blue-400" size={20} />
                    <span className="font-medium text-gray-900 dark:text-gray-100">3Blue1Brown Assistant</span>
                </div>
                <button 
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`
                            max-w-[85%] px-4 py-3 rounded-lg
                            ${msg.role === 'user'
                                ? 'bg-blue-600 dark:bg-blue-700 text-white rounded-br-none'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                            }
                            flex items-start gap-2
                        `}>
                            {msg.role === 'ai' && (
                                <span className="pt-1 flex-shrink-0">
                                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                        <FiMessageCircle className="text-purple-600 dark:text-purple-400" size={14} />
                                    </div>
                                </span>
                            )}
                            <div>
                                <div className="whitespace-pre-line text-sm leading-relaxed">
                                    {msg.content}
                                </div>
                            </div>
                            {msg.role === 'user' && (
                                <span className="pt-1 flex-shrink-0">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                        <FiUser className="text-blue-600 dark:text-blue-400" size={14} />
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
                className="p-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                onSubmit={e => { e.preventDefault(); handleSend(); }}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-gray-100 text-sm"
                        placeholder="Ask about this lesson..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="rounded-lg p-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Send"
                        disabled={!input.trim()}
                    >
                        <FiSend size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
}