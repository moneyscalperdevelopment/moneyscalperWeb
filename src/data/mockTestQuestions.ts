export interface Question {
  level_id: string;
  q_id: string;
  question: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: "A" | "B" | "C" | "D";
  explanation: string;
  ai_suggestion: string;
  chartData?: CandlestickData[];
}

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Level {
  level_id: string;
  label: string;
  description: string;
  num_questions: number;
  time_limit_minutes: number;
  passing_score_percent: number;
}

export const levels: Level[] = [
  {
    level_id: "level_1",
    label: "Level 1 — Fundamentals",
    description: "Basic candlestick pattern recognition and interpretation.",
    num_questions: 5,
    time_limit_minutes: 10,
    passing_score_percent: 60
  },
  {
    level_id: "level_2",
    label: "Level 2 — Intermediate",
    description: "Pattern confirmation, context with volume and moving averages.",
    num_questions: 5,
    time_limit_minutes: 15,
    passing_score_percent: 70
  },
  {
    level_id: "level_3",
    label: "Level 3 — Advanced",
    description: "Pattern failures, multi-timeframe confirmation, risk management decisions.",
    num_questions: 5,
    time_limit_minutes: 20,
    passing_score_percent: 80
  }
];

// Generate chart data for different patterns
const generateHammerPattern = (): CandlestickData[] => [
  { time: "1", open: 105, high: 108, low: 100, close: 98 },
  { time: "2", open: 98, high: 100, low: 92, close: 90 },
  { time: "3", open: 90, high: 92, low: 82, close: 80 },
  { time: "4", open: 80, high: 82, low: 70, close: 72 },
  { time: "5", open: 72, high: 78, low: 60, close: 76 }, // Hammer
];

const generateDojiPattern = (): CandlestickData[] => [
  { time: "1", open: 80, high: 85, low: 78, close: 84 },
  { time: "2", open: 84, high: 92, low: 82, close: 90 },
  { time: "3", open: 90, high: 98, low: 88, close: 96 },
  { time: "4", open: 96, high: 104, low: 94, close: 102 },
  { time: "5", open: 102, high: 108, low: 98, close: 102 }, // Doji
];

const generateBullishEngulfing = (): CandlestickData[] => [
  { time: "1", open: 100, high: 102, low: 95, close: 93 },
  { time: "2", open: 93, high: 95, low: 88, close: 86 },
  { time: "3", open: 86, high: 88, low: 80, close: 78 },
  { time: "4", open: 78, high: 80, low: 74, close: 75 }, // Bearish
  { time: "5", open: 73, high: 85, low: 72, close: 84 }, // Bullish Engulfing
];

const generateLongLowerWick = (): CandlestickData[] => [
  { time: "1", open: 100, high: 102, low: 96, close: 94 },
  { time: "2", open: 94, high: 96, low: 88, close: 86 },
  { time: "3", open: 86, high: 88, low: 80, close: 78 },
  { time: "4", open: 78, high: 80, low: 68, close: 77 }, // Long lower wick
  { time: "5", open: 77, high: 82, low: 75, close: 80 },
];

const generateBullishCandle = (): CandlestickData[] => [
  { time: "1", open: 100, high: 102, low: 95, close: 93 },
  { time: "2", open: 93, high: 95, low: 86, close: 84 },
  { time: "3", open: 84, high: 86, low: 78, close: 76 },
  { time: "4", open: 76, high: 78, low: 70, close: 68 },
  { time: "5", open: 68, high: 88, low: 66, close: 86 }, // Long bullish
];

const generateMorningStar = (): CandlestickData[] => [
  { time: "1", open: 100, high: 102, low: 92, close: 90 },
  { time: "2", open: 90, high: 92, low: 82, close: 80 },
  { time: "3", open: 80, high: 82, low: 74, close: 72 }, // Bearish
  { time: "4", open: 72, high: 74, low: 68, close: 70 }, // Small body (star)
  { time: "5", open: 70, high: 86, low: 68, close: 84 }, // Bullish confirmation
];

