import { DemoProfile } from './demo-profiles';

export interface UserInputData {
  // Identity & KYC
  pan_verified?: boolean;
  aadhaar_verified?: boolean;
  voter_id?: boolean;
  bank_passbook?: boolean;
  salary_slips?: boolean;
  digilocker_verified?: boolean;
  
  // Financial Behaviour
  upi_spending: number;
  bill_payment: "On time" | "Sometimes late" | "Often late" | "Always on time" | "Mostly on time";
  salary_sms?: boolean;
  emi_on_time?: boolean;
  failed_upi?: boolean;
  bnpl_dues?: boolean;
  
  // Credit & Loan App Behaviour
  loan_apps: number;
  emi_repaid_on_time?: boolean;
  emi_missed?: boolean;
  no_loan_but_verified?: boolean;
  
  // Education & Employment
  degree_verified?: boolean;
  employment_verified?: boolean;
  job_duration_months?: number;
  self_employed?: boolean;
  studying?: boolean;
  online_courses?: boolean;
  
  // Behavioural/Search History
  quick_loan_searches?: boolean;
  educational_searches?: boolean;
  betting_sites?: boolean;
  govt_sites?: boolean;
  budgeting_apps?: boolean;
  
  // App/Lifestyle Usage
  betting_apps: number;
  ott_subscription?: boolean;
  excessive_gaming?: boolean;
  fitness_apps?: boolean;
  inapp_credit_repaid?: boolean;
  
  // Geolocation & Access
  regular_gps_pattern?: boolean;
  bank_nearby?: boolean;
  rural_area?: boolean;
  
  // Asset Ownership
  house_owned?: boolean;
  car_registered?: boolean;
  two_wheeler?: boolean;
  rent_income?: number;
  land_property?: boolean;
  gst_shop?: boolean;
  
  // Psychometric scores (0-5 each)
  financial_responsibility?: number;
  delayed_gratification?: number;
  impulsivity?: number;
  consistency?: number;
  risk_aversion?: number;
  emotional_stability?: number;
  
  // For simplified input compatibility
  installed_apps?: string[];
  psych_score?: number;
  ai_score?: number;
}

export interface ScoreResult {
  finalScore: number;
  traditionalScore: number;
  psychometricScore: number;
  aiScore: number;
  trustBonus: number;
  riskPenalty: number;
  insights: string[];
  breakdown: {
    identityKyc?: { points: number; reason: string };
    financialBehaviour?: { points: number; reason: string };
    creditLoanBehaviour?: { points: number; reason: string };
    educationEmployment?: { points: number; reason: string };
    behavioralSearch?: { points: number; reason: string };
    appLifestyle?: { points: number; reason: string };
    geolocationAccess?: { points: number; reason: string };
    assetOwnership?: { points: number; reason: string };
    // Legacy fields for backward compatibility
    upiSpending?: { points: number; reason: string };
    billPayment?: { points: number; reason: string };
    loanApps?: { points: number; reason: string };
    bettingApps?: { points: number; reason: string };
  };
  confidence?: {
    traditional: number;
    psychometric: number;
    ai: number;
  };
  weights?: {
    traditional: number;
    psychometric: number;
    ai: number;
  };
  aiPoD?: number;
}

// Weights for final score calculation
const WEIGHTS = {
  traditional: 0.4,
  psychometric: 0.3,
  ai: 0.3
};

