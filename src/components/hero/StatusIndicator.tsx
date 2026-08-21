import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '../../data/personal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function StatusIndicator() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const items = personal.statusRotation;

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length, reducedMotion]);

  const currentItem = items[index];

  return (
    <div className="inline-flex items-center gap-2.5 font-mono text-xs">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-1.5"
        >
          <span className="text-text-muted tracking-wider">
            {currentItem.action}:
          </span>
          <span className="text-accent">
            {currentItem.text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
