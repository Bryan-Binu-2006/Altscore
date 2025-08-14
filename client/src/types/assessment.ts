export interface PsychometricAnswer {
  questionId: number;
  selectedOption: number;
  timeSpent?: number;
}

export interface TraitScores extends Record<string, number> {
  financial_responsibility: number;
  delayed_gratification: number;
  impulsivity: number;
  consistency: number;
  risk_aversion: number;
  emotional_stability: number;
}

export interface ScoreBreakdown extends Record<string, number> {
  financial_data: number;
  identity_kyc: number;
  assets: number;
  employment_education: number;
  credit_app_usage: number;
  geolocation: number;
  behavioral_risk: number;
  lifestyle: number;
}

export interface CalculatedScores {
  traditional: number;
  psychometric: number;
  ai: number;
  final: number;
  confidence: number;
  category: string;
  defaultProbability: number;
  traditionalBreakdown: ScoreBreakdown;
  psychometricBreakdown: TraitScores;
  featureImportance: Record<string, number>;
}

export interface DocumentStatus {
  type: string;
  uploaded: boolean;
  verified: boolean;
  processingTime?: number;
}

export interface AssessmentProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  percentage: number;
}

export type RiskCategory = 'excellent' | 'safe' | 'monitor' | 'high-risk';

export interface ScoreFactors {
  positive: Array<{
    factor: string;
    impact: number;
    description: string;
  }>;
  negative: Array<{
    factor: string;
    impact: number;
    description: string;
  }>;
}

export interface Recommendation {
  title: string;
  description: string;
  impact: number;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
}