export function calculateTraditionalScore(data: UserInputData): { score: number; breakdown: any; confidence: number; trustBonus: number; driftPenalty: number } {
  let totalPoints = 0;
  const breakdown = {
    identityKyc: { points: 0, reason: '' },
    financialBehaviour: { points: 0, reason: '' },
    creditLoanBehaviour: { points: 0, reason: '' },
    educationEmployment: { points: 0, reason: '' },
    behavioralSearch: { points: 0, reason: '' },
    appLifestyle: { points: 0, reason: '' },
    geolocationAccess: { points: 0, reason: '' },
    assetOwnership: { points: 0, reason: '' },
    // Legacy fields for backward compatibility
    upiSpending: { points: 0, reason: '' },
    billPayment: { points: 0, reason: '' },
    loanApps: { points: 0, reason: '' },
    bettingApps: { points: 0, reason: '' }
  };

  // CATEGORY 1: Identity & KYC (Max 140 points)
  let identityPoints = 0;
  let identityReasons = [];
  if (data.pan_verified) { identityPoints += 30; identityReasons.push('PAN verified (+30)'); }
  if (data.aadhaar_verified) { identityPoints += 20; identityReasons.push('Aadhaar linked (+20)'); }
  if (data.voter_id) { identityPoints += 10; identityReasons.push('Voter ID uploaded (+10)'); }
  if (data.bank_passbook) { identityPoints += 25; identityReasons.push('Bank passbook (+25)'); }
  if (data.salary_slips) { identityPoints += 25; identityReasons.push('Salary slips (+25)'); }
  if (data.digilocker_verified) { identityPoints += 30; identityReasons.push('DigiLocker verified (+30)'); }
  breakdown.identityKyc = { points: identityPoints, reason: identityReasons.join(', ') || 'No identity documents verified' };
  totalPoints += identityPoints;

  // CATEGORY 2: Financial Behaviour (Max 160 points)
  let financialPoints = 0;
  let financialReasons = [];
  
  // UPI spending tiers
  if (data.upi_spending >= 50000) {
    financialPoints += 60;
    financialReasons.push('UPI >₹50K monthly (+60)');
  } else if (data.upi_spending >= 20000) {
    financialPoints += 40;
    financialReasons.push('UPI ₹20K-₹50K monthly (+40)');
  } else if (data.upi_spending >= 10000) {
    financialPoints += 20;
    financialReasons.push('UPI ₹10K-₹20K monthly (+20)');
  }
  
  // Bill payments - exact match for specifications
  if (data.bill_payment === "On time" || data.bill_payment === "Always on time" || data.bill_payment === "Mostly on time") {
    financialPoints += 40;
    financialReasons.push('On-time utility bills (+40)');
  }
  
  // Other financial indicators
  if (data.salary_sms) { financialPoints += 30; financialReasons.push('Salary SMS (+30)'); }
  if (data.emi_on_time) { financialPoints += 30; financialReasons.push('EMI payments on time (+30)'); }
  if (data.failed_upi) { financialPoints -= 20; financialReasons.push('Failed UPI/low balance (-20)'); }
  if (data.bnpl_dues) { financialPoints -= 30; financialReasons.push('Excessive BNPL dues (-30)'); }
  
  breakdown.financialBehaviour = { points: financialPoints, reason: financialReasons.join(', ') || 'No financial behavior data' };
  breakdown.upiSpending = { points: data.upi_spending >= 10000 ? (data.upi_spending >= 50000 ? 60 : data.upi_spending >= 20000 ? 40 : 20) : 0, reason: 'UPI spending tier' };
  breakdown.billPayment = { points: (data.bill_payment === "On time" || data.bill_payment === "Always on time" || data.bill_payment === "Mostly on time") ? 40 : 0, reason: 'Bill payment behavior' };
  totalPoints += financialPoints;

  // CATEGORY 3: Credit & Loan App Behaviour (Max 55 points)
  let creditPoints = 0;
  let creditReasons = [];
  
  // Loan app count scoring
  if (data.loan_apps < 2) {
    creditPoints += 10;
    creditReasons.push('<2 loan apps (+10)');
  } else if (data.loan_apps >= 2 && data.loan_apps <= 4) {
    creditReasons.push('2-4 loan apps (0)');
  } else if (data.loan_apps > 4) {
    creditPoints -= 20;
    creditReasons.push('>4 loan apps (-20)');
  }
  
  if (data.emi_repaid_on_time) { creditPoints += 20; creditReasons.push('Loan EMI repaid on time (+20)'); }
  if (data.emi_missed) { creditPoints -= 25; creditReasons.push('Loan EMI missed (-25)'); }
  if (data.no_loan_but_verified) { creditPoints += 15; creditReasons.push('No loan app but verified salary (+15)'); }
  
  breakdown.creditLoanBehaviour = { points: creditPoints, reason: creditReasons.join(', ') || 'No credit behavior data' };
  breakdown.loanApps = { points: data.loan_apps < 2 ? 10 : data.loan_apps > 4 ? -20 : 0, reason: 'Loan app count impact' };
  totalPoints += creditPoints;

  // CATEGORY 4: Education & Employment (Max 90 points)
  let educationPoints = 0;
  let educationReasons = [];
  
  if (data.degree_verified) { educationPoints += 25; educationReasons.push('Degree recognized (+25)'); }
  if (data.employment_verified) { educationPoints += 20; educationReasons.push('Verified employment (+20)'); }
  if (data.job_duration_months && data.job_duration_months > 6) { educationPoints += 25; educationReasons.push('>6 months current job (+25)'); }
  if (data.self_employed) { educationPoints += 20; educationReasons.push('Self-employed verified (+20)'); }
  if (data.studying) { educationPoints += 10; educationReasons.push('Currently studying (+10)'); }
  if (data.online_courses) { educationPoints += 10; educationReasons.push('Completed online course (+10)'); }
  
  breakdown.educationEmployment = { points: educationPoints, reason: educationReasons.join(', ') || 'No education/employment data' };
  totalPoints += educationPoints;

  // CATEGORY 5: Behavioural/Search History (Max 35 points, Min -70)
  let behavioralPoints = 0;
  let behavioralReasons = [];
  
  if (data.quick_loan_searches) { behavioralPoints -= 30; behavioralReasons.push('Quick loan searches (-30)'); }
  if (data.educational_searches) { behavioralPoints += 15; behavioralReasons.push('Learning/finance searches (+15)'); }
  if (data.betting_sites) { behavioralPoints -= 40; behavioralReasons.push('Betting site visits (-40)'); }
  if (data.govt_sites) { behavioralPoints += 10; behavioralReasons.push('Educational/govt sites (+10)'); }
  if (data.budgeting_apps) { behavioralPoints += 10; behavioralReasons.push('Budgeting apps (+10)'); }
  
  breakdown.behavioralSearch = { points: behavioralPoints, reason: behavioralReasons.join(', ') || 'No behavioral data' };
  totalPoints += behavioralPoints;

  // CATEGORY 6: App/Lifestyle Usage (Max 35 points, Min -50)
  let appPoints = 0;
  let appReasons = [];
  
  if (data.ott_subscription) { appPoints += 10; appReasons.push('Paid OTT subscription (+10)'); }
  if (data.excessive_gaming) { appPoints -= 10; appReasons.push('Excessive gaming apps (-10)'); }
  if (data.betting_apps > 0) { appPoints -= 40; appReasons.push('Betting/gambling app (-40)'); }
  if (data.fitness_apps) { appPoints += 10; appReasons.push('Fitness/meditation app (+10)'); }
  if (data.inapp_credit_repaid) { appPoints += 15; appReasons.push('In-app credit repaid (+15)'); }
  
  breakdown.appLifestyle = { points: appPoints, reason: appReasons.join(', ') || 'No app lifestyle data' };
  breakdown.bettingApps = { points: data.betting_apps > 0 ? -40 : 0, reason: 'Betting app presence' };
  totalPoints += appPoints;

  // CATEGORY 7: Geolocation & Access (Max 30 points)
  let geoPoints = 0;
  let geoReasons = [];
  
  if (data.regular_gps_pattern) { geoPoints += 20; geoReasons.push('Regular office/college GPS (+20)'); }
  if (data.bank_nearby) { geoPoints += 10; geoReasons.push('Bank/ATM within 3km (+10)'); }
  if (data.rural_area) { geoReasons.push('Rural area (0)'); } // No points for rural
  
  breakdown.geolocationAccess = { points: geoPoints, reason: geoReasons.join(', ') || 'No geolocation data' };
  totalPoints += geoPoints;

  // CATEGORY 8: Asset Ownership (Max 165 points)
  let assetPoints = 0;
  let assetReasons = [];
  
  if (data.house_owned) { assetPoints += 50; assetReasons.push('Own house verified (+50)'); }
  if (data.car_registered) { assetPoints += 30; assetReasons.push('Car registered (+30)'); }
  if (data.two_wheeler) { assetPoints += 10; assetReasons.push('Two-wheeler ownership (+10)'); }
  if (data.rent_income && data.rent_income >= 5000) { assetPoints += 25; assetReasons.push('Rent income ₹5K+/month (+25)'); }
  if (data.land_property) { assetPoints += 30; assetReasons.push('Land/property declared (+30)'); }
  if (data.gst_shop) { assetPoints += 20; assetReasons.push('GST/shop evidence (+20)'); }
  
  breakdown.assetOwnership = { points: assetPoints, reason: assetReasons.join(', ') || 'No asset ownership data' };
  totalPoints += assetPoints;

  // Calculate confidence factor (max 8 data points)
  let confidence = 0;
  if (data.pan_verified) confidence++;
  if (data.aadhaar_verified || data.digilocker_verified) confidence++;
  if (data.salary_slips) confidence++;
  if (data.bank_passbook) confidence++;
  if (data.upi_spending > 0) confidence++;
  if (data.bill_payment === "On time" || data.bill_payment === "Always on time" || data.bill_payment === "Mostly on time") confidence++;
  if (data.loan_apps >= 0) confidence++;
  if (data.regular_gps_pattern) confidence++;
  
  confidence = Math.min(8, confidence) / 8; // Normalize to 0-1

  // Calculate Trust Bonus (max +0.5)
  let trustBonus = 0;
  if (data.pan_verified && data.aadhaar_verified) trustBonus += 0.2;
  if (data.salary_slips) trustBonus += 0.2;
  if (data.upi_spending >= 25000) trustBonus += 0.2; // Consistent UPI > ₹25K
  if (data.regular_gps_pattern) trustBonus += 0.1;
  if (data.betting_apps === 0 && !data.betting_sites) trustBonus += 0.1;
  if (data.employment_verified) trustBonus += 0.1;
  trustBonus = Math.min(0.5, trustBonus);

  // Calculate Drift Penalty (max -1.5)
  let driftPenalty = 0;
  if (data.failed_upi) driftPenalty += 0.4; // Sudden UPI drop
  if (data.betting_apps > 0) driftPenalty += 0.3; // High-risk app installed
  if (!data.regular_gps_pattern) driftPenalty += 0.3; // Lost GPS pattern
  if (data.emi_missed) driftPenalty += 0.5; // EMI missed after regularity
  if (data.salary_sms === false) driftPenalty += 0.5; // Fake/inflated salary SMS
  driftPenalty = Math.min(1.5, driftPenalty);

  // Normalize score to 0-10 range
  // Max theoretical points: ~580, so we'll scale accordingly
  const normalizedScore = Math.max(0, Math.min(10, (totalPoints / 580) * 10));

  return { 
    score: Math.round(normalizedScore * 10) / 10, 
    breakdown,
    confidence,
    trustBonus,
    driftPenalty
  };
}

