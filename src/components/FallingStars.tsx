import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
}

const FallingStars = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 15; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 3 + 2, // 2-5 seconds
          delay: Math.random() * 5,
          size: Math.random() * 2 + 1, // 1-3px
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute top-0 w-px bg-white shooting-star"
          style={{
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: '80px',
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.delay}s`,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
            boxShadow: '0 0 6px 2px rgba(255,255,255,0.8)',
          }}
        />
      ))}
    </div>
  );
};

export default FallingStars;
