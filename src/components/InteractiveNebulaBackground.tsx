import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  originalX: number;
  originalY: number;
}

const InteractiveNebulaBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  const animationFrameRef = useRef<number>();

  // Initialize dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Create particles
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const particleCount = Math.floor((dimensions.width * dimensions.height) / 8000);
    const particles: Particle[] = [];

    const colors = [
      'rgba(59, 130, 246, ', // blue-500
      'rgba(96, 165, 250, ', // blue-400
      'rgba(147, 197, 253, ', // blue-300
      'rgba(255, 255, 255, ', // white
      'rgba(203, 213, 225, ', // slate-300
      'rgba(34, 211, 238, ', // cyan-400
    ];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const radius = Math.random() * 2.5 + 0.5;
      const opacity = Math.random() * 0.6 + 0.2;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius,
        opacity,
        color,
        originalX: x,
        originalY: y,
      });
    }

    particlesRef.current = particles;
  }, [dimensions]);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear with fade effect for trail
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      particlesRef.current.forEach((particle, index) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction - repel particles with physics
        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.8;
          particle.vy -= Math.sin(angle) * force * 0.8;
        }

        // Return to original position smoothly
        const returnForceX = (particle.originalX - particle.x) * 0.002;
        const returnForceY = (particle.originalY - particle.y) * 0.002;
        particle.vx += returnForceX;
        particle.vy += returnForceY;

        // Apply velocity with damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;

        // Draw particle with glow effect
        ctx.beginPath();
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 5
        );
        gradient.addColorStop(0, `${particle.color}${particle.opacity})`);
        gradient.addColorStop(0.4, `${particle.color}${particle.opacity * 0.4})`);
        gradient.addColorStop(1, `${particle.color}0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.radius * 5, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.fillStyle = `${particle.color}${Math.min(particle.opacity * 1.8, 1)})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <>
      {/* Black to Blue gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-blue-950/40 z-0" />
      
      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 z-[1]"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Animated foggy mist overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/2 right-1/4 w-[35rem] h-[35rem] bg-blue-600/8 rounded-full blur-[150px] animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/12 rounded-full blur-[100px] animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '4s' }} />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-blue-400/8 rounded-full blur-[90px] animate-pulse" 
             style={{ animationDuration: '14s', animationDelay: '1s' }} />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 z-[3] bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none" />
    </>
  );
};

export default InteractiveNebulaBackground;
