/**
 * AltScore Exact Implementation According to PDF Specifications
 * Team CT_mini - Bryan Binu, Abhijit Avhad, Deepti Sinha, Parth Sujit
 * PSB FinTech Cybersecurity Hackathon 2025
 */

// ================================
// EXACT PDF INTERFACES
// ================================

export interface TraditionalInputsExact {
  // Category 1: Identity & KYC Verification (8 categories for Cf calculation)
  pan_verified: boolean; // +30
  aadhaar_verified: boolean; // +20
  voter_id: boolean; // +10
  bank_passbook: boolean; // +25
  salary_slips: boolean; // +25
  digilocker_verified: boolean; // +30
  
  // Category 2: Financial Behaviour
  upi_monthly_volume: number; // 0, 10K-20K (+20), 20K-50K (+40), >50K (+60)
  utility_bills_ontime: boolean; // +40
  salary_sms_verified: boolean; // +30
  emi_payments_ontime: boolean; // +30
  failed_upi_messages: boolean; // -20
  bnpl_unpaid_dues: boolean; // -30
  
  // Category 3: Credit & Loan App Behaviour
  loan_apps_count: number; // <2 (+10), 2-4 (0), >4 (-20)
  loan_emi_repaid_ontime: boolean; // +20
  loan_emi_missed: boolean; // -25
  no_loan_verified_salary: boolean; // +15
  
  // Category 4: Education & Employment
  degree_verified: boolean; // +25
  employment_verified_linkedin: boolean; // +20
  job_duration_months: number; // >6 months (+25)
  self_employed_verified: boolean; // +20
  studying_fee_upi: boolean; // +10
  online_courses_completed: boolean; // +10
  
  // Category 5: Behavioural Patterns & Search History
  quick_loan_searches: boolean; // -30
  learning_finance_searches: boolean; // +15
  betting_sites_visits: boolean; // -40
  educational_govt_sites: boolean; // +10
  budgeting_apps_usage: boolean; // +10
  
  // Category 6: App & Lifestyle Usage
  paid_ott_subscription: boolean; // +10
  excessive_gaming_apps: boolean; // -10
  betting_gambling_apps: boolean; // -40
  fitness_meditation_apps: boolean; // +10
  inapp_credit_repaid_ontime: boolean; // +15
  cod_orders_only: boolean; // 0
  
  // Category 7: Geolocation & Access
  regular_office_gps_pattern: boolean; // +20
  bank_atm_within_3km: boolean; // +10
  rural_area_no_bank: boolean; // 0
  
  // Category 8: Asset Ownership
  house_verified: boolean; // +50
  car_registered: boolean; // +30
  two_wheeler_rc: boolean; // +10
  rent_income_monthly: number; // ₹5K+ (+25)
  land_property_verified: boolean; // +30
  gst_business_verified: boolean; // +20
}

export interface PsychometricTraits {
  financial_responsibility: number; // 0-5
  delayed_gratification: number; // 0-5
  impulsivity: number; // 0-5
  consistency: number; // 0-5
  risk_aversion: number; // 0-5
  emotional_stability: number; // 0-5
}

export interface PsychometricAnswersExact {
  answers: ('A' | 'B' | 'C' | 'D')[]; // 30 answers
  time_taken_seconds: number;
  session_consistent: boolean;
  device_consistent: boolean;
}

export interface AIInputsExact {
  upi_emi_activity_score: number;
  psychometric_traits: PsychometricTraits;
  app_behaviour_risk_score: number;
  employment_kyc_signals: number;
  search_browser_risk: number;
  data_recency_score: number;
}

// ================================
// TRADITIONAL MODEL (EXACT PDF)
// ================================

