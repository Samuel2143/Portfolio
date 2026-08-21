import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  download?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  external,
  download,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm';

  const variants = {
    primary:
      'bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 hover:border-accent/50',
    secondary:
      'bg-bg-tertiary text-text-primary border border-border hover:border-border-hover hover:bg-bg-card-hover',
    ghost:
      'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-sm',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download || undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
