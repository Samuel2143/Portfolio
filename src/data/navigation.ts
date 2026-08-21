export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const sectionIds = {
  hero: 'hero',
  work: 'work',
  journey: 'journey',
  about: 'about',
  skills: 'skills',
  learning: 'learning',
  contact: 'contact',
} as const;
