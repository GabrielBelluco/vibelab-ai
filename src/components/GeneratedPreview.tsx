import { Copy, Layers3, Palette, WandSparkles } from 'lucide-react';
import type { Blueprint } from '../types';

type GeneratedPreviewProps = {
  blueprint: Blueprint;
};

export function GeneratedPreview({ blueprint }: GeneratedPreviewProps) {
  return (
    <section className="preview-area" aria-label="Preview gerado">
      <div className="preview-hero">
        <div className="preview-copy">
          <span className="kicker">conceito ativo</span>
          <h2>{blueprint.headline}</h2>
          <p>{blueprint.subheadline}</p>
        </div>
        <button className="icon-button" aria-label="Copiar conceito">
          <Copy size={20} />
        </button>
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
            <span>Tom</span>
          </div>
          <p>{blueprint.tone}</p>
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
