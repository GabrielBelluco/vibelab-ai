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

const generatedCopy: Record<VisualStyle, Pick<Blueprint, 'headline' | 'subheadline'>> = {
  premium: {
    headline: 'Uma presenca digital com acabamento de estudio',
    subheadline: 'Layout editorial, contraste forte e blocos preparados para uma marca premium.',
  },
  cyber: {
    headline: 'Uma experiencia futurista pronta para impressionar',
    subheadline: 'Grid neon, ritmo tecnico e secoes desenhadas para uma interface experimental.',
  },
  minimal: {
    headline: 'Uma pagina clara para explicar valor rapidamente',
    subheadline: 'Hierarquia limpa, poucos elementos e foco total na mensagem principal.',
  },
  playful: {
    headline: 'Uma interface expressiva com movimento e cor',
    subheadline: 'Componentes vivos, linguagem leve e uma estrutura pronta para encantar.',
  },
};

export function generateBlueprint(prompt: string, style: VisualStyle, iteration = 0): Blueprint {
  const subject = prompt.trim() || fallbackSubject;
  const compactSubject = subject.replace(/\s+/g, ' ').slice(0, 74);
  const variant = iteration % sectionVariants.length;
  const theme = themeProfiles[style];
  const copy = generatedCopy[style];

  return {
    headline: copy.headline,
    subheadline: copy.subheadline,
    palette: palettes[style],
    tone: styleTone[style],
    sections: sectionVariants[variant],
    components: componentVariants[variant],
    visualDirection: `${theme.description} Briefing base: ${compactSubject}.`,
    heroLabel: theme.previewCategory,
    cta: theme.previewCta,
  };
}
