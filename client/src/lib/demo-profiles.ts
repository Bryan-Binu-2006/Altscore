export interface DemoProfile {
  name: string;
  dob: string;
  occupation: string;
  installed_apps: string[];
  upi_spending: number;
  bill_payment: "On time" | "Sometimes late" | "Often late" | "Always on time" | "Mostly on time";
  loan_apps: number;
  betting_apps: number;
  assets: string[];
  location: string;
  
  // Comprehensive AltScore fields
  pan_verified?: boolean;
  aadhaar_verified?: boolean;
  voter_id?: boolean;
  bank_passbook?: boolean;
  salary_slips?: boolean;
  digilocker_verified?: boolean;
  salary_sms?: boolean;
  emi_on_time?: boolean;
  failed_upi?: boolean;
  bnpl_dues?: boolean;
  emi_repaid_on_time?: boolean;
  emi_missed?: boolean;
  no_loan_but_verified?: boolean;
  degree_verified?: boolean;
  employment_verified?: boolean;
  job_duration_months?: number;
  self_employed?: boolean;
  studying?: boolean;
  online_courses?: boolean;
  quick_loan_searches?: boolean;
  educational_searches?: boolean;
  betting_sites?: boolean;
  govt_sites?: boolean;
  budgeting_apps?: boolean;
  ott_subscription?: boolean;
  excessive_gaming?: boolean;
  fitness_apps?: boolean;
  inapp_credit_repaid?: boolean;
  regular_gps_pattern?: boolean;
  bank_nearby?: boolean;
  rural_area?: boolean;
  house_owned?: boolean;
  car_registered?: boolean;
  two_wheeler?: boolean;
  rent_income?: number;
  land_property?: boolean;
  gst_shop?: boolean;
  
  // Psychometric traits (0-5 each)
  financial_responsibility?: number;
  delayed_gratification?: number;
  impulsivity?: number;
  consistency?: number;
  risk_aversion?: number;
  emotional_stability?: number;
  
  // Computed scores for demo
  psych_score?: number;
  ai_score?: number;
}

