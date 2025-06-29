'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/hooks/use-chat-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from './icons';
import { Session } from '@/lib/types';

interface SessionItemProps {
  session: Session;
  isActive: boolean;
}

export function SessionItem({ session, isActive }: SessionItemProps) {
  const { selectSession, deleteSession, updateSessionName } = useChatStore();
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState(session.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleRename = () => {
    if (name.trim()) {
      updateSessionName(session.id, name.trim());
    } else {
      setName(session.name); // Revert if empty
    }
    setIsRenaming(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setName(session.name);
      setIsRenaming(false);
    }
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between rounded-md p-2 text-sm transition-colors cursor-pointer',
        isActive
          ? 'bg-secondary text-foreground'
          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
      )}
      onClick={() => !isRenaming && selectSession(session.id)}
    >
      {isRenaming ? (
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleRename}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none"
        />
      ) : (
        <span className="truncate flex-1" onDoubleClick={() => setIsRenaming(true)}>
          {session.name}
        </span>
      )}
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}>
          <Icons.trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