export function calculatePsychometricScore(data: UserInputData): { score: number; confidence: number; cddPenalty: number } {
  let score = 0;
  let confidence = 0;

  // If we have individual trait scores (0-5 each) - Six Traits Model
  if (data.financial_responsibility !== undefined) {
    const fr = data.financial_responsibility || 0;  // Financial Responsibility
    const dg = data.delayed_gratification || 0;      // Delayed Gratification  
    const imp = data.impulsivity || 0;               // Impulsivity (higher is worse)
    const con = data.consistency || 0;               // Consistency
    const ra = data.risk_aversion || 0;              // Risk Aversion
    const es = data.emotional_stability || 0;        // Emotional Stability
    
    // AltScore psychometric formula: weight positive traits, penalize negative
    score = fr + dg + (5 - imp) + con + ra + es;
    
    // Normalize to 0-10 scale (max is 30, so divide by 3)
    score = (score / 30) * 10;
    
    // Calculate confidence factor (max 6 points)
    confidence = 0;
    if (fr > 0) confidence++;     // Completed all 30 questions
    if (dg > 0) confidence++;     // Balanced answering speed
    if (imp >= 0) confidence++;   // Consistent session/device
    if (con > 0) confidence++;    // Normal spread
    if (ra > 0) confidence++;     // No mirrored contradictions
    if (es > 0) confidence++;     // No black flags
    confidence = Math.min(6, confidence) / 6;
    
  } else if (data.psych_score !== undefined) {
    // Fallback to simplified psychometric score
    score = data.psych_score;
    confidence = 0.6; // Lower confidence for simplified score
  } else {
    score = 5; // Default neutral score
    confidence = 0.2; // Very low confidence
  }

  // Calculate CDD (Cognitive Dishonesty Detection) penalties (max -1.0)
  let cddPenalty = 0;
  
  // CDD penalty components from AltScore specifications
  if (data.impulsivity && data.consistency && data.impulsivity > 4 && data.consistency < 2) {
    cddPenalty += 0.4; // High IMP + low CON
  }
  
  // Check for mirrored contradictions (simplified)
  if (data.financial_responsibility && data.impulsivity && 
      Math.abs(data.financial_responsibility - (5 - data.impulsivity)) > 3) {
    cddPenalty += 0.3; // Mirrored contradiction
  }
  
  // Check for extreme polarity (all 1s or all 5s)
  const traits = [data.financial_responsibility, data.delayed_gratification, data.impulsivity, 
                  data.consistency, data.risk_aversion, data.emotional_stability].filter(t => t !== undefined);
  if (traits.length > 0) {
    const allSame = traits.every(t => t === traits[0]);
    if (allSame) cddPenalty += 0.3; // All same answers
    
    const extremeOnly = traits.every(t => t === 1 || t === 5);
    if (extremeOnly && !allSame) cddPenalty += 0.2; // Extreme polarity only
  }
  
  cddPenalty = Math.min(1.0, cddPenalty);
  
  // Apply CDD penalty
  score = Math.max(0, score - cddPenalty);

  return {
    score: Math.round(score * 10) / 10,
    confidence: Math.min(6, confidence * 6) / 6, // Normalize to 0-1
    cddPenalty
  };
}

