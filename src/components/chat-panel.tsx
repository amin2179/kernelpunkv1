'use client';

import { ChatList } from './chat-list';
import { ChatInput } from './chat-input';

export function ChatPanel() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ChatList />
      <ChatInput />
    </div>
  );
}
