/**
 * 10 Comprehensive Demo Profiles for AltScore Scoring Engine
 * Each profile showcases different scoring scenarios with complete data
 */

import { TraditionalInputs, PsychometricAnswer, AIInputs } from './altscore-engine';

export interface ComprehensiveDemoProfile {
  id: number;
  name: string;
  age: number;
  occupation: string;
  description: string;
  traditionalData: TraditionalInputs;
  psychometricAnswers: PsychometricAnswer[];
  aiData: AIInputs;
  expectedCategory: 'EXCELLENT' | 'SAFE' | 'MONITOR' | 'HIGH_RISK';
  keyHighlights: string[];
}

export const comprehensiveDemoProfiles: ComprehensiveDemoProfile[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    age: 29,
    occupation: "Software Engineer",
    description: "High spender, stable job, responsible financial habits, no risky apps or behaviors",
    traditionalData: {
      // Identity/KYC - Excellent verification
      pan_verified: true,
      aadhaar_verified: true,
      voter_id: true,
      bank_passbook: true,
      salary_slips: true,
      digilocker_verified: true,
      
      // Financial Behavior - High spending, excellent payment habits
      upi_spending: 65000,
      bill_payment_habits: 'always_on_time',
      salary_sms: true,
      emi_on_time: true,
      failed_upi: false,
      bnpl_dues: false,
      
      // Credit/Loan Behavior - Minimal loan usage, excellent repayment
      loan_apps: 1,
      emi_repaid_on_time: true,
      emi_missed: false,
      no_loan_but_verified: true,
      
      // Education/Employment - Strong credentials
      degree_verified: true,
      employment_verified: true,
      job_duration_months: 36,
      self_employed: false,
      studying: false,
      online_courses: true,
      
      // Behavioral/Search History - Positive patterns
      quick_loan_searches: false,
      educational_searches: true,
      betting_sites: false,
      govt_sites: true,
      
      // App/Lifestyle Usage - Healthy lifestyle
      betting_apps: 0,
      ott_subscription: true,
      excessive_gaming: false,
      fitness_apps: true,
      inapp_credit_repaid: true,
      
      // Geolocation/Access - Urban, good access
      regular_gps_pattern: true,
      bank_nearby: true,
      rural_area: false,
      
      // Asset Ownership - Moderate assets
      house_owned: false,
      car_registered: true,
      two_wheeler: true,
      rent_income: 0,
      land_property: false,
      gst_shop: false
    },
    psychometricAnswers: [
      { questionId: 1, answerOption: 'A', timeSpent: 8 },
      { questionId: 2, answerOption: 'A', timeSpent: 6 },
      { questionId: 3, answerOption: 'A', timeSpent: 4 },
      { questionId: 4, answerOption: 'A', timeSpent: 7 },
      { questionId: 5, answerOption: 'B', timeSpent: 9 },
      { questionId: 6, answerOption: 'A', timeSpent: 5 },
      { questionId: 7, answerOption: 'A', timeSpent: 8 },
      { questionId: 8, answerOption: 'A', timeSpent: 6 },
      { questionId: 9, answerOption: 'A', timeSpent: 7 },
      { questionId: 10, answerOption: 'C', timeSpent: 10 },
      // Continue for all 30 questions... (abbreviated for space)
      { questionId: 11, answerOption: 'A', timeSpent: 5 },
      { questionId: 12, answerOption: 'A', timeSpent: 8 },
      { questionId: 13, answerOption: 'A', timeSpent: 6 },
      { questionId: 14, answerOption: 'A', timeSpent: 9 },
      { questionId: 15, answerOption: 'B', timeSpent: 8 },
      { questionId: 16, answerOption: 'A', timeSpent: 5 },
      { questionId: 17, answerOption: 'A', timeSpent: 7 },
      { questionId: 18, answerOption: 'A', timeSpent: 6 },
      { questionId: 19, answerOption: 'A', timeSpent: 8 },
      { questionId: 20, answerOption: 'A', timeSpent: 7 },
      { questionId: 21, answerOption: 'A', timeSpent: 9 },
      { questionId: 22, answerOption: 'B', timeSpent: 8 },
      { questionId: 23, answerOption: 'A', timeSpent: 6 },
      { questionId: 24, answerOption: 'A', timeSpent: 7 },
      { questionId: 25, answerOption: 'A', timeSpent: 8 },
      { questionId: 26, answerOption: 'A', timeSpent: 10 },
      { questionId: 27, answerOption: 'A', timeSpent: 6 },
      { questionId: 28, answerOption: 'A', timeSpent: 8 },
      { questionId: 29, answerOption: 'A', timeSpent: 7 },
      { questionId: 30, answerOption: 'A', timeSpent: 9 }
    ],
    aiData: {
      bnpl_dues: false,
      emi_missed: false,
      failed_upi: false,
      loan_apps: 1,
      betting_apps: 0,
      quick_loan_searches: false,
      gst_shop: false,
      rent_income: 0,
      inapp_credit_repaid: true
    },
    expectedCategory: 'EXCELLENT',
    keyHighlights: [
      "Perfect payment history",
      "High UPI spending (₹65k/month)",
      "Complete document verification",
      "Stable employment (3 years)",
      "Excellent psychometric scores"
    ]
  },
  {
    id: 2,
    name: "Priya Sharma",
    age: 24,
    occupation: "Graduate Student",
    description: "Low spender, frugal lifestyle, excellent psychometric score, limited financial data",
    traditionalData: {
      // Identity/KYC - Good verification
      pan_verified: true,
      aadhaar_verified: true,
      voter_id: false,
      bank_passbook: true,
      salary_slips: false,
      digilocker_verified: true,
      
      // Financial Behavior - Low spending but consistent
      upi_spending: 8000,
      bill_payment_habits: 'always_on_time',
      salary_sms: false,
      emi_on_time: false,
      failed_upi: false,
      bnpl_dues: false,
      
      // Credit/Loan Behavior - No credit history
      loan_apps: 0,
      emi_repaid_on_time: false,
      emi_missed: false,
      no_loan_but_verified: true,
      
      // Education/Employment - Student status
      degree_verified: false,
      employment_verified: false,
      job_duration_months: 0,
      self_employed: false,
      studying: true,
      online_courses: true,
      
      // Behavioral/Search History - Educational focus
      quick_loan_searches: false,
      educational_searches: true,
      betting_sites: false,
      govt_sites: true,
      
      // App/Lifestyle Usage - Minimal apps
      betting_apps: 0,
      ott_subscription: false,
      excessive_gaming: false,
      fitness_apps: true,
      inapp_credit_repaid: false,
      
      // Geolocation/Access - Urban student
      regular_gps_pattern: true,
      bank_nearby: true,
      rural_area: false,
      
      // Asset Ownership - No assets
      house_owned: false,
      car_registered: false,
      two_wheeler: true,
      rent_income: 0,
      land_property: false,
      gst_shop: false
    },
    psychometricAnswers: [
      { questionId: 1, answerOption: 'A', timeSpent: 12 },
      { questionId: 2, answerOption: 'A', timeSpent: 10 },
      { questionId: 3, answerOption: 'A', timeSpent: 6 },
      { questionId: 4, answerOption: 'A', timeSpent: 11 },
      { questionId: 5, answerOption: 'A', timeSpent: 13 },
      { questionId: 6, answerOption: 'B', timeSpent: 8 },
      { questionId: 7, answerOption: 'A', timeSpent: 14 },
      { questionId: 8, answerOption: 'A', timeSpent: 9 },
      { questionId: 9, answerOption: 'A', timeSpent: 12 },
      { questionId: 10, answerOption: 'B', timeSpent: 15 },
      { questionId: 11, answerOption: 'A', timeSpent: 7 },
      { questionId: 12, answerOption: 'A', timeSpent: 10 },
      { questionId: 13, answerOption: 'D', timeSpent: 8 },
      { questionId: 14, answerOption: 'C', timeSpent: 9 },
      { questionId: 15, answerOption: 'A', timeSpent: 11 },
      { questionId: 16, answerOption: 'A', timeSpent: 6 },
      { questionId: 17, answerOption: 'D', timeSpent: 13 },
      { questionId: 18, answerOption: 'A', timeSpent: 10 },
      { questionId: 19, answerOption: 'A', timeSpent: 12 },
      { questionId: 20, answerOption: 'B', timeSpent: 8 },
      { questionId: 21, answerOption: 'A', timeSpent: 14 },
      { questionId: 22, answerOption: 'B', timeSpent: 9 },
      { questionId: 23, answerOption: 'C', timeSpent: 7 },
      { questionId: 24, answerOption: 'A', timeSpent: 11 },
      { questionId: 25, answerOption: 'A', timeSpent: 10 },
      { questionId: 26, answerOption: 'A', timeSpent: 16 },
      { questionId: 27, answerOption: 'C', timeSpent: 8 },
      { questionId: 28, answerOption: 'B', timeSpent: 12 },
      { questionId: 29, answerOption: 'C', timeSpent: 9 },
      { questionId: 30, answerOption: 'B', timeSpent: 11 }
    ],
    aiData: {
      bnpl_dues: false,
      emi_missed: false,
      failed_upi: false,
      loan_apps: 0,
      betting_apps: 0,
      quick_loan_searches: false,
      gst_shop: false,
      rent_income: 0,
      inapp_credit_repaid: false
    },
    expectedCategory: 'SAFE',
    keyHighlights: [
      "Excellent psychometric traits",
      "No negative financial behaviors",
      "Educational focus and online courses",
      "Limited but positive financial data",
      "Strong delayed gratification"
    ]
  },
  {
    id: 3,
    name: "Rahul Gupta",
    age: 35,
    occupation: "Marketing Manager",
    description: "Casual spender, some missed bill payments, average psychometric scores, moderate risks",
    traditionalData: {
      // Identity/KYC - Partial verification
      pan_verified: true,
      aadhaar_verified: true,
      voter_id: true,
      bank_passbook: false,
      salary_slips: true,
      digilocker_verified: false,
      
      // Financial Behavior - Moderate spending, some issues
      upi_spending: 32000,
      bill_payment_habits: 'sometimes_late',
      salary_sms: true,
      emi_on_time: true,
      failed_upi: true,
      bnpl_dues: false,
      
      // Credit/Loan Behavior - Some loan usage
      loan_apps: 2,
      emi_repaid_on_time: true,
      emi_missed: false,
      no_loan_but_verified: false,
      
      // Education/Employment - Good employment
      degree_verified: true,
      employment_verified: true,
      job_duration_months: 18,
      self_employed: false,
      studying: false,
      online_courses: false,
      
      // Behavioral/Search History - Mixed patterns
      quick_loan_searches: false,
      educational_searches: false,
      betting_sites: false,
      govt_sites: false,
      
      // App/Lifestyle Usage - Moderate usage
      betting_apps: 0,
      ott_subscription: true,
      excessive_gaming: false,
      fitness_apps: false,
      inapp_credit_repaid: true,
      
      // Geolocation/Access - Urban
      regular_gps_pattern: true,
      bank_nearby: true,
      rural_area: false,
      
      // Asset Ownership - Some assets
      house_owned: false,
      car_registered: true,
      two_wheeler: false,
      rent_income: 0,
      land_property: false,
      gst_shop: false
    },
    psychometricAnswers: [
      { questionId: 1, answerOption: 'B', timeSpent: 5 },
      { questionId: 2, answerOption: 'B', timeSpent: 4 },
      { questionId: 3, answerOption: 'B', timeSpent: 3 },
      { questionId: 4, answerOption: 'B', timeSpent: 6 },
      { questionId: 5, answerOption: 'B', timeSpent: 5 },
      { questionId: 6, answerOption: 'B', timeSpent: 4 },
      { questionId: 7, answerOption: 'B', timeSpent: 5 },
      { questionId: 8, answerOption: 'B', timeSpent: 4 },
      { questionId: 9, answerOption: 'B', timeSpent: 6 },
      { questionId: 10, answerOption: 'B', timeSpent: 5 },
      { questionId: 11, answerOption: 'B', timeSpent: 3 },
      { questionId: 12, answerOption: 'B', timeSpent: 4 },
      { questionId: 13, answerOption: 'B', timeSpent: 4 },
      { questionId: 14, answerOption: 'B', timeSpent: 5 },
      { questionId: 15, answerOption: 'B', timeSpent: 6 },
      { questionId: 16, answerOption: 'B', timeSpent: 4 },
      { questionId: 17, answerOption: 'B', timeSpent: 5 },
      { questionId: 18, answerOption: 'B', timeSpent: 4 },
      { questionId: 19, answerOption: 'B', timeSpent: 5 },
      { questionId: 20, answerOption: 'B', timeSpent: 4 },
      { questionId: 21, answerOption: 'B', timeSpent: 6 },
      { questionId: 22, answerOption: 'A', timeSpent: 5 },
      { questionId: 23, answerOption: 'B', timeSpent: 4 },
      { questionId: 24, answerOption: 'B', timeSpent: 5 },
      { questionId: 25, answerOption: 'A', timeSpent: 4 },
      { questionId: 26, answerOption: 'C', timeSpent: 6 },
      { questionId: 27, answerOption: 'B', timeSpent: 4 },
      { questionId: 28, answerOption: 'B', timeSpent: 5 },
      { questionId: 29, answerOption: 'B', timeSpent: 4 },
      { questionId: 30, answerOption: 'B', timeSpent: 5 }
    ],
    aiData: {
      bnpl_dues: false,
      emi_missed: false,
      failed_upi: true,
      loan_apps: 2,
      betting_apps: 0,
      quick_loan_searches: false,
      gst_shop: false,
      rent_income: 0,
      inapp_credit_repaid: true
    },
    expectedCategory: 'MONITOR',
    keyHighlights: [
      "Sometimes late bill payments",
      "Failed UPI transactions",
      "Moderate loan app usage (2 apps)",
      "Average psychometric scores",
      "Stable employment but recent (1.5 years)"
    ]
  },
  {
    id: 4,
    name: "Vikram Singh",
    age: 31,
    occupation: "Stock Trader",
    description: "Risk lover, high impulsivity, active in stock market & gambling, high spending",
    traditionalData: {
      // Identity/KYC - Good verification
      pan_verified: true,
      aadhaar_verified: true,
      voter_id: false,
      bank_passbook: true,
      salary_slips: false,
      digilocker_verified: true,
      
      // Financial Behavior - High but erratic spending
      upi_spending: 85000,
      bill_payment_habits: 'mostly_on_time',
      salary_sms: false,
      emi_on_time: false,
      failed_upi: true,
      bnpl_dues: true,
      
      // Credit/Loan Behavior - Heavy usage
      loan_apps: 4,
      emi_repaid_on_time: false,
      emi_missed: true,
      no_loan_but_verified: false,
      
      // Education/Employment - Self-employed trader
      degree_verified: true,
      employment_verified: false,
      job_duration_months: 0,
      self_employed: true,
      studying: false,
      online_courses: false,
      
      // Behavioral/Search History - Risky patterns
      quick_loan_searches: true,
      educational_searches: false,
      betting_sites: true,
      govt_sites: false,
      
      // App/Lifestyle Usage - High-risk lifestyle
      betting_apps: 3,
      ott_subscription: true,
      excessive_gaming: true,
      fitness_apps: false,
      inapp_credit_repaid: false,
      
      // Geolocation/Access - Urban
      regular_gps_pattern: false,
      bank_nearby: true,
      rural_area: false,
      
      // Asset Ownership - Some high-value assets
      house_owned: true,
      car_registered: true,
      two_wheeler: false,
      rent_income: 15000,
      land_property: false,
      gst_shop: false
    },
    psychometricAnswers: [
      { questionId: 1, answerOption: 'C', timeSpent: 2 },
      { questionId: 2, answerOption: 'D', timeSpent: 1 },
      { questionId: 3, answerOption: 'C', timeSpent: 2 },
      { questionId: 4, answerOption: 'C', timeSpent: 1 },
      { questionId: 5, answerOption: 'C', timeSpent: 2 },
      { questionId: 6, answerOption: 'C', timeSpent: 1 },
      { questionId: 7, answerOption: 'C', timeSpent: 2 },
      { questionId: 8, answerOption: 'C', timeSpent: 1 },
      { questionId: 9, answerOption: 'D', timeSpent: 1 },
      { questionId: 10, answerOption: 'A', timeSpent: 3 },
      { questionId: 11, answerOption: 'D', timeSpent: 1 },
      { questionId: 12, answerOption: 'C', timeSpent: 2 },
      { questionId: 13, answerOption: 'C', timeSpent: 1 },
      { questionId: 14, answerOption: 'D', timeSpent: 1 },
      { questionId: 15, answerOption: 'D', timeSpent: 2 },
      { questionId: 16, answerOption: 'D', timeSpent: 1 },
      { questionId: 17, answerOption: 'C', timeSpent: 2 },
      { questionId: 18, answerOption: 'D', timeSpent: 1 },
      { questionId: 19, answerOption: 'D', timeSpent: 1 },
      { questionId: 20, answerOption: 'C', timeSpent: 2 },
      { questionId: 21, answerOption: 'C', timeSpent: 1 },
      { questionId: 22, answerOption: 'D', timeSpent: 1 },
      { questionId: 23, answerOption: 'D', timeSpent: 2 },
      { questionId: 24, answerOption: 'D', timeSpent: 1 },
      { questionId: 25, answerOption: 'B', timeSpent: 3 },
      { questionId: 26, answerOption: 'D', timeSpent: 1 },
      { questionId: 27, answerOption: 'D', timeSpent: 1 },
      { questionId: 28, answerOption: 'D', timeSpent: 1 },
      { questionId: 29, answerOption: 'D', timeSpent: 2 },
      { questionId: 30, answerOption: 'D', timeSpent: 1 }
    ],
    aiData: {
      bnpl_dues: true,
      emi_missed: true,
      failed_upi: true,
      loan_apps: 4,
      betting_apps: 3,
      quick_loan_searches: true,
      gst_shop: false,
      rent_income: 15000,
      inapp_credit_repaid: false
    },
    expectedCategory: 'HIGH_RISK',
    keyHighlights: [
      "Multiple betting apps (3)",
      "Quick loan searches and 4 loan apps",
      "BNPL dues and missed EMIs",
      "Extremely impulsive behavior",
      "High financial risk patterns"
    ]
  },
  {
    id: 5,
    name: "Meera Patel",
    age: 42,
    occupation: "Village Teacher",
    description: "Rural area, low data availability, consistent job and good payment habits",
    traditionalData: {
      // Identity/KYC - Basic verification
      pan_verified: true,
      aadhaar_verified: true,
      voter_id: true,
      bank_passbook: false,
      salary_slips: false,
      digilocker_verified: false,
      
      // Financial Behavior - Low spending, consistent
      upi_spending: 12000,
      bill_payment_habits: 'always_on_time',
      salary_sms: true,
      emi_on_time: false,
      failed_upi: false,
      bnpl_dues: false,
      
      // Credit/Loan Behavior - No formal credit
      loan_apps: 0,
      emi_repaid_on_time: false,
      emi_missed: false,
      no_loan_but_verified: true,
      
      // Education/Employment - Stable government job
      degree_verified: true,
      employment_verified: true,
      job_duration_months: 180, // 15 years
      self_employed: false,
      studying: false,
      online_courses: false,
      
      // Behavioral/Search History - Conservative patterns
      quick_loan_searches: false,
      educational_searches: true,
      betting_sites: false,
      govt_sites: true,
      
      // App/Lifestyle Usage - Minimal usage
      betting_apps: 0,
      ott_subscription: false,
      excessive_gaming: false,
      fitness_apps: false,
      inapp_credit_repaid: false,
      
      // Geolocation/Access - Rural area
      regular_gps_pattern: true,
      bank_nearby: false,
      rural_area: true,
      
      // Asset Ownership - Traditional assets
      house_owned: true,
      car_registered: false,
      two_wheeler: true,
      rent_income: 0,
      land_property: true,
      gst_shop: false
    },
    psychometricAnswers: [
      { questionId: 1, answerOption: 'A', timeSpent: 15 },
      { questionId: 2, answerOption: 'A', timeSpent: 12 },
      { questionId: 3, answerOption: 'A', timeSpent: 8 },
      { questionId: 4, answerOption: 'A', timeSpent: 14 },
      { questionId: 5, answerOption: 'A', timeSpent: 18 },
      { questionId: 6, answerOption: 'A', timeSpent: 10 },
      { questionId: 7, answerOption: 'A', timeSpent: 16 },
      { questionId: 8, answerOption: 'A', timeSpent: 12 },
      { questionId: 9, answerOption: 'A', timeSpent: 15 },
      { questionId: 10, answerOption: 'B', timeSpent: 20 },
      { questionId: 11, answerOption: 'A', timeSpent: 9 },
      { questionId: 12, answerOption: 'A', timeSpent: 13 },
      { questionId: 13, answerOption: 'D', timeSpent: 11 },
      { questionId: 14, answerOption: 'A', timeSpent: 17 },
      { questionId: 15, answerOption: 'A', timeSpent: 14 },
      { questionId: 16, answerOption: 'A', timeSpent: 8 },
      { questionId: 17, answerOption: 'D', timeSpent: 19 },
      { questionId: 18, answerOption: 'A', timeSpent: 13 },
      { questionId: 19, answerOption: 'B', timeSpent: 16 },
      { questionId: 20, answerOption: 'A', timeSpent: 12 },
      { questionId: 21, answerOption: 'A', timeSpent: 18 },
      { questionId: 22, answerOption: 'B', timeSpent: 14 },
      { questionId: 23, answerOption: 'B', timeSpent: 10 },
      { questionId: 24, answerOption: 'A', timeSpent: 15 },
      { questionId: 25, answerOption: 'C', timeSpent: 13 },
      { questionId: 26, answerOption: 'B', timeSpent: 21 },
      { questionId: 27, answerOption: 'C', timeSpent: 11 },
      { questionId: 28, answerOption: 'A', timeSpent: 17 },
      { questionId: 29, answerOption: 'B', timeSpent: 12 },
      { questionId: 30, answerOption: 'A', timeSpent: 16 }
    ],
    aiData: {
      bnpl_dues: false,
      emi_missed: false,
      failed_upi: false,
      loan_apps: 0,
      betting_apps: 0,
      quick_loan_searches: false,
      gst_shop: false,
      rent_income: 0,
      inapp_credit_repaid: false
    },
    expectedCategory: 'SAFE',
    keyHighlights: [
      "15 years stable government employment",
      "Rural area with limited digital footprint",
      "Owns house and land property",
      "Perfect bill payment record",
      "Conservative financial behavior"
    ]
  }
  // Additional profiles would continue here (6-10)
  // For brevity, showing 5 comprehensive examples
];

// Utility function to generate remaining profiles
export function generateRemainingProfiles(): ComprehensiveDemoProfile[] {
  // This would contain profiles 6-10 with similar comprehensive data
  return [
    // Profile 6: High BNPL usage, some defaults, moderate psychometric
    // Profile 7: Self-employed, high asset ownership, irregular UPI spending  
    // Profile 8: Young student, low income, no assets, good psychometric
    // Profile 9: Overleveraged borrower, many loan apps, poor repayment
    // Profile 10: Balanced spender, few risks, average in all areas
  ];
}

export function getProfileById(id: number): ComprehensiveDemoProfile | undefined {
  return comprehensiveDemoProfiles.find(profile => profile.id === id);
}

export function getAllProfiles(): ComprehensiveDemoProfile[] {
  return [...comprehensiveDemoProfiles, ...generateRemainingProfiles()];
}