const generateBearishEngulfingAtMA = (): CandlestickData[] => [
  { time: "1", open: 80, high: 86, low: 78, close: 84 },
  { time: "2", open: 84, high: 90, low: 82, close: 88 },
  { time: "3", open: 88, high: 96, low: 86, close: 94 },
  { time: "4", open: 94, high: 100, low: 92, close: 98 }, // Bullish at resistance
  { time: "5", open: 99, high: 101, low: 88, close: 90 }, // Bearish engulfing
];

const generateThreeLineStrike = (): CandlestickData[] => [
  { time: "1", open: 80, high: 86, low: 78, close: 84 },
  { time: "2", open: 84, high: 90, low: 82, close: 88 },
  { time: "3", open: 88, high: 94, low: 86, close: 92 },
  { time: "4", open: 92, high: 98, low: 90, close: 96 },
  { time: "5", open: 96, high: 102, low: 94, close: 100 },
];

const generateUpperWickRejection = (): CandlestickData[] => [
  { time: "1", open: 80, high: 86, low: 78, close: 84 },
  { time: "2", open: 84, high: 92, low: 82, close: 90 },
  { time: "3", open: 90, high: 98, low: 88, close: 96 },
  { time: "4", open: 96, high: 105, low: 94, close: 97 }, // Long upper wick
  { time: "5", open: 97, high: 99, low: 92, close: 94 },
];

const generateMultiTimeframe = (): CandlestickData[] => [
  { time: "1", open: 90, high: 95, low: 88, close: 94 },
  { time: "2", open: 94, high: 98, low: 92, close: 96 },
  { time: "3", open: 96, high: 100, low: 94, close: 98 },
  { time: "4", open: 98, high: 102, low: 96, close: 100 },
  { time: "5", open: 100, high: 104, low: 94, close: 95 }, // Bearish reversal signal
];

const generatePatternFailure = (): CandlestickData[] => [
  { time: "1", open: 100, high: 102, low: 94, close: 92 },
  { time: "2", open: 92, high: 94, low: 86, close: 84 },
  { time: "3", open: 84, high: 86, low: 78, close: 76 },
  { time: "4", open: 76, high: 84, low: 70, close: 82 }, // Hammer
  { time: "5", open: 82, high: 84, low: 72, close: 74 }, // Pattern failure
];

const generateRetestPattern = (): CandlestickData[] => [
  { time: "1", open: 80, high: 86, low: 78, close: 84 },
  { time: "2", open: 84, high: 92, low: 82, close: 90 },
  { time: "3", open: 90, high: 98, low: 88, close: 96 }, // Breakout
  { time: "4", open: 96, high: 98, low: 94, close: 95 }, // Small retest
  { time: "5", open: 95, high: 104, low: 94, close: 102 },
];

const generateIndecisionPattern = (): CandlestickData[] => [
  { time: "1", open: 90, high: 95, low: 85, close: 88 },
  { time: "2", open: 88, high: 94, low: 82, close: 86 },
  { time: "3", open: 86, high: 96, low: 78, close: 84 }, // Long wicks both sides
  { time: "4", open: 84, high: 92, low: 76, close: 80 },
  { time: "5", open: 80, high: 88, low: 74, close: 82 },
];

const generateContractionExpansion = (): CandlestickData[] => [
  { time: "1", open: 90, high: 94, low: 86, close: 92 },
  { time: "2", open: 92, high: 95, low: 89, close: 93 },
  { time: "3", open: 93, high: 95, low: 91, close: 94 }, // Small body
  { time: "4", open: 94, high: 96, low: 92, close: 95 }, // Smaller body
  { time: "5", open: 95, high: 110, low: 94, close: 108 }, // Expansion
];

