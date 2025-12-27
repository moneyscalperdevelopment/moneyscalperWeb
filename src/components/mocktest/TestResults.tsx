import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, XCircle, ArrowLeft, RotateCcw, ChevronRight, CheckCircle2, XCircle as XCircleIcon, Target, TrendingUp, BarChart3, Play } from "lucide-react";
import type { TestResult, Level, Question } from "@/data/mockTestQuestions";
import { Progress } from "@/components/ui/progress";
import CandlestickChart from "./CandlestickChart";

interface TestResultsProps {
  result: TestResult;
  level: Level;
  questions: Question[];
  onRetry: () => void;
  onBackToLevels: () => void;
  onNextLevel?: () => void;
  hasNextLevel: boolean;
}

// Topic categories based on question patterns
const getTopicFromQuestion = (question: Question): string => {
  const q = question.question.toLowerCase();
  if (q.includes("hammer") || q.includes("doji") || q.includes("engulfing") || q.includes("morning star")) {
    return "Pattern Recognition";
  }
  if (q.includes("volume") || q.includes("rsi") || q.includes("indicator")) {
    return "Volume & Indicators";
  }
  if (q.includes("support") || q.includes("resistance") || q.includes("moving average")) {
    return "Support & Resistance";
  }
  if (q.includes("wick") || q.includes("shadow") || q.includes("body")) {
    return "Candlestick Anatomy";
  }
  if (q.includes("breakout") || q.includes("retest") || q.includes("continuation")) {
    return "Breakouts & Continuation";
  }
  if (q.includes("risk") || q.includes("stop") || q.includes("position")) {
    return "Risk Management";
  }
  if (q.includes("timeframe") || q.includes("multi")) {
    return "Multi-Timeframe Analysis";
  }
  return "General Patterns";
};

