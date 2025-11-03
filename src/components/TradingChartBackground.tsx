import { useEffect, useRef } from 'react';

const TradingChartBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mobile detection
    const isMobile = window.innerWidth < 768;
    
    // Pause animation when tab is hidden to save resources
    let isAnimating = true;
    const handleVisibilityChange = () => {
      isAnimating = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Trading floor grid
    const gridOffset = { x: 0, y: 0 };
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.lineWidth = 1;
      
      const gridSize = isMobile ? 40 : 60;
      
      // Vertical lines
      for (let x = gridOffset.x % gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = gridOffset.y % gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Data streams (ticker-like moving text)
    interface DataStream {
      y: number;
      speed: number;
      data: Array<{ text: string; color: string; x: number }>;
    }
    
    const streams: DataStream[] = [];
    const symbols = ['BTC', 'ETH', 'SOL', 'USDT', 'BNB', 'XRP', 'ADA', 'DOGE', 'MATIC', 'DOT'];
    
    // Initialize data streams
    for (let i = 0; i < (isMobile ? 3 : 5); i++) {
      const streamData = [];
      for (let j = 0; j < 8; j++) {
        const isPositive = Math.random() > 0.5;
        const change = (Math.random() * 10).toFixed(2);
        streamData.push({
          text: `${symbols[Math.floor(Math.random() * symbols.length)]} ${isPositive ? '+' : '-'}${change}%`,
          color: isPositive ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)',
          x: j * 250
        });
      }
      streams.push({
        y: (canvas.height / (isMobile ? 4 : 6)) * (i + 1),
        speed: 0.3 + Math.random() * 0.4,
        data: streamData
      });
    }

    // Candlestick data
    const numCandles = isMobile ? 50 : 100;
    const candleWidth = canvas.width / numCandles;
    let candleData: Array<{ x: number; open: number; close: number; high: number; low: number }> = [];
    
    let basePrice = canvas.height * 0.6;
    const generateCandle = (index: number) => {
      const volatility = isMobile ? 20 : 30;
      const trend = Math.sin(index * 0.1) * 10;
      const open = basePrice + (Math.random() - 0.5) * volatility;
      const close = open + (Math.random() - 0.5) * volatility + trend;
      const high = Math.max(open, close) + Math.random() * volatility / 2;
      const low = Math.min(open, close) - Math.random() * volatility / 2;
      
      basePrice = close;
      return { x: index * candleWidth, open, close, high, low };
    };

    for (let i = 0; i < numCandles; i++) {
      candleData.push(generateCandle(i));
    }

    // Glowing particles - reduced count for performance
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }
    
    const particles: Particle[] = [];
    const particleCount = isMobile ? 8 : 15; // Reduced from 15/30
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '6, 182, 212' : '139, 92, 246'
      });
    }

    let animationOffset = 0;
    let candleIndex = numCandles;
    let frame = 0;
    let animationId: number;
    
    const animate = () => {
      if (!ctx || !canvas || !isAnimating) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      frame++;
      
      // Clear canvas with gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      bgGradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.95)');
      bgGradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate grid - reduced speed for performance
      gridOffset.x -= 0.1; // Reduced from 0.2
      gridOffset.y -= 0.05; // Reduced from 0.1
      drawGrid();

      // Draw and animate particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Pulse effect
        const pulse = Math.sin(frame * 0.02 + particle.x) * 0.3 + 0.7;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity * pulse})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw data streams
      streams.forEach((stream) => {
        ctx.font = isMobile ? '10px monospace' : '12px monospace';
        ctx.textAlign = 'left';
        
        stream.data.forEach((item) => {
          item.x -= stream.speed;
          
          // Reset position when off screen
          if (item.x < -200) {
            item.x = canvas.width;
            const isPositive = Math.random() > 0.5;
            const change = (Math.random() * 10).toFixed(2);
            item.text = `${symbols[Math.floor(Math.random() * symbols.length)]} ${isPositive ? '+' : '-'}${change}%`;
            item.color = isPositive ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)';
          }
          
          ctx.fillStyle = item.color;
          ctx.fillText(item.text, item.x, stream.y);
        });
      });

      // Animate candlesticks - reduced speed for performance
      animationOffset += 0.4; // Reduced from 0.8
      if (animationOffset >= candleWidth) {
        animationOffset = 0;
        
        const lastCandle = candleData[candleData.length - 1];
        const volatility = isMobile ? 20 : 30;
        const trend = Math.sin(candleIndex * 0.1) * 10;
        const open = lastCandle.close;
        const close = open + (Math.random() - 0.5) * volatility + trend;
        const high = Math.max(open, close) + Math.random() * volatility / 2;
        const low = Math.min(open, close) - Math.random() * volatility / 2;
        
        candleData.push({ x: candleData.length * candleWidth, open, close, high, low });
        candleIndex++;
        candleData.shift();
        
        candleData.forEach((candle, i) => {
          candle.x = i * candleWidth;
        });
      }

      // Draw candlesticks with glow
      candleData.forEach((candle) => {
        const x = candle.x - animationOffset;
        const isGreen = candle.close < candle.open;
        
        // Glow effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = isGreen ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)';
        
        // Draw high-low line
        ctx.strokeStyle = isGreen ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = isMobile ? 0.5 : 1;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, candle.high);
        ctx.lineTo(x + candleWidth / 2, candle.low);
        ctx.stroke();
        
        // Draw candle body
        ctx.fillStyle = isGreen ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)';
        ctx.strokeStyle = isGreen ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)';
        ctx.lineWidth = isMobile ? 1 : 1.5;
        
        const bodyTop = Math.min(candle.open, candle.close);
        const bodyHeight = Math.abs(candle.close - candle.open);
        
        ctx.fillRect(x + 2, bodyTop, candleWidth - 4, bodyHeight);
        ctx.strokeRect(x + 2, bodyTop, candleWidth - 4, bodyHeight);
        
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(15, 23, 42) 100%)',
        opacity: 0.5
      }}
    />
  );
};

export default TradingChartBackground;
