export type Mood = 'idle' | 'typing' | 'thinking' | 'success';

export type VisualStyle = 'premium' | 'cyber' | 'minimal' | 'playful';

export type Blueprint = {
  headline: string;
  subheadline: string;
  palette: string[];
  sections: string[];
  components: string[];
  tone: string;
};
