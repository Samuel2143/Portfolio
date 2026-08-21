import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  mono?: boolean;
}

export function SectionHeading({ title, subtitle, mono }: SectionHeadingProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-6 md:mb-8"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-8 bg-accent" />
        <span
          className={`text-xs tracking-[0.2em] text-text-secondary uppercase ${
            mono ? 'font-mono' : ''
          }`}
        >
          {title}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      {subtitle && (
        <p className="text-text-secondary text-sm md:text-base max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
