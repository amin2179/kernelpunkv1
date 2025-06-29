'use client';

import { create } from 'zustand';
import { v4 as uuidv4Import } from 'uuid';
import { Session, Message, Settings } from '@/lib/types';
import { describeImage } from '@/ai/flows/describe-image';

const uuidv4 = (() => {
  // Use real uuidv4 in the browser
  if (typeof window !== 'undefined') {
    return uuidv4Import;
  }
  // Mock UUID for SSR
  let count = 0;
  return () => `ssr-uuid-${count++}`;
})();


const initialSettings: Settings = {
  geminiApiKey: '',
  lmStudioUrl: 'http://localhost:1234/v1',
  theme: 'kernelpunk',
};

const initialSession: Session = {
  id: uuidv4(),
  name: 'New Session',
  messages: [],
  systemPrompt: 'You are a helpful AI assistant.',
  createdAt: Date.now(),
};

interface ChatState {
  sessions: Record<string, Session>;
  activeSessionId: string | null;
  settings: Settings;
  isLoading: boolean;
  isInitialized: boolean;
  init: () => void;
  createNewSession: () => void;
  selectSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  updateSessionName: (sessionId: string, name: string) => void;
  updateSystemPrompt: (prompt: string) => void;
  setSettings: (settings: Settings) => void;
  sendMessage: (content: string, image?: string | null) => Promise<void>;
  activeSession: Session | null;
}

