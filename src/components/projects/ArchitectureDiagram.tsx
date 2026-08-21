import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Project } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ArchitectureDiagramProps {
  project: Project;
}

const zoneLabels: Record<string, string> = {
  data: 'DATA PIPELINE',
  'rule-based': 'DETERMINISTIC DETECTION',
  ai: 'AI INTERPRETATION',
  output: 'OUTPUT',
};

const zoneAccents: Record<string, { border: string; bg: string; labelColor: string; nodeAccent: string }> = {
  data: {
    border: 'border-border',
    bg: 'bg-bg-tertiary/40',
    labelColor: 'text-text-muted',
    nodeAccent: '#6b6b6b',
  },
  'rule-based': {
    border: 'border-amber-500/25',
    bg: 'bg-amber-500/[0.03]',
    labelColor: 'text-amber-500/60',
    nodeAccent: '#f59e0b',
  },
  ai: {
    border: 'border-accent/20',
    bg: 'bg-accent/[0.03]',
    labelColor: 'text-accent/60',
    nodeAccent: '#00d4ff',
  },
  output: {
    border: 'border-border',
    bg: 'bg-bg-tertiary/30',
    labelColor: 'text-text-muted',
    nodeAccent: '#6b6b6b',
  },
};

export function ArchitectureDiagram({ project }: ArchitectureDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const nodes = project.architectureNodes;
  const flow = project.architectureFlow;

  const isHvac = project.id === 'hvac-defect-detection';
  const zones = isHvac ? groupByZone(nodes) : null;

  const hoveredInfo = nodes.find((n) => n.id === hoveredNode);

  return (
    <div className="space-y-0">
      {/* Architecture flow */}
      <div
        className={`border border-border rounded-sm p-4 md:p-6 bg-bg-card overflow-x-auto ${
          isHvac ? 'space-y-0' : ''
        }`}
      >
        {isHvac && zones ? (
          <div className="space-y-1">
            {Object.entries(zones).map(([zone, zoneNodes], zi) => {
              const style = zoneAccents[zone];
              const label = zoneLabels[zone];
              const isLast = zi === Object.keys(zones).length - 1;
              return (
                <div key={zone}>
                  <div
                    className={`rounded-sm border ${style.border} ${style.bg} p-3 md:p-4`}
                  >
                    <span
                      className={`text-[9px] font-mono tracking-[0.2em] uppercase mb-3 block ${style.labelColor}`}
                    >
                      {label}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {zoneNodes.map((node, ni) => {
                        const isLastNode = ni === zoneNodes.length - 1;
                        return (
                          <div key={node.id} className="flex items-center gap-2">
                            <NodeButton
                              node={node}
                              zone={zone}
                              isHovered={hoveredNode === node.id}
                              onHover={setHoveredNode}
                              reducedMotion={reducedMotion}
                            />
                            {!isLastNode && <FlowArrow reduced={reducedMotion} accent={style.nodeAccent} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Zone connector with animated data packet */}
                  {!isLast && (
                    <ZoneConnector reducedMotion={reducedMotion} />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {flow.map((nodeId, i) => {
              const node = nodes.find((n) => n.id === nodeId);
              if (!node) return null;
              return (
                <div key={node.id} className="flex items-center gap-2">
                  <NodeButton
                    node={node}
                    zone="data"
                    isHovered={hoveredNode === node.id}
                    onHover={setHoveredNode}
                    reducedMotion={reducedMotion}
                  />
                  {i < flow.length - 1 && (
                    <FlowArrow reduced={reducedMotion} accent="#00d4ff" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tooltip — renders directly below diagram */}
      <AnimatePresence>
        {hoveredInfo && (
          <motion.div
            key={hoveredInfo.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="border border-border border-t-0 rounded-b-sm px-4 py-3 bg-bg-card">
              <span className="text-[10px] font-mono text-accent tracking-widest uppercase block mb-1">
                {hoveredInfo.label}
              </span>
              <p className="text-text-secondary text-xs leading-relaxed">
                {hoveredInfo.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ZoneConnector({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="flex justify-center py-1">
      <svg width="2" height="24" viewBox="0 0 2 24" className="overflow-visible">
        <line
          x1="1" y1="0" x2="1" y2="24"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {!reducedMotion && (
          <motion.circle
            cx="1"
            r="2"
            fill="#00d4ff"
            opacity={0.5}
            animate={{ cy: [0, 24] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 1.5,
            }}
          />
        )}
      </svg>
    </div>
  );
}

function NodeButton({
  node,
  zone,
  isHovered,
  onHover,
  reducedMotion,
}: {
  node: { id: string; label: string; description: string };
  zone: string;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.button
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      whileHover={reducedMotion ? {} : { scale: 1.03 }}
      className={`px-3 py-2 rounded-sm text-xs font-mono border transition-all duration-200 ${
        isHovered
          ? 'text-accent'
          : zone === 'ai'
          ? 'text-text-secondary'
          : zone === 'rule-based'
          ? 'text-text-secondary'
          : 'text-text-secondary'
      }`}
      style={
        isHovered
          ? {
              backgroundColor: 'rgba(0, 212, 255, 0.12)',
              borderColor: 'rgba(0, 212, 255, 0.4)',
            }
          : {
              backgroundColor:
                zone === 'ai'
                  ? 'rgba(0, 212, 255, 0.05)'
                  : zone === 'rule-based'
                  ? 'rgba(245, 158, 11, 0.05)'
                  : 'rgba(17, 17, 17, 0.8)',
              borderColor:
                zone === 'ai'
                  ? 'rgba(0, 212, 255, 0.15)'
                  : zone === 'rule-based'
                  ? 'rgba(245, 158, 11, 0.15)'
                  : 'rgba(26, 26, 26, 1)',
            }
      }
      aria-label={`${node.label}: ${node.description}`}
    >
      {node.label}
    </motion.button>
  );
}

function FlowArrow({ reduced, accent }: { reduced: boolean; accent: string }) {
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (reduced || !dotRef.current) return;
    // Simple CSS-based animation as fallback
  }, [reduced]);

  return (
    <svg width="20" height="12" viewBox="0 0 20 12" className="flex-shrink-0">
      <motion.line
        x1="0"
        y1="6"
        x2="14"
        y2="6"
        stroke={`${accent}4d`}
        strokeWidth="1"
        initial={reduced ? {} : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.polygon
        points="14,3 20,6 14,9"
        fill={`${accent}4d`}
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
    </svg>
  );
}

function groupByZone(
  nodes: Project['architectureNodes']
): Record<string, Project['architectureNodes']> {
  const order = ['data', 'rule-based', 'ai', 'output'];
  const groups: Record<string, Project['architectureNodes']> = {};

  for (const zone of order) {
    const zoneNodes = nodes.filter((n) => n.zone === zone);
    if (zoneNodes.length > 0) {
      groups[zone] = zoneNodes;
    }
  }

  return groups;
}
