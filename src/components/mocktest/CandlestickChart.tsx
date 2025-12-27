import { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CandlestickData } from "@/data/mockTestQuestions";

interface CandlestickChartProps {
  data: CandlestickData[];
  height?: number;
  animationDuration?: number;
  isActive?: boolean;
  patternName?: string;
}

const CandlestickChart = ({ 
  data, 
  height = 350, 
  animationDuration = 15,
  isActive = true,
  patternName = "Pattern"
}: CandlestickChartProps) => {
  const [visibleCandles, setVisibleCandles] = useState(1);
  const [showPattern, setShowPattern] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  const width = 800;
  const padding = { top: 60, right: 80, bottom: 70, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Reset animation
  const resetAnimation = useCallback(() => {
    setVisibleCandles(1);
    setIsPlaying(true);
    startTimeRef.current = null;
    hasStarted.current = false;
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!isPlaying && visibleCandles >= data.length) {
      resetAnimation();
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, visibleCandles, data.length, resetAnimation]);

  // Reset animation when data changes (new question)
  useEffect(() => {
    setVisibleCandles(1);
    setIsPlaying(true);
    startTimeRef.current = null;
    hasStarted.current = true;
  }, [data]);

  // Animation effect
  useEffect(() => {
    if (!isActive || !data?.length || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const totalCandles = data.length;
    const msPerCandle = (animationDuration * 1000) / totalCandles;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const candlesToShow = Math.min(Math.max(Math.floor(elapsed / msPerCandle) + 1, 1), totalCandles);

      setVisibleCandles(candlesToShow);

      if (candlesToShow < totalCandles && isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (candlesToShow >= totalCandles) {
        setIsPlaying(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, data, animationDuration, isPlaying]);

  if (!data?.length) return null;

  // Calculate visible data for rendering
  const visibleData = data.slice(0, Math.max(visibleCandles, 1));
  
  // Calculate price range from all data
  const allPrices = data.flatMap(d => [d.high, d.low]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice || 1;
  const pricePadding = priceRange * 0.1;
  const adjustedMin = minPrice - pricePadding;
  const adjustedMax = maxPrice + pricePadding;
  const adjustedRange = adjustedMax - adjustedMin;

  const candleWidth = Math.max(chartWidth / data.length * 0.6, 4);
  const gap = chartWidth / data.length;

  const getY = (price: number) => padding.top + chartHeight - ((price - adjustedMin) / adjustedRange) * chartHeight;
  const getX = (index: number) => padding.left + index * gap + gap / 2;

  // Current price
  const currentCandle = visibleData[visibleData.length - 1];
  const currentPrice = currentCandle?.close || data[0]?.open || 0;

  // Price levels for grid
  const priceStep = adjustedRange / 4;
  const priceLevels = Array.from({ length: 5 }, (_, i) => adjustedMin + priceStep * i);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[hsl(215,35%,12%)] border border-border/30">
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlay}
            className="gap-2 bg-foreground text-background hover:bg-foreground/90 border-0"
          >
            <Play className="w-4 h-4" />
            Replay
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetAnimation}
            className="bg-card border-border/50 hover:bg-card/80"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPattern(!showPattern)}
          className={`gap-2 ${showPattern ? 'bg-electric-blue text-white border-electric-blue' : 'bg-card border-border/50 hover:bg-card/80'}`}
        >
          <Eye className="w-4 h-4" />
          Show Pattern
        </Button>
      </div>

      {/* Chart Area */}
      <div className="px-4 pb-4">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Background grid */}
          {priceLevels.map((price, i) => (
            <g key={i}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={getY(price)}
                y2={getY(price)}
                stroke="hsl(215, 20%, 25%)"
                strokeWidth={1}
                strokeDasharray={i === 2 ? "8 4" : "0"}
                opacity={0.5}
              />
            </g>
          ))}

          {/* Current price line with label */}
          {visibleCandles > 0 && (
            <g>
              <line
                x1={padding.left}
                x2={width - padding.right + 10}
                y1={getY(currentPrice)}
                y2={getY(currentPrice)}
                stroke="hsl(60, 100%, 50%)"
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.8}
              />
              {/* Price label */}
              <rect
                x={width - padding.right + 12}
                y={getY(currentPrice) - 12}
                width={55}
                height={24}
                fill="hsl(60, 100%, 50%)"
                rx={4}
              />
              <text
                x={width - padding.right + 40}
                y={getY(currentPrice) + 4}
                fontSize="12"
                fontWeight="600"
                fill="hsl(0, 0%, 0%)"
                textAnchor="middle"
              >
                {currentPrice.toFixed(2)}
              </text>
            </g>
          )}

          {/* Support/Resistance lines */}
          <line
            x1={padding.left}
            x2={width - padding.right + 10}
            y1={getY(adjustedMin + adjustedRange * 0.7)}
            y2={getY(adjustedMin + adjustedRange * 0.7)}
            stroke="hsl(215, 20%, 40%)"
            strokeWidth={1}
            strokeDasharray="8 4"
            opacity={0.6}
          />
          <rect
            x={width - padding.right + 12}
            y={getY(adjustedMin + adjustedRange * 0.7) - 12}
            width={55}
            height={24}
            fill="hsl(215, 30%, 25%)"
            rx={4}
          />
          <text
            x={width - padding.right + 40}
            y={getY(adjustedMin + adjustedRange * 0.7) + 4}
            fontSize="12"
            fill="hsl(var(--foreground))"
            textAnchor="middle"
          >
            {(adjustedMin + adjustedRange * 0.7).toFixed(2)}
          </text>

          {/* Candlesticks */}
          {visibleData.map((candle, index) => {
            const x = getX(index);
            const isBullish = candle.close >= candle.open;
            const color = isBullish ? "hsl(217, 100%, 60%)" : "hsl(0, 70%, 55%)";
            const bodyTop = getY(Math.max(candle.open, candle.close));
            const bodyBottom = getY(Math.min(candle.open, candle.close));
            const bodyHeight = Math.max(bodyBottom - bodyTop, 2);

            return (
              <g key={index}>
                {/* Wick */}
                <line
                  x1={x}
                  x2={x}
                  y1={getY(candle.high)}
                  y2={getY(candle.low)}
                  stroke={color}
                  strokeWidth={1.5}
                />
                {/* Body */}
                <rect
                  x={x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={color}
                  rx={1}
                />
              </g>
            );
          })}

          {/* Pattern overlay */}
          {showPattern && visibleCandles >= data.length && (
            <g>
              <rect
                x={getX(Math.max(0, data.length - 3)) - candleWidth}
                y={padding.top}
                width={candleWidth * 6}
                height={chartHeight}
                fill="hsl(142, 76%, 36%)"
                opacity={0.1}
                rx={4}
              />
              <text
                x={getX(Math.max(0, data.length - 2))}
                y={padding.top + 20}
                fontSize="12"
                fontWeight="600"
                fill="hsl(142, 76%, 50%)"
                textAnchor="middle"
              >
                {patternName}
              </text>
            </g>
          )}

          {/* Crosshair at current position */}
          {visibleCandles > 0 && visibleCandles < data.length && (
            <line
              x1={getX(visibleCandles - 1)}
              x2={getX(visibleCandles - 1)}
              y1={padding.top}
              y2={height - padding.bottom}
              stroke="hsl(var(--foreground))"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.3}
            />
          )}

          {/* Date labels */}
          {data.map((candle, index) => {
            if (index % Math.ceil(data.length / 8) !== 0) return null;
            return (
              <text
                key={index}
                x={getX(index)}
                y={height - padding.bottom + 25}
                fontSize="11"
                fill="hsl(var(--muted-foreground))"
                textAnchor="middle"
              >
                {index + 1}
              </text>
            );
          })}

          {/* Current date label */}
          {visibleCandles > 0 && (
            <g>
              <rect
                x={getX(visibleCandles - 1) - 35}
                y={height - padding.bottom + 10}
                width={70}
                height={24}
                fill="hsl(215, 30%, 20%)"
                rx={4}
              />
              <text
                x={getX(visibleCandles - 1)}
                y={height - padding.bottom + 26}
                fontSize="11"
                fontWeight="500"
                fill="hsl(var(--foreground))"
                textAnchor="middle"
              >
                {data[visibleCandles - 1]?.time || ''}
              </text>
            </g>
          )}

          {/* Price axis labels */}
          {priceLevels.map((price, i) => (
            <text
              key={i}
              x={width - padding.right + 40}
              y={getY(price) + 4}
              fontSize="11"
              fill="hsl(var(--muted-foreground))"
              textAnchor="middle"
            >
              {price.toFixed(2)}
            </text>
          ))}
        </svg>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-muted-foreground">
            Candle {Math.min(visibleCandles, data.length)} of {data.length}
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(217,100%,60%)]" />
              <span className="text-muted-foreground">Bullish</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,55%)]" />
              <span className="text-muted-foreground">Bearish</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandlestickChart;
