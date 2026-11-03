import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, PhoneOff, Sparkles, Volume2, X, MessageSquare } from 'lucide-react';

interface LiveKitVoiceAssistantProps {
  agentId?: string;
  accentColor?: string;
}

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  price:
    'Our pricing is transparent and simple: Rs 15,000 setup plus Rs 5,000 a month. The price is always locked before work starts.',
  cost:
    'Our pricing is transparent and simple: Rs 15,000 setup plus Rs 5,000 a month. The price is always locked before work starts.',
  book:
    'You can book a 20-minute call with SH Deshpande anytime using the booking button right here on the website.',
  call:
    'You can book a 20-minute call with SH Deshpande anytime using the booking button right here on the website.',
  start:
    'We start with a 20-minute call to agree on pages and price. Then we connect the enquiry form, quote board, and Monday list, and go live.',
  pages:
    'We set up an enquiry form that fixes the exact pages and budget before conversations begin, preventing scope drift.',
  work:
    'SH Deshpande sets up three core things: an enquiry form with fixed pages and budget, an open quote board, and a Monday list of website requests.',
  bangalore:
    'SH lives near Bangalore in Tumkur, and builds websites for businesses across Bangalore and beyond.',
  default:
    'I am Mohanwebsitestudio AI voice assistant. SH Deshpande designs websites with locked pricing at Rs 15,000 setup plus Rs 5,000 a month. How can I help you today?',
};