export function calculateTraditionalScoreExact(inputs: TraditionalInputsExact): {
  score: number;
  confidence: number;
  categoryScores: number[];
  trustBonus: number;
  driftPenalty: number;
} {
  // Category 1: Identity & KYC Verification
  let cat1_score = 0;
  let cat1_max = 0;
  
  if (inputs.pan_verified) { cat1_score += 30; }
  cat1_max += 30;
  
  if (inputs.aadhaar_verified) { cat1_score += 20; }
  cat1_max += 20;
  
  if (inputs.voter_id) { cat1_score += 10; }
  cat1_max += 10;
  
  if (inputs.bank_passbook) { cat1_score += 25; }
  cat1_max += 25;
  
  if (inputs.salary_slips) { cat1_score += 25; }
  cat1_max += 25;
  
  if (inputs.digilocker_verified) { cat1_score += 30; }
  cat1_max += 30;
  
  const category1 = cat1_max > 0 ? cat1_score / cat1_max : 0;
  
  // Category 2: Financial Behaviour
  let cat2_score = 0;
  let cat2_max = 0;
  
  // UPI Monthly Volume
  if (inputs.upi_monthly_volume >= 50000) { cat2_score += 60; }
  else if (inputs.upi_monthly_volume >= 20000) { cat2_score += 40; }
  else if (inputs.upi_monthly_volume >= 10000) { cat2_score += 20; }
  cat2_max += 60;
  
  if (inputs.utility_bills_ontime) { cat2_score += 40; }
  cat2_max += 40;
  
  if (inputs.salary_sms_verified) { cat2_score += 30; }
  cat2_max += 30;
  
  if (inputs.emi_payments_ontime) { cat2_score += 30; }
  cat2_max += 30;
  
  if (inputs.failed_upi_messages) { cat2_score -= 20; }
  
  if (inputs.bnpl_unpaid_dues) { cat2_score -= 30; }
  
  const category2 = cat2_max > 0 ? Math.max(0, cat2_score) / cat2_max : 0;
  
  // Category 3: Credit & Loan App Behaviour
  let cat3_score = 0;
  let cat3_max = 35; // Base scoring
  
  if (inputs.loan_apps_count < 2) { cat3_score += 10; }
  else if (inputs.loan_apps_count <= 4) { cat3_score += 0; }
  else { cat3_score -= 20; }
  
  if (inputs.loan_emi_repaid_ontime) { cat3_score += 20; }
  if (inputs.loan_emi_missed) { cat3_score -= 25; }
  if (inputs.no_loan_verified_salary) { cat3_score += 15; }
  
  const category3 = Math.max(0, cat3_score + 20) / cat3_max; // Normalize
  
  // Category 4: Education & Employment
  let cat4_score = 0;
  let cat4_max = 0;
  
  if (inputs.degree_verified) { cat4_score += 25; }
  cat4_max += 25;
  
  if (inputs.employment_verified_linkedin) { cat4_score += 20; }
  cat4_max += 20;
  
  if (inputs.job_duration_months > 6) { cat4_score += 25; }
  cat4_max += 25;
  
  if (inputs.self_employed_verified) { cat4_score += 20; }
  cat4_max += 20;
  
  if (inputs.studying_fee_upi) { cat4_score += 10; }
  cat4_max += 10;
  
  if (inputs.online_courses_completed) { cat4_score += 10; }
  cat4_max += 10;
  
  const category4 = cat4_max > 0 ? cat4_score / cat4_max : 0;
  
  // Category 5: Behavioural Patterns & Search History
  let cat5_score = 0;
  let cat5_max = 65; // Base scoring
  
  if (inputs.quick_loan_searches) { cat5_score -= 30; }
  if (inputs.learning_finance_searches) { cat5_score += 15; }
  if (inputs.betting_sites_visits) { cat5_score -= 40; }
  if (inputs.educational_govt_sites) { cat5_score += 10; }
  if (inputs.budgeting_apps_usage) { cat5_score += 10; }
  
  const category5 = Math.max(0, cat5_score + 35) / cat5_max; // Normalize
  
  // Category 6: App & Lifestyle Usage
  let cat6_score = 0;
  let cat6_max = 75; // Base scoring
  
  if (inputs.paid_ott_subscription) { cat6_score += 10; }
  if (inputs.excessive_gaming_apps) { cat6_score -= 10; }
  if (inputs.betting_gambling_apps) { cat6_score -= 40; }
  if (inputs.fitness_meditation_apps) { cat6_score += 10; }
  if (inputs.inapp_credit_repaid_ontime) { cat6_score += 15; }
  // COD orders only = 0 (no change)
  
  const category6 = Math.max(0, cat6_score + 40) / cat6_max; // Normalize
  
  // Category 7: Geolocation & Access
  let cat7_score = 0;
  let cat7_max = 30;
  
  if (inputs.regular_office_gps_pattern) { cat7_score += 20; }
  if (inputs.bank_atm_within_3km) { cat7_score += 10; }
  // Rural area no bank = 0 (no penalty)
  
  const category7 = cat7_max > 0 ? cat7_score / cat7_max : 0;
  
  // Category 8: Asset Ownership
  let cat8_score = 0;
  let cat8_max = 0;
  
  if (inputs.house_verified) { cat8_score += 50; }
  cat8_max += 50;
  
  if (inputs.car_registered) { cat8_score += 30; }
  cat8_max += 30;
  
  if (inputs.two_wheeler_rc) { cat8_score += 10; }
  cat8_max += 10;
  
  if (inputs.rent_income_monthly >= 5000) { cat8_score += 25; }
  cat8_max += 25;
  
  if (inputs.land_property_verified) { cat8_score += 30; }
  cat8_max += 30;
  
  if (inputs.gst_business_verified) { cat8_score += 20; }
  cat8_max += 20;
  
  const category8 = cat8_max > 0 ? cat8_score / cat8_max : 0;
  
  // Calculate Weighted Score (PDF weightings)
  const weightedScore = 
    (category1 * 0.20) + // Identity/KYC: 20%
    (category2 * 0.25) + // Financial: 25%
    (category3 * 0.15) + // Credit/Loan: 15%
    (category4 * 0.15) + // Education/Employment: 15%
    (category5 * 0.05) + // Behavioral: 5%
    (category6 * 0.05) + // App/Lifestyle: 5%
    (category7 * 0.05) + // Geolocation: 5%
    (category8 * 0.10);  // Assets: 10%
  
  // Calculate Confidence Factor (Cf) - PDF page 30
  const verifiedDataPoints = calculateVerifiedDataPoints(inputs);
  const confidence = Math.min(1.0, 0.6 + (verifiedDataPoints * 0.05)); // Max 8 points
  
  // Calculate Trust Bonus (PDF page 29)
  const trustBonus = calculateTrustBonusExact(inputs);
  
  // Calculate Drift Penalty (PDF page 29)
  const driftPenalty = calculateDriftPenaltyExact(inputs);
  
  // Final Traditional Score Formula (PDF page 9)
  const finalScore = Math.min(10, Math.max(0, 
    (confidence * weightedScore * 10) + trustBonus - driftPenalty
  ));
  
  return {
    score: finalScore,
    confidence,
    categoryScores: [category1, category2, category3, category4, category5, category6, category7, category8],
    trustBonus,
    driftPenalty
  };
}

