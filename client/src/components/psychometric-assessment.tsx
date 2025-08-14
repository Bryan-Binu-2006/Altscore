/**
 * Comprehensive 30-Question Psychometric Assessment Component
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { psychometric30Questions, traitDescriptions } from '@/lib/psychometric-30-questions';
import { PsychometricAnswer } from '@/lib/altscore-engine';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface PsychometricAssessmentProps {
  onComplete: (answers: PsychometricAnswer[]) => void;
  onCancel?: () => void;
}

export default function PsychometricAssessment({ 
  onComplete, 
  onCancel 
}: PsychometricAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PsychometricAnswer[]>([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalQuestions = psychometric30Questions.length;
  const progress = ((currentQuestion) / totalQuestions) * 100;

  const handleAnswer = (option: 'A' | 'B' | 'C' | 'D') => {
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    
    const answer: PsychometricAnswer = {
      questionId: psychometric30Questions[currentQuestion].id,
      answerOption: option,
      timeSpent
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionStartTime(Date.now());
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      onComplete(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // Remove the last answer and go back
      const newAnswers = answers.slice(0, -1);
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion - 1);
      setQuestionStartTime(Date.now());
      setSelectedOption(null);
    }
  };

  const currentQuestionData = psychometric30Questions[currentQuestion];
  const totalTimeElapsed = Math.round((Date.now() - startTime) / 1000);

  if (isCompleted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-700">Assessment Completed!</CardTitle>
          <CardDescription>
            You've successfully completed all 30 questions. Your responses are being processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
              <div className="text-sm text-blue-600">Questions Answered</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{Math.round(totalTimeElapsed / 60)}m</div>
              <div className="text-sm text-green-600">Time Taken</div>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            Your psychometric profile is being analyzed for the following traits:
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(traitDescriptions).map(([trait, description]) => (
              <Badge key={trait} variant="outline" className="justify-start p-3 h-auto">
                <div>
                  <div className="font-medium capitalize text-xs">
                    {trait.replace('_', ' ')}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {description.substring(0, 50)}...
                  </div>
                </div>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              Question {currentQuestion + 1} of {totalQuestions}
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{Math.round(totalTimeElapsed / 60)}m</span>
            </Badge>
          </div>
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Exit Assessment
            </Button>
          )}
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <CardTitle className="text-lg mt-4">
          {currentQuestionData?.question}
        </CardTitle>
        
        <CardDescription className="flex items-center space-x-4">
          <span>Select the option that best describes you:</span>
          {currentQuestionData?.traits && (
            <div className="flex space-x-1">
              {currentQuestionData.traits.map((trait) => (
                <Badge key={trait} variant="outline" className="text-xs">
                  {trait.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {currentQuestionData?.options && 
            Object.entries(currentQuestionData.options).map(([optionKey, optionData]) => (
              <Button
                key={optionKey}
                variant={selectedOption === optionKey ? "default" : "outline"}
                className="h-auto p-4 text-left justify-start"
                onClick={() => setSelectedOption(optionKey as 'A' | 'B' | 'C' | 'D')}
              >
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">
                    {optionKey}
                  </Badge>
                  <div className="flex-1 text-sm">
                    {optionData.text}
                  </div>
                </div>
              </Button>
            ))
          }
        </div>
        
        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button 
            onClick={() => selectedOption && handleAnswer(selectedOption)}
            disabled={!selectedOption}
            className="min-w-[120px]"
          >
            {currentQuestion === totalQuestions - 1 ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
            <div className="text-xs text-blue-700">
              <div className="font-medium">Assessment Guidelines:</div>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Answer honestly based on your actual behavior and preferences</li>
                <li>There are no right or wrong answers - we're assessing your financial personality</li>
                <li>Take your time to consider each question carefully</li>
                <li>Your responses will be used to calculate your psychometric credit score</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}