import { User, Assessment } from "@shared/schema";
import { CalculatedScores, TraitScores, ScoreBreakdown } from "../types/assessment";

interface ScoringInput {
  user: User;
  assessment: Assessment;
  psychometricAnswers: Record<string, number>;
}

export function calculateScores(input: ScoringInput): CalculatedScores {
  const traditional = calculateTraditionalScore(input);
  const psychometric = calculatePsychometricScore(input);
  const ai = calculateAIScore(input, traditional, psychometric);
  
  const final = calculateFinalScore(traditional, psychometric, ai, input);
  
  return {
    traditional: traditional.score,
    psychometric: psychometric.score,
    ai: ai.score,
    final: final.score,
    confidence: final.confidence,
    category: getRiskCategory(final.score),
    defaultProbability: calculateDefaultProbability(final.score),
    traditionalBreakdown: traditional.breakdown,
    psychometricBreakdown: psychometric.breakdown,
    featureImportance: ai.featureImportance
  };
}

function calculateTraditionalScore(input: ScoringInput) {
  const { user, assessment } = input;
  
  // Traditional Scoring Model (Document + Declaration Based)
  const breakdown: ScoreBreakdown = {
    financial_data: calculateFinancialDataScore(assessment),
    identity_kyc: calculateKYCScore(assessment, user),
    assets: calculateAssetScore(user, assessment),
    employment_education: calculateEmploymentScore(user, assessment),
    credit_app_usage: 0.8, // Default reasonable value
    geolocation: calculateLocationScore(user),
    behavioral_risk: calculateBehavioralRiskScore(assessment),
    lifestyle: calculateLifestyleScore(assessment)
  };

  // Apply category weights
  const weights: ScoreBreakdown = {
    financial_data: 0.25,
    identity_kyc: 0.20,
    assets: 0.15,
    employment_education: 0.15,
    credit_app_usage: 0.10,
    geolocation: 0.05,
    behavioral_risk: 0.05,
    lifestyle: 0.05
  };

  let weightedScore = 0;
  for (const [category, score] of Object.entries(breakdown)) {
    weightedScore += score * weights[category as keyof ScoreBreakdown];
  }

  // Apply confidence factor (Cf = 0.6 to 1.0)
  const dataPoints = (assessment.uploadedDocuments?.length || 0) + 
                    (user.email ? 1 : 0) + 
                    (user.phone ? 1 : 0) + 
                    (user.fullName ? 1 : 0);
  const confidenceFactor = Math.min(1.0, 0.6 + (dataPoints * 0.04));

  // Apply trust bonus and drift penalty
  const trustBonus = (assessment.uploadedDocuments?.length || 0) >= 3 ? 0.5 : 0.2;
  const driftPenalty = 0; // No negative patterns detected in this simulation

  const finalScore = (confidenceFactor * weightedScore * 10) + trustBonus - driftPenalty;
  
  return {
    score: Math.min(10, Math.max(0, finalScore)),
    breakdown,
    confidence: confidenceFactor
  };
}

function calculatePsychometricScore(input: ScoringInput) {
  const { psychometricAnswers } = input;
  
  // Initialize trait scores
  const traits: TraitScores = {
    financial_responsibility: 0,
    delayed_gratification: 0,
    impulsivity: 0,
    consistency: 0,
    risk_aversion: 0,
    emotional_stability: 0
  };

  const traitCounts: Record<string, number> = {};
  
  // Process psychometric answers (simplified version)
  for (const [questionId, answerIndex] of Object.entries(psychometricAnswers)) {
    // This would normally reference the actual question data
    // For now, we'll use a simplified scoring approach
    const qId = parseInt(questionId);
    
    // Simulate trait scoring based on answer patterns
    if (qId <= 5) {
      traits.financial_responsibility += answerIndex <= 1 ? 4 : 2;
      traitCounts.financial_responsibility = (traitCounts.financial_responsibility || 0) + 1;
    }
    if (qId <= 10) {
      traits.delayed_gratification += answerIndex === 0 ? 5 : answerIndex === 1 ? 3 : 1;
      traitCounts.delayed_gratification = (traitCounts.delayed_gratification || 0) + 1;
    }
    if (qId <= 15) {
      traits.impulsivity += answerIndex >= 2 ? 4 : 1;
      traitCounts.impulsivity = (traitCounts.impulsivity || 0) + 1;
    }
    if (qId <= 20) {
      traits.consistency += answerIndex <= 1 ? 4 : 2;
      traitCounts.consistency = (traitCounts.consistency || 0) + 1;
    }
    if (qId <= 25) {
      traits.risk_aversion += answerIndex === 0 ? 5 : answerIndex === 1 ? 3 : 1;
      traitCounts.risk_aversion = (traitCounts.risk_aversion || 0) + 1;
    }
    if (qId <= 30) {
      traits.emotional_stability += answerIndex <= 1 ? 4 : 2;
      traitCounts.emotional_stability = (traitCounts.emotional_stability || 0) + 1;
    }
  }

  // Calculate averages
  for (const trait in traits) {
    const count = traitCounts[trait] || 1;
    traits[trait as keyof TraitScores] = traits[trait as keyof TraitScores] / count;
  }

  // Apply consistency drift detection
  const consistencyPenalty = detectConsistencyDrift(traits);
  
  // Calculate overall psychometric score with trait weights
  const psychScore = (
    traits.financial_responsibility * 0.25 +
    traits.delayed_gratification * 0.20 +
    (5 - traits.impulsivity) * 0.20 + // Invert impulsivity
    traits.consistency * 0.15 +
    traits.risk_aversion * 0.10 +
    traits.emotional_stability * 0.10
  ) * 2; // Scale to 0-10

  return {
    score: Math.max(0, psychScore - consistencyPenalty),
    breakdown: traits,
    confidence: Object.keys(psychometricAnswers).length / 30
  };
}

