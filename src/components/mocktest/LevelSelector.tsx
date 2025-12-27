import { motion } from "framer-motion";
import { Clock, Target, Lock, TrendingUp, Brain, Zap, ChevronRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Level } from "@/data/mockTestQuestions";

interface LevelSelectorProps {
  levels: Level[];
  onSelectLevel: (levelId: string) => void;
  completedLevels?: string[];
}

const LevelSelector = ({ levels, onSelectLevel, completedLevels = [] }: LevelSelectorProps) => {
  const isLevelUnlocked = (levelId: string, index: number) => {
    if (index === 0) return true; // First level is always unlocked
    const previousLevelId = levels[index - 1]?.level_id;
    return completedLevels.includes(previousLevelId);
  };

  const getRequiredLevel = (index: number) => {
    if (index === 0) return null;
    return index; // Level 1 for index 1, Level 2 for index 2
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Money Scalper
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Test your candlestick pattern recognition skills across 3 progressive levels
          with <span className="text-electric-blue font-medium">interactive charts</span> and{" "}
          <span className="text-bright-cyan font-medium">AI-powered coaching</span>.
        </p>
      </motion.div>

      {/* Feature Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border/50">
          <TrendingUp className="w-5 h-5 text-electric-blue" />
          <div>
            <p className="font-semibold text-foreground">15 Questions</p>
            <p className="text-sm text-muted-foreground">Across 3 levels</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border/50">
          <Brain className="w-5 h-5 text-electric-blue" />
          <div>
            <p className="font-semibold text-foreground">AI Coaching</p>
            <p className="text-sm text-muted-foreground">Personalized feedback</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border/50">
          <Zap className="w-5 h-5 text-electric-blue" />
          <div>
            <p className="font-semibold text-foreground">Interactive Charts</p>
            <p className="text-sm text-muted-foreground">With replay mode</p>
          </div>
        </div>
      </motion.div>

      {/* Level Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {levels.map((level, index) => {
          const isUnlocked = isLevelUnlocked(level.level_id, index);
          const isCompleted = completedLevels.includes(level.level_id);
          const requiredLevel = getRequiredLevel(index);
          
          return (
            <motion.div
              key={level.level_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-6 rounded-2xl bg-[hsl(var(--card-elevated))] border border-border/30 flex flex-col"
            >
              {/* Completed Badge */}
              {isCompleted && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Level Number or Lock Icon */}
              <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center mb-6">
                {isUnlocked ? (
                  <span className="text-xl font-bold text-foreground">{index + 1}</span>
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {/* Level Info */}
              <h3 className="text-xl font-bold text-foreground mb-2">{level.label}</h3>
              <p className="text-muted-foreground text-sm mb-6 flex-1">{level.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{level.time_limit_minutes} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>{level.passing_score_percent}% to pass</span>
                </div>
              </div>

              {/* Action Button */}
              {isUnlocked ? (
                <Button
                  onClick={() => onSelectLevel(level.level_id)}
                  className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white gap-2"
                >
                  Start Test
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  disabled
                  variant="outline"
                  className="w-full gap-2 opacity-60 cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  Complete Level {requiredLevel} to Unlock
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelector;
