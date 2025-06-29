'use client';

import React from 'react';
import Image from 'next/image';
import { Sidebar } from '@/components/sidebar';
import { ChatPanel } from '@/components/chat-panel';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
  
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Cyberpunk background"
        fill
        className="object-cover"
        quality={80}
        data-ai-hint="cyberpunk city night"
      />
      <div className="relative z-10 flex h-full w-full">
        {isMobile ? (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <div className="flex h-screen w-full flex-col bg-transparent text-foreground">
              <header className="flex h-14 items-center justify-between border-b border-white/10 bg-black/50 px-4 backdrop-blur-sm">
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icons.sidebar className="h-5 w-5" />
                    <span className="sr-only">Toggle Sidebar</span>
                  </Button>
                </SheetTrigger>
                <h1 className="text-xl font-bold text-primary text-glow">KernelPunk</h1>
                <div className="w-8" />
              </header>
              <ChatPanel />
            </div>
            <SheetContent side="left" className="w-4/5 p-0 sm:max-w-xs">
              <SheetTitle className="sr-only">Sidebar</SheetTitle>
              <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex h-screen w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <ChatPanel />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
