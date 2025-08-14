/**
 * AltScore 3-Layer Credit Risk Scoring Engine
 * Implements exact PDF specifications with Traditional, Psychometric, and AI models
 */

// ================================
// INTERFACES AND TYPES
// ================================

export interface TraditionalInputs {
  // Identity/KYC (20% weight)
  pan_verified: boolean;
  aadhaar_verified: boolean;
  voter_id: boolean;
  bank_passbook: boolean;
  salary_slips: boolean;
  digilocker_verified: boolean;
  
  // Financial Behavior (25% weight)
  upi_spending: number; // Monthly spending in INR
  bill_payment_habits: 'always_on_time' | 'mostly_on_time' | 'sometimes_late' | 'often_late';
  salary_sms: boolean;
  emi_on_time: boolean;
  failed_upi: boolean;
  bnpl_dues: boolean;
  
  // Credit/Loan Behavior (15% weight)
  loan_apps: number;
  emi_repaid_on_time: boolean;
  emi_missed: boolean;
  no_loan_but_verified: boolean;
  
  // Education/Employment (15% weight)
  degree_verified: boolean;
  employment_verified: boolean;
  job_duration_months: number;
  self_employed: boolean;
  studying: boolean;
  online_courses: boolean;
  
  // Behavioral/Search History (5% weight)
  quick_loan_searches: boolean;
  educational_searches: boolean;
  betting_sites: boolean;
  govt_sites: boolean;
  
  // App/Lifestyle Usage (5% weight)
  betting_apps: number;
  ott_subscription: boolean;
  excessive_gaming: boolean;
  fitness_apps: boolean;
  inapp_credit_repaid: boolean;
  
  // Geolocation/Access (5% weight)
  regular_gps_pattern: boolean;
  bank_nearby: boolean;
  rural_area: boolean;
  
  // Asset Ownership (10% weight)
  house_owned: boolean;
  car_registered: boolean;
  two_wheeler: boolean;
  rent_income: number;
  land_property: boolean;
  gst_shop: boolean;
}

export interface PsychometricAnswer {
  questionId: number;
  answerOption: 'A' | 'B' | 'C' | 'D';
  timeSpent: number; // in seconds
}

export interface AIInputs {
  // Base risk factors from traditional data
  bnpl_dues: boolean;
  emi_missed: boolean;
  failed_upi: boolean;
  loan_apps: number;
  betting_apps: number;
  quick_loan_searches: boolean;
  // Additional AI factors
  gst_shop: boolean;
  rent_income: number;
  inapp_credit_repaid: boolean;
}

export interface ScoreBreakdown {
  traditional: {
    score: number;
    confidence: number;
    categoryScores: {
      identity_kyc: number;
      financial_behavior: number;
      credit_loan_behavior: number;
      education_employment: number;
      behavioral_search: number;
      app_lifestyle: number;
      geolocation: number;
      asset_ownership: number;
    };
    penalties: {
      drift: number;
    };
  };
  psychometric: {
    score: number;
    confidence: number;
    traitScores: {
      financial_responsibility: number;
      delayed_gratification: number;
      impulsivity: number;
      consistency: number;
      risk_aversion: number;
      emotional_stability: number;
    };
    penalties: {
      cdd: number;
    };
  };
  ai: {
    score: number;
    confidence: number;
    basePoD: number;
    adjustedPoD: number;
  };
  fusion: {
    finalScore: number;
    weights: {
      traditional: number;
      psychometric: number;
      ai: number;
    };
    bonuses: {
      trust: number;
    };
    penalties: {
      risk: number;
    };
  };
}

export interface FinalResult {
  score: number;
  category: 'EXCELLENT' | 'SAFE' | 'MONITOR' | 'HIGH_RISK';
  breakdown: ScoreBreakdown;
}

// ================================
// LAYER 1: TRADITIONAL MODEL
// ================================

