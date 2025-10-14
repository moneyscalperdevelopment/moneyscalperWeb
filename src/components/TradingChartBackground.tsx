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

    // Generate random candlestick data
    const numCandles = 100;
    const candleWidth = canvas.width / numCandles;
    let candleData: Array<{ x: number; open: number; close: number; high: number; low: number }> = [];
    
    // Generate initial candles with smoother price movement
    let basePrice = canvas.height * 0.6;
    const generateCandle = (index: number) => {
      const volatility = 30;
      const trend = Math.sin(index * 0.1) * 10; // Add wave pattern
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

    // Line chart data
    let linePoints: Array<{ x: number; y: number }> = candleData.map((candle) => ({
      x: candle.x + candleWidth / 2,
      y: (candle.open + candle.close) / 2
    }));

    // Triangular indicators
    let indicators: Array<{ x: number; y: number; direction: 'up' | 'down'; active: boolean }> = [];
    const generateIndicators = () => {
      indicators = [];
      for (let i = 10; i < candleData.length; i += 12) {
        if (Math.random() > 0.4) {
          indicators.push({
            x: candleData[i].x + candleWidth / 2,
            y: candleData[i].low - 20,
            direction: Math.random() > 0.5 ? 'up' : 'down',
            active: true
          });
        }
      }
    };
    generateIndicators();

    let animationOffset = 0;
    let candleIndex = numCandles;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with gradient background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth continuous animation
      animationOffset += 0.8;
      if (animationOffset >= candleWidth) {
        animationOffset = 0;
        
        // Add new candle at the end
        const lastCandle = candleData[candleData.length - 1];
        const volatility = 30;
        const trend = Math.sin(candleIndex * 0.1) * 10;
        const open = lastCandle.close;
        const close = open + (Math.random() - 0.5) * volatility + trend;
        const high = Math.max(open, close) + Math.random() * volatility / 2;
        const low = Math.min(open, close) - Math.random() * volatility / 2;
        
        candleData.push({
          x: candleData.length * candleWidth,
          open,
          close,
          high,
          low
        });
        
        candleIndex++;
        
        // Remove first candle
        candleData.shift();
        
        // Reindex candles
        candleData.forEach((candle, i) => {
          candle.x = i * candleWidth;
        });
        
        // Update line points
        linePoints = candleData.map((candle) => ({
          x: candle.x + candleWidth / 2,
          y: (candle.open + candle.close) / 2
        }));
        
        // Regenerate indicators periodically
        if (candleIndex % 50 === 0) {
          generateIndicators();
        }
      }

      // Draw candlesticks
      candleData.forEach((candle) => {
        const x = candle.x - animationOffset;
        const isGreen = candle.close > candle.open;
        
        // Draw high-low line
        ctx.strokeStyle = isGreen ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, candle.high);
        ctx.lineTo(x + candleWidth / 2, candle.low);
        ctx.stroke();
        
        // Draw candle body
        ctx.fillStyle = isGreen ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';
        ctx.strokeStyle = isGreen ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 1.5;
        
        const bodyTop = Math.min(candle.open, candle.close);
        const bodyHeight = Math.abs(candle.close - candle.open);
        
        ctx.fillRect(x + 2, bodyTop, candleWidth - 4, bodyHeight);
        ctx.strokeRect(x + 2, bodyTop, candleWidth - 4, bodyHeight);
      });

      // Draw line chart
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
      ctx.beginPath();
      linePoints.forEach((point, i) => {
        const x = point.x - animationOffset;
        if (i === 0) {
          ctx.moveTo(x, point.y);
        } else {
          ctx.lineTo(x, point.y);
        }
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw gradient fill under line
      ctx.fillStyle = ctx.createLinearGradient(0, canvas.height * 0.3, 0, canvas.height);
      const gradient = ctx.createLinearGradient(0, canvas.height * 0.3, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = gradient;
      
      ctx.beginPath();
      ctx.moveTo(linePoints[0].x - animationOffset, canvas.height);
      linePoints.forEach((point) => {
        const x = point.x - animationOffset;
        ctx.lineTo(x, point.y);
      });
      ctx.lineTo(linePoints[linePoints.length - 1].x - animationOffset, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Draw triangular indicators
      indicators.forEach((indicator) => {
        const x = indicator.x - animationOffset;
        const y = indicator.y;
        
        ctx.fillStyle = indicator.direction === 'up' ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)';
        ctx.beginPath();
        
        if (indicator.direction === 'up') {
          ctx.moveTo(x, y);
          ctx.lineTo(x - 6, y + 10);
          ctx.lineTo(x + 6, y + 10);
        } else {
          ctx.moveTo(x, y + 10);
          ctx.lineTo(x - 6, y);
          ctx.lineTo(x + 6, y);
        }
        
        ctx.closePath();
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ background: 'linear-gradient(to bottom right, rgb(15, 23, 42), rgb(30, 41, 59), rgb(15, 23, 42))' }}
    />
  );
};

export default TradingChartBackground;
