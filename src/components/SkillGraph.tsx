'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface SkillCategory {
  title: string;
  items: string[];
}

interface Node {
  id: string;
  label: string;
  type: 'core' | 'category' | 'skill';
  category?: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Databases: '#E63946',
  Languages: '#F4A261',
  Frameworks: '#457B9D',
  'Developer Tools & OS': '#2A9D8F',
  Cloud: '#7C3AED',
};

const CATEGORY_ICONS: Record<string, string> = {
  Databases: '',
  Languages: '',
  Frameworks: '',
  'Developer Tools & OS': '',
  Cloud: '',
};

export function SkillGraph({
  categories,
  onCategoryClick,
  width,
  height,
}: {
  categories: SkillCategory[];
  onCategoryClick?: (category: string) => void;
  width: number;
  height: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const simNodesRef = useRef<Node[]>([]);
  const simLinksRef = useRef<Link[]>([]);
  const initializedRef = useRef(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Build initial graph structure
  const graphStructure = useMemo(() => {
    const centerX = width / 2;
    const centerY = height / 2;
    const orbitRadius = Math.min(width, height) * 0.35;
    const newNodes: Node[] = [];
    const newLinks: Link[] = [];

    // Core node
    newNodes.push({
      id: 'core',
      label: 'Core',
      type: 'core',
      x: centerX,
      y: centerY,
      vx: 0,
      vy: 0,
      radius: 32,
      color: '#F5F5F7',
    });

    const categoryTitles = categories.map(c => c.title);
    const categoryCount = categoryTitles.length;

    categoryTitles.forEach((title, i) => {
      const angle = (i / categoryCount) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * orbitRadius;
      const y = centerY + Math.sin(angle) * orbitRadius;

      newNodes.push({
        id: `cat-${title}`,
        label: title,
        type: 'category',
        category: title,
        x,
        y,
        vx: 0,
        vy: 0,
        radius: 20,
        color: CATEGORY_COLORS[title] || '#888',
      });

      newLinks.push({
        source: 'core',
        target: `cat-${title}`,
        strength: 0.8,
      });

      const category = categories.find(c => c.title === title);
      if (category) {
        category.items.forEach((item, j) => {
          const skillAngle = angle + (j - (category.items.length - 1) / 2) * 0.4;
          const skillRadius = orbitRadius + 85;
          const sx = centerX + Math.cos(skillAngle) * skillRadius;
          const sy = centerY + Math.sin(skillAngle) * skillRadius;

          newNodes.push({
            id: `skill-${title}-${item}`,
            label: item,
            type: 'skill',
            category: title,
            x: sx,
            y: sy,
            vx: 0,
            vy: 0,
            radius: 12,
            color: CATEGORY_COLORS[title] || '#888',
          });

          newLinks.push({
            source: `cat-${title}`,
            target: `skill-${title}-${item}`,
            strength: 0.5,
          });
        });
      }
    });

    return { nodes: newNodes, links: newLinks };
  }, [categories, width, height]);

  // Initialize simulation refs once
  useEffect(() => {
    const structure = graphStructure;
    simNodesRef.current = structure.nodes.map(n => ({ ...n }));
    simLinksRef.current = structure.links;
  }, [graphStructure]);

  // Force simulation - runs continuously without React re-renders
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Simulation parameters
    const k = 0.015; // Spring constant (softer)
    const repulsion = 600;
    const damping = 0.88;
    const centerForce = 0.008;

    // Warm-up: run simulation headless to settle nodes (only on first init)
    if (!initializedRef.current) {
      for (let w = 0; w < 300; w++) {
        stepSimulation();
      }
      // Reset velocities after warm-up
      simNodesRef.current.forEach(node => {
        if (node.type !== 'core') {
          node.vx = 0;
          node.vy = 0;
        }
      });
      initializedRef.current = true;
    }

    function stepSimulation() {
      const nodes = simNodesRef.current;
      const links = simLinksRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      nodes.forEach(node => {
        // Center attraction for category nodes
        if (node.type === 'category') {
          const dx = centerX - node.x;
          const dy = centerY - node.y;
          node.vx += dx * centerForce;
          node.vy += dy * centerForce;
        }

        // Repulsion between all nodes
        nodes.forEach(other => {
          if (node === other) return;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = repulsion / (dist * dist);
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        });

        // Spring forces for links
        links.forEach(link => {
          const source = nodes.find(n => n.id === link.source);
          const target = nodes.find(n => n.id === link.target);
          if (!source || !target) return;

          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = link.source === 'core' ? 160 : 85;
          const force = k * (dist - targetDist);
          const fx = (dx / dist) * force * link.strength;
          const fy = (dy / dist) * force * link.strength;

          if (link.source === 'core' || link.target === 'core') {
            if (source.id !== 'core') {
              source.vx += fx;
              source.vy += fy;
            }
            if (target.id !== 'core') {
              target.vx -= fx;
              target.vy -= fy;
            }
          } else {
            source.vx += fx;
            source.vy += fy;
            target.vx -= fx;
            target.vy -= fy;
          }
        });
      });

      // Update positions
      nodes.forEach(node => {
        if (node.type !== 'core') {
          node.vx *= damping;
          node.vy *= damping;
          node.x += node.vx;
          node.y += node.vy;
        }
      });

      // Keep core fixed
      const coreNode = nodes.find(n => n.id === 'core');
      if (coreNode) {
        coreNode.x = centerX;
        coreNode.y = centerY;
      }
    }

    const tick = () => {
      if (!ctx) return;

      stepSimulation();

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw links
      simLinksRef.current.forEach(link => {
        const source = simNodesRef.current.find(n => n.id === link.source);
        const target = simNodesRef.current.find(n => n.id === link.target);
        if (!source || !target) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = `rgba(115, 115, 115, ${link.source === 'core' ? 0.35 : 0.25})`;
        ctx.lineWidth = link.source === 'core' ? 1.5 : 1;
        ctx.stroke();
      });

      // Draw nodes
      simNodesRef.current.forEach(node => {
        const isHovered = hoveredNode === node.id;
        const pulse = isHovered ? 1 + Math.sin(Date.now() * 0.005) * 0.1 : 1;
        const r = node.radius * pulse;

        // Glow for hovered
        if (isHovered) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3);
          gradient.addColorStop(0, `${node.color}40`);
          gradient.addColorStop(1, `${node.color}00`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);

        if (node.type === 'core') {
          // Core: gradient with chip pattern
          const gradient = ctx.createRadialGradient(
            node.x - r * 0.3, node.y - r * 0.3, 0,
            node.x, node.y, r
          );
          gradient.addColorStop(0, '#FFFFFF');
          gradient.addColorStop(0.5, '#BBBBBB');
          gradient.addColorStop(1, '#888888');
          ctx.fillStyle = gradient;
          ctx.fill();

          // Chip pattern lines
          ctx.strokeStyle = 'rgba(0,0,0,0.2)';
          ctx.lineWidth = 1;
          for (let i = -1; i <= 1; i++) {
            ctx.beginPath();
            ctx.moveTo(node.x - r + 4, node.y + i * 6);
            ctx.lineTo(node.x + r - 4, node.y + i * 6);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(node.x + i * 6, node.y - r + 4);
            ctx.lineTo(node.x + i * 6, node.y + r - 4);
            ctx.stroke();
          }

          // Core label
          ctx.fillStyle = '#080808';
          ctx.font = 'bold 11px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('CORE', node.x, node.y);
        } else if (node.type === 'category') {
          // Category: colored circle with icon
          const gradient = ctx.createRadialGradient(
            node.x - r * 0.3, node.y - r * 0.3, 0,
            node.x, node.y, r
          );
          gradient.addColorStop(0, node.color);
          gradient.addColorStop(1, `${node.color}CC`);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Category icon
          const icon = CATEGORY_ICONS[node.category || ''];
          ctx.font = `${r * 0.9}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(icon, node.x, node.y + 1);

          // Category label
          ctx.fillStyle = '#F5F5F7';
          ctx.font = '500 10px "JetBrains Mono", monospace';
          ctx.fillText(node.label.toUpperCase(), node.x, node.y + r + 14);
        } else {
          // Skill: small circle
          ctx.fillStyle = node.color;
          ctx.fill();

          // Skill label
          ctx.fillStyle = '#BBBBBB';
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, node.x, node.y + r + 10);
        }
      });

      animationRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [width, height, hoveredNode]);

  // Mouse interaction - uses simulation refs for accurate hit testing
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found: string | null = null;
    [...simNodesRef.current].reverse().forEach(node => {
      if (found) return;
      const dx = x - node.x;
      const dy = y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= node.radius + (node.type === 'skill' ? 20 : 10)) {
        found = node.id;
      }
    });

    setHoveredNode(found);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    [...simNodesRef.current].reverse().forEach(node => {
      if (node.type === 'category') {
        const dx = x - node.x;
        const dy = y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= node.radius + 10) {
          onCategoryClick?.(node.category || '');
        }
      }
    });
  }, [onCategoryClick]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={() => setHoveredNode(null)}
        className="w-full h-full block"
        style={{ cursor: hoveredNode ? 'pointer' : 'default' }}
      />
    </div>
  );
}

export default SkillGraph;