/**
 * 10 Exact Demo Profiles as per PDF Requirements
 * Each profile calculated using exact PDF formulas
 */

import { 
  TraditionalInputsExact, 
  PsychometricTraits, 
  PsychometricAnswersExact, 
  AIInputsExact,
  calculateTraditionalScoreExact,
  calculatePsychometricScoreExact,
  calculateAIScoreExact,
  calculateFinalScoreExact
} from './altscore-exact';

export interface ExactDemoProfile {
  id: number;
  name: string;
  age: number;
  occupation: string;
  description: string;
  keyHighlights: string[];
  traditionalInputs: TraditionalInputsExact;
  psychometricTraits: PsychometricTraits;
  psychometricAnswers: PsychometricAnswersExact;
  aiInputs: AIInputsExact;
  expectedCategory: 'EXCELLENT' | 'SAFE' | 'MONITOR' | 'HIGH_RISK';
  calculatedResults?: {
    traditional: ReturnType<typeof calculateTraditionalScoreExact>;
    psychometric: ReturnType<typeof calculatePsychometricScoreExact>;
    ai: ReturnType<typeof calculateAIScoreExact>;
    final: ReturnType<typeof calculateFinalScoreExact>;
  };
}

export const exactDemoProfiles: ExactDemoProfile[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    age: 29,
    occupation: "Software Engineer",
    description: "Urban High Spender (Excellent) - High verified KYC, high UPI spend, always on-time payments, strong psychometric responsibility, AI shows minimal risk",
    keyHighlights: [
      "Complete KYC verification with DigiLocker",
      "₹65,000 monthly UPI spending with perfect payment history",
      "High financial responsibility (4.8/5) and emotional stability",
      "AI model shows extremely low default risk",
      "Trust bonus: +0.5 for verified profile"
    ],
    traditionalInputs: {
      // Category 1: Identity & KYC - Full verification
      pan_verified: true, // +30
      aadhaar_verified: true, // +20
      voter_id: true, // +10
      bank_passbook: true, // +25
      salary_slips: true, // +25
      digilocker_verified: true, // +30
      
      // Category 2: Financial Behaviour - Excellent
      upi_monthly_volume: 65000, // +60 (>50K)
      utility_bills_ontime: true, // +40
      salary_sms_verified: true, // +30
      emi_payments_ontime: true, // +30
      failed_upi_messages: false, // 0
      bnpl_unpaid_dues: false, // 0
      
      // Category 3: Credit & Loan App Behaviour - Good
      loan_apps_count: 1, // +10 (<2)
      loan_emi_repaid_ontime: true, // +20
      loan_emi_missed: false, // 0
      no_loan_verified_salary: true, // +15
      
      // Category 4: Education & Employment - Strong
      degree_verified: true, // +25
      employment_verified_linkedin: true, // +20
      job_duration_months: 36, // +25 (>6)
      self_employed_verified: false, // 0
      studying_fee_upi: false, // 0
      online_courses_completed: true, // +10
      
      // Category 5: Behavioural Patterns - Positive
      quick_loan_searches: false, // 0
      learning_finance_searches: true, // +15
      betting_sites_visits: false, // 0
      educational_govt_sites: true, // +10
      budgeting_apps_usage: true, // +10
      
      // Category 6: App & Lifestyle - Healthy
      paid_ott_subscription: true, // +10
      excessive_gaming_apps: false, // 0
      betting_gambling_apps: false, // 0
      fitness_meditation_apps: true, // +10
      inapp_credit_repaid_ontime: true, // +15
      cod_orders_only: false, // 0
      
      // Category 7: Geolocation - Urban professional
      regular_office_gps_pattern: true, // +20
      bank_atm_within_3km: true, // +10
      rural_area_no_bank: false, // 0
      
      // Category 8: Asset Ownership - Moderate
      house_verified: false, // 0
      car_registered: true, // +30
      two_wheeler_rc: true, // +10
      rent_income_monthly: 0, // 0
      land_property_verified: false, // 0
      gst_business_verified: false // 0
    },
    psychometricTraits: {
      financial_responsibility: 4.8,
      delayed_gratification: 4.5,
      impulsivity: 1.2,
      consistency: 4.6,
      risk_aversion: 3.8,
      emotional_stability: 4.3
    },
    psychometricAnswers: {
      answers: ['A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      time_taken_seconds: 240,
      session_consistent: true,
      device_consistent: true
    },
    aiInputs: {
      upi_emi_activity_score: 0.9,
      psychometric_traits: {
        financial_responsibility: 4.8,
        delayed_gratification: 4.5,
        impulsivity: 1.2,
        consistency: 4.6,
        risk_aversion: 3.8,
        emotional_stability: 4.3
      },
      app_behaviour_risk_score: 0.1,
      employment_kyc_signals: 0.95,
      search_browser_risk: 0.0,
      data_recency_score: 0.9
    },
    expectedCategory: 'EXCELLENT'
  },
  {
    id: 2,
    name: "Priya Sharma",
    age: 24,
    occupation: "Graduate Student",
    description: "Frugal Minimalist (Safe) - Very low spending, excellent payment history, few installed apps, psychometrics moderate but consistent, AI sees low risk",
    keyHighlights: [
      "Strong financial discipline despite low income",
      "Excellent delayed gratification scores (4.8/5)",
      "Zero risky apps or gambling behavior",
      "Educational focus with clean digital footprint",
      "AI sees low risk due to consistent patterns"
    ],
    traditionalInputs: {
      // Category 1: Identity & KYC - Good verification
      pan_verified: true, // +30
      aadhaar_verified: true, // +20
      voter_id: false, // 0
      bank_passbook: true, // +25
      salary_slips: false, // 0
      digilocker_verified: true, // +30
      
      // Category 2: Financial Behaviour - Low but consistent
      upi_monthly_volume: 8000, // 0 (<10K)
      utility_bills_ontime: true, // +40
      salary_sms_verified: false, // 0
      emi_payments_ontime: false, // 0
      failed_upi_messages: false, // 0
      bnpl_unpaid_dues: false, // 0
      
      // Category 3: Credit & Loan App Behaviour - No credit
      loan_apps_count: 0, // +10 (<2)
      loan_emi_repaid_ontime: false, // 0
      loan_emi_missed: false, // 0
      no_loan_verified_salary: false, // 0 (no salary)
      
      // Category 4: Education & Employment - Student
      degree_verified: false, // 0 (in progress)
      employment_verified_linkedin: false, // 0
      job_duration_months: 0, // 0
      self_employed_verified: false, // 0
      studying_fee_upi: true, // +10
      online_courses_completed: true, // +10
      
      // Category 5: Behavioural Patterns - Educational focus
      quick_loan_searches: false, // 0
      learning_finance_searches: true, // +15
      betting_sites_visits: false, // 0
      educational_govt_sites: true, // +10
      budgeting_apps_usage: true, // +10
      
      // Category 6: App & Lifestyle - Minimal
      paid_ott_subscription: false, // 0
      excessive_gaming_apps: false, // 0
      betting_gambling_apps: false, // 0
      fitness_meditation_apps: true, // +10
      inapp_credit_repaid_ontime: false, // 0
      cod_orders_only: true, // 0
      
      // Category 7: Geolocation - Urban student
      regular_office_gps_pattern: true, // +20 (college)
      bank_atm_within_3km: true, // +10
      rural_area_no_bank: false, // 0
      
      // Category 8: Asset Ownership - None
      house_verified: false, // 0
      car_registered: false, // 0
      two_wheeler_rc: true, // +10
      rent_income_monthly: 0, // 0
      land_property_verified: false, // 0
      gst_business_verified: false // 0
    },
    psychometricTraits: {
      financial_responsibility: 4.2,
      delayed_gratification: 4.8,
      impulsivity: 1.5,
      consistency: 4.1,
      risk_aversion: 4.5,
      emotional_stability: 3.9
    },
    psychometricAnswers: {
      answers: ['A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'B', 'A', 'A', 'D', 'C', 'A', 'A', 'D', 'A', 'A', 'B', 'A', 'B', 'C', 'A', 'A', 'A', 'C', 'B', 'C', 'B'],
      time_taken_seconds: 380,
      session_consistent: true,
      device_consistent: true
    },
    aiInputs: {
      upi_emi_activity_score: 0.3,
      psychometric_traits: {
        financial_responsibility: 4.2,
        delayed_gratification: 4.8,
        impulsivity: 1.5,
        consistency: 4.1,
        risk_aversion: 4.5,
        emotional_stability: 3.9
      },
      app_behaviour_risk_score: 0.0,
      employment_kyc_signals: 0.2,
      search_browser_risk: 0.0,
      data_recency_score: 0.8
    },
    expectedCategory: 'SAFE'
  },
  {
    id: 3,
    name: "Rahul Gupta",
    age: 35,
    occupation: "Marketing Manager",
    description: "Casual Spender (Safe-Monitor) - Moderate UPI spend, some late utility payments, average psychometrics, AI PoD moderate",
    keyHighlights: [
      "₹32,000 monthly UPI with mixed payment history",
      "Moderate psychometric traits across all categories",
      "Some failed UPI messages indicate financial stress",
      "AI detects moderate risk patterns",
      "Needs manual review for lending decisions"
    ],
    traditionalInputs: {
      // Category 1: Identity & KYC - Partial
      pan_verified: true, // +30
      aadhaar_verified: true, // +20
      voter_id: true, // +10
      bank_passbook: false, // 0
      salary_slips: true, // +25
      digilocker_verified: false, // 0
      
      // Category 2: Financial Behaviour - Mixed
      upi_monthly_volume: 32000, // +40 (20K-50K)
      utility_bills_ontime: false, // 0 (sometimes late)
      salary_sms_verified: true, // +30
      emi_payments_ontime: true, // +30
      failed_upi_messages: true, // -20
      bnpl_unpaid_dues: false, // 0
      
      // Category 3: Credit & Loan App Behaviour - Some usage
      loan_apps_count: 2, // 0 (2-4 range)
      loan_emi_repaid_ontime: true, // +20
      loan_emi_missed: false, // 0
      no_loan_verified_salary: false, // 0
      
      // Category 4: Education & Employment - Good
      degree_verified: true, // +25
      employment_verified_linkedin: true, // +20
      job_duration_months: 18, // +25 (>6)
      self_employed_verified: false, // 0
      studying_fee_upi: false, // 0
      online_courses_completed: false, // 0
      
      // Category 5: Behavioural Patterns - Neutral
      quick_loan_searches: false, // 0
      learning_finance_searches: false, // 0
      betting_sites_visits: false, // 0
      educational_govt_sites: false, // 0
      budgeting_apps_usage: false, // 0
      
      // Category 6: App & Lifestyle - Average
      paid_ott_subscription: true, // +10
      excessive_gaming_apps: false, // 0
      betting_gambling_apps: false, // 0
      fitness_meditation_apps: false, // 0
      inapp_credit_repaid_ontime: true, // +15
      cod_orders_only: false, // 0
      
      // Category 7: Geolocation - Urban
      regular_office_gps_pattern: true, // +20
      bank_atm_within_3km: true, // +10
      rural_area_no_bank: false, // 0
      
      // Category 8: Asset Ownership - Some
      house_verified: false, // 0
      car_registered: true, // +30
      two_wheeler_rc: false, // 0
      rent_income_monthly: 0, // 0
      land_property_verified: false, // 0
      gst_business_verified: false // 0
    },
    psychometricTraits: {
      financial_responsibility: 3.2,
      delayed_gratification: 3.1,
      impulsivity: 2.8,
      consistency: 3.3,
      risk_aversion: 3.0,
      emotional_stability: 3.4
    },
    psychometricAnswers: {
      answers: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'B', 'B', 'A', 'C', 'B', 'B', 'B', 'B'],
      time_taken_seconds: 180,
      session_consistent: true,
      device_consistent: true
    },
    aiInputs: {
      upi_emi_activity_score: 0.6,
      psychometric_traits: {
        financial_responsibility: 3.2,
        delayed_gratification: 3.1,
        impulsivity: 2.8,
        consistency: 3.3,
        risk_aversion: 3.0,
        emotional_stability: 3.4
      },
      app_behaviour_risk_score: 0.3,
      employment_kyc_signals: 0.8,
      search_browser_risk: 0.1,
      data_recency_score: 0.7
    },
    expectedCategory: 'MONITOR'
  },
  {
    id: 4,
    name: "Vikram Singh",
    age: 31,
    occupation: "Stock Trader",
    description: "Risk Lover (Monitor) - Verified KYC, but psychometrics show high impulsivity, AI detects gambling app, high spend without savings habit",
    keyHighlights: [
      "High assets (house, car) but risky behavior",
      "Extremely high impulsivity (4.7/5) and low consistency",
      "Multiple gambling apps and betting site visits",
      "BNPL unpaid dues and loan app overuse",
      "AI flags high probability of default"
    ],
    traditionalInputs: {
      // Category 1: Identity & KYC - Good
      pan_verified: true, // +30
      aadhaar_verified: true, // +20
      voter_id: false, // 0
      bank_passbook: true, // +25
      salary_slips: false, // 0 (trader)
      digilocker_verified: true, // +30
      
      // Category 2: Financial Behaviour - High but volatile
      upi_monthly_volume: 85000, // +60 (>50K)
      utility_bills_ontime: true, // +40
      salary_sms_verified: false, // 0
      emi_payments_ontime: false, // 0
      failed_upi_messages: true, // -20
      bnpl_unpaid_dues: true, // -30
      
      // Category 3: Credit & Loan App Behaviour - Heavy usage
      loan_apps_count: 5, // -20 (>4)
      loan_emi_repaid_ontime: false, // 0
      loan_emi_missed: true, // -25
      no_loan_verified_salary: false, // 0
      
      // Category 4: Education & Employment - Self-employed
      degree_verified: true, // +25
      employment_verified_linkedin: false, // 0
      job_duration_months: 0, // 0
      self_employed_verified: true, // +20
      studying_fee_upi: false, // 0
      online_courses_completed: false, // 0
      
      // Category 5: Behavioural Patterns - Risky
      quick_loan_searches: true, // -30
      learning_finance_searches: false, // 0
      betting_sites_visits: true, // -40
      educational_govt_sites: false, // 0
      budgeting_apps_usage: false, // 0
      
      // Category 6: App & Lifestyle - High risk
      paid_ott_subscription: true, // +10
      excessive_gaming_apps: true, // -10
      betting_gambling_apps: true, // -40
      fitness_meditation_apps: false, // 0
      inapp_credit_repaid_ontime: false, // 0
      cod_orders_only: false, // 0
      
      // Category 7: Geolocation - Inconsistent
      regular_office_gps_pattern: false, // 0
      bank_atm_within_3km: true, // +10
      rural_area_no_bank: false, // 0
      
      // Category 8: Asset Ownership - High value
      house_verified: true, // +50
      car_registered: true, // +30
      two_wheeler_rc: false, // 0
      rent_income_monthly: 15000, // +25
      land_property_verified: false, // 0
      gst_business_verified: false // 0
    },
    psychometricTraits: {
      financial_responsibility: 2.1,
      delayed_gratification: 1.8,
      impulsivity: 4.7,
      consistency: 1.5,
      risk_aversion: 1.2,
      emotional_stability: 2.3
    },
    psychometricAnswers: {
      answers: ['C', 'D', 'C', 'C', 'C', 'C', 'C', 'C', 'D', 'A', 'D', 'C', 'C', 'D', 'D', 'D', 'C', 'D', 'D', 'C', 'C', 'D', 'D', 'D', 'B', 'D', 'D', 'D', 'D', 'D'],
      time_taken_seconds: 35, // Too fast
      session_consistent: true,
      device_consistent: true
    },
    aiInputs: {
      upi_emi_activity_score: 0.7,
      psychometric_traits: {
        financial_responsibility: 2.1,
        delayed_gratification: 1.8,
        impulsivity: 4.7,
        consistency: 1.5,
        risk_aversion: 1.2,
        emotional_stability: 2.3
      },
      app_behaviour_risk_score: 0.9, // High risk apps
      employment_kyc_signals: 0.4,
      search_browser_risk: 0.8, // Gambling/loan searches
      data_recency_score: 0.8
    },
    expectedCategory: 'HIGH_RISK'
  },
  {
    id: 5,
    name: "Meera Patel",
    age: 42,
    occupation: "Village Teacher",
    description: "Rural Consistent Earner (Safe) - Stable income, few expenses, moderate psychometric stability, low AI risk but no digital KYC",
    keyHighlights: [
      "15 years stable government teaching job",
      "Property owner with traditional assets",
      "Very high risk aversion (4.8/5) and consistency",
      "Rural location with limited digital footprint",
      "AI sees low risk despite minimal tech usage"
    ],
    traditionalInputs: {
      // Category 1: Identity & KYC - Basic
      pan_verified: true, // +30
      aadhaar_verified: true, // +20
      voter_id: true, // +10
      bank_passbook: false, // 0
      salary_slips: false, // 0
      digilocker_verified: false, // 0
      
      // Category 2: Financial Behaviour - Conservative
      upi_monthly_volume: 12000, // +20 (10K-20K)
      utility_bills_ontime: true, // +40
      salary_sms_verified: true, // +30 (govt salary)
      emi_payments_ontime: false, // 0
      failed_upi_messages: false, // 0
      bnpl_unpaid_dues: false, // 0
      
      // Category 3: Credit & Loan App Behaviour - No formal credit
      loan_apps_count: 0, // +10 (<2)
      loan_emi_repaid_ontime: false, // 0
      loan_emi_missed: false, // 0
      no_loan_verified_salary: true, // +15
      
      // Category 4: Education & Employment - Stable govt job
      degree_verified: true, // +25
      employment_verified_linkedin: false, // 0
      job_duration_months: 180, // +25 (15 years)
      self_employed_verified: false, // 0
      studying_fee_upi: false, // 0
      online_courses_completed: false, // 0
      
      // Category 5: Behavioural Patterns - Conservative
      quick_loan_searches: false, // 0
      learning_finance_searches: true, // +15
      betting_sites_visits: false, // 0
      educational_govt_sites: true, // +10
      budgeting_apps_usage: false, // 0
      
      // Category 6: App & Lifestyle - Minimal
      paid_ott_subscription: false, // 0
      excessive_gaming_apps: false, // 0
      betting_gambling_apps: false, // 0
      fitness_meditation_apps: false, // 0
      inapp_credit_repaid_ontime: false, // 0
      cod_orders_only: true, // 0
      
      // Category 7: Geolocation - Rural
      regular_office_gps_pattern: true, // +20 (school)
      bank_atm_within_3km: false, // 0
      rural_area_no_bank: true, // 0 (no penalty)
      
      // Category 8: Asset Ownership - Traditional
      house_verified: true, // +50
      car_registered: false, // 0
      two_wheeler_rc: true, // +10
      rent_income_monthly: 0, // 0
      land_property_verified: true, // +30
      gst_business_verified: false // 0
    },
    psychometricTraits: {
      financial_responsibility: 4.5,
      delayed_gratification: 4.2,
      impulsivity: 1.8,
      consistency: 4.7,
      risk_aversion: 4.8,
      emotional_stability: 4.1
    },
    psychometricAnswers: {
      answers: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'D', 'A', 'A', 'A', 'D', 'A', 'B', 'A', 'A', 'B', 'B', 'A', 'C', 'B', 'C', 'A', 'B', 'A'],
      time_taken_seconds: 520, // Careful consideration
      session_consistent: true,
      device_consistent: true
    },
    aiInputs: {
      upi_emi_activity_score: 0.4,
      psychometric_traits: {
        financial_responsibility: 4.5,
        delayed_gratification: 4.2,
        impulsivity: 1.8,
        consistency: 4.7,
        risk_aversion: 4.8,
        emotional_stability: 4.1
      },
      app_behaviour_risk_score: 0.0,
      employment_kyc_signals: 0.6, // Govt job but limited digital
      search_browser_risk: 0.0,
      data_recency_score: 0.6
    },
    expectedCategory: 'SAFE'
  },
  {
    id: 6,
    name: "Amit Kumar",
    age: 28,
    occupation: "BNPL Heavy User",
    description: "BNPL Heavy User (Monitor) - High BNPL usage with occasional missed dues, strong KYC, psychometrics okay but impulsivity medium",
    keyHighlights: [
      "Strong KYC but problematic BNPL behavior",
      "₹45,000 monthly spend with unpaid dues",
      "Moderate impulsivity (3.8/5) affecting decisions",
      "Some loan app usage with missed EMIs",
      "AI detects increasing risk patterns"
    ],
    traditionalInputs: {
      pan_verified: true,
      aadhaar_verified: true,
      voter_id: true,
      bank_passbook: true,
      salary_slips: true,
      digilocker_verified: true,
      upi_monthly_volume: 45000,
      utility_bills_ontime: false,
      salary_sms_verified: true,
      emi_payments_ontime: true,
      failed_upi_messages: false,
      bnpl_unpaid_dues: true, // High BNPL usage issue
      loan_apps_count: 3,
      loan_emi_repaid_ontime: false,
      loan_emi_missed: true,
      no_loan_verified_salary: false,
      degree_verified: true,
      employment_verified_linkedin: true,
      job_duration_months: 24,
      self_employed_verified: false,
      studying_fee_upi: false,
      online_courses_completed: false,
      quick_loan_searches: false,
      learning_finance_searches: false,
      betting_sites_visits: false,
      educational_govt_sites: false,
      budgeting_apps_usage: false,
      paid_ott_subscription: true,
      excessive_gaming_apps: false,
      betting_gambling_apps: false,
      fitness_meditation_apps: false,
      inapp_credit_repaid_ontime: false,
      cod_orders_only: false,
      regular_office_gps_pattern: true,
      bank_atm_within_3km: true,
      rural_area_no_bank: false,
      house_verified: false,
      car_registered: false,
      two_wheeler_rc: true,
      rent_income_monthly: 0,
      land_property_verified: false,
      gst_business_verified: false
    },
    psychometricTraits: {
      financial_responsibility: 2.8,
      delayed_gratification: 2.1,
      impulsivity: 3.8,
      consistency: 2.5,
      risk_aversion: 2.2,
      emotional_stability: 3.1
    },
    psychometricAnswers: {
      answers: ['B', 'C', 'B', 'C', 'C', 'B', 'C', 'B', 'C', 'C', 'B', 'C', 'C', 'B', 'C', 'B', 'C', 'B', 'B', 'C', 'B', 'C', 'C', 'C', 'B', 'C', 'B', 'C', 'B', 'C'],
      time_taken_seconds: 150,
      session_consistent: true,
      device_consistent: true
    },
    aiInputs: {
      upi_emi_activity_score: 0.6,
      psychometric_traits: {
        financial_responsibility: 2.8,
        delayed_gratification: 2.1,
        impulsivity: 3.8,
        consistency: 2.5,
        risk_aversion: 2.2,
        emotional_stability: 3.1
      },
      app_behaviour_risk_score: 0.5,
      employment_kyc_signals: 0.8,
      search_browser_risk: 0.2,
      data_recency_score: 0.9
    },
    expectedCategory: 'MONITOR'
  },
  {
    id: 7,
    name: "Sneha Reddy",
    age: 22,
    occupation: "Computer Science Student",
    description: "Young Student (Safe) - Limited income, no loans, clean app history, high curiosity psychometric traits, AI sees low risk",
    keyHighlights: [
      "Computer Science student with clean profile",
      "High delayed gratification (4.4/5) despite young age",
      "Zero loan apps or risky financial behavior",
      "Uses budgeting apps and educational sites",
      "AI sees excellent future potential"
    ],
    traditionalInputs: {
      pan_verified: true,
      aadhaar_verified: true,
      voter_id: false,
      bank_passbook: false,
      salary_slips: false,
      digilocker_verified: true,
      upi_monthly_volume: 6000,
      utility_bills_ontime: true,
      salary_sms_verified: false,
      emi_payments_ontime: false,
      failed_upi_messages: false,
      bnpl_unpaid_dues: false,
      loan_apps_count: 0,
      loan_emi_repaid_ontime: false,
      loan_emi_missed: false,
      no_loan_verified_salary: false,
      degree_verified: false, // Still studying
      employment_verified_linkedin: false,
      job_duration_months: 0,
      self_employed_verified: false,
      studying_fee_upi: true,
      online_courses_completed: true,
      quick_loan_searches: false,
      learning_finance_searches: true,
      betting_sites_visits: false,
      educational_govt_sites: true,
      budgeting_apps_usage: true,
      paid_ott_subscription: false,
      excessive_gaming_apps: false,
      betting_gambling_apps: false,
      fitness_meditation_apps: true,
      inapp_credit_repaid_ontime: false,
      cod_orders_only: true,
      regular_office_gps_pattern: true, // College
      bank_atm_within_3km: true,
      rural_area_no_bank: false,
      house_verified: false,
      car_registered: false,
      two_wheeler_rc: false,
      rent_income_monthly: 0,
      land_property_verified: false,
      gst_business_verified: false
    },
    psychometricTraits: {
      financial_responsibility: 4.1,
      delayed_gratification: 4.4,
      impulsivity: 2.1,
      consistency: 3.8,
      risk_aversion: 4.0,
      emotional_stability: 3.9
    },
    psychometricAnswers: {
      answers: ['A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      time_taken_seconds: 420,
      session_consistent: true,
      device_consistent: true
    },
    aiInputs: {
      upi_emi_activity_score: 0.2,
      psychometric_traits: {
        financial_responsibility: 4.1,
        delayed_gratification: 4.4,
        impulsivity: 2.1,
        consistency: 3.8,
        risk_aversion: 4.0,
        emotional_stability: 3.9
      },
      app_behaviour_risk_score: 0.0,
      employment_kyc_signals: 0.3,
      search_browser_risk: 0.0,
      data_recency_score: 0.9
    },
    expectedCategory: 'SAFE'
  },
  {
    id: 8,
    name: "Rajesh Mishra",
    age: 38,
    occupation: "Small Business Owner",
    description: "Overleveraged Borrower (High Risk) - Many loan apps, repeated EMI delays, low psychometric responsibility, AI PoD very high",
    keyHighlights: [
      "8+ loan apps with poor repayment history",
      "Extremely low financial responsibility (1.2/5)",
      "Gambling apps and betting site addiction",
      "Quick loan searches indicate desperation",
      "AI predicts very high default probability"
    ],
    traditionalInputs: {
      pan_verified: true,
      aadhaar_verified: false, // Poor KYC
      voter_id: false,
      bank_passbook: false,
      salary_slips: false,
      digilocker_verified: false,
      upi_monthly_volume: 15000,
      utility_bills_ontime: false,
      salary_sms_verified: false,
      emi_payments_ontime: false,
      failed_upi_messages: true,
      bnpl_unpaid_dues: true,
      loan_apps_count: 8, // Many loan apps
      loan_emi_repaid_ontime: false,
      loan_emi_missed: true,
      no_loan_verified_salary: false,
      degree_verified: false,
      employment_verified_linkedin: false,
      job_duration_months: 0,
      self_employed_verified: true,
      studying_fee_upi: false,
      online_courses_completed: false,
      quick_loan_searches: true,
      learning_finance_searches: false,
      betting_sites_visits: true,
      educational_govt_sites: false,
      budgeting_apps_usage: false,
      paid_ott_subscription: false,
      excessive_gaming_apps: true,
      betting_gambling_apps: true,
      fitness_meditation_apps: false,
      inapp_credit_repaid_ontime: false,
      cod_orders_only: false,
      regular_office_gps_pattern: false,
      bank_atm_within_3km: true,
      rural_area_no_bank: false,
      house_verified: false,
      car_registered: false,
      two_wheeler_rc: false,
      rent_income_monthly: 0,
      land_property_verified: false,
      gst_business_verified: true
    },
    psychometricTraits: {
      financial_responsibility: 1.2,
      delayed_gratification: 0.8,
      impulsivity: 4.9,
      consistency: 0.9,
      risk_aversion: 0.5,
      emotional_stability: 1.1
    },
    psychometricAnswers: {
      answers: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
      time_taken_seconds: 28, // Too fast
      session_consistent: false,
      device_consistent: false
    },
    aiInputs: {
      upi_emi_activity_score: 0.2,
      psychometric_traits: {
        financial_responsibility: 1.2,
        delayed_gratification: 0.8,
        impulsivity: 4.9,
        consistency: 0.9,
        risk_aversion: 0.5,
        emotional_stability: 1.1
      },
      app_behaviour_risk_score: 0.9,
      employment_kyc_signals: 0.2,
      search_browser_risk: 0.9,
      data_recency_score: 0.7
    },
    expectedCategory: 'HIGH_RISK'
  },
  {
    id: 9,
    name: "Kavya Nair",
    age: 32,
    occupation: "Marketing Executive",
    description: "Balanced Professional (Safe) - Consistent income, steady spend, high responsibility psychometrics, AI risk minimal",
    keyHighlights: [
      "4 years stable marketing career",
      "₹38,000 monthly spend with perfect payments",
      "Strong financial responsibility (4.3/5)",
      "Uses budgeting apps and fitness tracking",
      "AI sees consistent low-risk patterns"
    ],
    traditionalInputs: {
      pan_verified: true,
      aadhaar_verified: true,
      voter_id: true,
      bank_passbook: true,
      salary_slips: true,
      digilocker_verified: false,
      upi_monthly_volume: 38000,
      utility_bills_ontime: true,
      salary_sms_verified: true,
      emi_payments_ontime: true,
      failed_upi_messages: false,
      bnpl_unpaid_dues: false,
      loan_apps_count: 1,
      loan_emi_repaid_ontime: true,
      loan_emi_missed: false,
      no_loan_verified_salary: false,
      degree_verified: true,
      employment_verified_linkedin: true,
      job_duration_months: 48,
      self_employed_verified: false,
      studying_fee_upi: false,
      online_courses_completed: true,
      quick_loan_searches: false,
      learning_finance_searches: true,
      betting_sites_visits: false,
      educational_govt_sites: false,
      budgeting_apps_usage: true,
      paid_ott_subscription: true,
      excessive_gaming_apps: false,
      betting_gambling_apps: false,
      fitness_meditation_apps: true,
      inapp_credit_repaid_ontime: true,
      cod_orders_only: false,
      regular_office_gps_pattern: true,
      bank_atm_within_3km: true,
      rural_area_no_bank: false,
      house_verified: false,
      car_registered: true,
      two_wheeler_rc: false,
      rent_income_monthly: 0,
      land_property_verified: false,
      gst_business_verified: false
    },
    psychometricTraits: {
      financial_responsibility: 4.3,
      delayed_gratification: 4.1,
      impulsivity: 1.8,
      consistency: 4.2,
      risk_aversion: 3.5,
      emotional_stability: 4.0
    },
    psychometricAnswers: {
      answers: ['A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      time_taken_seconds: 290,
      session_consistent: true,
      device_consistent: true
    },
    aiInputs: {
      upi_emi_activity_score: 0.8,
      psychometric_traits: {
        financial_responsibility: 4.3,
        delayed_gratification: 4.1,
        impulsivity: 1.8,
        consistency: 4.2,
        risk_aversion: 3.5,
        emotional_stability: 4.0
      },
      app_behaviour_risk_score: 0.1,
      employment_kyc_signals: 0.9,
      search_browser_risk: 0.0,
      data_recency_score: 0.9
    },
    expectedCategory: 'SAFE'
  },
  {
    id: 10,
    name: "Suresh Yadav",
    age: 45,
    occupation: "Former IT Manager",
    description: "Sudden Drop Earner (Monitor) - Recently lost income source, high responsibility psychometrics, AI detects drop in patterns",
    keyHighlights: [
      "Recently unemployed former IT manager",
      "High assets (house, car) but income dropped",
      "Excellent financial responsibility (4.6/5) historically",
      "Emergency loan searches due to job loss",
      "AI detects pattern disruption requiring monitoring"
    ],
    traditionalInputs: {
      pan_verified: true,
      aadhaar_verified: true,
      voter_id: true,
      bank_passbook: true,
      salary_slips: false, // Recently unemployed
      digilocker_verified: true,
      upi_monthly_volume: 8000, // Dropped from higher
      utility_bills_ontime: true,
      salary_sms_verified: false, // No longer employed
      emi_payments_ontime: true,
      failed_upi_messages: true, // Recent drop
      bnpl_unpaid_dues: false,
      loan_apps_count: 2,
      loan_emi_repaid_ontime: true,
      loan_emi_missed: false,
      no_loan_verified_salary: false,
      degree_verified: true,
      employment_verified_linkedin: false, // Lost job
      job_duration_months: 0, // Recently unemployed
      self_employed_verified: false,
      studying_fee_upi: false,
      online_courses_completed: true,
      quick_loan_searches: true, // Looking for emergency funds
      learning_finance_searches: true,
      betting_sites_visits: false,
      educational_govt_sites: true,
      budgeting_apps_usage: true,
      paid_ott_subscription: false, // Cost cutting
      excessive_gaming_apps: false,
      betting_gambling_apps: false,
      fitness_meditation_apps: false,
      inapp_credit_repaid_ontime: true,
      cod_orders_only: true, // Being cautious
      regular_office_gps_pattern: false, // No longer working
      bank_atm_within_3km: true,
      rural_area_no_bank: false,
      house_verified: true,
      car_registered: true,
      two_wheeler_rc: false,
      rent_income_monthly: 0,
      land_property_verified: false,
      gst_business_verified: false
    },
    psychometricTraits: {
      financial_responsibility: 4.6,
      delayed_gratification: 4.2,
      impulsivity: 1.5,
      consistency: 4.0,
      risk_aversion: 4.8,
      emotional_stability: 2.8 // Stressed due to job loss
    },
    psychometricAnswers: {
      answers: ['A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'B', 'A', 'B', 'A'],
      time_taken_seconds: 380,
      session_consistent: true,
      device_consistent: true
    },
    aiInputs: {
      upi_emi_activity_score: 0.3, // Dropped activity
      psychometric_traits: {
        financial_responsibility: 4.6,
        delayed_gratification: 4.2,
        impulsivity: 1.5,
        consistency: 4.0,
        risk_aversion: 4.8,
        emotional_stability: 2.8
      },
      app_behaviour_risk_score: 0.3,
      employment_kyc_signals: 0.4, // Lost employment
      search_browser_risk: 0.4, // Emergency loan searches
      data_recency_score: 0.9
    },
    expectedCategory: 'MONITOR'
  }
];

// Calculate results for all profiles
export function calculateAllProfileResults(): ExactDemoProfile[] {
  return exactDemoProfiles.map(profile => {
    const traditionalResult = calculateTraditionalScoreExact(profile.traditionalInputs);
    const psychometricResult = calculatePsychometricScoreExact(profile.psychometricTraits, profile.psychometricAnswers);
    const aiResult = calculateAIScoreExact(profile.aiInputs);
    const finalResult = calculateFinalScoreExact(traditionalResult, psychometricResult, aiResult);
    
    return {
      ...profile,
      calculatedResults: {
        traditional: traditionalResult,
        psychometric: psychometricResult,
        ai: aiResult,
        final: finalResult
      }
    };
  });
}

export function getProfileBreakdown(profileId: number): string {
  const profile = exactDemoProfiles.find(p => p.id === profileId);
  if (!profile) return '';
  
  const results = calculateAllProfileResults().find(p => p.id === profileId)?.calculatedResults;
  if (!results) return '';
  
  return `--- PROFILE: ${profile.name} ---
[TRADITIONAL MODEL]
Category 1 (Identity/KYC): ${(results.traditional.categoryScores[0] * 100).toFixed(1)}/100 points
Category 2 (Financial): ${(results.traditional.categoryScores[1] * 100).toFixed(1)}/100 points  
Category 3 (Credit/Loan): ${(results.traditional.categoryScores[2] * 100).toFixed(1)}/100 points
Category 4 (Education/Employment): ${(results.traditional.categoryScores[3] * 100).toFixed(1)}/100 points
Category 5 (Behavioral): ${(results.traditional.categoryScores[4] * 100).toFixed(1)}/100 points
Category 6 (App/Lifestyle): ${(results.traditional.categoryScores[5] * 100).toFixed(1)}/100 points
Category 7 (Geolocation): ${(results.traditional.categoryScores[6] * 100).toFixed(1)}/100 points
Category 8 (Assets): ${(results.traditional.categoryScores[7] * 100).toFixed(1)}/100 points
Trust Bonus: +${results.traditional.trustBonus.toFixed(2)}
Drift Penalty: -${results.traditional.driftPenalty.toFixed(2)}
Confidence: ${(results.traditional.confidence * 100).toFixed(0)}%
Model Score: ${results.traditional.score.toFixed(1)}/10

[PSYCHOMETRIC MODEL]
Financial Responsibility: ${profile.psychometricTraits.financial_responsibility.toFixed(1)}/5
Delayed Gratification: ${profile.psychometricTraits.delayed_gratification.toFixed(1)}/5
Impulsivity: ${profile.psychometricTraits.impulsivity.toFixed(1)}/5
Consistency: ${profile.psychometricTraits.consistency.toFixed(1)}/5
Risk Aversion: ${profile.psychometricTraits.risk_aversion.toFixed(1)}/5
Emotional Stability: ${profile.psychometricTraits.emotional_stability.toFixed(1)}/5
CDD Penalty: -${results.psychometric.cddPenalty.toFixed(2)}
Confidence: ${(results.psychometric.confidence * 100).toFixed(0)}%
Model Score: ${results.psychometric.score.toFixed(1)}/10

[AI MODEL]
PoD Calculation: ${(results.ai.pod * 100).toFixed(1)}%
AI Score = 10 × (1 - ${results.ai.pod.toFixed(3)})^0.6 = ${results.ai.score.toFixed(1)}
Confidence: ${(results.ai.confidence * 100).toFixed(0)}%

[FUSION ENGINE]
Weights: Traditional=${(results.final.weights.traditional * 100).toFixed(0)}%, Psychometric=${(results.final.weights.psychometric * 100).toFixed(0)}%, AI=${(results.final.weights.ai * 100).toFixed(0)}%
Trust Bonus: +${results.final.trustBonus.toFixed(1)}
Risk Penalty: -${results.final.riskPenalty.toFixed(1)}
Final Score = ${results.final.finalScore.toFixed(1)}/10

RISK CATEGORY: ${results.final.riskCategory}`;
}