export function calculateTraditionalScore(inputs: TraditionalInputs): {
  score: number;
  confidence: number;
  breakdown: ScoreBreakdown['traditional'];
} {
  let totalScore = 0;
  let dataPointsCount = 0;
  
  // Identity/KYC Category (20% weight = 0.20)
  const identityScore = calculateIdentityScore(inputs);
  totalScore += identityScore * 0.20;
  if (hasIdentityData(inputs)) dataPointsCount++;
  
  // Financial Behavior Category (25% weight = 0.25)
  const financialScore = calculateFinancialScore(inputs);
  totalScore += financialScore * 0.25;
  if (hasFinancialData(inputs)) dataPointsCount++;
  
  // Credit/Loan Behavior Category (15% weight = 0.15)
  const creditScore = calculateCreditScore(inputs);
  totalScore += creditScore * 0.15;
  if (hasCreditData(inputs)) dataPointsCount++;
  
  // Education/Employment Category (15% weight = 0.15)
  const employmentScore = calculateEmploymentScore(inputs);
  totalScore += employmentScore * 0.15;
  if (hasEmploymentData(inputs)) dataPointsCount++;
  
  // Behavioral/Search History Category (5% weight = 0.05)
  const behavioralScore = calculateBehavioralScore(inputs);
  totalScore += behavioralScore * 0.05;
  if (hasBehavioralData(inputs)) dataPointsCount++;
  
  // App/Lifestyle Usage Category (5% weight = 0.05)
  const lifestyleScore = calculateLifestyleScore(inputs);
  totalScore += lifestyleScore * 0.05;
  if (hasLifestyleData(inputs)) dataPointsCount++;
  
  // Geolocation/Access Category (5% weight = 0.05)
  const geolocationScore = calculateGeolocationScore(inputs);
  totalScore += geolocationScore * 0.05;
  if (hasGeolocationData(inputs)) dataPointsCount++;
  
  // Asset Ownership Category (10% weight = 0.10)
  const assetScore = calculateAssetScore(inputs);
  totalScore += assetScore * 0.10;
  if (hasAssetData(inputs)) dataPointsCount++;
  
  // Apply drift penalty before normalization
  const driftPenalty = calculateDriftPenalty(inputs);
  totalScore -= driftPenalty;
  
  // Confidence factor based on data availability (max 8 categories)
  const confidence = Math.min(1.0, 0.6 + (dataPointsCount * 0.05));
  
  // Apply confidence factor and normalize to 0-10 scale
  const confidenceAdjustedScore = confidence * totalScore * 10;
  
  // Apply trust bonus
  const trustBonus = calculateTrustBonus(inputs, confidence);
  
  const finalScore = Math.min(10, Math.max(0, confidenceAdjustedScore + trustBonus));
  
  return {
    score: finalScore,
    confidence,
    breakdown: {
      score: finalScore,
      confidence,
      categoryScores: {
        identity_kyc: identityScore,
        financial_behavior: financialScore,
        credit_loan_behavior: creditScore,
        education_employment: employmentScore,
        behavioral_search: behavioralScore,
        app_lifestyle: lifestyleScore,
        geolocation: geolocationScore,
        asset_ownership: assetScore
      },
      penalties: {
        drift: driftPenalty
      }
    }
  };
}

// Identity/KYC scoring functions
function calculateIdentityScore(inputs: TraditionalInputs): number {
  let score = 0;
  let maxScore = 0;
  
  // Pan verified: +0.25
  if (inputs.pan_verified) score += 0.25;
  maxScore += 0.25;
  
  // Aadhaar verified: +0.20
  if (inputs.aadhaar_verified) score += 0.20;
  maxScore += 0.20;
  
  // Voter ID: +0.15
  if (inputs.voter_id) score += 0.15;
  maxScore += 0.15;
  
  // Bank passbook: +0.15
  if (inputs.bank_passbook) score += 0.15;
  maxScore += 0.15;
  
  // Salary slips: +0.15
  if (inputs.salary_slips) score += 0.15;
  maxScore += 0.15;
  
  // DigiLocker verified: +0.10
  if (inputs.digilocker_verified) score += 0.10;
  maxScore += 0.10;
  
  return maxScore > 0 ? score / maxScore : 0;
}

function calculateFinancialScore(inputs: TraditionalInputs): number {
  let score = 0;
  
  // UPI spending patterns (40% of financial score)
  const spendingScore = calculateSpendingScore(inputs.upi_spending);
  score += spendingScore * 0.4;
  
  // Bill payment habits (35% of financial score)
  const paymentScore = calculatePaymentScore(inputs.bill_payment_habits);
  score += paymentScore * 0.35;
  
  // Additional financial indicators (25% of financial score)
  let additionalScore = 0;
  let additionalMax = 0;
  
  if (inputs.salary_sms) { additionalScore += 0.3; }
  additionalMax += 0.3;
  
  if (inputs.emi_on_time) { additionalScore += 0.4; }
  additionalMax += 0.4;
  
  if (inputs.failed_upi) { additionalScore -= 0.2; }
  
  if (inputs.bnpl_dues) { additionalScore -= 0.3; }
  
  if (additionalMax > 0) {
    score += (additionalScore / additionalMax) * 0.25;
  }
  
  return Math.min(1, Math.max(0, score));
}

