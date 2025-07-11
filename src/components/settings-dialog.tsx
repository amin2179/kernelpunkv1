'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useChatStore } from '@/hooks/use-chat-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { themes } from '@/lib/themes';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { settings, setSettings } = useChatStore();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings, open]);

  const handleSave = () => {
    setSettings(localSettings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-code">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your API keys, local model endpoint, and themes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="lm-studio-url">Local Model URL (LM Studio, Ollama)</Label>
            <Input
              id="lm-studio-url"
              placeholder="http://localhost:1234/v1"
              value={localSettings.lmStudioUrl}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, lmStudioUrl: e.target.value })
              }
            />
             <p className="text-xs text-muted-foreground">
                Base URL for your local AI. For LM Studio, this is shown on the server page.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gemini-key">Gemini API Key</Label>
            <Input
              id="gemini-key"
              type="password"
              placeholder="Enter your Gemini API Key for Vision"
              value={localSettings.geminiApiKey}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, geminiApiKey: e.target.value })
              }
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="theme-selector">Theme</Label>
            <Select
                value={localSettings.theme}
                onValueChange={(theme) =>
                    setLocalSettings({ ...localSettings, theme })
                }
            >
                <SelectTrigger id="theme-selector">
                    <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                    {themes.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                            {theme.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
                Select a visual theme for the application.
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} className="primary-glow">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
