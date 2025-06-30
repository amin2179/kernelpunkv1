export type Theme = {
  name: string;
  id: string;
  colors: Record<string, string>;
};

const kernelpunkColors: Record<string, string> = {
    '--background': '224 71.4% 4.1%',
    '--foreground': '210 20% 98%',
    '--card': '222.2 47.4% 11.2%',
    '--card-foreground': '210 20% 98%',
    '--popover': '224 71.4% 4.1%',
    '--popover-foreground': '210 20% 98%',
    '--primary': '217 91.2% 59.8%',
    '--primary-foreground': '210 20% 98%',
    '--secondary': '215 27.9% 16.9%',
    '--secondary-foreground': '210 20% 98%',
    '--muted': '215 27.9% 16.9%',
    '--muted-foreground': '217 9.1% 64.9%',
    '--accent': '326 91.2% 59.8%',
    '--accent-foreground': '210 20% 98%',
    '--destructive': '0 62.8% 30.6%',
    '--destructive-foreground': '210 20% 98%',
    '--border': '215 27.9% 16.9%',
    '--input': '215 27.9% 16.9%',
    '--ring': '217 91.2% 59.8%',
    '--radius': '0.5rem',
};

const cyberpunkColors: Record<string, string> = {
    '--background': '263 61% 10%',
    '--foreground': '198 93% 75%',
    '--card': '263 61% 15%',
    '--card-foreground': '198 93% 75%',
    '--popover': '263 61% 10%',
    '--popover-foreground': '198 93% 75%',
    '--primary': '325 92% 64%', // Hot Pink
    '--primary-foreground': '263 61% 10%',
    '--secondary': '263 61% 20%',
    '--secondary-foreground': '198 93% 75%',
    '--muted': '263 61% 20%',
    '--muted-foreground': '263 61% 50%',
    '--accent': '180 100% 50%', // Electric Cyan
    '--accent-foreground': '263 61% 10%',
    '--destructive': '0 100% 50%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '263 61% 25%',
    '--input': '263 61% 25%',
    '--ring': '325 92% 64%',
    '--radius': '0.25rem',
};

const draculaColors: Record<string, string> = {
    '--background': '231 15% 18%',
    '--foreground': '60 30% 96%',
    '--card': '232 14% 25%',
    '--card-foreground': '60 30% 96%',
    '--popover': '231 15% 18%',
    '--popover-foreground': '60 30% 96%',
    '--primary': '272 88% 78%', // Purple
    '--primary-foreground': '60 30% 96%',
    '--secondary': '232 14% 31%',
    '--secondary-foreground': '60 30% 96%',
    '--muted': '232 14% 31%',
    '--muted-foreground': '232 14% 60%',
    '--accent': '160 84% 62%', // Cyan
    '--accent-foreground': '231 15% 18%',
    '--destructive': '352 70% 54%', // Red
    '--destructive-foreground': '60 30% 96%',
    '--border': '232 14% 31%',
    '--input': '232 14% 31%',
    '--ring': '272 88% 78%',
    '--radius': '0.5rem',
};

const synthwaveColors: Record<string, string> = {
    '--background': '261 24% 18%',
    '--foreground': '0 0% 100%',
    '--card': '261 21% 26%',
    '--card-foreground': '0 0% 100%',
    '--popover': '261 24% 18%',
    '--popover-foreground': '0 0% 100%',
    '--primary': '327 100% 74%', // Hot Pink
    '--primary-foreground': '261 24% 10%',
    '--secondary': '261 21% 32%',
    '--secondary-foreground': '0 0% 100%',
    '--muted': '261 21% 32%',
    '--muted-foreground': '261 21% 65%',
    '--accent': '172 100% 48%', // Bright Teal
    '--accent-foreground': '261 24% 10%',
    '--destructive': '0 84% 60%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '261 21% 32%',
    '--input': '261 21% 32%',
    '--ring': '327 100% 74%',
    '--radius': '0.75rem',
};

export const themes: Theme[] = [
  {
    name: 'KernelPunk',
    id: 'kernelpunk',
    colors: kernelpunkColors,
  },
  {
    name: 'Cyberpunk',
    id: 'cyberpunk',
    colors: cyberpunkColors,
  },
  {
    name: 'Dracula',
    id: 'dracula',
    colors: draculaColors,
  },
  {
    name: 'Synthwave',
    id: 'synthwave',
    colors: synthwaveColors,
  },
];