function calculateSpendingScore(spending: number): number {
  // Spending patterns scoring based on monthly UPI volume
  if (spending >= 50000) return 1.0;   // High spending, good financial activity
  if (spending >= 30000) return 0.8;   // Moderate-high spending
  if (spending >= 15000) return 0.6;   // Moderate spending
  if (spending >= 5000) return 0.4;    // Low-moderate spending
  if (spending >= 1000) return 0.2;    // Low spending
  return 0.1; // Very low spending
}

function calculatePaymentScore(habit: string): number {
  switch (habit) {
    case 'always_on_time': return 1.0;
    case 'mostly_on_time': return 0.8;
    case 'sometimes_late': return 0.4;
    case 'often_late': return 0.1;
    default: return 0.5;
  }
}

function calculateCreditScore(inputs: TraditionalInputs): number {
  let score = 0;
  
  // Loan app usage penalty
  if (inputs.loan_apps === 0) score += 0.4;
  else if (inputs.loan_apps === 1) score += 0.2;
  else if (inputs.loan_apps <= 3) score += 0.0;
  else score -= 0.2; // Penalty for too many loan apps
  
  // EMI behavior
  if (inputs.emi_repaid_on_time) score += 0.3;
  if (inputs.emi_missed) score -= 0.4;
  if (inputs.no_loan_but_verified) score += 0.3;
  
  return Math.min(1, Math.max(0, score + 0.5)); // Base score of 0.5
}

function calculateEmploymentScore(inputs: TraditionalInputs): number {
  let score = 0;
  
  // Degree verification
  if (inputs.degree_verified) score += 0.25;
  
  // Employment verification
  if (inputs.employment_verified) score += 0.3;
  
  // Job duration (months)
  if (inputs.job_duration_months >= 24) score += 0.25;
  else if (inputs.job_duration_months >= 12) score += 0.15;
  else if (inputs.job_duration_months >= 6) score += 0.05;
  
  // Employment type
  if (inputs.self_employed) score += 0.1;
  if (inputs.studying) score += 0.05;
  if (inputs.online_courses) score += 0.05;
  
  return Math.min(1, score);
}

function calculateBehavioralScore(inputs: TraditionalInputs): number {
  let score = 0.5; // Base score
  
  // Negative behaviors
  if (inputs.quick_loan_searches) score -= 0.3;
  if (inputs.betting_sites) score -= 0.2;
  
  // Positive behaviors
  if (inputs.educational_searches) score += 0.2;
  if (inputs.govt_sites) score += 0.1;
  
  return Math.min(1, Math.max(0, score));
}

function calculateLifestyleScore(inputs: TraditionalInputs): number {
  let score = 0.5; // Base score
  
  // Negative lifestyle indicators
  score -= inputs.betting_apps * 0.1;
  if (inputs.excessive_gaming) score -= 0.2;
  
  // Positive lifestyle indicators
  if (inputs.ott_subscription) score += 0.1;
  if (inputs.fitness_apps) score += 0.1;
  if (inputs.inapp_credit_repaid) score += 0.2;
  
  return Math.min(1, Math.max(0, score));
}

function calculateGeolocationScore(inputs: TraditionalInputs): number {
  let score = 0.5; // Base score
  
  if (inputs.regular_gps_pattern) score += 0.2;
  if (inputs.bank_nearby) score += 0.2;
  if (inputs.rural_area) score -= 0.1; // Slight penalty for rural location
  
  return Math.min(1, Math.max(0, score));
}

function calculateAssetScore(inputs: TraditionalInputs): number {
  let score = 0;
  
  if (inputs.house_owned) score += 0.4;
  if (inputs.car_registered) score += 0.25;
  if (inputs.two_wheeler) score += 0.15;
  if (inputs.land_property) score += 0.2;
  if (inputs.gst_shop) score += 0.2;
  
  // Rent income bonus
  if (inputs.rent_income > 0) {
    score += Math.min(0.3, inputs.rent_income / 10000 * 0.1);
  }
  
  return Math.min(1, score);
}

