import React, { useState, useRef, useEffect } from 'react';
import { aiAPI } from '../api';
import { 
  MessageCircle, X, Send, Bot, User, Sparkles, 
  Loader2, ChevronDown, Zap, HelpCircle
} from 'lucide-react';

const CarAIAssistant = ({ carData, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = [
    "What is the mileage?",
    "Tell me about variants",
    "What safety features?",
    "Engine specifications?",
    "Available colors?",
    "Does it have sunroof?",
    "What's the price?",
    "Key features?"
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setMessages([{
        role: 'assistant',
        content: `Hi! 👋 I'm your AI assistant for the **${carData?.brand} ${carData?.name}**. I know everything about this ${carData?.category}! Feel free to ask me anything about its features, specifications, pricing, or anything else you'd like to know.`
      }]);
    }
  }, [isOpen, carData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async (questionText = input) => {
    if (!questionText.trim() || isLoading) return;

    const userMessage = questionText.trim();
    setInput('');
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await aiAPI.askCarAssistant(userMessage, carData);
      if (response.success) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response.data.answer 
        }]);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/₹(\d+(?:\.\d+)?)\s*Lakh/g, '<span class="text-green-400 font-semibold">₹$1 Lakh</span>')
      .replace(/\n/g, '<br/>');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div className="w-[380px] h-[550px] bg-slate-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                AI Assistant
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </h3>
              <p className="text-white/70 text-xs">{carData?.brand} {carData?.name} Expert</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' 
                  ? 'bg-blue-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-md' 
                  : 'bg-white/10 text-gray-200 rounded-bl-md'
              }`}>
                <p 
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {showSuggestions && messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              Quick questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 4).map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-slate-900">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${carData?.name}...`}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 text-sm"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl text-white transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center">
            Powered by Google Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
};

// Floating AI Button Component
export const AIAssistantButton = ({ onClick, carName }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 group"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-25"></div>
        
        {/* Button */}
        <div className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-white font-medium shadow-lg shadow-purple-500/30 transition-all hover:scale-105">
          <Bot className="w-5 h-5" />
          <span className="hidden sm:inline">Ask AI about {carName}</span>
          <span className="sm:hidden">AI Help</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </div>
      </div>
    </button>
  );
};

export default CarAIAssistant;