export const LiveKitVoiceAssistant: React.FC<LiveKitVoiceAssistantProps> = ({
  agentId = 'CA_mfZ6rp6eaBpK',
  accentColor = '#002CF2',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [assistantMessage, setAssistantMessage] = useState<string>(
    'Hello! I am Mohanwebsitestudio AI assistant. How can I help you with your website today?'
  );
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const isCallingRef = useRef<boolean>(false);
  const isSpeakingRef = useRef<boolean>(false);

  // Sync ref
  useEffect(() => {
    isCallingRef.current = isCalling;
  }, [isCalling]);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  // Text-To-Speech audio output function
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Premium'))
      );
      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      setIsSpeaking(false);
    }
  };

  // Start microphone monitoring & Web Audio visualizer
  const startAudioMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        analyserRef.current = analyser;

        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateLevel = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setAudioLevel(Math.min(1, avg / 70));
          animFrameRef.current = requestAnimationFrame(updateLevel);
        };
        updateLevel();
      }

      // Continuous Speech Recognition
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          // If assistant is currently speaking out loud, ignore mic input to prevent echo
          if (isSpeakingRef.current) return;

          let currentText = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }

          if (currentText.trim()) {
            setTranscript(currentText);

            if (event.results[event.results.length - 1].isFinal) {
              handleUserSpeech(currentText);
            }
          }
        };

        // Auto restart if paused while call is active
        recognition.onend = () => {
          if (isCallingRef.current && !isMuted) {
            try {
              recognition.start();
            } catch (e) {}
          }
        };

        try {
          recognition.start();
          recognitionRef.current = recognition;
        } catch (e) {}
      }

      setCallStatus('connected');
    } catch (err) {
      console.warn('Microphone permission or hardware error:', err);
      setCallStatus('connected');
    }
  };

  const handleUserSpeech = (speechText: string) => {
    const lower = speechText.toLowerCase();
    let responseText = KNOWLEDGE_RESPONSES.default;

    for (const [key, response] of Object.entries(KNOWLEDGE_RESPONSES)) {
      if (key !== 'default' && lower.includes(key)) {
        responseText = response;
        break;
      }
    }

    setAssistantMessage(responseText);
    speakText(responseText);
  };

  const handlePromptClick = (promptQuery: string) => {
    setTranscript(promptQuery);
    handleUserSpeech(promptQuery);
  };

  const handleStartCall = async () => {
    setIsOpen(true);
    setIsCalling(true);
    setCallStatus('connecting');

    // Also trigger native LiveKit button if rendered in shadow DOM
    const wrapper = document.getElementById('lk-embed-wrapper');
    if (wrapper && wrapper.shadowRoot) {
      const btn = wrapper.shadowRoot.querySelector('button');
      if (btn) (btn as HTMLButtonElement).click();
    }

    await startAudioMonitoring();

    // Greet the user aloud with speech
    const welcome =
      'Hello! I am Mohanwebsitestudio AI voice assistant. Ask me anything about our website design, pricing, or booking a call with SH Deshpande.';
    setAssistantMessage(welcome);
    setTimeout(() => {
      speakText(welcome);
    }, 400);
  };

  const stopCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsCalling(false);
    setIsSpeaking(false);
    setCallStatus('idle');
    setAudioLevel(0);
    setTranscript('');
  };

  const toggleMute = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const handleClose = () => {
    stopCall();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating WebCall Button at bottom-right corner */}
      <div className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50">
        <motion.button
          type="button"
          onClick={handleStartCall}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          style={{ backgroundColor: accentColor }}
          className="relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full text-white shadow-2xl shadow-blue-600/40 cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-600 select-none"
          aria-label="Start WebCall AI Voice Assistant"
        >
          {/* Animated pulse rings */}
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-25"
            style={{ backgroundColor: accentColor }}
          />
          <span className="absolute -inset-1.5 rounded-full border border-blue-400/40 animate-pulse" />

          {/* Voice Mic Icon */}
          <div className="relative flex items-center justify-center">
            <Mic className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>

          {/* Hover Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#1B2A4A] text-[#F7F1E6] text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
            Talk to WebCall AI
          </span>
        </motion.button>
      </div>

      {/* WebCall Voice Assistant Interactive Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-[#1B2A4A] text-[#F7F1E6] rounded-[28px] border border-[#F7F1E6]/15 shadow-2xl p-6 sm:p-8 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-full text-[#F7F1E6]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close voice assistant"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: accentColor }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white tracking-tight">
                    WebCall Assistant
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#F7F1E6]/60">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Voice · Agent {agentId}</span>
                  </div>
                </div>
              </div>

              {/* Live Audio Visualizer */}
              <div className="my-6 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center w-28 h-28 mb-4">
                  {/* Outer pulsating wave */}
                  <motion.div
                    animate={{
                      scale: isSpeaking ? [1, 1.35, 1.15, 1.4, 1] : 1 + audioLevel * 0.8,
                      opacity: isSpeaking ? [0.4, 0.7, 0.4] : 0.2 + audioLevel * 0.5,
                    }}
                    transition={
                      isSpeaking
                        ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.1 }
                    }
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />

                  {/* Middle wave */}
                  <motion.div
                    animate={{
                      scale: isSpeaking ? [1, 1.2, 1] : 1 + audioLevel * 0.4,
                      opacity: isSpeaking ? [0.6, 0.9, 0.6] : 0.4 + audioLevel * 0.4,
                    }}
                    transition={
                      isSpeaking
                        ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.1 }
                    }
                    className="absolute inset-2 rounded-full bg-blue-500/40"
                  />

                  {/* Central Avatar */}
                  <div
                    className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Volume2 className={`w-8 h-8 ${isSpeaking ? 'animate-bounce' : ''}`} />
                  </div>
                </div>

                {/* Animated Equalizer Bars */}
                <div className="flex items-center gap-1.5 h-8">
                  {[0.4, 0.9, 0.6, 1, 0.7, 0.85, 0.45, 0.75].map((scale, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: isSpeaking
                          ? `${Math.max(8, 28 * scale)}px`
                          : isCalling
                          ? `${Math.max(6, (audioLevel * 32 + 6) * scale)}px`
                          : '6px',
                      }}
                      transition={
                        isSpeaking
                          ? { duration: 0.2, repeat: Infinity, repeatType: 'reverse' }
                          : { duration: 0.08 }
                      }
                      className="w-1.5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  ))}
                </div>

                <p className="mt-3 text-xs uppercase tracking-widest text-[#F7F1E6]/75 font-semibold">
                  {callStatus === 'connecting'
                    ? 'Connecting audio...'
                    : isSpeaking
                    ? 'AI speaking out loud...'
                    : isMuted
                    ? 'Microphone muted'
                    : 'Listening · Speak now'}
                </p>
              </div>

              {/* Assistant Message Bubble */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-3 text-sm text-[#F7F1E6]/90 leading-relaxed max-h-32 overflow-y-auto">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-blue-300 text-xs">AI Assistant</span>
                  {isSpeaking && (
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider animate-pulse">
                      Playing audio
                    </span>
                  )}
                </div>
                <p>{assistantMessage}</p>
              </div>

              {/* User Live Speech Transcript */}
              {transcript && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-3 text-xs text-[#F7F1E6]/75">
                  <span className="font-semibold text-blue-300">You said: </span>
                  <span>{transcript}</span>
                </div>
              )}

              {/* Quick voice prompts */}
              <div className="mb-5">
                <div className="flex items-center gap-1.5 text-[11px] text-[#F7F1E6]/50 mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Tap to ask and hear response:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'What is your pricing?',
                    'How do we start?',
                    'Can I book a call?',
                    'What do you set up?',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handlePromptClick(chip)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F1E6] transition-colors cursor-pointer active:scale-95 text-left"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call Controls */}
              <div className="flex items-center justify-center gap-4 pt-1 border-t border-white/10">
                {/* Mute Button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border transition-colors cursor-pointer ${
                    isMuted
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                  }`}
                  aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Speak Out Loud Button */}
                <button
                  type="button"
                  onClick={() => speakText(assistantMessage)}
                  className="flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer"
                  title="Replay speech audio"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Replay audio</span>
                </button>

                {/* End Call Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors shadow-lg active:scale-95 cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End call</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
