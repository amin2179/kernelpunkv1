'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';
import { useChatStore } from '@/hooks/use-chat-store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ChatInput() {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isLoading } = useChatStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [input]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !image) return;
    sendMessage(input, image);
    setInput('');
    setImage(null);
    setImageName(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="sticky bottom-0 flex w-full items-start space-x-2 border-t bg-background p-4"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="interactive-glow flex-shrink-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <Icons.upload className="h-5 w-5" />
              <span className="sr-only">Upload Image</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload Image (for Vision)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message or upload an image..."
          className="pr-20 ring-offset-background focus-visible:ring-1 focus-visible:ring-ring"
          rows={1}
        />
        {imageName && (
          <div className="absolute bottom-2 left-2 flex items-center rounded-full bg-secondary px-2 py-1 text-xs">
            <Icons.image className="mr-1 h-4 w-4" />
            <span>{imageName}</span>
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setImageName(null);
                if(fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              <Icons.close className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      <Button
        type="submit"
        size="icon"
        disabled={isLoading || (!input.trim() && !image)}
        className="primary-glow flex-shrink-0"
      >
        {isLoading ? (
          <Icons.spinner className="h-5 w-5 animate-spin" />
        ) : (
          <Icons.send className="h-5 w-5" />
        )}
        <span className="sr-only">Send Message</span>
      </Button>
    </form>
  );
}
