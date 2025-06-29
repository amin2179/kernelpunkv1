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
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 9a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm5 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 18c-2.67 0-5.1-1-6.97-2.62.2-.67.66-1.28 1.29-1.78C7.98 12.38 9.89 12 12 12s4.02.38 5.68 1.6c.63.5 1.09 1.11 1.29 1.78C17.1 17 14.67 18 12 18z" />
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