export function calculateAIScore(data: UserInputData): { score: number; confidence: number; pod: number } {
  // Calculate confidence factor (max 6 points) from AltScore specifications
  let confidence = 0;
  
  // UPI & EMI recent data
  if (data.upi_spending > 0 || data.emi_on_time !== undefined) confidence++;
  // Psych score provided
  if (data.financial_responsibility !== undefined || data.psych_score !== undefined) confidence++;
  // App behaviour detected
  if (data.betting_apps >= 0 || (data.installed_apps && data.installed_apps.length > 0)) confidence++;
  // Employment & KYC verified
  if (data.employment_verified || data.pan_verified) confidence++;
  // Search risk signals present
  if (data.quick_loan_searches !== undefined || data.betting_sites !== undefined) confidence++;
  // Data recent (≤90 days) - simplified as data availability
  if (data.salary_sms !== undefined || data.regular_gps_pattern !== undefined) confidence++;

  confidence = Math.min(6, confidence) / 6; // Normalize to 0-1

  // Enhanced AI model using XGBoost-style risk assessment
  let pod = 0.15; // Base medium risk
  
  // Financial risk indicators
  if (data.upi_spending < 10000) pod += 0.08;
  if (data.upi_spending >= 50000) pod -= 0.05;
  if (data.failed_upi) pod += 0.10;
  if (data.bnpl_dues) pod += 0.12;
  if (data.emi_missed) pod += 0.15;
  if (data.emi_on_time) pod -= 0.08;
  
  // Identity & verification
  if (data.pan_verified && data.aadhaar_verified) pod -= 0.06;
  if (data.salary_slips) pod -= 0.04;
  if (data.employment_verified) pod -= 0.05;
  
  // Behavioral & lifestyle risk
  if (data.betting_apps > 0) pod += 0.18;
  if (data.quick_loan_searches) pod += 0.12;
  if (data.betting_sites) pod += 0.15;
  if (data.loan_apps > 4) pod += 0.10;
  
  // Psychometric influence
  if (data.impulsivity && data.impulsivity > 4) pod += 0.08;
  if (data.financial_responsibility && data.financial_responsibility >= 4) pod -= 0.05;
  if (data.consistency && data.consistency < 2) pod += 0.06;
  
  // Asset & stability factors
  if (data.house_owned) pod -= 0.08;
  if (data.car_registered) pod -= 0.04;
  if (data.regular_gps_pattern) pod -= 0.03;
  if (data.job_duration_months && data.job_duration_months > 12) pod -= 0.04;
  
  // Geographic & access
  if (data.rural_area && !data.bank_nearby) pod += 0.05;
  if (data.bank_nearby) pod -= 0.02;

  // Clamp PoD to realistic bounds
  pod = Math.max(0.01, Math.min(0.99, pod));

  // Convert PoD to score using AltScore inverse exponential curve
  const aiScore = 10 * Math.pow(1 - pod, 0.6);

  return {
    score: Math.round(aiScore * 10) / 10,
    confidence,
    pod: Math.round(pod * 1000) / 1000
  };
}

