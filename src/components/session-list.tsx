'use client';

import { useChatStore } from '@/hooks/use-chat-store';
import { SessionItem } from './session-item';
import { Button } from '@/components/ui/button';
import { Icons } from './icons';

interface SessionListProps {
  closeSidebar?: () => void;
}

export function SessionList({ closeSidebar }: SessionListProps) {
  const { sessions, activeSessionId, createNewSession } = useChatStore();

  const sortedSessions = Object.values(sessions).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center justify-between p-2">
        <h2 className="text-lg font-semibold">Sessions</h2>
        <Button variant="ghost" size="icon" className="h-7 w-7 interactive-glow" onClick={createNewSession}>
          <Icons.add className="h-5 w-5" />
          <span className="sr-only">New Session</span>
        </Button>
      </div>
      <div className="space-y-1 p-2">
        {sortedSessions.map((session) => (
          <SessionItem
            key={session.id}
            session={session}
            isActive={session.id === activeSessionId}
            closeSidebar={closeSidebar}
          />
        ))}
      </div>
    </div>
  );
}
