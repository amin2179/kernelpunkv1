'use client';

import { useState, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from './icons';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock = ({ language, code, id }: { language: string | undefined; code: string; id: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre id={id}>
        <code className={`language-${language || 'plaintext'}`}>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity interactive-glow"
        onClick={handleCopy}
      >
        {copied ? <Icons.check className="h-4 w-4" /> : <Icons.copy className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  );
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const uniqueId = useId();
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts = content.split(codeBlockRegex);

  return (
    <div>
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          // Regular text
          return <span key={`${uniqueId}-${index}`}>{part}</span>;
        } else if (index % 3 === 1) {
          // This is the language, next is the code
          const language = part;
          const code = parts[index + 1];
          return <CodeBlock key={`${uniqueId}-${index}`} language={language} code={code} id={`${uniqueId}-code-${index}`} />;
        }
        // This is the code, it's already handled
        return null;
      })}
    </div>
  );
}