function calculateAIScore(input: ScoringInput, traditional: any, psychometric: any) {
  const { user, assessment } = input;
  
  // AI Model Simulation - XGBoost-like behavior
  const features = {
    traditional_score: traditional.score / 10,
    psychometric_score: psychometric.score / 10,
    document_completeness: (assessment.uploadedDocuments?.length || 0) / 4,
    income_level: getIncomeScore(user.income),
    employment_stability: getOccupationScore(user.occupation),
    age_factor: getAgeScore(user.age),
    education_level: getEducationScore(user.education)
  };

  const featureWeights = {
    traditional_score: 0.30,
    psychometric_score: 0.25,
    document_completeness: 0.15,
    income_level: 0.10,
    employment_stability: 0.10,
    age_factor: 0.05,
    education_level: 0.05
  };

  let aiScore = 0;
  for (const [feature, value] of Object.entries(features)) {
    aiScore += value * featureWeights[feature as keyof typeof featureWeights];
  }

  // Apply non-linear transformations (simulate XGBoost tree decisions)
  if (features.traditional_score > 0.8 && features.psychometric_score > 0.7) {
    aiScore += 0.1; // Bonus for high scores in both models
  }
  
  if (features.document_completeness < 0.5) {
    aiScore -= 0.2; // Penalty for incomplete documentation
  }

  return {
    score: Math.min(10, Math.max(0, aiScore * 10)),
    featureImportance: features,
    confidence: (features.document_completeness + features.traditional_score + features.psychometric_score) / 3
  };
}

function calculateFinalScore(traditional: any, psychometric: any, ai: any, input: ScoringInput) {
  // Score Fusion Engine with Dynamic Weighting
  const traditionalConfidence = traditional.confidence;
  const psychometricConfidence = psychometric.confidence;
  const aiConfidence = ai.confidence;

  // Normalize weights to sum to 1.0
  const totalConfidence = traditionalConfidence + psychometricConfidence + aiConfidence;
  const weights = {
    traditional: traditionalConfidence / totalConfidence,
    psychometric: psychometricConfidence / totalConfidence,
    ai: aiConfidence / totalConfidence
  };

  // Calculate weighted final score
  let finalScore = (
    traditional.score * weights.traditional +
    psychometric.score * weights.psychometric +
    ai.score * weights.ai
  );

  // Cross-model validation bonuses/penalties
  const scores = [traditional.score, psychometric.score, ai.score];
  const avgScore = scores.reduce((a, b) => a + b, 0) / 3;
  const variance = scores.reduce((a, b) => a + Math.pow(b - avgScore, 2), 0) / 3;

  if (variance < 0.5 && avgScore > 7) {
    finalScore += 0.2; // Trust bonus for consistent high scores
  } else if (variance > 2) {
    finalScore -= 0.3; // Risk penalty for inconsistent scores
  }

  const overallConfidence = (traditionalConfidence + psychometricConfidence + aiConfidence) / 3;

  return {
    score: Math.min(10, Math.max(0, finalScore)),
    confidence: overallConfidence
  };
}

// Helper functions
function calculateFinancialDataScore(assessment: Assessment): number {
  const upiScore = getUPIVolumeScore(assessment.upiVolume);
  const billScore = getBillPaymentScore(assessment.billPaymentHabits);
  const bankingScore = getBankingPreferenceScore(assessment.bankingPreference);
  const savingsScore = getSavingsBehaviorScore(assessment.savingsBehavior);
  
  return (upiScore + billScore + bankingScore + savingsScore) / 4;
}

function calculateKYCScore(assessment: Assessment, user: User): number {
  const docScore = Math.min(1.0, (assessment.uploadedDocuments?.length || 0) * 0.25);
  const emailScore = user.email?.includes('@') ? 0.3 : 0.1;
  const phoneScore = user.phone ? 0.2 : 0;
  const nameScore = user.fullName ? 0.2 : 0;
  
  return docScore + emailScore + phoneScore + nameScore;
}