export function calculateTrustBonus(data: UserInputData): number {
  let bonus = 0;
  
  // Trust bonus components (max +0.5)
  if (data.pan_verified && data.aadhaar_verified) bonus += 0.2;
  if (data.salary_slips) bonus += 0.2;
  if (data.upi_spending >= 25000) bonus += 0.2; // Consistent high UPI
  if (data.regular_gps_pattern) bonus += 0.1;
  if (data.betting_apps === 0 && !data.betting_sites) bonus += 0.1;
  if (data.employment_verified) bonus += 0.1;

  return Math.min(0.5, bonus);
}

export function calculateDriftPenalty(data: UserInputData): number {
  let penalty = 0;
  
  // Drift penalty components (max -1.5)
  // These would typically be calculated based on historical data changes
  // For now, we'll use static indicators
  
  if (data.failed_upi) penalty += 0.4; // Sudden UPI issues
  if (data.betting_apps > 0 && !data.betting_sites) penalty += 0.3; // New high-risk app
  if (!data.regular_gps_pattern) penalty += 0.3; // Lost GPS pattern
  if (data.emi_missed) penalty += 0.5; // EMI missed after regularity
  if (data.salary_sms === false) penalty += 0.5; // Fake salary SMS
  
  return Math.min(1.5, penalty);
}

