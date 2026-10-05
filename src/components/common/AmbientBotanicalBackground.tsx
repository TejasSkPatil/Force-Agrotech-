import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface LeafParticle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  type: 'wheat' | 'crop' | 'olive' | 'herbal' | 'grain';
  color: string;
  veinColor: string;
  depth: number; // 0.3 (background) to 1.3 (foreground)
  opacity: number;
  baseOpacity: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  waveFrequency: number;
  waveAmplitude: number;
  flutterSpeed: number;
  flutterPhase: number;
  layer: 'bg' | 'mid' | 'fg';
}

const LEAF_COLORS = [
  { main: '#7D9B85', vein: '#62806B' }, // Soft sage green
  { main: '#1E533B', vein: '#143C2A' }, // Deep botanical green
  { main: '#6F7E5E', vein: '#536044' }, // Dusty olive
  { main: '#D4C4A8', vein: '#B8A88B' }, // Subtle golden beige
  { main: '#D6A84F', vein: '#B88B35' }, // Warm wheat gold
  { main: '#A2BCAB', vein: '#859F8E' }, // Very light muted green
  { main: '#4A7A58', vein: '#365E42' }, // Medium forest green
  { main: '#C99E4A', vein: '#A88034' }, // Amber wheat
];

export const AmbientBotanicalBackground: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Generate 32–42 layered leaves distributed towards outer edges and corners
    const leafCount = 36;
    const leaves: LeafParticle[] = [];

    // Helper: distribute positions with higher density near corners and edges
    const getDistributedPosition = (idx: number, total: number) => {
      // 70% of leaves are seeded in the periphery (top, bottom, left, right borders)
      const isPeriphery = idx < total * 0.75;
      let x: number, y: number;

      if (isPeriphery) {
        const edge = idx % 4;
        if (edge === 0) {
          // Top edge & corners
          x = Math.random() * width;
          y = Math.random() * (height * 0.3);
        } else if (edge === 1) {
          // Bottom edge & corners
          x = Math.random() * width;
          y = height * 0.7 + Math.random() * (height * 0.3);
        } else if (edge === 2) {
          // Left edge
          x = Math.random() * (width * 0.32);
          y = Math.random() * height;
        } else {
          // Right edge
          x = width * 0.68 + Math.random() * (width * 0.32);
          y = Math.random() * height;
        }
      } else {
        // Outer mid-area (gently dispersed, avoiding immediate center card)
        x = Math.random() * width;
        y = Math.random() * height;
        // If it lands in the center zone, push it slightly outward
        const centerX = width * 0.65;
        const centerY = height * 0.5;
        const dist = Math.hypot(x - centerX, y - centerY);
        if (dist < 180) {
          x += (x > centerX ? 150 : -150);
        }
      }

      return { x, y };
    };

    const leafTypes: Array<'wheat' | 'crop' | 'olive' | 'herbal' | 'grain'> = [
      'wheat',
      'crop',
      'olive',
      'herbal',
      'grain',
    ];

    for (let i = 0; i < leafCount; i++) {
      const { x, y } = getDistributedPosition(i, leafCount);
      const colorPair = LEAF_COLORS[i % LEAF_COLORS.length];
      const type = leafTypes[i % leafTypes.length];

      // Depth layer assignment:
      // ~45% background (small, blurred, low opacity)
      // ~45% midground (medium, crisp)
      // ~10% foreground (large, edge passing, soft blur)
      let layer: 'bg' | 'mid' | 'fg';
      let depth: number;
      let size: number;
      let baseOpacity: number;

      if (i < leafCount * 0.45) {
        layer = 'bg';
        depth = 0.35 + Math.random() * 0.25;
        size = 14 + Math.random() * 12;
        baseOpacity = 0.22 + Math.random() * 0.2;
      } else if (i < leafCount * 0.9) {
        layer = 'mid';
        depth = 0.7 + Math.random() * 0.3;
        size = 24 + Math.random() * 16;
        baseOpacity = 0.55 + Math.random() * 0.3;
      } else {
        layer = 'fg';
        depth = 1.15 + Math.random() * 0.25;
        size = 46 + Math.random() * 22;
        baseOpacity = 0.45 + Math.random() * 0.3;
      }

      // Drift velocities: gently moving with warm ambient breeze
      // Mostly drifting left-to-right or top-to-bottom with gentle variance
      const speedFactor = depth * 0.45;
      const vx = (0.2 + Math.random() * 0.4) * speedFactor * (i % 5 === 0 ? -0.8 : 1);
      const vy = (0.15 + Math.random() * 0.35) * speedFactor;

      leaves.push({
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        size,
        type,
        color: colorPair.main,
        veinColor: colorPair.vein,
        depth,
        opacity: baseOpacity,
        baseOpacity,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008 * depth,
        vx,
        vy,
        waveFrequency: 0.0008 + Math.random() * 0.0012,
        waveAmplitude: 15 + Math.random() * 25,
        flutterSpeed: 0.0015 + Math.random() * 0.002,
        flutterPhase: Math.random() * Math.PI * 2,
        layer,
      });
    }

    // Drawing functions for distinctive botanical leaf silhouettes
    const drawLeafShape = (
      c: CanvasRenderingContext2D,
      type: LeafParticle['type'],
      size: number,
      flutterScale: number
    ) => {
      c.scale(flutterScale, 1); // 3D flutter/tilting effect in breeze
      c.beginPath();

      if (type === 'wheat') {
        // Slender wheat grass blade with arched tip
        c.moveTo(0, -size);
        c.bezierCurveTo(size * 0.22, -size * 0.4, size * 0.28, size * 0.3, 0, size);
        c.bezierCurveTo(-size * 0.28, size * 0.3, -size * 0.22, -size * 0.4, 0, -size);
      } else if (type === 'crop') {
        // Ovate crop / seedling leaf
        c.moveTo(0, -size);
        c.bezierCurveTo(size * 0.5, -size * 0.6, size * 0.55, size * 0.4, 0, size);
        c.bezierCurveTo(-size * 0.55, size * 0.4, -size * 0.5, -size * 0.6, 0, -size);
      } else if (type === 'olive') {
        // Lanceolate olive leaf
        c.moveTo(0, -size * 0.95);
        c.bezierCurveTo(size * 0.38, -size * 0.3, size * 0.38, size * 0.4, 0, size * 0.95);
        c.bezierCurveTo(-size * 0.38, size * 0.4, -size * 0.38, -size * 0.3, 0, -size * 0.95);
      } else if (type === 'herbal') {
        // Herbal leaf with subtle scallop contour
        c.moveTo(0, -size * 0.9);
        c.bezierCurveTo(size * 0.48, -size * 0.4, size * 0.42, size * 0.2, 0, size * 0.9);
        c.bezierCurveTo(-size * 0.42, size * 0.2, -size * 0.48, -size * 0.4, 0, -size * 0.9);
      } else {
        // Golden grain / droplet leaf
        c.moveTo(0, -size * 0.85);
        c.bezierCurveTo(size * 0.4, -size * 0.2, size * 0.35, size * 0.5, 0, size * 0.85);
        c.bezierCurveTo(-size * 0.35, size * 0.5, -size * 0.4, -size * 0.2, 0, -size * 0.85);
      }

      c.closePath();
    };

    // Draw central vein and fine rib structure
    const drawLeafVeins = (
      c: CanvasRenderingContext2D,
      type: LeafParticle['type'],
      size: number,
      veinColor: string
    ) => {
      c.strokeStyle = veinColor;
      c.lineWidth = Math.max(0.6, size * 0.04);
      c.beginPath();

      // Central stem vein
      c.moveTo(0, -size * 0.85);
      c.lineTo(0, size * 0.9);
      c.stroke();

      // Delicate lateral veins for crop and herbal types
      if (type === 'crop' || type === 'herbal' || type === 'olive') {
        c.lineWidth = Math.max(0.4, size * 0.025);
        const steps = 3;
        for (let s = 1; s <= steps; s++) {
          const yPos = -size * 0.5 + (s * size * 0.35);
          const xSpan = size * (0.2 + (s === 2 ? 0.12 : 0.05));
          c.beginPath();
          c.moveTo(0, yPos);
          c.quadraticCurveTo(xSpan * 0.5, yPos - size * 0.1, xSpan, yPos - size * 0.05);
          c.moveTo(0, yPos);
          c.quadraticCurveTo(-xSpan * 0.5, yPos - size * 0.1, -xSpan, yPos - size * 0.05);
          c.stroke();
        }
      }
    };

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = time - startTime;

      // Clear with transparent context (HTML canvas sits on top of cream background)
      ctx.clearRect(0, 0, width, height);

      // Sort leaves by depth for proper layer ordering
      leaves.sort((a, b) => a.depth - b.depth);

      // Center repulsion / gentle transparency falloff zone:
      // The hero has content on left and central arch card on right
      // Primary card zone: ~55% to 85% width, ~25% to 75% height
      const centerCardX = width > 1024 ? width * 0.72 : width * 0.5;
      const centerCardY = height * 0.48;
      const safeRadiusX = width > 1024 ? 220 : 180;
      const safeRadiusY = 240;

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        if (!prefersReduced) {
          // Update physics
          leaf.x += leaf.vx + Math.sin(elapsed * leaf.waveFrequency + leaf.id) * 0.3;
          leaf.y += leaf.vy + Math.cos(elapsed * leaf.waveFrequency * 0.8 + leaf.id) * 0.25;
          leaf.rotation += leaf.rotationSpeed;

          // Wrap around seamlessly
          const margin = leaf.size * 2 + 40;
          if (leaf.x > width + margin) {
            leaf.x = -margin;
            leaf.y = Math.random() * height;
          } else if (leaf.x < -margin) {
            leaf.x = width + margin;
            leaf.y = Math.random() * height;
          }

          if (leaf.y > height + margin) {
            leaf.y = -margin;
            leaf.x = Math.random() * width;
          } else if (leaf.y < -margin) {
            leaf.y = height + margin;
            leaf.x = Math.random() * width;
          }
        }

        // Calculate distance to center card to ensure center content stays pristine
        const dx = (leaf.x - centerCardX) / safeRadiusX;
        const dy = (leaf.y - centerCardY) / safeRadiusY;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

        // Soften opacity if drifting near the central video/card area
        let renderOpacity = leaf.baseOpacity;
        if (distFromCenter < 1.0) {
          // Subtly reduce opacity to keep center ultra clear as requested
          renderOpacity *= Math.max(0.12, distFromCenter * 0.85);
        }

        // Flutter scale: creates 3D rotation flip in gentle wind
        const flutter = Math.cos(elapsed * leaf.flutterSpeed + leaf.flutterPhase);
        const flutterScale = 0.35 + 0.65 * Math.abs(flutter);

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);

        // Apply depth blur/shadow styling
        if (leaf.layer === 'bg') {
          ctx.filter = 'blur(1px)';
        } else if (leaf.layer === 'fg') {
          ctx.filter = 'blur(1.5px)';
          ctx.shadowColor = 'rgba(23, 77, 53, 0.08)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 4;
        } else {
          ctx.filter = 'none';
          ctx.shadowColor = 'rgba(23, 77, 53, 0.04)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetY = 2;
        }

        ctx.globalAlpha = renderOpacity;

        // Draw leaf body
        drawLeafShape(ctx, leaf.type, leaf.size, flutterScale);
        ctx.fillStyle = leaf.color;
        ctx.fill();

        // Draw leaf veins
        drawLeafVeins(ctx, leaf.type, leaf.size, leaf.veinColor);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Warm natural paper-like canvas background with subtle organic grain texture */}
      <div className="absolute inset-0 bg-[#FAFAF5] -z-20" />

      {/* Subtle diffused daylight vignette */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.7) 0%, rgba(246, 245, 238, 0.4) 60%, rgba(239, 237, 226, 0.7) 100%)',
        }}
      />

      {/* High-DPI Ambient Canvas with 35-42 floating botanical leaves */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};
