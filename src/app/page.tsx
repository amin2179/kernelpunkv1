'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { ChatPanel } from '@/components/chat-panel';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Icons } from '@/components/icons';
import { useChatStore } from '@/hooks/use-chat-store';

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const store = useChatStore();

  React.useEffect(() => {
    store.init();
  }, [store.init]);


  if (!store.isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Icons.logo className="h-12 w-12 animate-pulse" />
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="flex h-screen flex-col bg-background text-foreground">
          <header className="flex h-14 items-center justify-between border-b px-4">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.sidebar className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <h1 className="text-xl font-bold text-primary text-glow">TerminalAI</h1>
            <div className="w-8" />
          </header>
          <ChatPanel />
        </div>
        <SheetContent side="left" className="w-[300px] p-0">
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <main className="flex h-screen bg-background text-foreground font-code">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <ChatPanel />
      </div>
    </main>
  );
}
