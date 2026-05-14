import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Send, Sparkles, WandSparkles } from 'lucide-react';
import { CreatureStage } from './components/CreatureStage';
import { GeneratedPreview } from './components/GeneratedPreview';
import { generateBlueprint } from './lib/generateBlueprint';
import type { Mood, VisualStyle } from './types';

const styles: Array<{ id: VisualStyle; label: string }> = [
  { id: 'premium', label: 'Premium' },
  { id: 'cyber', label: 'Cyber' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'playful', label: 'Playful' },
];

function App() {
  const [prompt, setPrompt] = useState('Landing page para uma cafeteria futurista em Sao Paulo');
  const [style, setStyle] = useState<VisualStyle>('cyber');
  const [mood, setMood] = useState<Mood>('idle');
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [generation, setGeneration] = useState(0);

  const blueprint = useMemo(
    () => generateBlueprint(prompt, style, generation),
    [prompt, style, generation],
  );

  function handlePromptChange(value: string) {
    setPrompt(value);
    setMood(value.length > 0 ? 'typing' : 'idle');
  }

  function handleGenerate() {
    setMood('thinking');
    window.setTimeout(() => {
      setGeneration((current) => current + 1);
      setMood('success');
    }, 850);
  }

  return (
    <main
      className="app-shell"
      onPointerMove={(event) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setPointer({ x: event.clientX - centerX, y: event.clientY - centerY });
      }}
    >
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="topbar" aria-label="Navegacao principal">
        <a className="brand" href="/">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span>VibeLab AI</span>
        </a>
        <div className="topbar-actions">
          <span className="status-pill">Prototype 0.1</span>
          <button className="icon-button" aria-label="Regenerar" onClick={handleGenerate}>
            <RefreshCw size={19} />
          </button>
        </div>
      </nav>

      <section className="workspace">
        <motion.div
          className="prompt-panel"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="panel-label">
            <WandSparkles size={18} />
            <span>Prompt visual</span>
          </div>
          <h1>Crie uma direcao visual com personalidade.</h1>
          <textarea
            value={prompt}
            onChange={(event) => handlePromptChange(event.target.value)}
            onFocus={() => setMood('typing')}
            onBlur={() => setMood('idle')}
            rows={5}
            aria-label="Prompt para gerar conceito visual"
          />

          <div className="style-row" aria-label="Estilo visual">
            {styles.map((option) => (
              <button
                key={option.id}
                className={option.id === style ? 'style-chip active' : 'style-chip'}
                onClick={() => setStyle(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button className="generate-button" onClick={handleGenerate}>
            <Send size={20} />
            <span>Gerar conceito</span>
          </button>
        </motion.div>

        <CreatureStage mood={mood} pointer={pointer} style={style} />
      </section>

      <GeneratedPreview blueprint={blueprint} />
    </main>
  );
}

export default App;
