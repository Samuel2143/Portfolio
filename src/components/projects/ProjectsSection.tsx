import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { projects, type Project } from '../../data/projects';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { TechBadge } from '../ui/TechBadge';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { MiniArchPreview } from './MiniArchPreview';

function ProjectCard({
  project,
  onClick,
  index,
  isInView,
}: {
  project: Project;
  onClick: () => void;
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.4 }}
      className={`group border border-border rounded-sm bg-bg-card hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300 cursor-pointer ${
        project.featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-mono text-text-muted tracking-widest">
              PROJECT {project.number} — PROFESSIONAL
            </span>
            <h3 className="text-base md:text-lg font-medium text-text-primary mt-1 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-text-secondary text-xs mt-1 font-mono italic">
              {project.subtitle}
            </p>
          </div>
          <span className="text-text-muted text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            INSPECT →
          </span>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>

      {/* Mini architecture preview on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50"
          >
            <MiniArchPreview projectId={project.id} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle accent border on hover */}
      <div className="h-px w-full bg-border group-hover:bg-accent/30 transition-colors" />
    </motion.article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Scroll to top when modal opens
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg-primary/90 backdrop-blur-sm overflow-y-auto"
      ref={contentRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl mx-4 my-8 md:my-16 bg-bg-secondary border border-border rounded-sm"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 md:p-6 border-b border-border bg-bg-secondary/95 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-mono text-accent tracking-widest">
              PROJECT {project.number} — SYSTEM INSPECTION
            </span>
            <h2 className="text-lg md:text-xl font-medium text-text-primary mt-1">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-sm hover:bg-bg-tertiary"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-8">
          {/* Subtitle & Description */}
          <div>
            <p className="text-text-secondary text-sm font-mono italic mb-3">
              {project.subtitle}
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase block mb-3">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} variant="accent" size="md" />
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase block mb-3">
              System Architecture
            </span>
            <ArchitectureDiagram project={project} />
          </div>

          {/* Technical Details */}
          {project.details && (
            <div>
              <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase block mb-3">
                Technical Details
              </span>
              <ul className="space-y-2">
                {project.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-text-secondary text-sm flex gap-2"
                  >
                    <span className="text-accent mt-0.5 flex-shrink-0">›</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}


        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [ref, isInView] = useInView<HTMLDivElement>();
  const [selected, setSelected] = useState<Project | null>(null);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <Section id="work">
      <SectionHeading
        title="Selected Engineering Work"
        subtitle="Professional projects across backend engineering and AI systems."
        mono
      />

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isInView={isInView}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={handleClose} />
        )}
      </AnimatePresence>
    </Section>
  );
}
