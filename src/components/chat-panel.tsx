'use client';

import { ChatList } from './chat-list';
import { ChatInput } from './chat-input';
import MatrixBackground from './matrix-background';

export function ChatPanel() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-black">
      <MatrixBackground />
      <div className="relative z-10 flex h-full flex-col">
        <ChatList />
        <ChatInput />
      </div>
    </div>
  );
}
