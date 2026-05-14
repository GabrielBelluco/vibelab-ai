import { motion } from 'framer-motion';
import { Brain, MousePointer2, Sparkles } from 'lucide-react';
import type { Mood } from '../types';

type CreatureStageProps = {
  mood: Mood;
  pointer: { x: number; y: number };
};

const moodLabel: Record<Mood, string> = {
  idle: 'online',
  typing: 'captando',
  thinking: 'sintetizando',
  success: 'pronto',
};

export function CreatureStage({ mood, pointer }: CreatureStageProps) {
  const eyeX = Math.max(-7, Math.min(7, pointer.x / 34));
  const eyeY = Math.max(-5, Math.min(5, pointer.y / 48));

  return (
    <section className="creature-stage" aria-label="Mascote interativo">
      <div className="stage-grid" />
      <motion.div
        className={`creature-shell creature-${mood}`}
        animate={{
          y: mood === 'thinking' ? [0, -12, 0] : [0, -7, 0],
          rotate: mood === 'success' ? [0, -2, 2, 0] : 0,
        }}
        transition={{ duration: mood === 'thinking' ? 1.1 : 2.6, repeat: Infinity }}
      >
        <div className="antenna">
          <span />
        </div>
        <div className="creature-head">
          <div className="eye eye-left" style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }} />
          <div className="eye eye-right" style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }} />
          <div className="mouth" />
          <div className="cheek cheek-left" />
          <div className="cheek cheek-right" />
        </div>
        <div className="creature-body">
          <div className="core">
            {mood === 'thinking' ? <Brain size={34} /> : <Sparkles size={34} />}
          </div>
        </div>
        <div className="creature-shadow" />
      </motion.div>

      <div className="signal-panel">
        <span className="signal-dot" />
        <strong>{moodLabel[mood]}</strong>
        <MousePointer2 size={16} />
      </div>
    </section>
  );
}
