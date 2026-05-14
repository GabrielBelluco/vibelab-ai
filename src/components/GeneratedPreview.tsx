import { motion } from 'framer-motion';
import { Copy, Layers3, Palette, WandSparkles } from 'lucide-react';
import type { ThemeProfile } from '../lib/themes';
import type { Blueprint, VisualStyle } from '../types';

type GeneratedPreviewProps = {
  blueprint: Blueprint;
  theme: ThemeProfile;
  visualStyle: VisualStyle;
};

export function GeneratedPreview({ blueprint, theme, visualStyle }: GeneratedPreviewProps) {
  return (
    <section className="preview-area" aria-label="Preview gerado">
      <motion.div
        key={visualStyle}
        className={`site-preview-shell generated-${visualStyle}`}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.42, ease: 'easeOut' }}
      >
        <div className="site-toolbar">
          <div className="browser-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span>{theme.previewName.toLowerCase().replace(/\s+/g, '-')}.studio</span>
          <button className="icon-button" aria-label="Copiar conceito">
            <Copy size={20} />
          </button>
        </div>

        <div className="generated-site">
          <div className="generated-nav">
            <strong>{theme.previewName}</strong>
            <div>
              <span>Work</span>
              <span>System</span>
              <span>Launch</span>
            </div>
          </div>

          <div className="generated-hero">
            <div className="generated-copy">
              <span className="kicker">{blueprint.heroLabel}</span>
              <h2>{blueprint.headline}</h2>
              <p>{blueprint.subheadline}</p>
              <div className="generated-actions">
                <button>{blueprint.cta}</button>
                <span>{blueprint.tone}</span>
              </div>
            </div>

            <div className="generated-art" aria-hidden="true">
              <span className="art-orbit orbit-one" />
              <span className="art-orbit orbit-two" />
              <span className="art-panel panel-one" />
              <span className="art-panel panel-two" />
              <span className="art-panel panel-three" />
            </div>
          </div>

          <div className="generated-sections">
            {blueprint.sections.map((section, index) => (
              <article key={section}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{section}</strong>
              </article>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="preview-hero">
        <div className="preview-copy">
          <span className="kicker">conceito ativo</span>
          <h2>{blueprint.headline}</h2>
          <p>{blueprint.visualDirection}</p>
        </div>
      </div>

      <div className="preview-grid">
        <article className="preview-card">
          <div className="card-heading">
            <Palette size={18} />
            <span>Paleta</span>
          </div>
          <div className="swatches">
            {blueprint.palette.map((color) => (
              <span key={color} className="swatch" style={{ backgroundColor: color }} title={color} />
            ))}
          </div>
        </article>

        <article className="preview-card">
          <div className="card-heading">
            <WandSparkles size={18} />
            <span>Efeitos</span>
          </div>
          <div className="tag-cloud">
            {theme.effects.map((effect) => (
              <span key={effect}>{effect}</span>
            ))}
          </div>
        </article>

        <article className="preview-card">
          <div className="card-heading">
            <Layers3 size={18} />
            <span>Seções</span>
          </div>
          <div className="tag-cloud">
            {blueprint.sections.map((section) => (
              <span key={section}>{section}</span>
            ))}
          </div>
        </article>

        <article className="preview-card">
          <div className="card-heading">
            <SparkLineIcon />
            <span>Componentes</span>
          </div>
          <div className="tag-cloud">
            {blueprint.components.map((component) => (
              <span key={component}>{component}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function SparkLineIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M2 12.5c2.2 0 2.2-7 4.4-7s2.2 7 4.4 7 2.2-7 4.4-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
