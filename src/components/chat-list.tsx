'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/hooks/use-chat-store';
import { ChatMessage } from './chat-message';
import { Icons } from './icons';

export function ChatList() {
  const { activeSession } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeSession?.messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
      {activeSession && activeSession.messages.length > 0 ? (
        <div className="mx-auto max-w-3xl space-y-6">
          {activeSession.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
          <Icons.logo className="h-16 w-16 mb-4" />
          <h2 className="text-2xl font-semibold">Welcome to TerminalAI</h2>
          <p>Start a new conversation below.</p>
        </div>
      )}
    </div>
  );
}
