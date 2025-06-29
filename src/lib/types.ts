export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string | null;
}

export interface Session {
  id: string;
  name: string;
  messages: Message[];
  systemPrompt: string;
  createdAt: number;
}

export interface Settings {
  geminiApiKey: string;
  lmStudioUrl: string;
  theme: string;
}
