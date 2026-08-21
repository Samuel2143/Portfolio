import { motion } from 'framer-motion';
import { ArrowDown, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon } from '../ui/Icons';
import { personal } from '../../data/personal';
import { Button } from '../ui/Button';
import { NetworkCanvas } from './NetworkCanvas';
import { StatusIndicator } from './StatusIndicator';

export function HeroSection() {
  const handleExplore = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-5 md:px-8 lg:px-12 overflow-hidden"
    >
      <NetworkCanvas />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-5"
        >
          <StatusIndicator />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3"
        >
          {personal.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl font-light text-text-secondary tracking-wide mb-4"
        >
          {personal.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm md:text-base text-text-secondary max-w-xl mx-auto mb-2.5 leading-relaxed"
        >
          {personal.tagline}
        </motion.p>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xs md:text-sm text-text-muted max-w-lg mx-auto mb-6 font-mono"
        >
          {personal.summary}
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <Button variant="primary" size="lg" onClick={handleExplore}>
            Explore My Work
            <ArrowDown size={14} />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href={personal.social.github}
            external
            ariaLabel="GitHub profile"
          >
            <GithubIcon size={16} />
            GitHub
          </Button>
        </motion.div>

        {/* Secondary links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={personal.social.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="X (Twitter)"
          >
            <XIcon size={16} />
          </a>
          <a
            href={personal.resumePath}
            download
            className="text-text-muted hover:text-accent transition-colors inline-flex items-center gap-1.5 text-xs font-mono"
            aria-label="Download Resume"
          >
            <FileText size={14} />
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-text-muted"
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