function calculateVerifiedDataPoints(inputs: TraditionalInputsExact): number {
  let points = 0;
  
  // PDF page 28: 8 verified data points max
  if (inputs.pan_verified) points++; // 1. PAN Verification
  if (inputs.aadhaar_verified || inputs.digilocker_verified) points++; // 2. Aadhaar/KYC
  if (inputs.salary_slips || inputs.salary_sms_verified) points++; // 3. Salary verification
  if (inputs.bank_passbook) points++; // 4. Bank statement
  if (inputs.upi_monthly_volume >= 10000) points++; // 5. UPI Activity
  if (inputs.utility_bills_ontime) points++; // 6. Utility bills
  if (inputs.loan_apps_count >= 0 || inputs.emi_payments_ontime) points++; // 7. Loan/EMI data
  if (inputs.regular_office_gps_pattern) points++; // 8. GPS pattern
  
  return Math.min(8, points);
}

function calculateTrustBonusExact(inputs: TraditionalInputsExact): number {
  let bonus = 0;
  
  // PDF page 29: Trust Bonus Criteria (Max +0.5)
  if (inputs.pan_verified && inputs.aadhaar_verified) bonus += 0.2;
  if (inputs.salary_slips || inputs.salary_sms_verified) bonus += 0.2;
  if (inputs.upi_monthly_volume >= 25000) bonus += 0.2; // Consistent UPI >₹25K
  if (inputs.regular_office_gps_pattern) bonus += 0.1;
  if (!inputs.betting_gambling_apps && inputs.loan_apps_count < 4) bonus += 0.1;
  // Device region consistency would be +0.1 (not implemented)
  
  return Math.min(0.5, bonus);
}

function calculateDriftPenaltyExact(inputs: TraditionalInputsExact): number {
  let penalty = 0;
  
  // PDF page 29: Drift Penalty Chart (Max -1.5)
  // These would need historical data comparison, simplified for demo:
  if (inputs.failed_upi_messages) penalty += 0.4; // Simulating UPI drop
  if (inputs.betting_gambling_apps) penalty += 0.3; // High-risk app
  if (!inputs.regular_office_gps_pattern) penalty += 0.3; // GPS pattern lost
  if (inputs.emi_payments_ontime && inputs.loan_emi_missed) penalty += 0.5; // EMI inconsistency
  if (inputs.bnpl_unpaid_dues) penalty += 0.2; // Suspicious patterns
  
  return Math.min(1.5, penalty);
}

