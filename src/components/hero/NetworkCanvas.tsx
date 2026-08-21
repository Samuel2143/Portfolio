import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  radius: number;
}

const LABELS = ['BACKEND', 'DATA', 'SYSTEMS', 'AI'];

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    if (!initializedRef.current) {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const cx = w / 2;
      const cy = h / 2;
      const spread = Math.min(w, h) * 0.25;

      nodesRef.current = LABELS.map((label, i) => {
        const angle = (i / LABELS.length) * Math.PI * 2 - Math.PI / 2;
        return {
          x: cx + Math.cos(angle) * spread,
          y: cy + Math.sin(angle) * spread,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          label,
          radius: 3,
        };
      });
      initializedRef.current = true;
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;

      if (!reducedMotion) {
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;

          const margin = 80;
          if (node.x < margin || node.x > w - margin) node.vx *= -1;
          if (node.y < margin || node.y > h - margin) node.vy *= -1;

          node.x = Math.max(margin, Math.min(w - margin, node.x));
          node.y = Math.max(margin, Math.min(h - margin, node.y));
        });
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.03)';
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.fill();

        // Label
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(0, 212, 255, 0.12)';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 22);
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    />
  );
}
