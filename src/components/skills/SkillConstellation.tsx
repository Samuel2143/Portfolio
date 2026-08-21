import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { skillGroups, allSkills, type Skill } from '../../data/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface NodePosition {
  x: number;
  y: number;
  skill: Skill;
  groupColor: string;
}

function buildLayout(): NodePosition[] {
  const positions: NodePosition[] = [];

  // Group centers arranged in four quadrants with adequate clearance
  const groupCenters: Record<string, { cx: number; cy: number; startAngle: number }> = {
    Backend: { cx: 190, cy: 135, startAngle: -Math.PI / 3 },
    'Distributed & Data': { cx: 570, cy: 135, startAngle: 0 },
    'AI Engineering': { cx: 190, cy: 435, startAngle: Math.PI / 6 },
    Tools: { cx: 570, cy: 435, startAngle: Math.PI / 4 },
  };

  for (const group of skillGroups) {
    const center = groupCenters[group.name];
    if (!center) continue;

    const count = group.skills.length;
    const radius = 60 + count * 5;

    group.skills.forEach((skill, i) => {
      const angle = (i / count) * Math.PI * 2 + center.startAngle;
      const jitterX = ((i * 17) % 7) - 3;
      const jitterY = ((i * 13) % 5) - 2;
      positions.push({
        x: center.cx + Math.cos(angle) * radius + jitterX,
        y: center.cy + Math.sin(angle) * radius + jitterY,
        skill,
        groupColor: group.color,
      });
    });
  }

  return positions;
}

interface Edge {
  from: NodePosition;
  to: NodePosition;
}

function buildEdges(nodes: NodePosition[]): Edge[] {
  const edges: Edge[] = [];
  const seen = new Set<string>();

  for (const node of nodes) {
    for (const relName of node.skill.related) {
      const target = nodes.find((n) => n.skill.name === relName);
      if (!target) continue;
      const key = [node.skill.name, relName].sort().join('::');
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: node, to: target });
    }
  }

  return edges;
}

export function SkillConstellation() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const nodes = useMemo(() => buildLayout(), []);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);

  const relatedSet = useMemo(() => {
    if (!hovered) return new Set<string>();
    const skill = allSkills.find((s) => s.name === hovered);
    return new Set(skill?.related || []);
  }, [hovered]);

  const isHighlighted = useCallback(
    (name: string) => {
      if (!hovered) return false;
      return name === hovered || relatedSet.has(name);
    },
    [hovered, relatedSet]
  );

  const isDimmed = useCallback(
    (name: string) => {
      if (!hovered) return false;
      return !isHighlighted(name);
    },
    [hovered, isHighlighted]
  );

  const isEdgeHighlighted = useCallback(
    (edge: Edge) => {
      if (!hovered) return false;
      return isHighlighted(edge.from.skill.name) && isHighlighted(edge.to.skill.name);
    },
    [hovered, isHighlighted]
  );

  const svgWidth = 760;
  const svgHeight = 560;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto"
        aria-label="Interactive technology constellation showing relationships between skills"
      >
        {/* Group labels */}
        {skillGroups.map((group) => {
          const groupNodes = nodes.filter((n) => n.skill.group === group.name);
          if (groupNodes.length === 0) return null;
          const avgX = groupNodes.reduce((s, n) => s + n.x, 0) / groupNodes.length;
          const avgY = groupNodes.reduce((s, n) => s + n.y, 0) / groupNodes.length;
          return (
            <text
              key={group.name}
              x={avgX}
              y={avgY}
              textAnchor="middle"
              dominantBaseline="central"
              fill={group.color}
              opacity={0.15}
              fontSize="13"
              letterSpacing="0.15em"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="600"
            >
              {group.name.toUpperCase()}
            </text>
          );
        })}

        {/* Edges */}
        {edges.map((edge, i) => {
          const highlighted = isEdgeHighlighted(edge);
          const dimmed = hovered && !highlighted;
          return (
            <line
              key={i}
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              stroke={highlighted ? 'rgba(0, 212, 255, 0.35)' : 'rgba(255, 255, 255, 0.04)'}
              strokeWidth={highlighted ? 1.5 : 0.5}
              opacity={dimmed ? 0.2 : 1}
              style={{ transition: 'all 0.3s ease' }}
            />
          );
        })}

        {/* Animated data dots on highlighted edges */}
        {!reducedMotion &&
          edges
            .filter((e) => isEdgeHighlighted(e))
            .slice(0, 4)
            .map((edge, i) => (
              <motion.circle
                key={`dot-${i}`}
                r={2}
                fill="#00d4ff"
                opacity={0.6}
                initial={{ offsetDistance: '0%' }}
                animate={{
                  cx: [edge.from.x, edge.to.x],
                  cy: [edge.from.y, edge.to.y],
                }}
                transition={{
                  duration: 1.5 + i * 0.3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.4,
                }}
              />
            ))}

        {/* Nodes */}
        {nodes.map((node) => {
          const highlighted = isHighlighted(node.skill.name);
          const dimmed = isDimmed(node.skill.name);
          const isHoveredNode = hovered === node.skill.name;
          const nodeRadius = isHoveredNode ? 6 : highlighted ? 5 : 4;
          const fillOpacity = dimmed ? 0.15 : highlighted ? 0.9 : 0.5;

          return (
            <g
              key={node.skill.name}
              onMouseEnter={() => setHovered(node.skill.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(node.skill.name)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              role="button"
              aria-label={`${node.skill.name} - related to ${node.skill.related.join(', ')}`}
              style={{ cursor: 'pointer' }}
            >
              {/* Hover glow */}
              {isHoveredNode && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={18}
                  fill={node.groupColor}
                  opacity={0.08}
                />
              )}
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeRadius}
                fill={node.groupColor}
                opacity={fillOpacity}
                style={{ transition: 'all 0.2s ease' }}
              />
              {/* Label */}
              <text
                x={node.x}
                y={node.y + nodeRadius + 14}
                textAnchor="middle"
                fill={highlighted ? node.groupColor : dimmed ? '#484848' : '#a0a0a0'}
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={highlighted ? 500 : 400}
                opacity={dimmed ? 0.4 : 1}
                style={{ transition: 'all 0.2s ease' }}
              >
                {node.skill.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Connection hint */}
      <div className="h-6 flex items-center justify-center">
        {hovered ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-mono text-text-muted"
          >
            {hovered}{' '}
            <span className="text-accent/50">→</span>{' '}
            {Array.from(relatedSet).join(' · ')}
          </motion.p>
        ) : (
          <p className="text-[10px] font-mono text-text-dim">
            Hover a technology to explore connections
          </p>
        )}
      </div>
    </div>
  );
}
