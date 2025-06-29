'use client';

import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Icons } from './icons';
import { MarkdownRenderer } from './markdown-renderer';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex items-start space-x-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <Icons.bot className="h-8 w-8 text-primary" />
        </div>
      )}

      <div
        className={cn(
          'max-w-xl rounded-lg px-4 py-3 shadow-lg border',
          isUser
            ? 'bg-primary text-primary-foreground border-primary/50'
            : 'bg-card border-border'
        )}
      >
        <div className={cn(
            'prose prose-sm break-words',
            isUser ? '' : 'prose-invert text-card-foreground'
          )}
        >
          {message.image && (
             <div className="mb-2">
                <Image
                    src={message.image}
                    alt="User upload"
                    width={300}
                    height={300}
                    className="rounded-md"
                />
             </div>
          )}
          <MarkdownRenderer content={message.content} />
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <Icons.user className="h-8 w-8 text-accent" />
        </div>
      )}
    </div>
  );
}
