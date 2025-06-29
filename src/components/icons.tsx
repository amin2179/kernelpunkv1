import {
  Bot,
  User,
  Send,
  Plus,
  Trash2,
  Settings,
  Copy,
  Check,
  Loader2,
  Upload,
  X,
  Image,
  Menu,
  type LucideIcon,
} from 'lucide-react';

const Logo = (props: React.ComponentProps<'svg'>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
      <circle cx="9" cy="10.5" r="1.5" />
      <circle cx="15" cy="10.5" r="1.5" />
      <path d="M8 14h8v2H8z" />
      <path d="M3 10h2v2H3zM19 12h2v2h-2z" />
    </svg>
  );


export const Icons = {
  logo: Logo,
  bot: Bot,
  user: User,
  send: Send,
  add: Plus,
  trash: Trash2,
  settings: Settings,
  copy: Copy,
  check: Check,
  spinner: Loader2,
  upload: Upload,
  close: X,
  image: Image,
  sidebar: Menu,
};
