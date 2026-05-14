import { useEffect, useRef } from 'react';
import type { VisualStyle } from '../types';

type AnimatedBackdropProps = {
  style: VisualStyle;
};

const themeColors: Record<VisualStyle, string[]> = {
  premium: ['#d7ff4f', '#ff6b4a', '#f2eee8'],
  cyber: ['#27f5d4', '#ff4fd8', '#c7ff3d'],
  minimal: ['#2f80ed', '#f2994a', '#f7f4ee'],
  playful: ['#ffe66d', '#4ecdc4', '#ff6b6b'],
};

const density: Record<VisualStyle, number> = {
  premium: 34,
  cyber: 56,
  minimal: 24,
  playful: 44,
};

export function AnimatedBackdrop({ style }: AnimatedBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (currentCanvas === null) {
      return undefined;
    }
    const canvasElement: HTMLCanvasElement = currentCanvas;

    const currentContext = canvasElement.getContext('2d');
    if (currentContext === null) {
      return undefined;
    }
    const context2d: CanvasRenderingContext2D = currentContext;

    const colors = themeColors[style];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvasElement.clientWidth;
      height = canvasElement.clientHeight;
      canvasElement.width = width * ratio;
      canvasElement.height = height * ratio;
      context2d.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = createParticles(width, height, density[style], colors);
    }

    function draw(time: number) {
      context2d.clearRect(0, 0, width, height);
      context2d.globalCompositeOperation = style === 'minimal' ? 'source-over' : 'lighter';

      particles.forEach((particle, index) => {
        const drift = time * particle.speed;
        const wave = Math.sin(drift + particle.phase);
        const x = wrap(particle.x + wave * particle.range + drift * particle.direction, width);
        const y = wrap(particle.y + Math.cos(drift * 0.8 + particle.phase) * particle.range, height);

        context2d.beginPath();
        context2d.fillStyle = particle.color;
        context2d.globalAlpha = particle.alpha;
        context2d.arc(x, y, particle.size, 0, Math.PI * 2);
        context2d.fill();

        if (style === 'cyber' && index % 3 === 0) {
          context2d.beginPath();
          context2d.strokeStyle = particle.color;
          context2d.globalAlpha = particle.alpha * 0.45;
          context2d.moveTo(x, y);
          context2d.lineTo(x + 74 * particle.direction, y + wave * 24);
          context2d.stroke();
        }

        if (style === 'playful' && index % 4 === 0) {
          context2d.save();
          context2d.translate(x, y);
          context2d.rotate(wave);
          context2d.fillRect(-particle.size, -particle.size, particle.size * 2.4, particle.size * 2.4);
          context2d.restore();
        }
      });

      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [style]);

  return <canvas ref={canvasRef} className="animated-backdrop" aria-hidden="true" />;
}

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  range: number;
  phase: number;
  alpha: number;
  color: string;
  direction: number;
};

function createParticles(width: number, height: number, count: number, colors: string[]): Particle[] {
  return Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 1.4 + Math.random() * (index % 5 === 0 ? 4 : 2.2),
    speed: 0.00008 + Math.random() * 0.00022,
    range: 12 + Math.random() * 58,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.18 + Math.random() * 0.34,
    color: colors[index % colors.length],
    direction: Math.random() > 0.5 ? 1 : -1,
  }));
}

function wrap(value: number, max: number) {
  if (value < -20) {
    return max + 20;
  }

  if (value > max + 20) {
    return -20;
  }

  return value;
}
