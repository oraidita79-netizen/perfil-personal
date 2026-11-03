import React, { useState, useEffect, useRef } from 'react';
import { CandidateProfile } from '../types/index.ts';
import {
  MessageSquare,
  X,
  Send,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

interface VirtualAgentModalProps {
  candidate: CandidateProfile;
  onOpenRecruiterContact: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  timestamp: string;
}

export const VirtualAgentModal: React.FC<VirtualAgentModalProps> = ({
  candidate,
  onOpenRecruiterContact
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: `¡Hola! Soy Elena, la asistente virtual de ${candidate.name}. ¿Tienes alguna pregunta sobre su experiencia de más de 20 años en logística, contabilidad o disponibilidad para tu empresa? Puedes escribirme o hablarme por voz.`,
      timestamp: 'Ahora'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasUnreadPrompt, setHasUnreadPrompt] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Text to Speech (TTS) function
  const speakText = (text: string) => {
    if (!isVoiceOutputEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel(); // stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      // Try selecting a Spanish female voice if available
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice =
        voices.find(v => v.lang.startsWith('es') && (v.name.includes('Mónica') || v.name.includes('Lucia') || v.name.includes('Helena') || v.name.includes('Female'))) ||
        voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      setIsSpeaking(false);
    }
  };

  // Stop speaking on close
  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  // Speech Recognition (STT) setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'es-ES';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            handleSendMessage(transcript);
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleMicListening = () => {
    if (!recognitionRef.current) {
      alert('Tu navegador no soporta entrada de voz directa por micrófono. Puedes escribir tu consulta en el campo de texto.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Could not start recognition:', e);
      }
    }
  };

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, candidate })
      });
      const data = await res.json();
      const replyText = data.reply || 'Oraida cuenta con gran polivalencia operativa y total disponibilidad de incorporación. ¿Deseas solicitar una entrevista?';

      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMsg]);
      speakText(replyText);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: `Oraida tiene más de 20 años de experiencia demostrable en contabilidad, logística y administración, y cuenta con carnet de carretilla y PDA homologados en 2025. Puedes contactar directamente en el 614.632.194.`,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
      speakText(fallbackMsg.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    handleSendMessage(q);
  };

  const quickQuestions = [
    '¿Qué experiencia tiene en almacén y logística?',
    '¿Tiene carnet de carretilla y PDA 2025?',
    '¿Cuál es su experiencia en contabilidad?',
    '¿Cuál es su disponibilidad horaria?',
    '¿Cómo solicito una entrevista laboral?'
  ];

  return (
    <>
      {/* Floating launcher badge / Trigger button in bottom right */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          {hasUnreadPrompt && (
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-slate-800 text-xs font-semibold shadow-xl border border-amber-200/80 animate-in fade-in slide-in-from-right-4 duration-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>¿Dudas sobre Oraida? ¡Pregúntame con voz o texto!</span>
              <button
                onClick={() => setHasUnreadPrompt(false)}
                className="text-slate-400 hover:text-slate-600 ml-1"
              >
                &times;
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(true);
              setHasUnreadPrompt(false);
            }}
            className="group relative flex items-center justify-center p-1 rounded-full bg-gradient-to-br from-[#1E3E62] via-[#0B192C] to-[#bba28e] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-amber-400/80"
            title="Abrir Asistente Virtual Elena (Voz y Texto)"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 border border-white/40">
              <img
                src="/assets/agent_avatar.png"
                alt="Elena · Asistente de Selección"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
              />
            </div>
            
            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-400/40"></span>
          </button>
        </div>
      )}

      {/* Expanded Virtual Agent Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[640px] h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header styled with taupe/warm beige and navy palette */}
          <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#364958] text-white p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Agent Avatar with Speaking Animation Ring */}
              <div className="relative">
                <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${isSpeaking ? 'border-amber-400 ring-4 ring-amber-400/30' : 'border-[#bba28e]'}`}>
                  <img
                    src="/assets/agent_avatar.png"
                    alt="Elena · Asistente Virtual"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {isSpeaking && (
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                  <span>Elena</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[10px] text-slate-300 font-normal">Asistente Virtual con Voz</span>
                </div>
                <div className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{isSpeaking ? 'Hablando ahora...' : 'En línea para responderte'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Voice toggle button */}
              <button
                onClick={() => {
                  if (isVoiceOutputEnabled && typeof window !== 'undefined') {
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                  }
                  setIsVoiceOutputEnabled(!isVoiceOutputEnabled);
                }}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isVoiceOutputEnabled
                    ? 'text-amber-300 hover:bg-slate-800 bg-slate-900/60'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isVoiceOutputEnabled ? 'Silenciar voz del agente' : 'Activar voz del agente'}
              >
                {isVoiceOutputEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Minimizar asistente"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick info banner */}
          <div className="bg-[#FAF7F2] px-4 py-2 border-b border-[#E8DFD8] flex items-center justify-between text-[11px] text-[#5C534B]">
            <span className="font-medium">Pregúntame sobre certificaciones, logística o contabilidad</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenRecruiterContact();
              }}
              className="text-[#1E3E62] font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-amber-600" />
              <span>Contactar Oraida</span>
            </button>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'agent' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#bba28e] shadow-xs mt-0.5">
                    <img src="/assets/agent_avatar.png" alt="Elena" className="w-full h-full object-cover object-top" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#1E3E62] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className={`mt-1 text-[9px] flex items-center justify-end ${msg.sender === 'user' ? 'text-slate-300' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'agent' && (
                      <button
                        onClick={() => speakText(msg.text)}
                        title="Escuchar de nuevo este mensaje"
                        className="ml-2 hover:text-[#1E3E62] cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
                <div className="w-5 h-5 rounded-full border-2 border-[#1E3E62] border-t-transparent animate-spin"></div>
                <span>Elena está preparando la respuesta...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions Pills */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(q)}
                className="px-2.5 py-1 bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#E8DFD8] text-[#4A4036] rounded-full whitespace-nowrap cursor-pointer transition-colors shadow-2xs font-medium shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input & Voice Controls Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic button for Speech to Text */}
              <button
                type="button"
                onClick={toggleMicListening}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md ring-2 ring-rose-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title={isListening ? 'Escuchando tu voz... (haz clic para parar)' : 'Hablar por micrófono'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-600" />}
              </button>

              {/* Text Input */}
              <input
                type="text"
                placeholder={isListening ? 'Escuchando tu voz...' : 'Escribe o pregunta algo a Elena...'}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer shadow-xs shrink-0"
                title="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>{isListening ? '🎙️ Habla ahora por tu micrófono...' : 'Voz y texto activos'}</span>
              <span>Asistente Oficial de Oraida</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