export function calculateRiskPenalty(data: UserInputData): number {
  // Risk penalty if 2+ models have red flags
  let redFlags = 0;
  
  // Traditional model red flags
  if (data.betting_apps > 0) redFlags++;
  if (data.loan_apps > 4) redFlags++;
  if (data.failed_upi || data.bnpl_dues) redFlags++;
  
  // Psychometric red flags
  if (data.impulsivity && data.impulsivity > 4) redFlags++;
  if (data.consistency && data.consistency < 2) redFlags++;
  
  // AI model red flags
  if (data.quick_loan_searches) redFlags++;
  if (data.betting_sites) redFlags++;
  
  return redFlags >= 2 ? 1.0 : 0;
}

export function calculateScore(data: UserInputData): ScoreResult {
  // Calculate individual model scores
  const traditionalResult = calculateTraditionalScore(data);
  const psychometricResult = calculatePsychometricScore(data);
  const aiResult = calculateAIScore(data);
  
  // Calculate confidence-weighted scoring weights
  const totalConfidence = traditionalResult.confidence + psychometricResult.confidence + aiResult.confidence;
  const normalizedWeights = {
    traditional: totalConfidence > 0 ? (traditionalResult.confidence / totalConfidence) : 0.4,
    psychometric: totalConfidence > 0 ? (psychometricResult.confidence / totalConfidence) : 0.3,
    ai: totalConfidence > 0 ? (aiResult.confidence / totalConfidence) : 0.3
  };

  // Apply AltScore traditional score with confidence factor and drift penalty
  const adjustedTraditionalScore = Math.max(0, 
    traditionalResult.score * traditionalResult.confidence - traditionalResult.driftPenalty
  );

  // Apply CDD penalty to psychometric score
  const adjustedPsychometricScore = Math.max(0, 
    psychometricResult.score - psychometricResult.cddPenalty
  );

  // Calculate Risk Penalty if 2+ models have red flags (max -1.0)
  let riskPenalty = 0;
  let redFlags = 0;
  
  // Traditional model red flags
  if (data.betting_apps > 0 || data.loan_apps > 4 || data.failed_upi || data.bnpl_dues) redFlags++;
  // Psychometric red flags  
  if ((data.impulsivity && data.impulsivity > 4) || (data.consistency && data.consistency < 2)) redFlags++;
  // AI model red flags
  if (data.quick_loan_searches || data.betting_sites || aiResult.pod > 0.3) redFlags++;
  
  riskPenalty = redFlags >= 2 ? 1.0 : 0;

  // AltScore Score Fusion Engine Formula:
  // FinalScore = (ST*WT) + (SP*WP) + (SA*WA) + TrustBonus - RiskPenalty
  const weightedScore = (normalizedWeights.traditional * adjustedTraditionalScore) + 
                       (normalizedWeights.psychometric * adjustedPsychometricScore) + 
                       (normalizedWeights.ai * aiResult.score);

  const finalScore = Math.max(0, Math.min(10, 
    weightedScore + traditionalResult.trustBonus - riskPenalty
  ));

  // Generate insights based on AltScore risk categories
  const insights: string[] = [];
  
  if (finalScore >= 8.5) {
    insights.push("Excellent credit profile - instant approval recommended");
  } else if (finalScore >= 6.5) {
    insights.push("Safe credit profile - standard loan terms applicable");
  } else if (finalScore >= 4.5) {
    insights.push("Monitor category - manual review or reduced limit suggested");
  } else {
    insights.push("High risk profile - likely rejection or collateral required");
  }
  
  if (traditionalResult.trustBonus > 0.3) {
    insights.push("Strong verification trust bonus applied");
  }
  
  if (psychometricResult.cddPenalty > 0.3) {
    insights.push("Psychometric inconsistencies detected");
  }
  
  if (aiResult.pod > 0.25) {
    insights.push("AI model indicates elevated default risk");
  }
  
  if (riskPenalty > 0) {
    insights.push("Multiple risk flags across models");
  }

  return {
    finalScore: Math.round(finalScore * 10) / 10,
    traditionalScore: Math.round(adjustedTraditionalScore * 10) / 10,
    psychometricScore: Math.round(adjustedPsychometricScore * 10) / 10,
    aiScore: Math.round(aiResult.score * 10) / 10,
    trustBonus: Math.round(traditionalResult.trustBonus * 10) / 10,
    riskPenalty: Math.round(riskPenalty * 10) / 10,
    insights,
    breakdown: traditionalResult.breakdown,
    confidence: {
      traditional: traditionalResult.confidence,
      psychometric: psychometricResult.confidence,
      ai: aiResult.confidence
    },
    weights: normalizedWeights,
    aiPoD: aiResult.pod
  };
}

export function calculateScoreFromProfile(profile: any): ScoreResult {
  // Convert DemoProfile to UserInputData format - spread all profile properties
  const userData: UserInputData = {
    ...profile,
    installed_apps: profile.installed_apps || []
  };
  
  return calculateScore(userData);
}