export const demoProfiles: DemoProfile[] = [
  {
    name: "Arjun Mehta",
    dob: "1994-05-14",
    occupation: "Software Engineer",
    installed_apps: ["Google Pay", "Paytm", "Netflix", "PhonePe", "Amazon"],
    upi_spending: 48000,
    bill_payment: "Always on time",
    loan_apps: 1,
    betting_apps: 0,
    assets: ["Car", "Apartment"],
    location: "Mumbai",
    
    // Identity & KYC - Excellent
    pan_verified: true,
    aadhaar_verified: true,
    voter_id: true,
    bank_passbook: true,
    salary_slips: true,
    digilocker_verified: true,
    
    // Financial Behaviour - Excellent
    salary_sms: true,
    emi_on_time: true,
    failed_upi: false,
    bnpl_dues: false,
    
    // Credit & Loan - Good
    emi_repaid_on_time: true,
    emi_missed: false,
    no_loan_but_verified: false,
    
    // Education & Employment - Excellent
    degree_verified: true,
    employment_verified: true,
    job_duration_months: 24,
    self_employed: false,
    studying: false,
    online_courses: true,
    
    // Behavioral/Search - Good
    quick_loan_searches: false,
    educational_searches: true,
    betting_sites: false,
    govt_sites: true,
    budgeting_apps: true,
    
    // App/Lifestyle - Good
    ott_subscription: true,
    excessive_gaming: false,
    fitness_apps: true,
    inapp_credit_repaid: true,
    
    // Geolocation - Good
    regular_gps_pattern: true,
    bank_nearby: true,
    rural_area: false,
    
    // Assets - Excellent
    house_owned: true,
    car_registered: true,
    two_wheeler: false,
    rent_income: 0,
    land_property: false,
    gst_shop: false,
    
    // Psychometric - Excellent
    financial_responsibility: 4.5,
    delayed_gratification: 4.2,
    impulsivity: 1.8,
    consistency: 4.3,
    risk_aversion: 3.8,
    emotional_stability: 4.1,
    
    // Computed scores
    psych_score: 8.5,
    ai_score: 9.2
  },
  {
    name: "Neha Kapoor",
    dob: "1998-11-22",
    occupation: "Freelance Graphic Designer",
    installed_apps: ["Google Pay", "Dream11", "Paytm", "Zomato", "Instagram"],
    upi_spending: 19000,
    bill_payment: "Mostly on time",
    loan_apps: 3,
    betting_apps: 1,
    assets: ["Scooter"],
    location: "Jaipur",
    
    // Identity & KYC - Average
    pan_verified: true,
    aadhaar_verified: true,
    voter_id: false,
    bank_passbook: true,
    salary_slips: false,
    digilocker_verified: false,
    
    // Financial Behaviour - Average
    salary_sms: false,
    emi_on_time: true,
    failed_upi: false,
    bnpl_dues: true,
    
    // Credit & Loan - Concerning
    emi_repaid_on_time: false,
    emi_missed: true,
    no_loan_but_verified: false,
    
    // Education & Employment - Average
    degree_verified: true,
    employment_verified: false,
    job_duration_months: 8,
    self_employed: true,
    studying: false,
    online_courses: true,
    
    // Behavioral/Search - Mixed
    quick_loan_searches: false,
    educational_searches: true,
    betting_sites: true,
    govt_sites: false,
    budgeting_apps: false,
    
    // App/Lifestyle - Mixed
    ott_subscription: false,
    excessive_gaming: false,
    fitness_apps: false,
    inapp_credit_repaid: false,
    
    // Geolocation - Average
    regular_gps_pattern: false,
    bank_nearby: true,
    rural_area: false,
    
    // Assets - Limited
    house_owned: false,
    car_registered: false,
    two_wheeler: true,
    rent_income: 0,
    land_property: false,
    gst_shop: false,
    
    // Psychometric - Average
    financial_responsibility: 3.1,
    delayed_gratification: 2.8,
    impulsivity: 3.2,
    consistency: 2.9,
    risk_aversion: 2.5,
    emotional_stability: 3.0,
    
    // Computed scores
    psych_score: 6.2,
    ai_score: 7.1
  },
  {
    name: "Ravi Sharma",
    dob: "1992-03-09",
    occupation: "Small Shop Owner",
    installed_apps: ["Dream11", "Paytm", "Amazon", "Bajaj Finance", "MPL"],
    upi_spending: 8500,
    bill_payment: "Often late",
    loan_apps: 5,
    betting_apps: 2,
    assets: [],
    location: "Rural Bihar",
    
    // Identity & KYC - Poor
    pan_verified: false,
    aadhaar_verified: true,
    voter_id: false,
    bank_passbook: false,
    salary_slips: false,
    digilocker_verified: false,
    
    // Financial Behaviour - Poor
    salary_sms: false,
    emi_on_time: false,
    failed_upi: true,
    bnpl_dues: true,
    
    // Credit & Loan - Very Poor
    emi_repaid_on_time: false,
    emi_missed: true,
    no_loan_but_verified: false,
    
    // Education & Employment - Poor
    degree_verified: false,
    employment_verified: false,
    job_duration_months: 36,
    self_employed: true,
    studying: false,
    online_courses: false,
    
    // Behavioral/Search - High Risk
    quick_loan_searches: true,
    educational_searches: false,
    betting_sites: true,
    govt_sites: false,
    budgeting_apps: false,
    
    // App/Lifestyle - High Risk
    ott_subscription: false,
    excessive_gaming: true,
    fitness_apps: false,
    inapp_credit_repaid: false,
    
    // Geolocation - Poor
    regular_gps_pattern: false,
    bank_nearby: false,
    rural_area: true,
    
    // Assets - None
    house_owned: false,
    car_registered: false,
    two_wheeler: false,
    rent_income: 0,
    land_property: false,
    gst_shop: true,
    
    // Psychometric - Poor
    financial_responsibility: 1.8,
    delayed_gratification: 1.5,
    impulsivity: 4.2,
    consistency: 1.9,
    risk_aversion: 1.2,
    emotional_stability: 2.1,
    
    // Computed scores
    psych_score: 3.8,
    ai_score: 4.2
  }
];

export const availableApps = [
  "Google Pay", "Paytm", "PhonePe", "Netflix", "Amazon", "Dream11", 
  "Zomato", "Instagram", "Bajaj Finance", "MPL", "Flipkart", "Uber",
  "Ola", "Swiggy", "YouTube", "WhatsApp", "Facebook", "Twitter"
];