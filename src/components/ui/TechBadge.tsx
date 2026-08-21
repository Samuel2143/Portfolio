interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'accent' | 'muted';
  size?: 'sm' | 'md';
  highlighted?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function TechBadge({
  name,
  variant = 'default',
  size = 'sm',
  highlighted,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: TechBadgeProps) {
  const variants = {
    default: 'bg-bg-tertiary border-border text-text-secondary',
    accent: 'bg-accent/10 border-accent/30 text-accent',
    muted: 'bg-bg-secondary border-border text-text-muted',
  };

  const sizes = {
    sm: 'px-2 py-1 text-[10px]',
    md: 'px-3 py-1.5 text-xs',
  };

  const highlightClass = highlighted
    ? 'bg-accent/15 border-accent/40 text-accent'
    : '';

  const interactive = onClick || onMouseEnter ? 'cursor-pointer' : '';

  return (
    <span
      className={`inline-flex items-center font-mono tracking-wide border rounded-sm transition-all duration-200 ${variants[variant]} ${sizes[size]} ${highlightClass} ${interactive}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {name}
    </span>
  );
}
