import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LevelSelector from "@/components/mocktest/LevelSelector";
import QuestionCard from "@/components/mocktest/QuestionCard";
import TestResults from "@/components/mocktest/TestResults";
import {
  levels,
  getQuestionsByLevel,
  getLevelById,
  type Question,
  type TestResult,
  type QuestionResult,
} from "@/data/mockTestQuestions";

type TestPhase = "select" | "test" | "review" | "results";

const MockTest = () => {
  const [phase, setPhase] = useState<TestPhase>("select");
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);

  // Shuffle array helper
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Start test for selected level
  const handleSelectLevel = (levelId: string) => {
    const level = getLevelById(levelId);
    if (!level) return;

    const levelQuestions = getQuestionsByLevel(levelId);
    const shuffledQuestions = shuffleArray(levelQuestions);

    setSelectedLevelId(levelId);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(level.time_limit_minutes * 60);
    setTestResult(null);
    setPhase("test");
  };

  // Timer countdown
  useEffect(() => {
    if (phase !== "test" || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeRemaining]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle answer selection
  const handleSelectAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].q_id]: answer,
    }));
  };

  // Navigate questions
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Submit test and calculate results
  const handleSubmitTest = useCallback(async () => {
    if (!selectedLevelId) return;

    const level = getLevelById(selectedLevelId);
    if (!level) return;

    const questionResults: QuestionResult[] = questions.map((q) => {
      const userAnswer = answers[q.q_id] || "";
      const isCorrect = userAnswer === q.answer;
      return {
        questionId: q.q_id,
        userAnswer,
        correctAnswer: q.answer,
        isCorrect,
        explanation: q.explanation,
        aiSuggestion: q.ai_suggestion,
      };
    });

    const score = questionResults.filter((qr) => qr.isCorrect).length;
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= level.passing_score_percent;

    const result: TestResult = {
      levelId: selectedLevelId,
      answers,
      score,
      maxScore: questions.length,
      passed,
      questionResults,
    };

    setTestResult(result);

    if (passed && !completedLevels.includes(selectedLevelId)) {
      setCompletedLevels((prev) => [...prev, selectedLevelId]);
    }

    setPhase("review");
  }, [selectedLevelId, questions, answers, completedLevels]);

  // Handle showing final results after review
  const handleShowResults = () => {
    setPhase("results");
  };

  // Retry the same level
  const handleRetry = () => {
    if (selectedLevelId) {
      handleSelectLevel(selectedLevelId);
    }
  };

  // Go back to level selection
  const handleBackToLevels = () => {
    setPhase("select");
    setSelectedLevelId(null);
    setQuestions([]);
    setAnswers({});
    setTestResult(null);
  };

  // Move to next level
  const handleNextLevel = () => {
    const currentIndex = levels.findIndex((l) => l.level_id === selectedLevelId);
    if (currentIndex < levels.length - 1) {
      handleSelectLevel(levels[currentIndex + 1].level_id);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedLevel = selectedLevelId ? getLevelById(selectedLevelId) : null;
  const answeredCount = Object.keys(answers).length;
  const hasNextLevel =
    selectedLevelId !== null &&
    levels.findIndex((l) => l.level_id === selectedLevelId) < levels.length - 1;

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            {/* Level Selection */}
            {phase === "select" && (
              <motion.section
                key="select"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-labelledby="mock-test-title"
              >
                <header className="text-center mb-8">
                  <h1
                    id="mock-test-title"
                    className="text-3xl md:text-4xl font-bold text-foreground mb-3"
                  >
                    Trading Pattern Mock Test
                  </h1>
                  <p className="text-muted-foreground">
                    Choose a level and test your candlestick pattern knowledge.
                  </p>
                </header>

                <LevelSelector
                  levels={levels}
                  onSelectLevel={handleSelectLevel}
                  completedLevels={completedLevels}
                />
              </motion.section>
            )}

            {/* Test Phase */}
            {phase === "test" && currentQuestion && (
              <motion.div
                key="test"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl mx-auto"
              >
                {/* Test Header */}
                <div className="flex items-center justify-between mb-8 p-4 rounded-2xl bg-card border border-border/50">
                  <div>
                    <h2 className="font-bold text-foreground">{selectedLevel?.label}</h2>
                    <p className="text-sm text-muted-foreground">
                      {answeredCount} of {questions.length} answered
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    timeRemaining < 60 ? "bg-red-500/20 text-red-400" : "bg-secondary"
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
                  </div>
                </div>

                {/* Question Card */}
                <div className="p-6 rounded-2xl bg-card border border-border/50 mb-6">
                  <QuestionCard
                    question={currentQuestion}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                    selectedAnswer={answers[currentQuestion.q_id] || null}
                    onSelectAnswer={handleSelectAnswer}
                  />
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {/* Question Dots */}
                  <div className="hidden md:flex gap-1">
                    {questions.map((q, index) => (
                      <button
                        key={q.q_id}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentQuestionIndex
                            ? "bg-primary scale-125"
                            : answers[q.q_id]
                            ? "bg-green-500"
                            : "bg-secondary"
                        }`}
                      />
                    ))}
                  </div>

                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button
                      onClick={handleSubmitTest}
                      className="gap-2 bg-gradient-to-r from-primary to-neon-violet hover:opacity-90"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Submit Test
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion} className="gap-2">
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Review Phase */}
            {phase === "review" && testResult && (
              <motion.div
                key="review"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl mx-auto"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Review Your Answers</h2>
                  <p className="text-muted-foreground">
                    See the correct answers and explanations for each question.
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  {questions.map((question, index) => (
                    <div key={question.q_id} className="p-6 rounded-2xl bg-card border border-border/50">
                      <QuestionCard
                        question={question}
                        questionNumber={index + 1}
                        totalQuestions={questions.length}
                        selectedAnswer={answers[question.q_id] || null}
                        onSelectAnswer={() => {}}
                        showResult
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleShowResults}
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-primary to-neon-violet hover:opacity-90"
                  >
                    View Final Results
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Results Phase */}
            {phase === "results" && testResult && selectedLevel && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TestResults
                  result={testResult}
                  level={selectedLevel}
                  questions={questions}
                  onRetry={handleRetry}
                  onBackToLevels={handleBackToLevels}
                  onNextLevel={handleNextLevel}
                  hasNextLevel={hasNextLevel}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MockTest;
