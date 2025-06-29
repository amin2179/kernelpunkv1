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
];
