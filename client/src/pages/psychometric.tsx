import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Brain, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { psychometricQuestions } from "../lib/psychometric-questions";

export default function Psychometric() {
  const { userId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Get user and assessment data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/users", userId],
    enabled: !!userId,
  });

  const { data: assessment, isLoading: assessmentLoading } = useQuery({
    queryKey: ["/api/assessments/user", userId],
    enabled: !!userId,
  });

  const updateAssessmentMutation = useMutation({
    mutationFn: async (psychometricAnswers: Record<string, number>) => {
      const response = await apiRequest("PATCH", `/api/assessments/${assessment.id}`, {
        psychometricAnswers,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Assessment Complete",
        description: "Calculating your scores...",
      });
      setLocation(`/results/${userId}`);
    },
    onError: (error) => {
      toast({
        title: "Save Failed",
        description: "Please try again.",
        variant: "destructive",
      });
      console.error("Assessment update error:", error);
    },
  });

  const currentQuestionData = psychometricQuestions[currentQuestion];
  const totalQuestions = psychometricQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    // Load saved answer for current question
    const savedAnswer = answers[currentQuestionData?.id];
    setSelectedOption(savedAnswer !== undefined ? savedAnswer : null);
  }, [currentQuestion, answers, currentQuestionData?.id]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: optionIndex
    }));
  };

  const nextQuestion = () => {
    if (selectedOption === null) return;
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Complete assessment
      completeAssessment();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeAssessment = () => {
    const psychometricAnswers: Record<string, number> = {};
    for (const [questionId, answerIndex] of Object.entries(answers)) {
      psychometricAnswers[questionId] = answerIndex;
    }
    
    updateAssessmentMutation.mutate(psychometricAnswers);
  };

  const goBack = () => {
    setLocation(`/documents/${userId}`);
  };

  if (userLoading || assessmentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-skeleton h-8 w-48"></div>
      </div>
    );
  }

  if (!user || !assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600">Assessment not found. Please complete the previous steps first.</p>
            <Button onClick={() => setLocation("/registration")} className="mt-4">
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const canProceed = selectedOption !== null;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8 fade-in">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step 3 of 4: Psychometric Assessment</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>
            <Badge variant="outline" className="text-sm">
              {answeredCount} answered
            </Badge>
          </div>
        </div>

        <Card className="shadow-lg slide-up">
          <CardContent className="p-6 lg:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Behavioral Assessment
              </h2>
              <p className="text-gray-600">
                Answer honestly to help us understand your financial mindset
              </p>
            </div>

            {currentQuestionData && (
              <div className="max-w-3xl mx-auto">
                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                    {currentQuestionData.question}
                  </h3>
                  
                  {/* Trait indicators */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentQuestionData.traits.map((trait) => (
                      <Badge key={trait} variant="secondary" className="text-xs">
                        {trait.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentQuestionData.options.map((option, index) => (
                    <div
                      key={index}
                      className={`question-option ${selectedOption === index ? 'selected' : ''}`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionData.id}`}
                        value={index}
                        checked={selectedOption === index}
                        onChange={() => handleOptionSelect(index)}
                        className="mr-3"
                      />
                      <span className="text-gray-800 flex-1">{option.text}</span>
                      {selectedOption === index && (
                        <CheckCircle className="h-5 w-5 text-blue-600 ml-2" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={currentQuestion === 0 ? goBack : previousQuestion}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {currentQuestion === 0 ? "Back to Documents" : "Previous"}
                  </Button>

                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Progress</div>
                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(totalQuestions, 10) }, (_, i) => {
                        const questionIndex = Math.floor((i * totalQuestions) / 10);
                        const isAnswered = answers[psychometricQuestions[questionIndex]?.id] !== undefined;
                        const isCurrent = questionIndex === currentQuestion;
                        
                        return (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              isCurrent ? 'bg-blue-600' :
                              isAnswered ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    onClick={nextQuestion}
                    disabled={!canProceed || updateAssessmentMutation.isPending}
                    className="flex items-center gap-2"
                  >
                    {updateAssessmentMutation.isPending ? "Calculating..." : 
                     isLastQuestion ? "Complete Assessment" : "Next"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Question Summary Card */}
        <Card className="mt-6 slide-up" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Assessment Progress</span>
              <span className="font-medium text-gray-900">
                {answeredCount} of {totalQuestions} questions completed
              </span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
