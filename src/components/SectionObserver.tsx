import { useEffect, useRef } from 'react';
import { SectionKey } from '@/utils/audioConfig';

interface SectionObserverProps {
  sectionId: SectionKey;
  onSectionEnter: (section: SectionKey) => void;
  children: React.ReactNode;
}

export const SectionObserver = ({ sectionId, onSectionEnter, children }: SectionObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            onSectionEnter(sectionId);
          }
        });
      },
      {
        threshold: [0.5],
        rootMargin: '-100px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, onSectionEnter]);

  return <div ref={ref}>{children}</div>;
};
