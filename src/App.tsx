import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Send, Sparkles, WandSparkles } from 'lucide-react';
import { AnimatedBackdrop } from './components/AnimatedBackdrop';
import { CreatureStage } from './components/CreatureStage';
import { GeneratedPreview } from './components/GeneratedPreview';
import { generateBlueprint } from './lib/generateBlueprint';
import { styleOptions, themeProfiles } from './lib/themes';
import type { Mood, VisualStyle } from './types';

function App() {
  const [prompt, setPrompt] = useState(themeProfiles.cyber.prompt);
  const [style, setStyle] = useState<VisualStyle>('cyber');
  const [mood, setMood] = useState<Mood>('idle');
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [generation, setGeneration] = useState(0);
  const theme = themeProfiles[style];

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

  function handleStyleChange(nextStyle: VisualStyle) {
    setStyle(nextStyle);
    setMood('success');
  }

  return (
    <main
      className={`app-shell theme-${style}`}
      onPointerMove={(event) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setPointer({ x: event.clientX - centerX, y: event.clientY - centerY });
      }}
    >
      <AnimatedBackdrop style={style} />
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
          <span className="status-pill">{theme.cue}</span>
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
          <h1>{theme.headline}</h1>
          <p className="prompt-description">{theme.description}</p>
          <textarea
            value={prompt}
            onChange={(event) => handlePromptChange(event.target.value)}
            onFocus={() => setMood('typing')}
            onBlur={() => setMood('idle')}
            rows={5}
            aria-label="Prompt para gerar conceito visual"
          />

          <div className="style-row" aria-label="Estilo visual">
            {styleOptions.map((option) => (
              <button
                key={option.id}
                className={option.id === style ? 'style-chip active' : 'style-chip'}
                onClick={() => handleStyleChange(option.id)}
              >
                <span className={`chip-swatch swatch-${option.id}`} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          <div className="theme-metrics" aria-label="Resumo do tema">
            {theme.metrics.map((metric) => (
              <span key={metric.label}>
                <strong>{metric.value}</strong>
                {metric.label}
              </span>
            ))}
          </div>

          <button className="generate-button" onClick={handleGenerate}>
            <Send size={20} />
            <span>Gerar conceito</span>
          </button>
        </motion.div>

        <CreatureStage mood={mood} pointer={pointer} style={style} />
      </section>

      <GeneratedPreview blueprint={blueprint} theme={theme} visualStyle={style} />
    </main>
  );
}

export default App;
