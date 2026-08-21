import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { timeline, experience } from '../../data/experience';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { TechBadge } from '../ui/TechBadge';

type PathFilter = 'all' | 'backend' | 'ai';

const pathLabels: Record<PathFilter, string> = {
  all: 'All',
  backend: 'Backend Engineering',
  ai: 'AI / Agents',
};

// Maps timeline labels to paths
const timelinePathMap: Record<string, PathFilter[]> = {
  'Backend Engineering': ['backend'],
  'Distributed Systems': ['backend'],
  'IoT / Data Processing': ['backend'],
  'AI / Agents Engineering': ['ai'],
};

// Maps experience area names to paths
const areaPathMap: Record<string, PathFilter> = {
  'Backend Engineering': 'backend',
  'AI / Agents Engineering': 'ai',
};

export function JourneySection() {
  const [ref, isInView] = useInView<HTMLDivElement>();
  const [activeFilter, setActiveFilter] = useState<PathFilter>('all');
  const [expandedArea, setExpandedArea] = useState<number | null>(null);

  const isTimelineEntryActive = useMemo(() => {
    if (activeFilter === 'all') return (_label: string) => true;
    return (label: string) => {
      const paths = timelinePathMap[label];
      return paths ? paths.includes(activeFilter) : false;
    };
  }, [activeFilter]);

  // Auto-expand matching area when filter changes
  const autoExpandedArea = useMemo(() => {
    if (activeFilter === 'all') return null;
    return experience.areas.findIndex(
      (a) => areaPathMap[a.area] === activeFilter
    );
  }, [activeFilter]);

  const currentExpandedArea = expandedArea !== null ? expandedArea : autoExpandedArea;

  return (
    <Section id="journey">
      <SectionHeading
        title="Engineering Journey"
        subtitle="A progression from backend fundamentals to AI engineering."
        mono
      />

      {/* Path filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3 }}
        className="flex gap-2 mb-8"
      >
        {(Object.keys(pathLabels) as PathFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setExpandedArea(null);
            }}
            className={`px-3 py-1.5 text-[11px] font-mono tracking-wide rounded-sm border transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-accent/10 border-accent/30 text-accent'
                : 'bg-bg-card border-border text-text-muted hover:text-text-secondary hover:border-border-hover'
            }`}
          >
            {pathLabels[filter]}
          </button>
        ))}
      </motion.div>

      {/* Role header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="mb-10 border border-border rounded-sm p-5 md:p-6 bg-bg-card"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-text-primary font-medium text-base">
              {experience.title}
            </h3>
            <p className="text-text-muted text-xs font-mono mt-1">
              {experience.period}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500/60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-mono text-green-500/80">PRESENT</span>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative ml-3 md:ml-6">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute left-0 top-0 bottom-0 w-px bg-border origin-top"
        />

        <div className="space-y-6">
          {timeline.map((entry, i) => {
            const isActive = isTimelineEntryActive(entry.label);
            const isDimmed = activeFilter !== 'all' && !isActive;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: isDimmed ? 0.3 : 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="relative pl-8"
              >
                {/* Active path indicator */}
                {isActive && activeFilter !== 'all' && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 -translate-x-1/2 rounded-full bg-accent/40"
                  />
                )}

                {/* Node */}
                <div
                  className={`absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    entry.isCurrent
                      ? 'border-accent bg-accent/30'
                      : isActive && activeFilter !== 'all'
                      ? 'border-accent/60 bg-accent/15'
                      : 'border-text-muted bg-bg-primary'
                  }`}
                />

                {/* Year label */}
                {entry.year && (
                  <span className={`inline-block text-[10px] font-mono tracking-widest mb-1 transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-text-muted'
                  }`}>
                    {entry.year}
                  </span>
                )}

                <h4
                  className={`text-sm font-medium transition-colors duration-300 ${
                    entry.isCurrent
                      ? 'text-accent'
                      : isActive && activeFilter !== 'all'
                      ? 'text-text-primary'
                      : 'text-text-primary'
                  }`}
                >
                  {entry.label}
                </h4>
                <p className={`text-xs mt-1 max-w-lg transition-colors duration-300 ${
                  isDimmed ? 'text-text-dim' : 'text-text-muted'
                }`}>
                  {entry.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Experience areas */}
      <div className="mt-12 space-y-3">
        <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
          Professional Work Areas
        </span>

        {experience.areas.map((area, i) => {
          const areaPath = areaPathMap[area.area];
          const isAreaActive = activeFilter === 'all' || areaPath === activeFilter;
          const isExpanded = currentExpandedArea === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: isAreaActive ? 1 : 0.35, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
              className={`border rounded-sm bg-bg-card overflow-hidden transition-all duration-300 ${
                isExpanded && isAreaActive
                  ? 'border-accent/30'
                  : 'border-border'
              }`}
            >
              <button
                onClick={() =>
                  setExpandedArea(isExpanded ? null : i)
                }
                className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-card-hover transition-colors"
                aria-expanded={isExpanded}
              >
                <div>
                  <h4 className="text-sm font-medium text-text-primary">
                    {area.area}
                  </h4>
                  <p className="text-text-muted text-xs mt-1">
                    {area.description}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-text-muted flex-shrink-0 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-border pt-4">
                      {/* Technologies */}
                      <div className="mb-4">
                        <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase block mb-2">
                          Technologies
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {area.technologies.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                          ))}
                        </div>
                      </div>

                      {/* Contributions */}
                      <div className="mb-4">
                        <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase block mb-2">
                          Key Work
                        </span>
                        <ul className="space-y-2">
                          {area.contributions.map((c, j) => (
                            <li
                              key={j}
                              className="text-text-secondary text-xs flex gap-2"
                            >
                              <span className="text-accent mt-0.5 flex-shrink-0">
                                ›
                              </span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics */}
                      {area.metrics && (
                        <div>
                          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase block mb-2">
                            Impact
                          </span>
                          <div className="flex flex-wrap gap-3">
                            {area.metrics.map((m, j) => (
                              <span
                                key={j}
                                className="text-xs font-mono text-accent bg-accent/5 border border-accent/20 px-3 py-1.5 rounded-sm"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