// ================================
// PSYCHOMETRIC MODEL (EXACT PDF)
// ================================

export function calculatePsychometricScoreExact(
  traits: PsychometricTraits,
  answers: PsychometricAnswersExact
): {
  score: number;
  confidence: number;
  cddPenalty: number;
} {
  // Calculate raw trait score (PDF page 13)
  const traitSum = 
    traits.financial_responsibility +
    traits.delayed_gratification +
    (5 - traits.impulsivity) + // Inverted
    traits.consistency +
    traits.risk_aversion +
    traits.emotional_stability;
  
  // Normalize to 0-10 scale
  const normalizedScore = (traitSum / 30) * 10;
  
  // Calculate Confidence Factor (PDF page 30)
  const confidence = calculatePsychometricConfidenceExact(answers);
  
  // Apply CDD (Consistency Drift Detection) penalties (PDF page 30)
  const cddPenalty = calculateCDDPenaltyExact(answers, traits);
  
  // Final Psychometric Score (PDF page 13)
  const finalScore = Math.max(0, (confidence * normalizedScore) - cddPenalty);
  
  return {
    score: finalScore,
    confidence,
    cddPenalty
  };
}

function calculatePsychometricConfidenceExact(answers: PsychometricAnswersExact): number {
  let confidencePoints = 0;
  
  // PDF page 30: 6 confidence criteria max
  if (answers.answers.length === 30) confidencePoints++; // 1. Completed all 30
  if (answers.time_taken_seconds >= 60 && answers.time_taken_seconds <= 900) confidencePoints++; // 2. Balanced speed
  if (answers.session_consistent) confidencePoints++; // 3. Consistent session
  if (hasAnswerVariation(answers.answers)) confidencePoints++; // 4. Normal spread
  if (!hasMirroredContradictions(answers.answers)) confidencePoints++; // 5. No contradictions
  if (!hasExtremePsychometricFlags(answers.answers)) confidencePoints++; // 6. No black flags
  
  return Math.min(1.0, 0.3 + (confidencePoints * 0.12)); // PDF formula
}

function calculateCDDPenaltyExact(answers: PsychometricAnswersExact, traits: PsychometricTraits): number {
  let penalty = 0;
  
  // PDF page 30: CDD triggers (Max -1.0)
  if (hasMirroredContradictions(answers.answers)) penalty += 0.3; // 1. Mirrored contradiction
  if (hasAllSameAnswers(answers.answers)) penalty += 0.3; // 2. All same values
  if (traits.impulsivity > 4 && traits.consistency < 2) penalty += 0.4; // 3. Impulsivity vs consistency
  if (hasExtremePolarity(answers.answers)) penalty += 0.2; // 4. Extreme polarity
  if (answers.time_taken_seconds < 45) penalty += 0.2; // 5. Too fast
  
  return Math.min(1.0, penalty);
}

// Helper functions for psychometric analysis
function hasAnswerVariation(answers: ('A' | 'B' | 'C' | 'D')[]): boolean {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(answer => counts[answer]++);
  return Object.values(counts).filter(count => count > 0).length >= 3;
}

function hasMirroredContradictions(answers: ('A' | 'B' | 'C' | 'D')[]): boolean {
  // Simplified - would need actual mirrored question mapping
  return false;
}

function hasExtremePsychometricFlags(answers: ('A' | 'B' | 'C' | 'D')[]): boolean {
  const aCount = answers.filter(a => a === 'A').length;
  const dCount = answers.filter(a => a === 'D').length;
  return (aCount + dCount) > (answers.length * 0.8);
}

function hasAllSameAnswers(answers: ('A' | 'B' | 'C' | 'D')[]): boolean {
  return answers.every(answer => answer === answers[0]);
}

function hasExtremePolarity(answers: ('A' | 'B' | 'C' | 'D')[]): boolean {
  const extremes = answers.filter(a => a === 'A' || a === 'D').length;
  return extremes > (answers.length * 0.7);
}

// ================================
// AI MODEL (EXACT PDF)
// ================================

