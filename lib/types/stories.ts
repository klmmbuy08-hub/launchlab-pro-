export type StoryBackgroundType = 'solid' | 'gradient' | 'image';

export interface StoryBackground {
  type: StoryBackgroundType;
  value: string;
}

export type StickerType = 'poll' | 'question' | 'quiz' | 'countdown';

export interface StorySticker {
  type: StickerType;
  question: string;
  options?: string[]; // For poll/quiz
  targetDate?: string; // For countdown
}

export interface StoryContent {
  id: string;
  background: StoryBackground;
  text: {
    content: string;
    position: 'top' | 'center' | 'bottom';
    style: 'modern' | 'classic' | 'neon' | 'minimal';
  };
  sticker?: StorySticker;
  overlayImage?: string;
}

export interface StoryTemplate {
  id: string;
  name: string;
  category: 'engagement' | 'sales' | 'educational' | 'behind-the-scenes';
  preview: string;
  baseContent: Partial<StoryContent>;
}
