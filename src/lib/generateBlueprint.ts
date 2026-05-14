import type { Blueprint, VisualStyle } from '../types';
import { themeProfiles } from './themes';

const styleTone: Record<VisualStyle, string> = {
  premium: 'editorial, sofisticado e com contraste alto',
  cyber: 'futurista, luminoso e experimental',
  minimal: 'limpo, silencioso e muito escaneavel',
  playful: 'expressivo, colorido e com microinteracoes',
};

const palettes: Record<VisualStyle, string[]> = {
  premium: ['#0D0D0D', '#F2EEE8', '#D7FF4F', '#FF6B4A'],
  cyber: ['#090A12', '#27F5D4', '#C7FF3D', '#FF4FD8'],
  minimal: ['#111111', '#F7F4EE', '#2F80ED', '#F2994A'],
  playful: ['#151515', '#FFE66D', '#4ECDC4', '#FF6B6B'],
};

const fallbackSubject = 'uma experiencia digital';

const sectionVariants = [
  ['Hero interativo', 'Prova visual', 'Fluxo guiado', 'Chamada final'],
  ['Entrada cinematica', 'Oferta principal', 'Exploracao de estilo', 'Conversao'],
  ['Cena inicial', 'Beneficios escaneaveis', 'Preview vivo', 'Acao rapida'],
];

const componentVariants = [
  ['Mascote reativo', 'Cards de conceito', 'Preview vivo', 'Controles de vibe'],
  ['Prompt composer', 'Swatches animados', 'Timeline de ideias', 'Painel de ajustes'],
  ['Avatar Rive', 'Gerador de copy', 'Modo comparativo', 'Export card'],
];

export function generateBlueprint(prompt: string, style: VisualStyle, iteration = 0): Blueprint {
  const subject = prompt.trim() || fallbackSubject;
  const compactSubject = subject.replace(/\s+/g, ' ').slice(0, 74);
  const variant = iteration % sectionVariants.length;
  const theme = themeProfiles[style];

  return {
    headline: `Transforme ${compactSubject} em uma interface memoravel`,
    subheadline:
      'Uma direcao visual com ritmo, contraste e componentes prontos para evoluir com IA.',
    palette: palettes[style],
    tone: styleTone[style],
    sections: sectionVariants[variant],
    components: componentVariants[variant],
    visualDirection: theme.description,
    heroLabel: theme.previewCategory,
    cta: theme.previewCta,
  };
}
