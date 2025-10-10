export const audioConfig = {
  sections: {
    hero: {
      track: '/assets/audio/intro_ambient.mp3',
      volume: 0.6,
    },
    why: {
      track: '/assets/audio/mystic_theme.mp3',
      volume: 0.5,
    },
    how: {
      track: '/assets/audio/pulse_energy.mp3',
      volume: 0.5,
    },
    features: {
      track: '/assets/audio/intro_ambient.mp3',
      volume: 0.4,
    },
    prices: {
      track: '/assets/audio/mystic_theme.mp3',
      volume: 0.5,
    },
    testimonials: {
      track: '/assets/audio/pulse_energy.mp3',
      volume: 0.5,
    },
  },
  sfx: {
    hover: '/assets/audio/hover_sfx.wav',
    click: '/assets/audio/click_sfx.wav',
  },
  fadeDuration: 800,
};

export type SectionKey = keyof typeof audioConfig.sections;
