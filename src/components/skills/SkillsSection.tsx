import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { skillGroups } from '../../data/skills';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { SkillConstellation } from './SkillConstellation';

export function SkillsSection() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <Section id="skills" compact>
      <SectionHeading
        title="Technology"
        subtitle="Technologies and tools used across professional work."
        mono
      />

      <div ref={ref}>
        {/* Desktop: SVG constellation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block"
        >
          <SkillConstellation />
        </motion.div>

        {/* Mobile: expandable groups */}
        <div className="md:hidden space-y-3">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.1 + gi * 0.08, duration: 0.4 }}
              className="border border-border rounded-sm bg-bg-card overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedGroup(
                    expandedGroup === group.name ? null : group.name
                  )
                }
                className="w-full flex items-center justify-between p-4 text-left"
                aria-expanded={expandedGroup === group.name}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="text-xs font-mono text-text-primary tracking-wide">
                    {group.name}
                  </span>
                  <span className="text-[10px] text-text-muted font-mono">
                    ({group.skills.length})
                  </span>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-text-muted transition-transform ${
                    expandedGroup === group.name ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedGroup === group.name && (
                <div className="px-4 pb-4 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1.5 text-[11px] font-mono bg-bg-tertiary border border-border rounded-sm text-text-secondary"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

