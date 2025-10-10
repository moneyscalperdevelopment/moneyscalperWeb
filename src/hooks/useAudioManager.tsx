import { useEffect, useRef, useState, useCallback } from 'react';
import { Howl } from 'howler';
import { audioConfig, SectionKey } from '@/utils/audioConfig';

export const useAudioManager = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const stored = localStorage.getItem('sound');
    return stored === 'off';
  });
  const [isStarted, setIsStarted] = useState(true); // Auto-start enabled
  const [currentSection, setCurrentSection] = useState<SectionKey>('hero');
  
  const currentTrack = useRef<Howl | null>(null);
  const nextTrack = useRef<Howl | null>(null);
  const ambientLoop = useRef<Howl | null>(null);
  const hoverSfx = useRef<Howl | null>(null);
  const clickSfx = useRef<Howl | null>(null);

  // Initialize ambient loop and SFX
  useEffect(() => {
    // Ambient loop (wind/hum layer)
    ambientLoop.current = new Howl({
      src: ['/assets/audio/intro_ambient.mp3'],
      loop: true,
      volume: 0.2,
      mute: isMuted,
    });

    // Sound effects
    hoverSfx.current = new Howl({
      src: [audioConfig.sfx.hover],
      volume: 0.3,
      mute: isMuted,
    });

    clickSfx.current = new Howl({
      src: [audioConfig.sfx.click],
      volume: 0.4,
      mute: isMuted,
    });

    // Auto-start audio on load
    const startAudio = async () => {
      try {
        // Start ambient loop
        ambientLoop.current?.play();
        
        // Start first track
        const config = audioConfig.sections.hero;
        currentTrack.current = new Howl({
          src: [config.track],
          loop: true,
          volume: 0,
          mute: isMuted,
        });
        currentTrack.current.play();
        currentTrack.current.fade(0, config.volume, audioConfig.fadeDuration);
      } catch (error) {
        console.log('Autoplay blocked by browser, waiting for user interaction');
      }
    };

    startAudio();

    // Fallback: unlock audio on first user interaction (autoplay policies)
    const onUserInteract = () => {
      try {
        if (ambientLoop.current && !ambientLoop.current.playing()) {
          ambientLoop.current.play();
        }
        if (!currentTrack.current) {
          const cfg = audioConfig.sections.hero;
          currentTrack.current = new Howl({ src: [cfg.track], loop: true, volume: 0, mute: isMuted });
          currentTrack.current.play();
          currentTrack.current.fade(0, cfg.volume, audioConfig.fadeDuration);
        } else if (!currentTrack.current.playing()) {
          currentTrack.current.play();
        }
      } catch {}
      window.removeEventListener('pointerdown', onUserInteract);
      window.removeEventListener('keydown', onUserInteract);
      window.removeEventListener('touchstart', onUserInteract);
      window.removeEventListener('scroll', onUserInteract, true);
    };

    window.addEventListener('pointerdown', onUserInteract, { once: true });
    window.addEventListener('keydown', onUserInteract, { once: true });
    window.addEventListener('touchstart', onUserInteract, { passive: true, once: true } as any);
    window.addEventListener('scroll', onUserInteract, { capture: true, once: true } as any);

    return () => {
      window.removeEventListener('pointerdown', onUserInteract);
      window.removeEventListener('keydown', onUserInteract);
      window.removeEventListener('touchstart', onUserInteract);
      window.removeEventListener('scroll', onUserInteract, true);
      ambientLoop.current?.unload();
      hoverSfx.current?.unload();
      clickSfx.current?.unload();
      currentTrack.current?.unload();
      nextTrack.current?.unload();
    };
  }, [isMuted]);

  // Update mute state for all tracks
  useEffect(() => {
    currentTrack.current?.mute(isMuted);
    nextTrack.current?.mute(isMuted);
    ambientLoop.current?.mute(isMuted);
    hoverSfx.current?.mute(isMuted);
    clickSfx.current?.mute(isMuted);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newValue = !prev;
      localStorage.setItem('sound', newValue ? 'off' : 'on');
      return newValue;
    });
  }, []);

  const startExperience = useCallback(() => {
    setIsStarted(true);
    // Start ambient loop
    ambientLoop.current?.play();
    
    // Start first track
    const config = audioConfig.sections[currentSection];
    currentTrack.current = new Howl({
      src: [config.track],
      loop: true,
      volume: 0,
      mute: isMuted,
    });
    currentTrack.current.play();
    currentTrack.current.fade(0, config.volume, audioConfig.fadeDuration);
  }, [currentSection, isMuted]);

  const changeSection = useCallback((section: SectionKey) => {
    if (!isStarted || section === currentSection) return;

    const config = audioConfig.sections[section];
    
    // Create next track
    nextTrack.current = new Howl({
      src: [config.track],
      loop: true,
      volume: 0,
      mute: isMuted,
    });

    // Crossfade
    if (currentTrack.current) {
      currentTrack.current.fade(
        currentTrack.current.volume(),
        0,
        audioConfig.fadeDuration
      );
      
      setTimeout(() => {
        currentTrack.current?.stop();
        currentTrack.current?.unload();
      }, audioConfig.fadeDuration);
    }

    nextTrack.current.play();
    nextTrack.current.fade(0, config.volume, audioConfig.fadeDuration);
    
    currentTrack.current = nextTrack.current;
    setCurrentSection(section);
  }, [isStarted, currentSection, isMuted]);

  const playHoverSfx = useCallback(() => {
    if (!isStarted || isMuted) return;
    hoverSfx.current?.play();
  }, [isStarted, isMuted]);

  const playClickSfx = useCallback(() => {
    if (!isStarted || isMuted) return;
    clickSfx.current?.play();
  }, [isStarted, isMuted]);

  return {
    isMuted,
    isStarted,
    currentSection,
    toggleMute,
    startExperience,
    changeSection,
    playHoverSfx,
    playClickSfx,
  };
};