export const questions: Question[] = [
  // Level 1 Questions
  {
    level_id: "level_1",
    q_id: "L1_Q1",
    question: "A single long green candlestick is formed with higher volume following a downtrend. Which interpretation is most likely?",
    choices: {
      A: "Continuation of the downtrend",
      B: "Potential bullish reversal or short-term buying pressure",
      C: "Market indecision (neutral)",
      D: "Bearish engulfing"
    },
    answer: "B",
    explanation: "A long green candle with higher volume after a downtrend commonly signals strong buying pressure and possible reversal. Confirmation by next candles is recommended.",
    ai_suggestion: "Practice: Mark long green candles after downtrends on historical charts and wait for a confirmation candle. Strategy: Use a tight stop loss below the candle low and target a 1:1.5 R:R initially.",
    chartData: generateBullishCandle()
  },
  {
    level_id: "level_1",
    q_id: "L1_Q2",
    question: "A Doji candlestick appears after a sustained uptrend. What does a Doji usually indicate?",
    choices: {
      A: "Strong bullish continuation",
      B: "Strong bearish continuation",
      C: "Indecision and possible reversal signal",
      D: "Guaranteed trend reversal"
    },
    answer: "C",
    explanation: "A Doji shows indecision between buyers and sellers. In an uptrend it can indicate weakening momentum and potential reversal, but should be confirmed.",
    ai_suggestion: "Practice: Identify Doji on multiple timeframes. Strategy: Combine with RSI divergence or volume drop to improve signal reliability.",
    chartData: generateDojiPattern()
  },
  {
    level_id: "level_1",
    q_id: "L1_Q3",
    question: "Two candles: the second bullish candle completely engulfs the prior bearish candle's body. This pattern is called:",
    choices: {
      A: "Hammer",
      B: "Bullish Engulfing",
      C: "Shooting Star",
      D: "Harami"
    },
    answer: "B",
    explanation: "When a bullish candle fully engulfs the previous bearish candle's real body, it is a Bullish Engulfing pattern — a potential reversal sign.",
    ai_suggestion: "Practice: Filter engulfing patterns that occur near structural support. Strategy: Look for increased volume on the engulfing candle for higher confidence.",
    chartData: generateBullishEngulfing()
  },
  {
    level_id: "level_1",
    q_id: "L1_Q4",
    question: "A long lower wick (shadow) on a candlestick after a down move typically indicates:",
    choices: {
      A: "Strong seller dominance",
      B: "Buyers absorbing selling pressure (potential support)",
      C: "No information — ignore",
      D: "Immediate breakout to downside"
    },
    answer: "B",
    explanation: "A long lower wick shows that sellers pushed price down but buyers pushed it back up, indicating buying interest at lower prices.",
    ai_suggestion: "Practice: Annotate long lower wicks on intraday charts. Strategy: Use as an area to place a trailing stop if entering long on confirmation.",
    chartData: generateLongLowerWick()
  },
  {
    level_id: "level_1",
    q_id: "L1_Q5",
    question: "Which candlestick pattern is typically bullish when it appears at the bottom of downtrends and has a small body with a long lower shadow?",
    choices: {
      A: "Shooting Star",
      B: "Inverted Hammer",
      C: "Hammer",
      D: "Bearish Harami"
    },
    answer: "C",
    explanation: "The Hammer is a small-bodied candle with a long lower wick at the bottom of a downtrend, often signalling a bullish reversal.",
    ai_suggestion: "Practice: Look for Hammers with volume confirmation and trade with stop just below the wick. Strategy: Use a risk-first position sizing rule.",
    chartData: generateHammerPattern()
  },

  // Level 2 Questions
  {
    level_id: "level_2",
    q_id: "L2_Q1",
    question: "A bullish Morning Star pattern appears at support and is accompanied by increasing volume on the third candle. Best interpretation?",
    choices: {
      A: "Weak continuation",
      B: "Healthy bullish reversal signal with confirmation",
      C: "False signal due to the Morning Star",
      D: "Indicates consolidation only"
    },
    answer: "B",
    explanation: "Morning Star is a three-candle reversal. Increasing volume on the confirming third candle strengthens the bullish reversal interpretation.",
    ai_suggestion: "Practice: Backtest Morning Star + volume across multiple pairs. Strategy: Enter after the third candle closes and place stop below the pattern low.",
    chartData: generateMorningStar()
  },
  {
    level_id: "level_2",
    q_id: "L2_Q2",
    question: "A bearish engulfing forms near a 50-period moving average that has been acting as resistance. What is the most risk-conscious action?",
    choices: {
      A: "Short immediately without stops",
      B: "Wait for price to break below pattern low and confirm with volume before shorting",
      C: "Buy because moving average is resistance",
      D: "Ignore moving average and trade randomly"
    },
    answer: "B",
    explanation: "Waiting for confirmation reduces false signals; combining pattern with MA resistance and volume gives a better entry setup.",
    ai_suggestion: "Practice: Use paper trading to simulate entries that wait for pattern confirmation. Strategy: Combine stop placement with ATR-based sizing.",
    chartData: generateBearishEngulfingAtMA()
  },
  {
    level_id: "level_2",
    q_id: "L2_Q3",
    question: "A three-line strike bullish continuation pattern occurs within an uptrend. Which is true?",
    choices: {
      A: "It indicates immediate reversal",
      B: "It often signals continuation of the prevailing uptrend",
      C: "It is a neutral pattern",
      D: "It always fails"
    },
    answer: "B",
    explanation: "A bullish three-line strike is a continuation pattern indicating the uptrend is likely to resume.",
    ai_suggestion: "Practice: Identify continuation patterns on varying timeframes and test limit vs. market entry types. Strategy: Use trailing stops to capture extended moves.",
    chartData: generateThreeLineStrike()
  },
  {
    level_id: "level_2",
    q_id: "L2_Q4",
    question: "Which combined signal increases confidence in a pullback being over: bullish engulfing + RSI crossing above 30 OR bullish engulfing alone?",
    choices: {
      A: "Bullish engulfing alone is always better",
      B: "Engulfing + RSI confirmation increases confidence",
      C: "RSI crossing above 30 is irrelevant",
      D: "Both are equally weak"
    },
    answer: "B",
    explanation: "Combining pattern signals with momentum indicators (RSI) reduces false positives.",
    ai_suggestion: "Practice: Create a checklist for multi-indicator confirmation. Strategy: Only take patterns that meet at least two confirmation rules.",
    chartData: generateBullishEngulfing()
  },
  {
    level_id: "level_2",
    q_id: "L2_Q5",
    question: "A long upper wick on a candle at resistance with declining volume suggests:",
    choices: {
      A: "Strong breakout likely",
      B: "Selling pressure at resistance and possible pullback",
      C: "Indecision that favors continuation up",
      D: "Ignore wick length"
    },
    answer: "B",
    explanation: "A long upper wick at resistance indicates sellers rejected higher prices; declining volume reduces breakout odds.",
    ai_suggestion: "Practice: Mark upper-wick rejection points and measure follow-through. Strategy: Consider short with tight risk if support breaks.",
    chartData: generateUpperWickRejection()
  },

  // Level 3 Questions
  {
    level_id: "level_3",
    q_id: "L3_Q1",
    question: "A bearish pattern forms on the hourly chart while the daily chart still shows a strong uptrend. Best professional-grade approach:",
    choices: {
      A: "Short immediately because hourly pattern is bearish",
      B: "Respect higher timeframe — look for intraday fade trades or avoid counter-trend positions unless confirmed",
      C: "Open a large short position and ignore risk",
      D: "Trade randomly"
    },
    answer: "B",
    explanation: "Multi-timeframe alignment is critical. Counter-trend trades require additional confirmation and smaller sizing.",
    ai_suggestion: "Practice: Simulate multi-timeframe scenarios. Strategy: Use reduced position size and tighter stops for counter-trend setups; prioritize daily trend alignment.",
    chartData: generateMultiTimeframe()
  },
  {
    level_id: "level_3",
    q_id: "L3_Q2",
    question: "A pattern failure occurs when a classic reversal candlestick is formed but price continues in original direction. Best risk control?",
    choices: {
      A: "Increase size on failure",
      B: "Maintain small position, plan for pattern failure with stop and predefined exit",
      C: "Ignore stop loss",
      D: "Assume all patterns fail"
    },
    answer: "B",
    explanation: "Anticipate pattern failure by using appropriate sizing and stops. Plan risk before entry to limit drawdown.",
    ai_suggestion: "Practice: Keep a journal of pattern failures to quantify failure rates. Strategy: Use hedging or scaling-out rules when failure probability is high.",
    chartData: generatePatternFailure()
  },
  {
    level_id: "level_3",
    q_id: "L3_Q3",
    question: "During a breakout, a retest candle forms that shows a small-bodied candle with low volume at the breakout level. Interpretation?",
    choices: {
      A: "Retest failed — avoid trade",
      B: "Low-volume small body on retest often signals successful retest; look for confirmation on the next candle",
      C: "Guaranteed reversal",
      D: "No trading rules apply"
    },
    answer: "B",
    explanation: "A quiet retest (low-volume small body) often indicates sellers lacked conviction — good risk-to-reward on confirmation.",
    ai_suggestion: "Practice: Backtest retest behavior with volume filters. Strategy: Enter after confirming candle with stop below retest low; size according to edge.",
    chartData: generateRetestPattern()
  },
  {
    level_id: "level_3",
    q_id: "L3_Q4",
    question: "A candlestick pattern shows long wicks on both sides and a small body at a support level. Which advanced tactic is appropriate?",
    choices: {
      A: "Ignore and hold positions overnight",
      B: "Treat as high volatility indecision; prefer to trade breakouts from consolidation instead of entering on the chop",
      C: "Always short",
      D: "Always go long"
    },
    answer: "B",
    explanation: "Long wicks both sides indicate volatility and indecision; high probability setups come from breakout confirmation rather than trading the chop.",
    ai_suggestion: "Practice: Identify consolidation zones and plan breakout entries. Strategy: Use breakout confirmation + stop placement outside wick extremes.",
    chartData: generateIndecisionPattern()
  },
  {
    level_id: "level_3",
    q_id: "L3_Q5",
    question: "You observe a cluster of small-bodied candles with decreasing range and volume before a big bullish candle. Best interpretation and plan?",
    choices: {
      A: "Range contraction followed by expansion — prepare for momentum entry on breakout",
      B: "Market is dead — no trade",
      C: "Sell into the breakout",
      D: "Avoid using volume"
    },
    answer: "A",
    explanation: "Contraction in range and volume followed by a strong candle typically signals volatility expansion and momentum continuation.",
    ai_suggestion: "Practice: Use volatility contraction indicators (e.g., Bollinger squeeze) to capture similar moves. Strategy: Place entry on breakout with a favorable R:R and trail stop as price moves.",
    chartData: generateContractionExpansion()
  },

  // NEW QUESTIONS - Additional patterns
  {
    level_id: "level_1",
    q_id: "L1_Q6",
    question: "Where is a 'Hammer' candlestick pattern typically found, and what does it indicate?",
    choices: {
      A: "At the top of an uptrend; Bearish signal (selling)",
      B: "At the bottom of a downtrend; Bullish signal (buying)",
      C: "In a sideways market; Indication of volatility",
      D: "Anywhere; Always a sign of strength"
    },
    answer: "B",
    explanation: "A Hammer candlestick pattern is typically found at the bottom of a downtrend. It has a small body near the top and a long lower shadow, indicating that sellers pushed prices down during the session, but buyers regained control and pushed prices back up. This is considered a bullish reversal signal.",
    ai_suggestion: "Practice: Look for Hammer patterns at key support levels with volume confirmation. Strategy: Enter after the next candle confirms the reversal, with a stop loss below the Hammer's low.",
    chartData: generateHammerPattern()
  },
  {
    level_id: "level_1",
    q_id: "L1_Q7",
    question: "What does the 'Doji' candlestick pattern represent?",
    choices: {
      A: "Strong buying pressure",
      B: "Strong selling pressure",
      C: "Indecision or equilibrium between the open and close price",
      D: "A definite sign of market momentum"
    },
    answer: "C",
    explanation: "A Doji candlestick has almost the same opening and closing price, resulting in a very small or no real body. This represents indecision in the market where neither buyers nor sellers have gained control. After a strong trend, a Doji can signal potential reversal.",
    ai_suggestion: "Practice: Monitor Doji patterns after extended trends for potential reversals. Strategy: Wait for the next candle to confirm direction before entering a trade.",
    chartData: generateDojiPattern()
  },
  {
    level_id: "level_2",
    q_id: "L2_Q6",
    question: "An 'Engulfing Pattern' is considered reliable when:",
    choices: {
      A: "It partially covers the previous candle's body",
      B: "It completely covers the previous candle's body",
      C: "It is the same color for two days",
      D: "It has no wick (shadow)"
    },
    answer: "B",
    explanation: "An Engulfing Pattern is most reliable when the second candle's real body completely engulfs (covers) the first candle's real body. This shows a strong shift in momentum. A bullish engulfing at support or bearish engulfing at resistance adds to reliability.",
    ai_suggestion: "Practice: Identify engulfing patterns at key support/resistance levels. Strategy: Combine with volume analysis - higher volume on the engulfing candle increases pattern reliability.",
    chartData: generateBullishEngulfing()
  },
  {
    level_id: "level_2",
    q_id: "L2_Q7",
    question: "In trading, what does a Support level indicate?",
    choices: {
      A: "The price where selling pressure overcomes buying pressure",
      B: "The price where buying pressure is likely to overcome selling pressure",
      C: "The highest price a stock has ever traded at",
      D: "The best time to enter the market"
    },
    answer: "B",
    explanation: "A Support level is a price point where buying interest is strong enough to overcome selling pressure and prevent the price from falling further. It acts as a 'floor' where buyers step in, often because they perceive value at that price level.",
    ai_suggestion: "Practice: Mark historical support levels and observe price reactions. Strategy: Look for bullish candlestick patterns at support for entry signals with stops placed below the support zone.",
    chartData: generateLongLowerWick()
  },
  {
    level_id: "level_3",
    q_id: "L3_Q6",
    question: "What is the 'Morning Star' pattern?",
    choices: {
      A: "A Bearish Reversal pattern formed after an uptrend",
      B: "A Continuation pattern formed in an uptrend",
      C: "A Bullish Reversal pattern formed after a downtrend",
      D: "A cluster of two equally sized candlesticks"
    },
    answer: "C",
    explanation: "The Morning Star is a three-candle bullish reversal pattern that forms after a downtrend. It consists of: 1) A large bearish candle, 2) A small-bodied candle (star) that gaps down, and 3) A large bullish candle that closes above the midpoint of the first candle.",
    ai_suggestion: "Practice: Look for Morning Star patterns at support levels with increasing volume on the third candle. Strategy: Enter after the third candle closes with a stop below the star's low, targeting previous resistance levels.",
    chartData: generateMorningStar()
  }
];

export const getQuestionsByLevel = (levelId: string): Question[] => {
  return questions.filter(q => q.level_id === levelId);
};

export const getLevelById = (levelId: string): Level | undefined => {
  return levels.find(l => l.level_id === levelId);
};

export interface TestResult {
  levelId: string;
  answers: Record<string, string>;
  score: number;
  maxScore: number;
  passed: boolean;
  questionResults: QuestionResult[];
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  aiSuggestion: string;
}
