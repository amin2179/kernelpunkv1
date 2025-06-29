'use client';

import { useState } from 'react';
import { Icons } from './icons';
import { SessionList } from './session-list';
import { SystemPrompt } from './system-prompt';
import { Button } from './ui/button';
import { SettingsDialog } from './settings-dialog';

interface SidebarProps {
    closeSidebar?: () => void;
}

export function Sidebar({ closeSidebar }: SidebarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-full w-full flex-col bg-black/50 text-foreground backdrop-blur-lg md:w-80 md:border-r md:border-white/10">
      <div className="flex h-14 items-center border-b border-white/10 px-4">
        <Icons.logo className="h-8 w-8 text-primary" />
        <h1 className="ml-3 text-2xl font-bold text-primary text-glow">
          KernelPunk
        </h1>
      </div>

      <SessionList closeSidebar={closeSidebar} />

      <div className="border-t border-white/10 p-4">
        <SystemPrompt />
      </div>

      <div className="border-t border-white/10 p-2">
        <Button variant="ghost" className="w-full justify-start space-x-2 interactive-glow" onClick={() => setSettingsOpen(true)}>
          <Icons.settings className="h-5 w-5" />
          <span>Settings</span>
        </Button>
      </div>
      
      <div className="mt-auto p-4 text-center text-xs text-muted-foreground">
        <p>i ToLd U im BEtter</p>
        <p>GoOd NIGht baBE</p>
        <p className="mt-4">personal multi ai agent by @aminroumiany</p>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
