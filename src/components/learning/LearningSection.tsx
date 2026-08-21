import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import {
  learningRoadmap,
  additionalLearning,
  statusLabels,
  statusColors,
} from '../../data/learning';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';

export function LearningSection() {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <Section id="learning" compact>
      <SectionHeading
        title="Currently Learning"
        subtitle="Going deeper into AI engineering by building the fundamentals first."
        mono
      />

      <div ref={ref}>
        {/* Section subtitle / path label */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
            AI Engineering Path
          </span>
        </div>

        {/* Desktop: horizontal step progression */}
        <div className="hidden md:block mb-8">
          <div className="flex items-start">
            {learningRoadmap.map((item, i) => {
              const isLast = i === learningRoadmap.length - 1;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  className="flex items-start flex-1"
                >
                  <div className="flex flex-col items-center flex-1">
                    {/* Node */}
                    <div
                      className="w-3 h-3 rounded-full border-2 mb-3"
                      style={{
                        borderColor: statusColors[item.status],
                        backgroundColor:
                          item.status === 'current'
                            ? `${statusColors[item.status]}30`
                            : item.status === 'completed'
                            ? statusColors[item.status]
                            : 'var(--color-bg-primary)',
                      }}
                    />
                    {/* Label */}
                    <span className="text-[11px] text-text-primary text-center leading-tight">
                      {item.label}
                    </span>
                    {/* Status badge */}
                    <span
                      className="text-[8px] font-mono tracking-widest mt-1.5 px-1.5 py-0.5 rounded-sm border"
                      style={{
                        color: statusColors[item.status],
                        borderColor: `${statusColors[item.status]}30`,
                        backgroundColor: `${statusColors[item.status]}08`,
                      }}
                    >
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  {/* Connector line */}
                  {!isLast && (
                    <div className="flex-shrink-0 w-8 mt-1.5 flex items-center">
                      <div
                        className="h-px flex-1"
                        style={{
                          backgroundColor: `${statusColors[item.status]}30`,
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical roadmap */}
        <div className="md:hidden mb-6">
          <div className="relative ml-3">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute left-0 top-0 bottom-0 w-px bg-border origin-top"
            />

            <div className="space-y-4">
              {learningRoadmap.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  className="relative pl-8"
                >
                  {/* Node */}
                  <div
                    className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full border-2"
                    style={{
                      borderColor: statusColors[item.status],
                      backgroundColor:
                        item.status === 'current'
                          ? `${statusColors[item.status]}30`
                          : 'var(--color-bg-primary)',
                    }}
                  />

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-text-primary">
                      {item.label}
                    </span>
                    <span
                      className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-sm border"
                      style={{
                        color: statusColors[item.status],
                        borderColor: `${statusColors[item.status]}30`,
                        backgroundColor: `${statusColors[item.status]}08`,
                      }}
                    >
                      {statusLabels[item.status]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional learning — compact cards */}
        <div>
          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase block mb-4">
            Fundamentals
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {additionalLearning.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 p-3 border border-border rounded-sm bg-bg-card"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: statusColors[item.status] }}
                />
                <span className="text-sm text-text-primary flex-1">
                  {item.label}
                </span>
                <span
                  className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-sm border"
                  style={{
                    color: statusColors[item.status],
                    borderColor: `${statusColors[item.status]}30`,
                    backgroundColor: `${statusColors[item.status]}08`,
                  }}
                >
                  {statusLabels[item.status]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
