import { useEffect, useRef } from 'react';

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const value = Number.parseInt(
    normalized.length === 3
      ? normalized
          .split('')
          .map((part) => part + part)
          .join('')
      : normalized,
    16,
  );

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

export default function GhostCursor({
  color = '#97becf',
  brightness = 2.9,
  edgeIntensity = 0,
  trailLength = 50,
  inertia = 0.74,
  grainIntensity = 0.04,
  bloomStrength = 0.1,
  bloomRadius = 2.85,
  bloomThreshold = 0.025,
  fadeDelayMs = 1000,
  fadeDurationMs = 1500,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return undefined;

    const rgb = hexToRgb(color);
    const points = Array.from({ length: trailLength }, () => ({
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      seeded: false,
    }));
    const cursor = {
      x: 0,
      y: 0,
      lastMoveAt: 0,
      visible: 0,
      seeded: false,
    };
    const follow = clamp(1 - inertia, 0.055, 0.38);
    let frameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = Math.max(rect?.width || window.innerWidth, 1);
      height = Math.max(rect?.height || window.innerHeight, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedTrail = (x, y) => {
      points.forEach((point) => {
        point.x = x;
        point.y = y;
        point.tx = x;
        point.ty = y;
        point.seeded = true;
      });
      cursor.seeded = true;
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      cursor.x = x;
      cursor.y = y;
      cursor.lastMoveAt = performance.now();
      if (!cursor.seeded) seedTrail(x, y);
    };

    const drawGlow = (x, y, radius, alpha) => {
      if (alpha <= bloomThreshold) return;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
      gradient.addColorStop(0.42, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.32})`);
      gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawGrain = (alpha) => {
      if (grainIntensity <= 0 || alpha <= 0.02) return;

      const count = Math.round(width * height * grainIntensity * 0.00008);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.06 * alpha})`;
      for (let index = 0; index < count; index += 1) {
        const point = points[Math.floor(Math.random() * points.length)];
        if (!point?.seeded) continue;
        const spread = 18 + Math.random() * 82;
        ctx.fillRect(point.x + (Math.random() - 0.5) * spread, point.y + (Math.random() - 0.5) * spread, 1, 1);
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      if (!cursor.seeded) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      const idleTime = time - cursor.lastMoveAt;
      const fadeProgress = clamp((idleTime - fadeDelayMs) / fadeDurationMs, 0, 1);
      const targetVisible = 1 - fadeProgress;
      cursor.visible = lerp(cursor.visible, targetVisible, 0.09);

      points[0].tx = cursor.x;
      points[0].ty = cursor.y;

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        const previous = index === 0 ? point : points[index - 1];
        point.tx = index === 0 ? cursor.x : previous.x;
        point.ty = index === 0 ? cursor.y : previous.y;
        const localFollow = follow * (1 - index / points.length) + 0.028;
        point.x = lerp(point.x, point.tx, localFollow);
        point.y = lerp(point.y, point.ty, localFollow);
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.25 * cursor.visible})`;
      ctx.shadowBlur = bloomRadius * (8 + bloomStrength * 46);

      for (let index = points.length - 1; index >= 0; index -= 1) {
        const point = points[index];
        const ratio = 1 - index / points.length;
        const alpha = cursor.visible * ratio * ratio * 0.34 * brightness;
        const radius = 6 + ratio * 28 * brightness;
        drawGlow(point.x, point.y, radius, alpha);

        if (edgeIntensity > 0) {
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${edgeIntensity * alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius * 0.36, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      drawGrain(cursor.visible);
      ctx.restore();
      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(frameId);
    };
  }, [
    bloomRadius,
    bloomStrength,
    bloomThreshold,
    brightness,
    color,
    edgeIntensity,
    fadeDelayMs,
    fadeDurationMs,
    grainIntensity,
    inertia,
    trailLength,
  ]);

  return <canvas className="ghost-cursor-canvas" ref={canvasRef} aria-hidden="true" />;
}