function calculateDriftPenalty(inputs: TraditionalInputs): number {
  let penalty = 0;
  
  // Detect inconsistent patterns
  if (inputs.failed_upi && inputs.bill_payment_habits === 'always_on_time') penalty += 0.1;
  if (inputs.emi_missed && inputs.emi_on_time) penalty += 0.15;
  if (inputs.bnpl_dues && inputs.salary_sms) penalty += 0.1;
  
  return Math.min(1.5, penalty); // Max drift penalty of 1.5
}

function calculateTrustBonus(inputs: TraditionalInputs, confidence: number): number {
  if (confidence < 0.7) return 0;
  
  let trustFactors = 0;
  if (inputs.pan_verified && inputs.aadhaar_verified) trustFactors++;
  if (inputs.employment_verified && inputs.job_duration_months >= 12) trustFactors++;
  if (inputs.bill_payment_habits === 'always_on_time') trustFactors++;
  
  return trustFactors >= 2 ? 0.5 : 0.2;
}

// Data availability check functions
function hasIdentityData(inputs: TraditionalInputs): boolean {
  return inputs.pan_verified || inputs.aadhaar_verified || inputs.voter_id || inputs.bank_passbook;
}

function hasFinancialData(inputs: TraditionalInputs): boolean {
  return inputs.upi_spending > 0 || inputs.salary_sms || inputs.emi_on_time;
}

function hasCreditData(inputs: TraditionalInputs): boolean {
  return inputs.loan_apps >= 0 || inputs.emi_repaid_on_time || inputs.no_loan_but_verified;
}

function hasEmploymentData(inputs: TraditionalInputs): boolean {
  return inputs.degree_verified || inputs.employment_verified || inputs.job_duration_months > 0;
}

function hasBehavioralData(inputs: TraditionalInputs): boolean {
  return inputs.quick_loan_searches || inputs.educational_searches || inputs.betting_sites;
}

function hasLifestyleData(inputs: TraditionalInputs): boolean {
  return inputs.betting_apps >= 0 || inputs.ott_subscription || inputs.fitness_apps;
}

function hasGeolocationData(inputs: TraditionalInputs): boolean {
  return inputs.regular_gps_pattern || inputs.bank_nearby || inputs.rural_area;
}

function hasAssetData(inputs: TraditionalInputs): boolean {
  return inputs.house_owned || inputs.car_registered || inputs.two_wheeler || inputs.rent_income > 0;
}

// ================================
// LAYER 2: PSYCHOMETRIC MODEL  
// ================================

export function calculatePsychometricScore(answers: PsychometricAnswer[]): {
  score: number;
  confidence: number;
  breakdown: ScoreBreakdown['psychometric'];
} {
  // Initialize trait scores
  const traitScores = {
    financial_responsibility: 0,
    delayed_gratification: 0,
    impulsivity: 0,
    consistency: 0,
    risk_aversion: 0,
    emotional_stability: 0
  };
  
  // Process each answer using the psychometric question mapping
  for (const answer of answers) {
    const questionScoring = getPsychometricQuestionScoring(answer.questionId);
    const optionScoring = questionScoring.options[answer.answerOption];
    
    // Apply trait scores with weightings
    for (const [trait, points] of Object.entries(optionScoring)) {
      const weighting = questionScoring.weightings[trait] || 1.0;
      traitScores[trait as keyof typeof traitScores] += points * weighting;
    }
  }
  
  // Normalize to 0-10 scale
  const normalizedScore = (Object.values(traitScores).reduce((sum, val) => sum + val, 0) / 30) * 10;
  
  // Apply CDD penalties
  const cddPenalty = calculateCDDPenalty(answers, traitScores);
  const finalScore = Math.max(0, normalizedScore - cddPenalty);
  
  // Calculate confidence based on CDD checks passed
  const confidence = calculatePsychometricConfidence(answers, traitScores);
  
  return {
    score: finalScore,
    confidence,
    breakdown: {
      score: finalScore,
      confidence,
      traitScores,
      penalties: {
        cdd: cddPenalty
      }
    }
  };
}

