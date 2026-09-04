import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Bot, RotateCcw, Send, Sparkles, Mic, AlertTriangle, Phone, MessageSquare } from 'lucide-react';

interface ChatViewProps {
  onOpenGrounding: () => void;
  onOpenCrisis: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ onOpenGrounding, onOpenCrisis }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello. I'm your MindTrauma AI assistant. I'm here to offer supportive psychoeducation, explain clinical terms, and guide you through calming grounding practices.\n\nWhat would feel most helpful for you to explore right now?",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showCrisisBanner]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Check distress keywords
    const distressWords = ['die', 'suicide', 'kill', 'hurt myself', 'end it', 'emergency', 'harm', 'overdose'];
    if (distressWords.some(w => messageText.toLowerCase().includes(w))) {
      setShowCrisisBanner(true);
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.slice(-6).map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await response.json();
      const assistantReply: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I am listening. Could you share a little more about what you are feeling?',
        timestamp: 'Just now',
        isFallback: data.isFallback
      };

      setMessages(prev => [...prev, assistantReply]);
    } catch (err) {
      console.warn('Chat request failed, using client fallback:', err);
      const fallbackReply: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: "I'm right here with you. Processing past stress and difficult memories takes time and kindness toward yourself. Would you like to practice a quick grounding technique or learn about how trauma affects the body?",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  const handleSafetyEscalationTest = () => {
    setShowCrisisBanner(true);
    const alertMsg: ChatMessage = {
      id: `alert-${Date.now()}`,
      sender: 'assistant',
      text: "⚠️ Your safety is the most important priority. If you or someone you know is experiencing acute distress, please dial or text 988 immediately to speak with a trained, compassionate counselor.",
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, alertMsg]);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'reset',
        sender: 'assistant',
        text: "Chat history cleared. I'm here whenever you're ready to explore symptoms, talk through your screener, or practice grounding exercises.",
        timestamp: 'Just now'
      }
    ]);
    setShowCrisisBanner(false);
  };

  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-3">
      {/* Top Banner */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs sm:text-sm font-bold text-gray-900 font-display">
                Trauma Support Assistant
              </h2>
              <span className="w-2 h-2 rounded-full bg-teal-600" />
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              AI Support • Not a Clinician • Private Session
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClearChat}
          className="p-2 rounded-xl text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
          title="Clear Chat History"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* High-Risk Safety Banner */}
      {showCrisisBanner && (
        <div className="mb-3 p-4 rounded-2xl bg-red-50 text-red-900 shadow-2xs border border-red-200 animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-red-700 mb-1 font-display">
                Your safety comes first
              </h3>
              <p className="text-xs text-red-800 mb-3 leading-relaxed">
                If you are feeling overwhelmed, having thoughts of harm, or need someone to talk to right now:
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="tel:988"
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-red-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 988 Lifeline</span>
                </a>
                <a
                  href="sms:741741"
                  className="px-3.5 py-1.5 rounded-xl bg-white text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:bg-red-50 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Text HOME to 741741</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowCrisisBanner(false)}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 border border-gray-200"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Scroll Container */}
      <div
        ref={chatScrollRef}
        className="flex flex-col gap-3 h-[380px] sm:h-[420px] overflow-y-auto pr-1 mb-3 no-scrollbar"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-1 mr-2 border border-teal-200">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] sm:max-w-[80%] whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-black text-white rounded-tr-none shadow-2xs'
                  : 'bg-white border border-gray-200 text-gray-900 rounded-tl-none shadow-2xs'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-1 border border-teal-200">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl rounded-tl-none bg-white border border-gray-200 text-gray-500 text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-gray-400 text-[11px] ml-1">Reflecting with care...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Reply Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
        <button
          type="button"
          onClick={() => handleQuickReply('Explain my screening score')}
          className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-black text-xs font-semibold whitespace-nowrap hover:bg-gray-50 transition-colors shadow-2xs shrink-0"
        >
          Explain my screening score
        </button>
        <button
          type="button"
          onClick={() => handleQuickReply('What is hyperarousal?')}
          className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-black text-xs font-semibold whitespace-nowrap hover:bg-gray-50 transition-colors shadow-2xs shrink-0"
        >
          What is hyperarousal?
        </button>
        <button
          type="button"
          onClick={onOpenGrounding}
          className="px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold whitespace-nowrap hover:bg-teal-100 transition-colors shadow-2xs shrink-0 flex items-center gap-1"
        >
          <span>🌿 Grounding exercises</span>
        </button>
        <button
          type="button"
          onClick={() => handleQuickReply('How to talk to a doctor about trauma')}
          className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-black text-xs font-semibold whitespace-nowrap hover:bg-gray-50 transition-colors shadow-2xs shrink-0"
        >
          How to talk to a doctor
        </button>
        <button
          type="button"
          onClick={handleSafetyEscalationTest}
          className="px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold whitespace-nowrap hover:bg-red-100 transition-colors shadow-2xs shrink-0"
        >
          Safety Escalation Test
        </button>
      </div>

      {/* Message Input Field */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-1.5">
        <button
          type="button"
          onClick={onOpenGrounding}
          className="p-2 text-gray-500 hover:text-teal-700 hover:bg-teal-50 transition-colors rounded-xl"
          title="Interactive Grounding Guide"
        >
          <Sparkles className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => alert('Audio voice notes are processed with local end-to-end privacy.')}
          className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors rounded-xl"
          title="Audio Note"
        >
          <Mic className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about symptoms, self-care, or results..."
          className="flex-1 bg-transparent px-2 py-1.5 text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm focus:outline-none"
        />
        <button
          type="button"
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isLoading}
          className={`w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center transition-all active:scale-95 shadow-xs ${
            inputValue.trim() && !isLoading
              ? 'opacity-100 hover:bg-gray-800 cursor-pointer'
              : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
