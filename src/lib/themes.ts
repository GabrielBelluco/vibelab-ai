import type { VisualStyle } from '../types';

export type ThemeProfile = {
  id: VisualStyle;
  label: string;
  mascot: string;
  headline: string;
  description: string;
  cue: string;
  prompt: string;
  previewName: string;
  previewCategory: string;
  previewCta: string;
  effects: string[];
  metrics: Array<{ label: string; value: string }>;
};

export const themeProfiles: Record<VisualStyle, ThemeProfile> = {
  premium: {
    id: 'premium',
    label: 'Premium',
    mascot: 'atelier bot',
    headline: 'Monte uma pagina com acabamento de estudio.',
    description: 'Contraste alto, espaco generoso e ritmo editorial para marcas com presenca forte.',
    cue: 'editorial system',
    prompt: 'Landing page para uma marca de cafe especial com experiencia premium',
    previewName: 'Atelier North',
    previewCategory: 'brand experience',
    previewCta: 'Explorar colecao',
    effects: ['Spotlight quente', 'Cards editorial', 'Glow sutil'],
    metrics: [
      { label: 'contraste', value: '92%' },
      { label: 'ritmo', value: '4 blocos' },
      { label: 'tom', value: 'premium' },
    ],
  },
  cyber: {
    id: 'cyber',
    label: 'Cyber',
    mascot: 'ninja cyber',
    headline: 'Crie interfaces com energia de laboratorio futurista.',
    description: 'Neon, grid tecnico e movimento reativo para produtos digitais mais experimentais.',
    cue: 'neon engine',
    prompt: 'Landing page para uma cafeteria futurista em Sao Paulo',
    previewName: 'Neon Brew',
    previewCategory: 'future retail',
    previewCta: 'Iniciar scan',
    effects: ['Grid vivo', 'Linhas neon', 'Cursor trail'],
    metrics: [
      { label: 'energia', value: '98%' },
      { label: 'layers', value: '7' },
      { label: 'tom', value: 'cyber' },
    ],
  },
  minimal: {
    id: 'minimal',
    label: 'Minimal',
    mascot: 'mono guide',
    headline: 'Desenhe uma pagina clara, util e muito escaneavel.',
    description: 'Hierarquia limpa, componentes discretos e foco total na mensagem principal.',
    cue: 'quiet layout',
    prompt: 'Site para um app de produtividade minimalista para equipes pequenas',
    previewName: 'Calm Stack',
    previewCategory: 'productivity',
    previewCta: 'Ver fluxo',
    effects: ['Linhas finas', 'Micro sombras', 'Transicoes secas'],
    metrics: [
      { label: 'clareza', value: '96%' },
      { label: 'ruido', value: 'baixo' },
      { label: 'tom', value: 'minimal' },
    ],
  },
  playful: {
    id: 'playful',
    label: 'Playful',
    mascot: 'spark buddy',
    headline: 'Gere paginas expressivas, coloridas e cheias de vida.',
    description: 'Formas soltas, contraste alegre e microinteracoes para experiencias mais leves.',
    cue: 'motion playground',
    prompt: 'Pagina para uma escola criativa de tecnologia para criancas',
    previewName: 'Spark Club',
    previewCategory: 'creative learning',
    previewCta: 'Entrar no clube',
    effects: ['Confete leve', 'Blocos coloridos', 'Entrada elastica'],
    metrics: [
      { label: 'diversao', value: '100%' },
      { label: 'cores', value: '4 tons' },
      { label: 'tom', value: 'playful' },
    ],
  },
};

export const styleOptions = Object.values(themeProfiles);