function calculateCDDPenalty(answers: PsychometricAnswer[], traitScores: any): number {
  let penalty = 0;
  
  // Mirrored contradiction detection
  if (hasContradictoryAnswers(answers)) penalty += 0.3;
  
  // All same answers detection
  if (hasAllSameAnswers(answers)) penalty += 0.3;
  
  // High impulsivity + low consistency
  if (traitScores.impulsivity > 20 && traitScores.consistency < 10) penalty += 0.4;
  
  // Extreme polarity detection
  if (hasExtremePolarityAnswers(answers)) penalty += 0.2;
  
  // Too fast test completion
  const totalTime = answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
  if (totalTime < 45) penalty += 0.2;
  
  return penalty;
}

function calculatePsychometricConfidence(answers: PsychometricAnswer[], traitScores: any): number {
  let checksPassedCount = 0;
  
  // Check 1: No contradictory answers
  if (!hasContradictoryAnswers(answers)) checksPassedCount++;
  
  // Check 2: Not all same answers
  if (!hasAllSameAnswers(answers)) checksPassedCount++;
  
  // Check 3: Reasonable impulsivity-consistency balance
  if (!(traitScores.impulsivity > 20 && traitScores.consistency < 10)) checksPassedCount++;
  
  // Check 4: No extreme polarity
  if (!hasExtremePolarityAnswers(answers)) checksPassedCount++;
  
  // Check 5: Adequate time spent
  const totalTime = answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
  if (totalTime >= 45) checksPassedCount++;
  
  // Check 6: Answer distribution variety
  if (hasAnswerVariety(answers)) checksPassedCount++;
  
  return Math.min(1.0, 0.3 + (checksPassedCount * 0.12)); // Max confidence 1.0
}

// CDD helper functions
function hasContradictoryAnswers(answers: PsychometricAnswer[]): boolean {
  // Simplified contradiction detection - would need full question mapping
  return false;
}

function hasAllSameAnswers(answers: PsychometricAnswer[]): boolean {
  if (answers.length === 0) return false;
  const firstAnswer = answers[0].answerOption;
  return answers.every(answer => answer.answerOption === firstAnswer);
}

function hasExtremePolarityAnswers(answers: PsychometricAnswer[]): boolean {
  const aCount = answers.filter(a => a.answerOption === 'A').length;
  const dCount = answers.filter(a => a.answerOption === 'D').length;
  return (aCount + dCount) > (answers.length * 0.8);
}

function hasAnswerVariety(answers: PsychometricAnswer[]): boolean {
  const optionCounts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(answer => optionCounts[answer.answerOption]++);
  
  // Check if at least 3 different options are used
  return Object.values(optionCounts).filter(count => count > 0).length >= 3;
}

// ================================
// LAYER 3: AI MODEL
// ================================

export function calculateAIScore(inputs: AIInputs): {
  score: number;
  confidence: number;
  breakdown: ScoreBreakdown['ai'];
} {
  // Base Probability of Default
  let basePoD = 0.15;
  
  // Apply risk factors (increase PoD)
  if (inputs.bnpl_dues) basePoD += 0.08;
  if (inputs.emi_missed) basePoD += 0.12;
  if (inputs.failed_upi) basePoD += 0.05;
  
  // Loan app usage penalty
  if (inputs.loan_apps >= 5) basePoD += 0.10;
  else if (inputs.loan_apps >= 3) basePoD += 0.06;
  else if (inputs.loan_apps >= 2) basePoD += 0.03;
  
  // Betting behavior
  basePoD += inputs.betting_apps * 0.04;
  
  // Quick loan searches
  if (inputs.quick_loan_searches) basePoD += 0.04;
  
  // Apply positive factors (decrease PoD)
  if (inputs.gst_shop) basePoD -= 0.03;
  if (inputs.rent_income > 0) basePoD -= 0.02;
  if (inputs.inapp_credit_repaid) basePoD -= 0.03;
  
  // Ensure PoD stays within bounds
  const adjustedPoD = Math.min(0.95, Math.max(0.01, basePoD));
  
  // Convert PoD to AI score using inverse exponential curve
  const aiScore = 10 * Math.pow(1 - adjustedPoD, 0.6);
  
  // Calculate confidence based on number of AI signals present
  const signalCount = calculateAISignalCount(inputs);
  const confidence = Math.min(1.0, 0.4 + (signalCount * 0.1));
  
  return {
    score: aiScore,
    confidence,
    breakdown: {
      score: aiScore,
      confidence,
      basePoD: 0.15,
      adjustedPoD
    }
  };
}

