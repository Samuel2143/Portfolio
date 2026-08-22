import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon } from '../ui/Icons';
import { useInView } from '../../hooks/useInView';
import { personal } from '../../data/personal';
import { Section } from '../ui/Section';

export function ContactSection() {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <Section id="contact">
      {/* Compact stats & education row */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12"
      >
        {/* DSA stat */}
        <div className="flex items-center gap-4 border border-border rounded-sm p-4 bg-bg-card">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-accent font-mono">
              {personal.leetcode.count}
            </span>
            <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
              {personal.leetcode.label}
            </span>
          </div>
          <a
            href={personal.leetcode.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-accent/70 hover:text-accent transition-colors"
          >
            Profile
            <ExternalLink size={10} />
          </a>
        </div>

        {/* Education */}
        <div className="flex items-center gap-4 border border-border rounded-sm p-4 bg-bg-card">
          <div>
            <span className="text-sm text-text-primary font-medium">
              {personal.education.degree}
            </span>
            <span className="text-text-muted text-xs font-mono block mt-0.5">
              {personal.education.institution} · {personal.education.years}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto py-8 md:py-12"
      >
        {/* Accent line */}
        <div className="flex justify-center mb-8">
          <div className="h-px w-16 bg-accent/30" />
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 tracking-tight">
          Let's build something interesting.
        </h2>
        <p className="text-text-secondary text-sm md:text-base mb-10 max-w-md mx-auto">
          Backend systems, AI applications, or just good engineering conversations.
        </p>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 md:gap-8">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2.5 text-text-muted hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <div className="w-12 h-12 rounded-sm border border-border group-hover:border-accent/30 bg-bg-card group-hover:bg-accent/5 flex items-center justify-center transition-all duration-300">
              <GithubIcon size={20} />
            </div>
            <span className="text-[10px] font-mono tracking-widest">
              GITHUB
            </span>
          </a>

          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2.5 text-text-muted hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <div className="w-12 h-12 rounded-sm border border-border group-hover:border-accent/30 bg-bg-card group-hover:bg-accent/5 flex items-center justify-center transition-all duration-300">
              <LinkedinIcon size={20} />
            </div>
            <span className="text-[10px] font-mono tracking-widest">
              LINKEDIN
            </span>
          </a>

          <a
            href={personal.social.x}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2.5 text-text-muted hover:text-accent transition-colors"
            aria-label="X (Twitter)"
          >
            <div className="w-12 h-12 rounded-sm border border-border group-hover:border-accent/30 bg-bg-card group-hover:bg-accent/5 flex items-center justify-center transition-all duration-300">
              <XIcon size={20} />
            </div>
            <span className="text-[10px] font-mono tracking-widest">X</span>
          </a>

          <a
            href={`mailto:${personal.social.email}`}
            className="group flex flex-col items-center gap-2.5 text-text-muted hover:text-accent transition-colors"
            aria-label="Email"
          >
            <div className="w-12 h-12 rounded-sm border border-border group-hover:border-accent/30 bg-bg-card group-hover:bg-accent/5 flex items-center justify-center transition-all duration-300">
              <Mail size={20} />
            </div>
            <span className="text-[10px] font-mono tracking-widest">
              EMAIL
            </span>
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
