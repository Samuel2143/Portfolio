import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { personal } from '../../data/personal';
import { Section } from '../ui/Section';

function highlightText(text: string, highlights: readonly string[]) {
  if (!highlights.length) return text;

  const regex = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    highlights.includes(part) ? (
      <span key={i} className="text-text-primary font-medium">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function AboutSection() {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <Section id="about" compact>
      {/* Editorial header — no SectionHeading, custom treatment */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="text-[10px] font-mono text-text-muted tracking-[0.2em] uppercase">
          About
        </span>
      </motion.div>

      <div className="grid md:grid-cols-[1fr_200px] gap-8 md:gap-12">
        {/* Main content — editorial pull-quote style */}
        <div>
          {/* First paragraph as pull-quote */}
          {personal.aboutParagraphs.length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="text-text-primary text-lg md:text-xl font-light leading-relaxed mb-6 border-l-2 border-accent/30 pl-5"
            >
              {highlightText(
                personal.aboutParagraphs[0].text,
                personal.aboutParagraphs[0].highlights
              )}
            </motion.p>
          )}

          {/* Remaining paragraphs */}
          <div className="space-y-4">
            {personal.aboutParagraphs.slice(1).map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + (i + 1) * 0.08, duration: 0.4 }}
                className="text-text-secondary text-sm leading-relaxed max-w-2xl"
              >
                {highlightText(para.text, para.highlights)}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Metadata sidebar with vertical separator */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex md:flex-col gap-4 md:gap-6 flex-wrap md:border-l md:border-border md:pl-6"
        >
          <div>
            <span className="block text-[10px] font-mono text-text-muted tracking-widest uppercase mb-1">
              Experience
            </span>
            <span className="text-sm text-text-primary font-mono">2+ Years</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-text-muted tracking-widest uppercase mb-1">
              Focus
            </span>
            <span className="text-sm text-text-primary font-mono">
              Backend × AI
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-text-muted tracking-widest uppercase mb-1">
              Education
            </span>
            <span className="text-sm text-text-primary font-mono">
              {personal.education.degree}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-text-muted tracking-widest uppercase mb-1">
              Location
            </span>
            <span className="text-sm text-text-primary font-mono">India</span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
