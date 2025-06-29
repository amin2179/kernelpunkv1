'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { ChatPanel } from '@/components/chat-panel';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Icons } from '@/components/icons';
import { useChatStore } from '@/hooks/use-chat-store';
import { themes } from '@/lib/themes';

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const store = useChatStore();
  const selectedThemeId = useChatStore((state) => state.settings.theme);

  React.useEffect(() => {
    store.init();
  }, [store.init]);

  React.useEffect(() => {
    const theme = themes.find((t) => t.id === selectedThemeId) || themes.find(t => t.id === 'kernelpunk');
    const root = document.documentElement;
    if (theme) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [selectedThemeId]);


  if (!store.isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Icons.logo className="h-12 w-12 animate-pulse" />
      </div>
    );
  }
  
  return (
    <main className="h-full w-full overflow-hidden bg-background">
      <div className="flex h-full w-full">
        {isMobile ? (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <div className="flex h-full w-full flex-col bg-transparent text-foreground pt-[env(safe-area-inset-top)]">
              <header className="flex h-14 items-center justify-between border-b border-white/10 bg-black/50 px-4 backdrop-blur-sm">
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icons.sidebar className="h-5 w-5" />
                    <span className="sr-only">Toggle Sidebar</span>
                  </Button>
                </SheetTrigger>
                <h1 className="glitch text-xl font-bold" data-text="KernelPunk">KernelPunk</h1>
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
          <div className="flex h-full w-full">
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
