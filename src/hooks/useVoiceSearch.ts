import { useState, useEffect, useRef } from 'react';

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface UseVoiceSearchOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, isInterim: boolean) => void;
  onError?: (error: any) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

interface VoiceSearchResult {
  transcript: string;
  confidence: number;
  isInterim: boolean;
  timestamp: Date;
}

export const useVoiceSearch = (options: UseVoiceSearchOptions = {}) => {
  const {
    language = 'en-US',
    continuous = false,
    interimResults = true,
    onResult,
    onError,
    onStart,
    onEnd
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [results, setResults] = useState<VoiceSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = language;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        onStart?.();
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          const confidence = result[0].confidence;

          if (result.isFinal) {
            finalTranscript += transcript;
            
            const voiceResult: VoiceSearchResult = {
              transcript,
              confidence,
              isInterim: false,
              timestamp: new Date()
            };
            
            setResults(prev => [...prev, voiceResult]);
            onResult?.(transcript, false);
          } else {
            interimTranscript += transcript;
            
            const voiceResult: VoiceSearchResult = {
              transcript,
              confidence,
              isInterim: true,
              timestamp: new Date()
            };
            
            onResult?.(transcript, true);
          }
        }

        setTranscript(finalTranscript);
        setInterimTranscript(interimTranscript);
      };

      recognition.onerror = (event: any) => {
        setError(event.error);
        setIsListening(false);
        onError?.(event);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
        onEnd?.();
      };
    } else {
      setIsSupported(false);
      setError('Speech recognition not supported in this browser');
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [language, continuous, interimResults, onResult, onError, onStart, onEnd]);

  const startListening = () => {
    if (!isSupported || !recognitionRef.current) {
      setError('Speech recognition not supported');
      return;
    }

    try {
      recognitionRef.current.start();
      
      // Auto-stop after 10 seconds if continuous is false
      if (!continuous) {
        timeoutRef.current = setTimeout(() => {
          stopListening();
        }, 10000);
      }
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setError('Failed to start voice recognition');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resetTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
    setResults([]);
    setError(null);
  };

  // Voice search for products
  const searchProducts = (query: string) => {
    // This would typically interface with your product search API
    console.log('Searching for:', query);
    
    // Mock search results
    const mockResults = [
      { id: '1', name: 'Wireless Headphones', matches: query.toLowerCase().includes('headphones') },
      { id: '2', name: 'Bluetooth Speaker', matches: query.toLowerCase().includes('speaker') },
      { id: '3', name: 'Smart Phone', matches: query.toLowerCase().includes('phone') },
      { id: '4', name: 'Gaming Mouse', matches: query.toLowerCase().includes('mouse') },
    ].filter(result => result.matches);

    return mockResults;
  };

  // Voice commands processor
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Navigation commands
    if (lowerCommand.includes('go to') || lowerCommand.includes('navigate to')) {
      if (lowerCommand.includes('dashboard')) return { action: 'navigate', target: '/' };
      if (lowerCommand.includes('products') || lowerCommand.includes('listings')) return { action: 'navigate', target: '/listings' };
      if (lowerCommand.includes('camera') || lowerCommand.includes('scan')) return { action: 'navigate', target: '/camera-scan' };
      if (lowerCommand.includes('settings')) return { action: 'navigate', target: '/settings' };
    }
    
    // Search commands
    if (lowerCommand.includes('search for') || lowerCommand.includes('find')) {
      const searchTerm = lowerCommand.replace(/^(search for|find)\s+/, '');
      return { action: 'search', query: searchTerm };
    }
    
    // Action commands
    if (lowerCommand.includes('add product') || lowerCommand.includes('new listing')) {
      return { action: 'navigate', target: '/new-listing' };
    }
    
    if (lowerCommand.includes('take photo') || lowerCommand.includes('scan product')) {
      return { action: 'camera' };
    }
    
    return { action: 'unknown', command: lowerCommand };
  };

  return {
    // State
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    results,
    error,
    
    // Actions
    startListening,
    stopListening,
    resetTranscript,
    
    // Utilities
    searchProducts,
    processVoiceCommand,
  };
};