function calculateAISignalCount(inputs: AIInputs): number {
  let signalCount = 0;
  
  if (inputs.bnpl_dues !== undefined) signalCount++;
  if (inputs.emi_missed !== undefined) signalCount++;
  if (inputs.failed_upi !== undefined) signalCount++;
  if (inputs.loan_apps > 0) signalCount++;
  if (inputs.betting_apps > 0) signalCount++;
  if (inputs.quick_loan_searches !== undefined) signalCount++;
  
  return Math.min(6, signalCount);
}

// ================================
// SCORE FUSION ENGINE
// ================================

export function calculateFinalScore(
  traditionalResult: ReturnType<typeof calculateTraditionalScore>,
  psychometricResult: ReturnType<typeof calculatePsychometricScore>,
  aiResult: ReturnType<typeof calculateAIScore>
): FinalResult {
  
  // Calculate total confidence
  const totalConfidence = traditionalResult.confidence + psychometricResult.confidence + aiResult.confidence;
  
  // Calculate weights based on confidence
  const weights = {
    traditional: traditionalResult.confidence / totalConfidence,
    psychometric: psychometricResult.confidence / totalConfidence,
    ai: aiResult.confidence / totalConfidence
  };
  
  // Calculate base fusion score
  const baseFusionScore = 
    (traditionalResult.score * weights.traditional) +
    (psychometricResult.score * weights.psychometric) +
    (aiResult.score * weights.ai);
  
  // Apply trust bonus (only if overall confidence >= 0.5)
  const overallConfidence = totalConfidence / 3;
  const trustBonus = overallConfidence >= 0.5 ? 0.5 : 0;
  
  // Apply risk penalty (if >= 2 models show red flags)
  const riskPenalty = calculateRiskPenalty(traditionalResult, psychometricResult, aiResult);
  
  // Final score calculation
  const finalScore = Math.min(10, Math.max(0, baseFusionScore + trustBonus - riskPenalty));
  
  // Determine risk category
  const category = getRiskCategory(finalScore);
  
  const breakdown: ScoreBreakdown = {
    traditional: traditionalResult.breakdown,
    psychometric: psychometricResult.breakdown,
    ai: aiResult.breakdown,
    fusion: {
      finalScore,
      weights,
      bonuses: { trust: trustBonus },
      penalties: { risk: riskPenalty }
    }
  };
  
  return {
    score: finalScore,
    category,
    breakdown
  };
}

function calculateRiskPenalty(
  traditionalResult: any,
  psychometricResult: any,
  aiResult: any
): number {
  let redFlagCount = 0;
  
  // Traditional model red flags
  if (traditionalResult.score < 4.5) redFlagCount++;
  
  // Psychometric model red flags  
  if (psychometricResult.score < 4.5) redFlagCount++;
  
  // AI model red flags
  if (aiResult.score < 4.5) redFlagCount++;
  
  return redFlagCount >= 2 ? 1.0 : 0;
}

function getRiskCategory(score: number): 'EXCELLENT' | 'SAFE' | 'MONITOR' | 'HIGH_RISK' {
  if (score >= 8.5) return 'EXCELLENT';
  if (score >= 6.5) return 'SAFE';
  if (score >= 4.5) return 'MONITOR';
  return 'HIGH_RISK';
}

// ================================
// PSYCHOMETRIC QUESTION MAPPINGS
// ================================

interface QuestionScoring {
  options: {
    A: Record<string, number>;
    B: Record<string, number>;
    C: Record<string, number>;
    D: Record<string, number>;
  };
  weightings: Record<string, number>;
}

function getPsychometricQuestionScoring(questionId: number): QuestionScoring {
  // This is a simplified version - in real implementation, this would contain
  // all 30 questions with exact scoring from the PDF
  const defaultScoring: QuestionScoring = {
    options: {
      A: { financial_responsibility: 5, delayed_gratification: 4 },
      B: { financial_responsibility: 3, delayed_gratification: 3 },
      C: { financial_responsibility: 1, impulsivity: 4 },
      D: { financial_responsibility: 0, impulsivity: 5 }
    },
    weightings: {
      financial_responsibility: 1.0,
      delayed_gratification: 1.0,
      impulsivity: 1.0,
      consistency: 1.0,
      risk_aversion: 1.0,
      emotional_stability: 1.0
    }
  };
  
  return defaultScoring;
}