export function calculateAIScoreExact(inputs: AIInputsExact): {
  score: number;
  confidence: number;
  pod: number;
} {
  // Calculate base Probability of Default (PoD)
  let basePod = 0.15; // Base 15% as mentioned in existing code
  
  // Apply risk factors to increase PoD
  basePod += inputs.app_behaviour_risk_score * 0.1;
  basePod += inputs.search_browser_risk * 0.05;
  basePod += (5 - inputs.psychometric_traits.financial_responsibility) * 0.02;
  basePod += inputs.psychometric_traits.impulsivity * 0.02;
  
  // Apply positive factors to decrease PoD
  basePod -= inputs.upi_emi_activity_score * 0.03;
  basePod -= inputs.employment_kyc_signals * 0.02;
  basePod -= inputs.data_recency_score * 0.01;
  
  // Ensure PoD stays within bounds
  const finalPod = Math.min(0.95, Math.max(0.01, basePod));
  
  // Convert PoD to AI Score using PDF formula (page 16)
  const aiScore = 10 * Math.pow(1 - finalPod, 0.6);
  
  // Calculate confidence based on available data (PDF page 31)
  const confidence = calculateAIConfidenceExact(inputs);
  
  return {
    score: aiScore,
    confidence,
    pod: finalPod
  };
}

function calculateAIConfidenceExact(inputs: AIInputsExact): number {
  let confidencePoints = 0;
  
  // PDF page 31: 6 AI confidence criteria
  if (inputs.upi_emi_activity_score > 0) confidencePoints++; // 1. UPI & EMI activity
  if (inputs.psychometric_traits.financial_responsibility > 0) confidencePoints++; // 2. Psychometric available
  if (inputs.app_behaviour_risk_score >= 0) confidencePoints++; // 3. App behaviour data
  if (inputs.employment_kyc_signals > 0) confidencePoints++; // 4. Employment & KYC
  if (inputs.search_browser_risk >= 0) confidencePoints++; // 5. Search/browser signals
  if (inputs.data_recency_score > 0.5) confidencePoints++; // 6. Recent data (60-90 days)
  
  return Math.min(1.0, 0.4 + (confidencePoints * 0.1)); // Base 0.4 + up to 0.6
}

// ================================
// SCORE FUSION ENGINE (EXACT PDF)
// ================================

export function calculateFinalScoreExact(
  traditionalResult: ReturnType<typeof calculateTraditionalScoreExact>,
  psychometricResult: ReturnType<typeof calculatePsychometricScoreExact>,
  aiResult: ReturnType<typeof calculateAIScoreExact>
): {
  finalScore: number;
  riskCategory: 'EXCELLENT' | 'SAFE' | 'MONITOR' | 'HIGH_RISK';
  weights: { traditional: number; psychometric: number; ai: number };
  trustBonus: number;
  riskPenalty: number;
} {
  // Calculate dynamic weights based on confidence (PDF page 20)
  const totalConfidence = traditionalResult.confidence + psychometricResult.confidence + aiResult.confidence;
  
  const weights = {
    traditional: traditionalResult.confidence / totalConfidence,
    psychometric: psychometricResult.confidence / totalConfidence,
    ai: aiResult.confidence / totalConfidence
  };
  
  // Calculate weighted base score
  const baseScore = 
    (traditionalResult.score * weights.traditional) +
    (psychometricResult.score * weights.psychometric) +
    (aiResult.score * weights.ai);
  
  // Cross-model Trust Bonus (PDF page 19)
  const overallConfidence = totalConfidence / 3;
  const trustBonus = overallConfidence >= 0.5 ? 0.5 : 0;
  
  // Cross-model Risk Penalty (PDF page 19)
  let riskModels = 0;
  if (traditionalResult.score < 4.5) riskModels++;
  if (psychometricResult.score < 4.5) riskModels++;
  if (aiResult.score < 4.5) riskModels++;
  
  const riskPenalty = riskModels >= 2 ? 1.0 : 0;
  
  // Final Score Formula (PDF page 18)
  const finalScore = Math.min(10, Math.max(0, baseScore + trustBonus - riskPenalty));
  
  // Risk Category (PDF page 5)
  let riskCategory: 'EXCELLENT' | 'SAFE' | 'MONITOR' | 'HIGH_RISK';
  if (finalScore >= 8.5) riskCategory = 'EXCELLENT';
  else if (finalScore >= 6.5) riskCategory = 'SAFE';
  else if (finalScore >= 4.5) riskCategory = 'MONITOR';
  else riskCategory = 'HIGH_RISK';
  
  return {
    finalScore,
    riskCategory,
    weights,
    trustBonus,
    riskPenalty
  };
}