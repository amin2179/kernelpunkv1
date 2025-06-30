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
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
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