const TestResults = ({
  result,
  level,
  questions,
  onRetry,
  onBackToLevels,
  onNextLevel,
  hasNextLevel,
}: TestResultsProps) => {
  const [playingChartId, setPlayingChartId] = useState<string | null>(null);
  const percentage = Math.round((result.score / result.maxScore) * 100);
  const correctAnswers = result.questionResults.filter(qr => qr.isCorrect).length;
  const wrongAnswers = result.questionResults.filter(qr => !qr.isCorrect);
  
  // Calculate topic-based accuracy
  const getTopicAccuracy = () => {
    const topicStats: Record<string, { correct: number; total: number }> = {};
    
    result.questionResults.forEach((qr) => {
      const question = questions.find(q => q.q_id === qr.questionId);
      if (!question) return;
      
      const topic = getTopicFromQuestion(question);
      
      if (!topicStats[topic]) {
        topicStats[topic] = { correct: 0, total: 0 };
      }
      
      topicStats[topic].total += 1;
      if (qr.isCorrect) {
        topicStats[topic].correct += 1;
      }
    });
    
    return Object.entries(topicStats).map(([topic, stats]) => ({
      topic,
      correct: stats.correct,
      total: stats.total,
      percentage: Math.round((stats.correct / stats.total) * 100)
    }));
  };

  const topicAccuracy = getTopicAccuracy();

  // Generate AI coaching summary based on wrong answers
  const generateCoachingSummary = () => {
    if (wrongAnswers.length === 0) {
      return {
        title: "Perfect Score! Excellent Work!",
        summary: "You've demonstrated mastery of the concepts in this level. Keep practicing to maintain your edge.",
        drills: [
          "Continue practicing with real-time charts to reinforce patterns",
          "Start applying these patterns in paper trading",
          "Consider moving to the next difficulty level"
        ],
        riskManagement: [
          "Always use proper position sizing (1-2% risk per trade)",
          "Set stop-losses before entering trades",
          "Review your trading journal regularly"
        ]
      };
    }

    const weakAreas = wrongAnswers.map(wa => wa.aiSuggestion);
    
    return {
      title: result.passed ? "Good Job! Keep Improving" : "Room for Improvement",
      summary: result.passed 
        ? "You've passed this level but there are areas to strengthen. Review the suggestions below."
        : "You didn't pass this time, but every attempt is a learning opportunity. Focus on the areas below.",
      drills: [
        "Review candlestick pattern basics with flashcards",
        "Practice identifying patterns on historical charts",
        "Study the relationship between volume and pattern strength",
        ...weakAreas.slice(0, 2)
      ],
      riskManagement: [
        "Never risk more than 1-2% of your capital per trade",
        "Wait for pattern confirmation before entering",
        "Use multiple timeframe analysis for better accuracy"
      ]
    };
  };

  const coaching = generateCoachingSummary();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 rounded-3xl mb-8 ${
          result.passed 
            ? "bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500/30" 
            : "bg-gradient-to-br from-red-500/20 to-orange-600/20 border-2 border-red-500/30"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {result.passed ? (
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-green-500" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {result.passed ? "Level Passed!" : "Not Quite There"}
              </h2>
              <p className="text-muted-foreground text-sm">{level.label}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {percentage}%
            </div>
            <p className="text-muted-foreground text-sm">{level.passing_score_percent}% to pass</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-background/50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-electric-blue" />
              <span className="text-2xl font-bold text-foreground">{result.score}/{result.maxScore}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Score</p>
          </div>
          <div className="bg-background/50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-green-500">{correctAnswers}</span>
            </div>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          <div className="bg-background/50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <XCircleIcon className="w-5 h-5 text-red-500" />
              <span className="text-2xl font-bold text-red-500">{wrongAnswers.length}</span>
            </div>
            <p className="text-xs text-muted-foreground">Incorrect</p>
          </div>
        </div>
      </motion.div>

      {/* Topic Accuracy Progress Bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-6 rounded-2xl bg-card border border-border/50 mb-8"
      >
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-electric-blue" />
          Performance by Topic
        </h3>
        
        <div className="space-y-5">
          {topicAccuracy.map((item, index) => (
            <div key={item.topic} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.topic}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {item.correct}/{item.total} correct
                  </span>
                  <span className={`text-sm font-bold ${
                    item.percentage >= 80 ? 'text-green-500' : 
                    item.percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={item.percentage} 
                  className="h-3"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className={`absolute top-0 left-0 h-3 rounded-full ${
                    item.percentage >= 80 ? 'bg-green-500' : 
                    item.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Answer Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-card border border-border/50 mb-8"
      >
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-electric-blue" />
          Answer Sheet
        </h3>
        
        <div className="space-y-6">
          {result.questionResults.map((qr, index) => {
            const question = questions.find(q => q.q_id === qr.questionId);
            const isChartPlaying = playingChartId === qr.questionId;
            
            return (
              <div
                key={qr.questionId}
                className={`p-4 rounded-xl border-2 ${
                  qr.isCorrect 
                    ? "bg-green-500/10 border-green-500/30" 
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Question Number */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    qr.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Question Text */}
                    <p className="text-foreground font-medium mb-3 leading-relaxed">
                      {question?.question}
                    </p>
                    
                    {/* Chart with Play Button */}
                    {question?.chartData && (
                      <div className="mb-4">
                        {isChartPlaying ? (
                          <CandlestickChart 
                            key={`${qr.questionId}-playing`}
                            data={question.chartData} 
                            height={280} 
                            animationDuration={6}
                            isActive={true}
                            patternName={question.q_id.includes("Hammer") ? "Hammer" : 
                                        question.q_id.includes("Doji") ? "Doji" : 
                                        question.q_id.includes("Engulf") ? "Engulfing" : 
                                        question.q_id.includes("Morning") ? "Morning Star" :
                                        question.q_id.includes("Strike") ? "Three Line Strike" : "Pattern"}
                          />
                        ) : (
                          <div 
                            onClick={() => setPlayingChartId(qr.questionId)}
                            className="relative rounded-xl bg-[hsl(215,35%,12%)] border border-border/30 p-8 flex items-center justify-center cursor-pointer hover:bg-[hsl(215,35%,15%)] transition-colors group"
                          >
                            <div className="text-center">
                              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                                <Play className="w-8 h-8 text-primary" />
                              </div>
                              <p className="text-muted-foreground text-sm">Click to replay chart animation</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Score Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                      qr.isCorrect ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}>
                      {qr.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          +1 Point
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="w-4 h-4" />
                          0 Points
                        </>
                      )}
                    </div>
                    
                    {/* Answers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Your Answer:</span>
                        <span className={`text-sm font-semibold ${qr.isCorrect ? "text-green-500" : "text-red-500"}`}>
                          {qr.userAnswer || "Not answered"}
                          {qr.userAnswer && question?.choices[qr.userAnswer as keyof typeof question.choices] && 
                            `. ${question.choices[qr.userAnswer as keyof typeof question.choices]}`}
                        </span>
                      </div>
                      {!qr.isCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Correct Answer:</span>
                          <span className="text-sm font-semibold text-green-500">
                            {qr.correctAnswer}. {question?.choices[qr.correctAnswer as keyof typeof question.choices]}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Explanation */}
                    <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-accent">Explanation: </span>
                        {qr.explanation}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {qr.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircleIcon className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* AI Coaching Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-card border border-border/50 mb-8"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          AI Coaching Summary
        </h3>

        <p className="text-foreground font-medium mb-4">{coaching.title}</p>
        <p className="text-muted-foreground mb-6">{coaching.summary}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Practice Drills */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
            <h4 className="font-semibold text-accent mb-3">Recommended Practice Drills</h4>
            <ul className="space-y-2">
              {coaching.drills.map((drill, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  {drill}
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Management */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
            <h4 className="font-semibold text-accent mb-3">Risk Management Tips</h4>
            <ul className="space-y-2">
              {coaching.riskManagement.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Button
          onClick={onBackToLevels}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Levels
        </Button>
        
        <Button
          onClick={onRetry}
          variant="secondary"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Retry Level
        </Button>

        {hasNextLevel && result.passed && (
          <Button
            onClick={onNextLevel}
            className="gap-2 bg-gradient-to-r from-primary to-neon-violet hover:opacity-90"
          >
            Next Level
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default TestResults;
