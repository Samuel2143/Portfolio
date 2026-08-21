import { type ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  compact?: boolean;
}

export function Section({
  id,
  children,
  className = '',
  fullWidth,
  compact,
}: SectionProps) {
  const py = compact ? 'py-8 md:py-12' : 'py-12 md:py-16';
  return (
    <section
      id={id}
      className={`relative ${py} ${
        fullWidth ? '' : 'px-5 md:px-8 lg:px-12'
      } ${className}`}
    >
      <div
        className={
          fullWidth ? '' : 'mx-auto max-w-6xl'
        }
      >
        {children}
      </div>
    </section>
  );
}