function calculateAssetScore(user: User, assessment: Assessment): number {
  const residentialScore = getResidentialScore(user.residential);
  const deviceScore = 0.3; // Assume smartphone ownership
  
  return (residentialScore + deviceScore) / 2;
}

function calculateEmploymentScore(user: User, assessment: Assessment): number {
  const occupationScore = getOccupationScore(user.occupation);
  const educationScore = getEducationScore(user.education);
  const docScore = assessment.uploadedDocuments?.includes('salary') ? 0.5 : 0;
  
  return (occupationScore + educationScore + docScore) / 3;
}

function calculateLocationScore(user: User): number {
  // Simple urban/rural classification based on common city names
  const majorCities = ['mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 'pune', 'ahmedabad'];
  const isUrban = majorCities.some(city => user.city.toLowerCase().includes(city));
  
  return isUrban ? 0.8 : 0.6;
}

function calculateBehavioralRiskScore(assessment: Assessment): number {
  // Based on declared financial behavior patterns
  let riskScore = 0.8; // Default low risk
  
  if (assessment.billPaymentHabits === 'often-late') riskScore -= 0.3;
  if (assessment.savingsBehavior === 'no-savings') riskScore -= 0.2;
  
  return Math.max(0, riskScore);
}

function calculateLifestyleScore(assessment: Assessment): number {
  // Based on spending and banking preferences
  let lifestyleScore = 0.6; // Default moderate
  
  if (assessment.bankingPreference === 'digital-first') lifestyleScore += 0.2;
  if (assessment.savingsBehavior === 'regular-saver') lifestyleScore += 0.2;
  
  return Math.min(1.0, lifestyleScore);
}

function detectConsistencyDrift(traits: TraitScores): number {
  // Simple consistency check - penalize extreme contradictions
  const contradictions = [
    Math.abs(traits.financial_responsibility - (5 - traits.impulsivity)),
    Math.abs(traits.consistency - traits.financial_responsibility)
  ];
  
  const maxContradiction = Math.max(...contradictions);
  return maxContradiction > 3 ? 1.0 : 0;
}

// Scoring helper functions
function getUPIVolumeScore(volume?: string | null): number {
  const scores: Record<string, number> = {
    '0-5k': 0.4,
    '5k-15k': 0.6,
    '15k-30k': 0.8,
    '30k-50k': 0.9,
    '50k+': 1.0
  };
  return scores[volume || '15k-30k'] || 0.7;
}

function getBillPaymentScore(habits?: string | null): number {
  const scores: Record<string, number> = {
    'always-on-time': 1.0,
    'usually-on-time': 0.8,
    'sometimes-late': 0.5,
    'often-late': 0.2
  };
  return scores[habits || 'usually-on-time'] || 0.8;
}

function getBankingPreferenceScore(preference?: string | null): number {
  const scores: Record<string, number> = {
    'digital-first': 1.0,
    'mixed': 0.7,
    'prefer-cash': 0.4,
    'minimal': 0.3
  };
  return scores[preference || 'mixed'] || 0.7;
}

function getSavingsBehaviorScore(behavior?: string | null): number {
  const scores: Record<string, number> = {
    'regular-saver': 1.0,
    'occasional-saver': 0.7,
    'spend-everything': 0.3,
    'no-savings': 0.1
  };
  return scores[behavior || 'occasional-saver'] || 0.7;
}

function getIncomeScore(income: string): number {
  const scores: Record<string, number> = {
    '0-25k': 0.4,
    '25k-50k': 0.6,
    '50k-100k': 0.8,
    '100k+': 1.0
  };
  return scores[income] || 0.6;
}

function getOccupationScore(occupation: string): number {
  const scores: Record<string, number> = {
    'government': 1.0,
    'private': 0.8,
    'business': 0.7,
    'freelancer': 0.6,
    'gig': 0.5,
    'student': 0.4,
    'other': 0.5
  };
  return scores[occupation] || 0.6;
}

function getEducationScore(education: string): number {
  const scores: Record<string, number> = {
    'below-10th': 0.2,
    '10th': 0.3,
    '12th': 0.5,
    'graduate': 0.7,
    'postgraduate': 0.9,
    'professional': 1.0
  };
  return scores[education] || 0.7;
}

function getAgeScore(age: number): number {
  if (age < 22) return 0.4;
  if (age < 30) return 0.8;
  if (age < 45) return 1.0;
  if (age < 60) return 0.9;
  return 0.7;
}

function getResidentialScore(residential: string): number {
  const scores: Record<string, number> = {
    'owned': 1.0,
    'family': 0.7,
    'rented': 0.5
  };
  return scores[residential] || 0.5;
}

function getRiskCategory(score: number): string {
  if (score >= 8.5) return 'excellent';
  if (score >= 6.5) return 'safe';
  if (score >= 4.5) return 'monitor';
  return 'high-risk';
}

function calculateDefaultProbability(score: number): number {
  // Inverse exponential relationship
  return Math.max(0.05, Math.min(0.95, Math.exp(-(score - 2) / 2) * 0.8));
}
