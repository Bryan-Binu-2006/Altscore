/**
 * Complete 30-Question Psychometric Assessment for AltScore
 * Each question maps to specific traits with exact point values and weightings
 */

export interface PsychometricQuestionData {
  id: number;
  question: string;
  options: {
    A: { text: string; scores: Record<string, number> };
    B: { text: string; scores: Record<string, number> };
    C: { text: string; scores: Record<string, number> };
    D: { text: string; scores: Record<string, number> };
  };
  traits: string[];
  weightings: Record<string, number>;
}

export const psychometric30Questions: PsychometricQuestionData[] = [
  {
    id: 1,
    question: "When planning a large purchase (e.g., an appliance), you:",
    options: {
      A: {
        text: "Save up and wait until you can afford it outright",
        scores: { financial_responsibility: 5, delayed_gratification: 5 }
      },
      B: {
        text: "Put it on a credit card and pay it off gradually",
        scores: { financial_responsibility: 3, delayed_gratification: 3 }
      },
      C: {
        text: "Buy it immediately and figure out payment later",
        scores: { financial_responsibility: 1, impulsivity: 5, delayed_gratification: 0 }
      },
      D: {
        text: "Grab a good deal on credit, even if it means higher rates",
        scores: { financial_responsibility: 2, impulsivity: 4, delayed_gratification: 2 }
      }
    },
    traits: ["financial_responsibility", "delayed_gratification", "impulsivity"],
    weightings: { financial_responsibility: 1.2, delayed_gratification: 1.1, impulsivity: 0.9 }
  },
  {
    id: 2,
    question: "If you unexpectedly received ₹50,000, you would:",
    options: {
      A: {
        text: "Deposit it into savings or pay off debt",
        scores: { financial_responsibility: 5, delayed_gratification: 4 }
      },
      B: {
        text: "Pay off outstanding bills immediately",
        scores: { financial_responsibility: 4, delayed_gratification: 3 }
      },
      C: {
        text: "Spend it on non-essential luxury items",
        scores: { financial_responsibility: 0, impulsivity: 5 }
      },
      D: {
        text: "Invest in a high-risk opportunity hoping for big gains",
        scores: { financial_responsibility: 2, impulsivity: 4, risk_aversion: 0 }
      }
    },
    traits: ["financial_responsibility", "impulsivity", "risk_aversion"],
    weightings: { financial_responsibility: 1.3, impulsivity: 1.0, risk_aversion: 1.1 }
  },
  {
    id: 3,
    question: "I pay all my bills (utilities, loan payments, etc.) by their due dates:",
    options: {
      A: {
        text: "Strongly agree",
        scores: { financial_responsibility: 5, consistency: 5 }
      },
      B: {
        text: "Agree",
        scores: { financial_responsibility: 4, consistency: 4 }
      },
      C: {
        text: "Disagree",
        scores: { financial_responsibility: 1, consistency: 1 }
      },
      D: {
        text: "Strongly disagree",
        scores: { financial_responsibility: 0, consistency: 0 }
      }
    },
    traits: ["financial_responsibility", "consistency"],
    weightings: { financial_responsibility: 1.4, consistency: 1.2 }
  },
  {
    id: 4,
    question: "When I see a limited-time sale on something I want, I usually:",
    options: {
      A: {
        text: "Take time to think it over before buying",
        scores: { delayed_gratification: 5, impulsivity: 0 }
      },
      B: {
        text: "Decide quickly to take advantage of the deal",
        scores: { delayed_gratification: 2, impulsivity: 4 }
      },
      C: {
        text: "Buy it immediately without much thought",
        scores: { delayed_gratification: 0, impulsivity: 5 }
      },
      D: {
        text: "Avoid buying even if it's a good deal",
        scores: { delayed_gratification: 5, risk_aversion: 4 }
      }
    },
    traits: ["delayed_gratification", "impulsivity", "risk_aversion"],
    weightings: { delayed_gratification: 1.2, impulsivity: 1.1, risk_aversion: 0.9 }
  },
  {
    id: 5,
    question: "You have ₹1,00,000 to invest. You choose:",
    options: {
      A: {
        text: "Government bonds or fixed deposits (safe, low return)",
        scores: { risk_aversion: 5, impulsivity: 0 }
      },
      B: {
        text: "Blue-chip stocks (moderate risk)",
        scores: { risk_aversion: 3, impulsivity: 1 }
      },
      C: {
        text: "A high-risk startup or speculative scheme",
        scores: { risk_aversion: 0, impulsivity: 5 }
      },
      D: {
        text: "Keep it as cash in the bank (very safe)",
        scores: { risk_aversion: 4, impulsivity: 0 }
      }
    },
    traits: ["risk_aversion", "impulsivity"],
    weightings: { risk_aversion: 1.3, impulsivity: 1.0 }
  },
  {
    id: 6,
    question: "If a major financial emergency occurred, I would feel:",
    options: {
      A: {
        text: "Calm and confident that I could handle it",
        scores: { emotional_stability: 5, financial_responsibility: 3 }
      },
      B: {
        text: "Some stress but able to manage",
        scores: { emotional_stability: 3, financial_responsibility: 2 }
      },
      C: {
        text: "Very anxious and worried",
        scores: { emotional_stability: 1, financial_responsibility: 1 }
      },
      D: {
        text: "Completely overwhelmed and panicked",
        scores: { emotional_stability: 0, financial_responsibility: 0 }
      }
    },
    traits: ["emotional_stability", "financial_responsibility"],
    weightings: { emotional_stability: 1.2, financial_responsibility: 0.8 }
  },
  {
    id: 7,
    question: "When making important financial decisions, I:",
    options: {
      A: {
        text: "Research thoroughly and consult multiple sources",
        scores: { financial_responsibility: 5, delayed_gratification: 4 }
      },
      B: {
        text: "Do some research but decide relatively quickly",
        scores: { financial_responsibility: 3, delayed_gratification: 2 }
      },
      C: {
        text: "Go with my gut instinct",
        scores: { impulsivity: 4, financial_responsibility: 2 }
      },
      D: {
        text: "Ask friends or family for advice and follow it",
        scores: { consistency: 2, financial_responsibility: 2 }
      }
    },
    traits: ["financial_responsibility", "delayed_gratification", "impulsivity", "consistency"],
    weightings: { financial_responsibility: 1.3, delayed_gratification: 1.0, impulsivity: 0.9, consistency: 0.8 }
  },
  {
    id: 8,
    question: "My approach to monthly budgeting is:",
    options: {
      A: {
        text: "I create detailed budgets and stick to them religiously",
        scores: { financial_responsibility: 5, consistency: 5, delayed_gratification: 4 }
      },
      B: {
        text: "I have a rough idea of expenses and try to stay within limits",
        scores: { financial_responsibility: 3, consistency: 3 }
      },
      C: {
        text: "I spend freely and hope money lasts until month-end",
        scores: { financial_responsibility: 1, impulsivity: 4 }
      },
      D: {
        text: "I don't really track expenses or make budgets",
        scores: { financial_responsibility: 0, consistency: 0 }
      }
    },
    traits: ["financial_responsibility", "consistency", "delayed_gratification", "impulsivity"],
    weightings: { financial_responsibility: 1.4, consistency: 1.2, delayed_gratification: 1.0, impulsivity: 0.8 }
  },
  {
    id: 9,
    question: "When faced with a 'buy now, pay later' offer, I:",
    options: {
      A: {
        text: "Never use such offers as I prefer to pay upfront",
        scores: { financial_responsibility: 5, risk_aversion: 4, delayed_gratification: 4 }
      },
      B: {
        text: "Use it occasionally for planned purchases",
        scores: { financial_responsibility: 3, delayed_gratification: 2 }
      },
      C: {
        text: "Use it frequently for various purchases",
        scores: { impulsivity: 4, financial_responsibility: 1 }
      },
      D: {
        text: "Always choose it when available, regardless of need",
        scores: { impulsivity: 5, financial_responsibility: 0 }
      }
    },
    traits: ["financial_responsibility", "risk_aversion", "delayed_gratification", "impulsivity"],
    weightings: { financial_responsibility: 1.3, risk_aversion: 1.0, delayed_gratification: 1.1, impulsivity: 1.0 }
  },
  {
    id: 10,
    question: "If I had to choose between two job offers:",
    options: {
      A: {
        text: "Higher salary with no job security",
        scores: { risk_aversion: 1, impulsivity: 3 }
      },
      B: {
        text: "Lower salary but very secure position",
        scores: { risk_aversion: 5, financial_responsibility: 4 }
      },
      C: {
        text: "Moderate salary with good growth potential",
        scores: { risk_aversion: 3, delayed_gratification: 4 }
      },
      D: {
        text: "Whichever one sounds more exciting",
        scores: { impulsivity: 5, consistency: 0 }
      }
    },
    traits: ["risk_aversion", "financial_responsibility", "delayed_gratification", "impulsivity", "consistency"],
    weightings: { risk_aversion: 1.2, financial_responsibility: 1.1, delayed_gratification: 1.0, impulsivity: 0.8, consistency: 0.9 }
  },
  {
    id: 11,
    question: "My savings account balance typically:",
    options: {
      A: {
        text: "Grows steadily each month",
        scores: { financial_responsibility: 5, consistency: 5, delayed_gratification: 4 }
      },
      B: {
        text: "Stays relatively stable",
        scores: { financial_responsibility: 3, consistency: 3 }
      },
      C: {
        text: "Fluctuates significantly month to month",
        scores: { consistency: 1, emotional_stability: 2 }
      },
      D: {
        text: "Is usually close to zero or negative",
        scores: { financial_responsibility: 0, impulsivity: 4 }
      }
    },
    traits: ["financial_responsibility", "consistency", "delayed_gratification", "impulsivity", "emotional_stability"],
    weightings: { financial_responsibility: 1.4, consistency: 1.2, delayed_gratification: 1.0, impulsivity: 0.8, emotional_stability: 0.7 }
  },
  {
    id: 12,
    question: "When I make a financial mistake:",
    options: {
      A: {
        text: "I analyze what went wrong and create a plan to avoid it",
        scores: { emotional_stability: 5, financial_responsibility: 4, consistency: 4 }
      },
      B: {
        text: "I feel bad but move on without dwelling on it",
        scores: { emotional_stability: 3, consistency: 2 }
      },
      C: {
        text: "I get very upset and stressed about it",
        scores: { emotional_stability: 1, impulsivity: 2 }
      },
      D: {
        text: "I tend to make the same mistake again",
        scores: { consistency: 0, financial_responsibility: 0 }
      }
    },
    traits: ["emotional_stability", "financial_responsibility", "consistency", "impulsivity"],
    weightings: { emotional_stability: 1.3, financial_responsibility: 1.2, consistency: 1.1, impulsivity: 0.8 }
  },
  {
    id: 13,
    question: "My attitude toward credit cards is:",
    options: {
      A: {
        text: "I pay off the full balance every month",
        scores: { financial_responsibility: 5, consistency: 5, delayed_gratification: 3 }
      },
      B: {
        text: "I maintain a small balance but pay on time",
        scores: { financial_responsibility: 3, consistency: 4 }
      },
      C: {
        text: "I often carry significant balances",
        scores: { financial_responsibility: 1, impulsivity: 3 }
      },
      D: {
        text: "I avoid credit cards entirely",
        scores: { risk_aversion: 5, financial_responsibility: 2 }
      }
    },
    traits: ["financial_responsibility", "consistency", "delayed_gratification", "impulsivity", "risk_aversion"],
    weightings: { financial_responsibility: 1.4, consistency: 1.3, delayed_gratification: 1.0, impulsivity: 0.9, risk_aversion: 0.8 }
  },
  {
    id: 14,
    question: "When planning for retirement, I:",
    options: {
      A: {
        text: "Have a detailed plan and contribute regularly",
        scores: { delayed_gratification: 5, financial_responsibility: 5, consistency: 4 }
      },
      B: {
        text: "Contribute occasionally when I have extra money",
        scores: { delayed_gratification: 3, financial_responsibility: 2, consistency: 2 }
      },
      C: {
        text: "Know I should plan but haven't started yet",
        scores: { delayed_gratification: 1, financial_responsibility: 1 }
      },
      D: {
        text: "Prefer to live in the present and worry about it later",
        scores: { impulsivity: 5, delayed_gratification: 0 }
      }
    },
    traits: ["delayed_gratification", "financial_responsibility", "consistency", "impulsivity"],
    weightings: { delayed_gratification: 1.4, financial_responsibility: 1.3, consistency: 1.1, impulsivity: 0.9 }
  },
  {
    id: 15,
    question: "If I were offered a chance to double my money with 50% risk of losing it all:",
    options: {
      A: {
        text: "I would never take such a risk",
        scores: { risk_aversion: 5, emotional_stability: 4 }
      },
      B: {
        text: "I would consider it only with money I can afford to lose",
        scores: { risk_aversion: 3, financial_responsibility: 3 }
      },
      C: {
        text: "I would be very tempted and likely try it",
        scores: { risk_aversion: 1, impulsivity: 4 }
      },
      D: {
        text: "I would definitely do it - high risk, high reward",
        scores: { risk_aversion: 0, impulsivity: 5 }
      }
    },
    traits: ["risk_aversion", "impulsivity", "financial_responsibility", "emotional_stability"],
    weightings: { risk_aversion: 1.4, impulsivity: 1.2, financial_responsibility: 1.0, emotional_stability: 0.8 }
  },
  {
    id: 16,
    question: "My spending habits are:",
    options: {
      A: {
        text: "Very consistent and predictable from month to month",
        scores: { consistency: 5, financial_responsibility: 4, emotional_stability: 3 }
      },
      B: {
        text: "Mostly consistent with occasional splurges",
        scores: { consistency: 3, impulsivity: 2 }
      },
      C: {
        text: "Highly dependent on my mood and circumstances",
        scores: { consistency: 1, emotional_stability: 1, impulsivity: 4 }
      },
      D: {
        text: "I spend impulsively without much pattern",
        scores: { consistency: 0, impulsivity: 5, financial_responsibility: 0 }
      }
    },
    traits: ["consistency", "financial_responsibility", "emotional_stability", "impulsivity"],
    weightings: { consistency: 1.4, financial_responsibility: 1.2, emotional_stability: 1.0, impulsivity: 1.0 }
  },
  {
    id: 17,
    question: "When considering a loan for a major purchase:",
    options: {
      A: {
        text: "I compare multiple lenders and read all terms carefully",
        scores: { financial_responsibility: 5, delayed_gratification: 4, consistency: 4 }
      },
      B: {
        text: "I check a few options and choose the best rate",
        scores: { financial_responsibility: 3, delayed_gratification: 2 }
      },
      C: {
        text: "I go with the first reasonable offer I find",
        scores: { impulsivity: 3, financial_responsibility: 1 }
      },
      D: {
        text: "I avoid loans entirely and save up instead",
        scores: { risk_aversion: 5, delayed_gratification: 5 }
      }
    },
    traits: ["financial_responsibility", "delayed_gratification", "consistency", "impulsivity", "risk_aversion"],
    weightings: { financial_responsibility: 1.3, delayed_gratification: 1.2, consistency: 1.0, impulsivity: 0.9, risk_aversion: 1.0 }
  },
  {
    id: 18,
    question: "If my income suddenly increased by 50%, I would:",
    options: {
      A: {
        text: "Increase my savings rate proportionally",
        scores: { financial_responsibility: 5, delayed_gratification: 5, consistency: 4 }
      },
      B: {
        text: "Save some and upgrade my lifestyle modestly",
        scores: { financial_responsibility: 3, delayed_gratification: 3 }
      },
      C: {
        text: "Significantly upgrade my lifestyle immediately",
        scores: { impulsivity: 4, financial_responsibility: 1 }
      },
      D: {
        text: "Spend it all on things I've always wanted",
        scores: { impulsivity: 5, delayed_gratification: 0 }
      }
    },
    traits: ["financial_responsibility", "delayed_gratification", "consistency", "impulsivity"],
    weightings: { financial_responsibility: 1.4, delayed_gratification: 1.3, consistency: 1.0, impulsivity: 1.0 }
  },
  {
    id: 19,
    question: "My approach to financial advice is:",
    options: {
      A: {
        text: "I research thoroughly from multiple credible sources",
        scores: { financial_responsibility: 5, consistency: 4, delayed_gratification: 3 }
      },
      B: {
        text: "I consult with financial professionals when needed",
        scores: { financial_responsibility: 4, risk_aversion: 3 }
      },
      C: {
        text: "I ask friends and family for their opinions",
        scores: { consistency: 2, financial_responsibility: 2 }
      },
      D: {
        text: "I trust my instincts and don't seek much advice",
        scores: { impulsivity: 4, consistency: 1 }
      }
    },
    traits: ["financial_responsibility", "consistency", "delayed_gratification", "risk_aversion", "impulsivity"],
    weightings: { financial_responsibility: 1.3, consistency: 1.1, delayed_gratification: 0.9, risk_aversion: 0.8, impulsivity: 0.9 }
  },
  {
    id: 20,
    question: "When facing financial stress, I:",
    options: {
      A: {
        text: "Stay calm and systematically address the issues",
        scores: { emotional_stability: 5, consistency: 4, financial_responsibility: 4 }
      },
      B: {
        text: "Feel anxious but work through solutions methodically",
        scores: { emotional_stability: 3, consistency: 3, financial_responsibility: 3 }
      },
      C: {
        text: "Get overwhelmed and may make poor quick decisions",
        scores: { emotional_stability: 1, impulsivity: 4, consistency: 1 }
      },
      D: {
        text: "Panic and avoid dealing with the problems",
        scores: { emotional_stability: 0, consistency: 0, financial_responsibility: 0 }
      }
    },
    traits: ["emotional_stability", "consistency", "financial_responsibility", "impulsivity"],
    weightings: { emotional_stability: 1.4, consistency: 1.2, financial_responsibility: 1.1, impulsivity: 0.8 }
  },
  {
    id: 21,
    question: "My relationship with money can best be described as:",
    options: {
      A: {
        text: "Money is a tool for achieving long-term security and goals",
        scores: { financial_responsibility: 5, delayed_gratification: 5, emotional_stability: 4 }
      },
      B: {
        text: "Money provides comfort and some freedom for enjoyment",
        scores: { financial_responsibility: 3, emotional_stability: 3 }
      },
      C: {
        text: "Money is meant to be enjoyed and spent on experiences",
        scores: { impulsivity: 4, delayed_gratification: 1 }
      },
      D: {
        text: "Money causes me anxiety and stress",
        scores: { emotional_stability: 0, risk_aversion: 4 }
      }
    },
    traits: ["financial_responsibility", "delayed_gratification", "emotional_stability", "impulsivity", "risk_aversion"],
    weightings: { financial_responsibility: 1.3, delayed_gratification: 1.2, emotional_stability: 1.2, impulsivity: 0.9, risk_aversion: 0.8 }
  },
  {
    id: 22,
    question: "If I discovered I had been overpaying for a service for months:",
    options: {
      A: {
        text: "I would immediately cancel and find a better option",
        scores: { financial_responsibility: 4, consistency: 3 }
      },
      B: {
        text: "I would research alternatives before making changes",
        scores: { financial_responsibility: 5, delayed_gratification: 4, consistency: 4 }
      },
      C: {
        text: "I would be upset but probably continue with the same service",
        scores: { consistency: 1, emotional_stability: 2 }
      },
      D: {
        text: "I wouldn't really care much about it",
        scores: { financial_responsibility: 0, consistency: 0 }
      }
    },
    traits: ["financial_responsibility", "delayed_gratification", "consistency", "emotional_stability"],
    weightings: { financial_responsibility: 1.4, delayed_gratification: 1.0, consistency: 1.2, emotional_stability: 0.8 }
  },
  {
    id: 23,
    question: "My emergency fund situation is:",
    options: {
      A: {
        text: "I have 6+ months of expenses saved",
        scores: { financial_responsibility: 5, delayed_gratification: 5, risk_aversion: 4 }
      },
      B: {
        text: "I have 2-3 months of expenses saved",
        scores: { financial_responsibility: 3, delayed_gratification: 3, risk_aversion: 3 }
      },
      C: {
        text: "I have some savings but less than a month's expenses",
        scores: { financial_responsibility: 1, delayed_gratification: 1 }
      },
      D: {
        text: "I live paycheck to paycheck with no emergency fund",
        scores: { financial_responsibility: 0, impulsivity: 3 }
      }
    },
    traits: ["financial_responsibility", "delayed_gratification", "risk_aversion", "impulsivity"],
    weightings: { financial_responsibility: 1.4, delayed_gratification: 1.3, risk_aversion: 1.0, impulsivity: 0.8 }
  },
  {
    id: 24,
    question: "When making online purchases, I:",
    options: {
      A: {
        text: "Always compare prices and read reviews thoroughly",
        scores: { financial_responsibility: 4, delayed_gratification: 4, consistency: 4 }
      },
      B: {
        text: "Do some comparison but decide relatively quickly",
        scores: { financial_responsibility: 3, delayed_gratification: 2 }
      },
      C: {
        text: "Often buy impulsively based on recommendations",
        scores: { impulsivity: 4, consistency: 1 }
      },
      D: {
        text: "Frequently make purchases I later regret",
        scores: { impulsivity: 5, financial_responsibility: 0, consistency: 0 }
      }
    },
    traits: ["financial_responsibility", "delayed_gratification", "consistency", "impulsivity"],
    weightings: { financial_responsibility: 1.3, delayed_gratification: 1.2, consistency: 1.1, impulsivity: 1.0 }
  },
  {
    id: 25,
    question: "If I had to lend money to a friend in need:",
    options: {
      A: {
        text: "I would help if I can afford it, with clear repayment terms",
        scores: { financial_responsibility: 4, emotional_stability: 4, consistency: 4 }
      },
      B: {
        text: "I would help immediately without worrying about repayment",
        scores: { impulsivity: 3, emotional_stability: 3, risk_aversion: 1 }
      },
      C: {
        text: "I would be hesitant due to potential relationship complications",
        scores: { risk_aversion: 4, emotional_stability: 2 }
      },
      D: {
        text: "I would refuse as I need all my money for myself",
        scores: { financial_responsibility: 2, risk_aversion: 5 }
      }
    },
    traits: ["financial_responsibility", "emotional_stability", "consistency", "impulsivity", "risk_aversion"],
    weightings: { financial_responsibility: 1.2, emotional_stability: 1.1, consistency: 1.0, impulsivity: 0.8, risk_aversion: 1.0 }
  },
  {
    id: 26,
    question: "My investment philosophy is:",
    options: {
      A: {
        text: "Diversified portfolio with long-term focus",
        scores: { delayed_gratification: 5, financial_responsibility: 5, risk_aversion: 3 }
      },
      B: {
        text: "Conservative investments with guaranteed returns",
        scores: { risk_aversion: 5, delayed_gratification: 3, financial_responsibility: 3 }
      },
      C: {
        text: "Mix of safe and risky investments for balance",
        scores: { financial_responsibility: 3, risk_aversion: 2, delayed_gratification: 3 }
      },
      D: {
        text: "High-risk, high-reward investments for quick gains",
        scores: { impulsivity: 5, risk_aversion: 0, delayed_gratification: 0 }
      }
    },
    traits: ["delayed_gratification", "financial_responsibility", "risk_aversion", "impulsivity"],
    weightings: { delayed_gratification: 1.3, financial_responsibility: 1.3, risk_aversion: 1.1, impulsivity: 0.9 }
  },
  {
    id: 27,
    question: "When my friends suggest expensive group activities:",
    options: {
      A: {
        text: "I participate only if it fits within my budget",
        scores: { financial_responsibility: 5, consistency: 4, delayed_gratification: 3 }
      },
      B: {
        text: "I usually find a way to join even if it's a stretch financially",
        scores: { impulsivity: 3, financial_responsibility: 2 }
      },
      C: {
        text: "I often skip due to cost concerns",
        scores: { risk_aversion: 4, financial_responsibility: 3 }
      },
      D: {
        text: "I always participate regardless of cost",
        scores: { impulsivity: 5, financial_responsibility: 0 }
      }
    },
    traits: ["financial_responsibility", "consistency", "delayed_gratification", "impulsivity", "risk_aversion"],
    weightings: { financial_responsibility: 1.3, consistency: 1.1, delayed_gratification: 1.0, impulsivity: 1.0, risk_aversion: 0.9 }
  },
  {
    id: 28,
    question: "My approach to financial goals is:",
    options: {
      A: {
        text: "I set specific, measurable goals with clear timelines",
        scores: { consistency: 5, delayed_gratification: 5, financial_responsibility: 5 }
      },
      B: {
        text: "I have general goals but flexible on how to achieve them",
        scores: { consistency: 3, delayed_gratification: 3, financial_responsibility: 3 }
      },
      C: {
        text: "I have vague hopes but no concrete plans",
        scores: { consistency: 1, delayed_gratification: 1, financial_responsibility: 1 }
      },
      D: {
        text: "I prefer to live spontaneously without financial planning",
        scores: { impulsivity: 5, consistency: 0, delayed_gratification: 0 }
      }
    },
    traits: ["consistency", "delayed_gratification", "financial_responsibility", "impulsivity"],
    weightings: { consistency: 1.4, delayed_gratification: 1.4, financial_responsibility: 1.3, impulsivity: 0.9 }
  },
  {
    id: 29,
    question: "If I lost my job tomorrow, I would:",
    options: {
      A: {
        text: "Feel confident in my emergency fund and job search strategy",
        scores: { emotional_stability: 5, financial_responsibility: 5, delayed_gratification: 4 }
      },
      B: {
        text: "Feel worried but believe I could manage for a while",
        scores: { emotional_stability: 3, financial_responsibility: 3 }
      },
      C: {
        text: "Feel very stressed about immediate financial obligations",
        scores: { emotional_stability: 1, financial_responsibility: 1 }
      },
      D: {
        text: "Panic completely as I have no financial backup",
        scores: { emotional_stability: 0, financial_responsibility: 0, impulsivity: 2 }
      }
    },
    traits: ["emotional_stability", "financial_responsibility", "delayed_gratification", "impulsivity"],
    weightings: { emotional_stability: 1.3, financial_responsibility: 1.4, delayed_gratification: 1.2, impulsivity: 0.7 }
  },
  {
    id: 30,
    question: "Overall, my financial behavior is:",
    options: {
      A: {
        text: "Very disciplined and consistent with long-term focus",
        scores: { financial_responsibility: 5, consistency: 5, delayed_gratification: 5, emotional_stability: 4 }
      },
      B: {
        text: "Generally responsible with occasional lapses",
        scores: { financial_responsibility: 3, consistency: 3, delayed_gratification: 3 }
      },
      C: {
        text: "Inconsistent and often driven by emotions or impulses",
        scores: { consistency: 1, impulsivity: 4, emotional_stability: 2 }
      },
      D: {
        text: "Completely disorganized and impulsive with money",
        scores: { financial_responsibility: 0, consistency: 0, impulsivity: 5, delayed_gratification: 0 }
      }
    },
    traits: ["financial_responsibility", "consistency", "delayed_gratification", "emotional_stability", "impulsivity"],
    weightings: { financial_responsibility: 1.4, consistency: 1.4, delayed_gratification: 1.3, emotional_stability: 1.1, impulsivity: 1.0 }
  }
];

export const traitDescriptions = {
  financial_responsibility: "Ability to manage money wisely, pay bills on time, and make sound financial decisions",
  delayed_gratification: "Willingness to wait for better outcomes rather than seeking immediate satisfaction",
  impulsivity: "Tendency to make quick decisions without careful consideration of consequences",
  consistency: "Regularity and reliability in financial behavior and decision-making patterns",
  risk_aversion: "Preference for safer options and avoidance of uncertain outcomes",
  emotional_stability: "Ability to maintain composure and make rational decisions under financial stress"
};