const useChatStoreImpl = create<ChatState>((set, get) => ({
  sessions: {},
  activeSessionId: null,
  settings: initialSettings,
  isLoading: false,
  isInitialized: false,
  get activeSession() {
    const state = get();
    return state.activeSessionId ? state.sessions[state.activeSessionId] : null;
  },

  init: () => {
    try {
      const savedState = localStorage.getItem('terminal-ai-store');
      if (savedState) {
        const { sessions, activeSessionId, settings } = JSON.parse(savedState);
        set({ sessions, activeSessionId, settings: {...initialSettings, ...settings}, isInitialized: true });
      } else {
        const newSessionId = initialSession.id;
        set({
          sessions: { [newSessionId]: initialSession },
          activeSessionId: newSessionId,
          settings: initialSettings,
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error('Failed to load from local storage', error);
      const newSessionId = initialSession.id;
      set({
        sessions: { [newSessionId]: initialSession },
        activeSessionId: newSessionId,
        settings: initialSettings,
        isInitialized: true,
      });
    }
  },

  createNewSession: () => {
    const newSession: Session = {
      id: uuidv4(),
      name: `Session ${Object.keys(get().sessions).length + 1}`,
      messages: [],
      systemPrompt: 'You are a helpful AI assistant.',
      createdAt: Date.now(),
    };
    set((state) => ({
      sessions: { ...state.sessions, [newSession.id]: newSession },
      activeSessionId: newSession.id,
    }));
  },

  selectSession: (sessionId) => {
    if (get().sessions[sessionId]) {
      set({ activeSessionId: sessionId });
    }
  },

  deleteSession: (sessionId) => {
    set((state) => {
      const newSessions = { ...state.sessions };
      delete newSessions[sessionId];
      let newActiveSessionId = state.activeSessionId;
      if (state.activeSessionId === sessionId) {
        newActiveSessionId = Object.keys(newSessions)[0] || null;
        if (!newActiveSessionId) {
            const newSession: Session = {
                id: uuidv4(),
                name: 'New Session',
                messages: [],
                systemPrompt: 'You are a helpful AI assistant.',
                createdAt: Date.now(),
            };
            newSessions[newSession.id] = newSession;
            newActiveSessionId = newSession.id;
        }
      }
      return { sessions: newSessions, activeSessionId: newActiveSessionId };
    });
  },

  updateSessionName: (sessionId, name) => {
    set((state) => ({
      sessions: {
        ...state.sessions,
        [sessionId]: { ...state.sessions[sessionId], name },
      },
    }));
  },

  updateSystemPrompt: (prompt: string) => {
    const { activeSessionId } = get();
    if (activeSessionId) {
      set((state) => ({
        sessions: {
          ...state.sessions,
          [activeSessionId]: { ...state.sessions[activeSessionId], systemPrompt: prompt },
        },
      }));
    }
  },

  setSettings: (settings) => {
    set({ settings });
  },

  sendMessage: async (content, image = null) => {
    const { activeSessionId, activeSession, settings } = get();
    if (!activeSessionId || !activeSession) return;
    
    set({ isLoading: true });

    const userMessage: Message = { id: uuidv4(), role: 'user', content, image };
    
    const updatedMessages = [...activeSession.messages, userMessage];
    set(state => ({
      sessions: {
        ...state.sessions,
        [activeSessionId]: { ...activeSession, messages: updatedMessages },
      },
    }));

    if (image) {
      // Handle vision tool
      try {
        const assistantMessage: Message = { id: uuidv4(), role: 'assistant', content: '👁️ Describing image...' };
        set(state => ({
          sessions: {
            ...state.sessions,
            [activeSessionId]: { ...activeSession, messages: [...updatedMessages, assistantMessage] },
          },
        }));

        const result = await describeImage({ photoDataUri: image });

        const finalMessage: Message = { ...assistantMessage, content: result.description };
        set(state => ({
          sessions: {
            ...state.sessions,
            [activeSessionId]: { ...activeSession, messages: [...updatedMessages, finalMessage] },
          },
        }));

      } catch (error) {
        console.error('Vision API error:', error);
        const errorMessage: Message = { id: uuidv4(), role: 'assistant', content: 'Error: Could not describe the image. Please check your Gemini API Key.' };
        set(state => ({
          sessions: { ...state.sessions, [activeSessionId]: { ...activeSession, messages: [...updatedMessages, errorMessage] } }
        }));
      } finally {
        set({ isLoading: false });
      }
      return;
    }

    // Handle LM Studio chat
    try {
        const apiUrl = settings.lmStudioUrl ? `${settings.lmStudioUrl}/chat/completions` : 'http://localhost:1234/v1/chat/completions';
      
        const history = [
          { role: 'system', content: activeSession.systemPrompt },
          ...activeSession.messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content }
        ];

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history.map(({role, content}) => ({role, content})),
            temperature: 0.7,
            stream: true,
          }),
        });

        if (!response.body) throw new Error('No response body');
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        let assistantResponse = '';
        const assistantMessage: Message = { id: uuidv4(), role: 'assistant', content: '...' };
        
        // Add placeholder message
        let currentMessages = [...updatedMessages, assistantMessage];
        set(state => ({ sessions: { ...state.sessions, [activeSessionId]: { ...state.sessions[activeSessionId], messages: currentMessages } } }));

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n\n').filter(line => line.trim());

          for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = line.substring(6);
                if (data.trim() === '[DONE]') {
                    break;
                }
                try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices[0]?.delta?.content;
                    if (delta) {
                        assistantResponse += delta;
                        currentMessages[currentMessages.length-1].content = assistantResponse;
                        set(state => ({
                            sessions: { ...state.sessions, [activeSessionId]: { ...state.sessions[activeSessionId], messages: [...currentMessages] } }
                        }));
                    }
                } catch (e) {
                    console.error('Error parsing stream data:', e);
                }
            }
          }
        }

    } catch (error) {
        console.error('LM Studio API error:', error);
        const errorMessage: Message = { id: uuidv4(), role: 'assistant', content: 'Error: Could not connect to LM Studio. Please check the URL and ensure the server is running.' };
        set(state => ({
          sessions: { ...state.sessions, [activeSessionId]: { ...activeSession, messages: [...updatedMessages, errorMessage] } }
        }));
    } finally {
        set({ isLoading: false });
    }
  },
}));

// Persist state to localStorage
useChatStoreImpl.subscribe((state) => {
  if (state.isInitialized) {
    const stateToSave = {
      sessions: state.sessions,
      activeSessionId: state.activeSessionId,
      settings: state.settings,
    };
    localStorage.setItem('terminal-ai-store', JSON.stringify(stateToSave));
  }
});

// A wrapper to prevent trying to use this on the server.
export const useChatStore = typeof window === 'undefined'
  ? () => ({ ...useChatStoreImpl.getState(), activeSession: null })
  : useChatStoreImpl;
