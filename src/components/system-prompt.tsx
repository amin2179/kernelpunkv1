'use client';

import { useChatStore } from '@/hooks/use-chat-store';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function SystemPrompt() {
  const { activeSession, updateSystemPrompt } = useChatStore();

  if (!activeSession) return null;

  return (
    <div className="space-y-2">
      <Label htmlFor="system-prompt">System Prompt</Label>
      <Textarea
        id="system-prompt"
        placeholder="You are a helpful assistant."
        value={activeSession.systemPrompt}
        onChange={(e) => updateSystemPrompt(e.target.value)}
        className="h-24 text-xs"
      />
    </div>
  );
}
