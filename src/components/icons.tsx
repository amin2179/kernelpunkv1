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
    <path d="M12.5 2C6.7 2 2 6.7 2 12.5S6.7 23 12.5 23 23 18.3 23 12.5 18.3 2 12.5 2zM10.2 19.2c-.6 0-1.2-.2-1.6-.6-1.2-1-2-2.3-2-3.5 0-1.1.5-2.5 1.5-3-.4-.3-.6-.8-.6-1.3 0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6c0 .5-.2 1-.6 1.3 1 .5 1.5 1.9 1.5 3 0 1.2-.8 2.6-2 3.6-.3.2-.7.4-1.1.4zm4.6-7.7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
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
