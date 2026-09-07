import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { 
  Bot, 
  RotateCcw, 
  Send, 
  Sparkles, 
  Mic, 
  AlertTriangle, 
  Phone, 
  MessageSquare,
  Wind,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface ChatViewProps {
  onOpenGrounding: () => void;
  onOpenCrisis: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ onOpenGrounding, onOpenCrisis }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello. I'm AASRA, your trauma-informed psychoeducational companion. I'm here to offer supportive guidance, explain clinical terms, and guide you through calming grounding practices.\n\nWhat would feel most helpful for you to explore right now?",
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
      text: "⚠️ Your safety is the highest priority. If you or someone you know is experiencing acute distress in India, please call Tele-MANAS (14416 / 1800-891-4416), KIRAN (1800-599-0019), Vandrevala Foundation (+91 9999 666 555), or National Emergency (112).",
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
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 h-[calc(100vh-7.5rem)] min-h-[640px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left Desktop Sidebar: Guidance & Quick Prompts (4 cols) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 overflow-y-auto pr-1">
          {/* Assistant Info & Boundaries */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-950 font-display flex items-center gap-1.5">
                  AASRA Companion
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                </h2>
                <span className="text-[11px] text-teal-800 font-medium">
                  Trauma-Informed Psychoeducation
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              I can explain DSM-5 trauma reactions, help interpret your screening scores, and guide you through evidence-based somatic grounding exercises.
            </p>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500 space-y-1.5">
              <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Clinical Boundaries</span>
              </div>
              <p>Not a licensed therapist or emergency medical service. Does not provide clinical diagnoses.</p>
            </div>
          </div>

          {/* Somatic Grounding Quick Trigger */}
          <div className="bg-gradient-to-br from-teal-50/80 via-white to-sky-50/60 p-5 rounded-3xl border border-teal-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-teal-900 font-display flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-teal-600" />
                Somatic Regulation
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold">
                Interactive
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3.5 leading-relaxed">
              If you feel flooded or activated right now, step through the 5-4-3-2-1 sensory grounding exercise.
            </p>
            <button
              type="button"
              onClick={onOpenGrounding}
              className="w-full py-2.5 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch 5-4-3-2-1 Grounding</span>
            </button>
          </div>

          {/* Quick Discussion Topics */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 font-display">
                Suggested Inquiries
              </h3>
              <div className="space-y-2">
                {[
                  'Explain my PC-PTSD-5 screening score',
                  'What does hyperarousal feel like in the body?',
                  'How to talk to a doctor about trauma',
                  'What is EMDR therapy and how does it work?',
                  'Techniques for managing intrusive memories'
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(prompt)}
                    className="w-full text-left p-2.5 rounded-xl text-xs text-gray-700 bg-gray-50 hover:bg-teal-50 hover:text-teal-900 border border-gray-100 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate pr-2">{prompt}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleSafetyEscalationTest}
                className="text-[11px] text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Test Safety Escalation</span>
              </button>
              <button
                type="button"
                onClick={handleClearChat}
                className="text-[11px] text-gray-500 hover:text-black font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Main Chat Console: Desktop Chat Workspace (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden h-full">
          {/* Header Bar */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 font-display flex items-center gap-1.5">
                  AASRA Consultation Stream
                  <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    AASRA Active
                  </span>
                </h3>
                <span className="text-[11px] text-gray-500">
                  Empathetic Psychoeducational Support • Confidential
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenGrounding}
                className="lg:hidden px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200/80 flex items-center gap-1"
              >
                <Wind className="w-3.5 h-3.5" />
                <span>Grounding</span>
              </button>

              <button
                type="button"
                onClick={handleClearChat}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* High-Risk Safety Banner */}
          {showCrisisBanner && (
            <div className="p-4 bg-red-50 text-red-900 border-b border-red-200 animate-in fade-in duration-200 shrink-0">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-red-800 mb-1 font-display">
                    Your immediate safety is our highest priority
                  </h4>
                  <p className="text-xs text-red-800 mb-3 leading-relaxed">
                    If you are experiencing acute distress, having thoughts of harm, or need immediate care:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={onOpenCrisis}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Tele-MANAS (14416)</span>
                    </button>
                    <a
                      href="tel:112"
                      className="px-3.5 py-1.5 rounded-xl bg-white text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:bg-red-50 transition-colors"
                    >
                      <span>Emergency 112</span>
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

          {/* Chat Messages Scroll Thread */}
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-1 mr-3 border border-teal-200">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className="flex flex-col max-w-[88%] sm:max-w-[78%]">
                  {msg.sender === 'assistant' && (
                    <div className="flex items-center gap-1 mb-1 px-1 text-[11px] font-medium text-teal-800">
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      <span>{msg.isFallback ? 'Clinical Protocol' : 'AASRA'}</span>
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-black text-white rounded-tr-none shadow-xs'
                        : 'bg-gray-50/80 border border-gray-200/80 text-gray-950 rounded-tl-none shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-1 border border-teal-200">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-gray-50 border border-gray-200 text-gray-600 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-gray-500 text-xs ml-1 font-medium">
                    Reflecting with trauma-informed care...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Quick Reply Pills (< lg) */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-gray-100 no-scrollbar shrink-0">
            <button
              type="button"
              onClick={() => handleQuickReply('Explain my screening score')}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold whitespace-nowrap hover:bg-gray-200 transition-colors shrink-0"
            >
              Explain score
            </button>
            <button
              type="button"
              onClick={() => handleQuickReply('What is hyperarousal?')}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold whitespace-nowrap hover:bg-gray-200 transition-colors shrink-0"
            >
              Hyperarousal
            </button>
            <button
              type="button"
              onClick={onOpenGrounding}
              className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold whitespace-nowrap hover:bg-teal-100 transition-colors shrink-0"
            >
              🌿 Grounding
            </button>
            <button
              type="button"
              onClick={() => handleQuickReply('How to talk to a doctor')}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold whitespace-nowrap hover:bg-gray-200 transition-colors shrink-0"
            >
              Talk to doctor
            </button>
          </div>

          {/* Bottom Message Composer */}
          <div className="p-3 sm:p-4 border-t border-gray-100 bg-white shrink-0">
            <div className="flex items-center gap-2 bg-gray-50/90 rounded-2xl p-2 border border-gray-200/90 focus-within:border-black focus-within:bg-white transition-all">
              <button
                type="button"
                onClick={onOpenGrounding}
                className="p-2 text-gray-500 hover:text-teal-700 hover:bg-teal-50 transition-colors rounded-xl shrink-0"
                title="Somatic Grounding Guide"
              >
                <Sparkles className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about symptoms, emotional regulation, or your screener results..."
                className="flex-1 bg-transparent px-2 py-1 text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm focus:outline-none"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className={`px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs shrink-0 ${
                  inputValue.trim() && !isLoading
                    ? 'opacity-100 hover:bg-gray-800 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <span className="hidden sm:inline">Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 px-2 mt-2">
              <span>Press Enter to send message</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                Zero data retention
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
