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
    { id: 1, role: 'ai', content: "Hi! I'm Claude. How can I help you today?" }
  ]);
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
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { id: msgs.length + 2, role: 'ai', content: "This is a sample AI response. (Replace with real API call.)" }
      ]);
    }, 800);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl flex flex-col rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-[80vh]">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <FiMessageCircle className="text-primary" size={24} />
          <span className="font-semibold text-lg text-foreground">Claude Chat</span>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-subtle">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[75%] px-4 py-2 rounded-2xl shadow-sm
                ${msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
                }
                flex items-end gap-2
              `}>
                {msg.role === 'ai' && (
                  <span className="pt-1 mr-3 flex-shrink-0">
                    <FiMessageCircle className="text-primary" size={18} />
                  </span>
                )}
                <span className="whitespace-pre-line">{msg.content}</span>
                {msg.role === 'user' && (
                  <span className="pt-1 ml-3 flex-shrink-0">
                    <FiUser className="text-primary" size={18} />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <form
          className="px-4 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
          onSubmit={e => { e.preventDefault(); handleSend(); }}
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 form-input rounded-full px-4 py-3 bg-subtle border-none focus:ring-2 focus:ring-primary focus:outline-none text-base"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-primary btn-icon-only rounded-full p-3"
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
