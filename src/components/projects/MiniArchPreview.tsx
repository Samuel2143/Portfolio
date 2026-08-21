import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MiniArchPreviewProps {
  projectId: string;
}

interface FlowStep {
  label: string;
}

const projectFlows: Record<string, FlowStep[]> = {
  'hvac-defect-detection': [
    { label: 'Data' },
    { label: 'Preprocess' },
    { label: 'Detect' },
    { label: 'AI' },
  ],
  'websocket-event-system': [
    { label: 'Device' },
    { label: 'Kafka' },
    { label: 'Netty' },
    { label: 'WS' },
    { label: 'Dashboard' },
  ],
  'certificate-auth': [
    { label: 'Client' },
    { label: 'Cert' },
    { label: 'Ed25519' },
    { label: 'Verify' },
    { label: 'JWT' },
  ],
};

export function MiniArchPreview({ projectId }: MiniArchPreviewProps) {
  const reducedMotion = useReducedMotion();
  const steps = projectFlows[projectId];
  if (!steps) return null;

  const nodeWidth = 52;
  const nodeHeight = 22;
  const gap = 28;
  const totalWidth = steps.length * nodeWidth + (steps.length - 1) * gap;
  const svgWidth = totalWidth + 20;
  const svgHeight = 40;
  const startX = 10;
  const cy = svgHeight / 2;

  return (
    <div className="px-5 pb-4 pt-1">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto max-w-sm mx-auto"
        aria-hidden="true"
      >
        {/* Connecting lines */}
        {steps.map((_, i) => {
          if (i === steps.length - 1) return null;
          const x1 = startX + i * (nodeWidth + gap) + nodeWidth;
          const x2 = startX + (i + 1) * (nodeWidth + gap);
          return (
            <g key={`line-${i}`}>
              <line
                x1={x1}
                y1={cy}
                x2={x2}
                y2={cy}
                stroke="rgba(0, 212, 255, 0.2)"
                strokeWidth="1"
              />
              {/* Arrow */}
              <polygon
                points={`${x2 - 4},${cy - 3} ${x2},${cy} ${x2 - 4},${cy + 3}`}
                fill="rgba(0, 212, 255, 0.25)"
              />
              {/* Animated dot */}
              {!reducedMotion && (
                <motion.circle
                  r={1.5}
                  cy={cy}
                  fill="#00d4ff"
                  opacity={0.5}
                  animate={{ cx: [x1, x2] }}
                  transition={{
                    duration: 1 + i * 0.15,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.3,
                    repeatDelay: 0.5,
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {steps.map((step, i) => {
          const x = startX + i * (nodeWidth + gap);
          return (
            <g key={step.label}>
              <rect
                x={x}
                y={cy - nodeHeight / 2}
                width={nodeWidth}
                height={nodeHeight}
                rx={2}
                fill="rgba(0, 212, 255, 0.06)"
                stroke="rgba(0, 212, 255, 0.15)"
                strokeWidth="0.5"
              />
              <text
                x={x + nodeWidth / 2}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill="rgba(0, 212, 255, 0.5)"
                fontSize="8"
                fontFamily="'JetBrains Mono', monospace"
              >
                {step.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
