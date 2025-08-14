/**
 * Exact 30-Question Psychometric Assessment as per PDF
 * Maps to exact trait scoring and CDD detection
 */

export interface PsychometricQuestionExact {
  id: number;
  question: string;
  options: {
    A: { text: string; traits: Record<string, number> };
    B: { text: string; traits: Record<string, number> };
    C: { text: string; traits: Record<string, number> };
    D: { text: string; traits: Record<string, number> };
  };
  category: string;
  mirroredWith?: number; // For CDD detection
}

export const psychometric30QuestionsExact: PsychometricQuestionExact[] = [
  {
    id: 1,
    question: "When planning a large purchase (e.g., an appliance), you:",
    options: {
      A: {
        text: "Save up and wait until you can afford it outright",
        traits: { financial_responsibility: 5, delayed_gratification: 5 }
      },
      B: {
        text: "Put it on a credit card and pay it off gradually",
        traits: { financial_responsibility: 3, delayed_gratification: 3 }
      },
      C: {
        text: "Buy it immediately and figure out payment later",
        traits: { financial_responsibility: 1, impulsivity: 5, delayed_gratification: 0 }
      },
      D: {
        text: "Take a loan for quick purchase at any interest rate",
        traits: { financial_responsibility: 0, impulsivity: 5, delayed_gratification: 0 }
      }
    },
    category: "Financial Planning",
    mirroredWith: 14
  },
  {
    id: 2,
    question: "If you unexpectedly received ₹50,000, you would:",
    options: {
      A: {
        text: "Deposit it into savings or pay off debt",
        traits: { financial_responsibility: 5, delayed_gratification: 4 }
      },
      B: {
        text: "Pay off some bills and save the rest",
        traits: { financial_responsibility: 4, delayed_gratification: 3 }
      },
      C: {
        text: "Spend half on wants, save half",
        traits: { financial_responsibility: 2, impulsivity: 3 }
      },
      D: {
        text: "Spend it all on things you've wanted",
        traits: { financial_responsibility: 0, impulsivity: 5 }
      }
    },
    category: "Financial Discipline"
  },
  {
    id: 3,
    question: "I pay all my bills (utilities, loan payments, etc.) by their due dates:",
    options: {
      A: {
        text: "Strongly agree - always pay on time",
        traits: { financial_responsibility: 5, consistency: 5 }
      },
      B: {
        text: "Agree - usually pay on time",
        traits: { financial_responsibility: 4, consistency: 4 }
      },
      C: {
        text: "Disagree - sometimes miss due dates",
        traits: { financial_responsibility: 1, consistency: 1 }
      },
      D: {
        text: "Strongly disagree - often pay late",
        traits: { financial_responsibility: 0, consistency: 0 }
      }
    },
    category: "Payment Behavior",
    mirroredWith: 19
  },
  {
    id: 4,
    question: "When I see a limited-time sale on something I want, I usually:",
    options: {
      A: {
        text: "Take time to think it over before buying",
        traits: { delayed_gratification: 5, impulsivity: 0 }
      },
      B: {
        text: "Check if I need it and can afford it",
        traits: { delayed_gratification: 3, impulsivity: 2, financial_responsibility: 3 }
      },
      C: {
        text: "Buy it quickly to not miss the deal",
        traits: { delayed_gratification: 1, impulsivity: 4 }
      },
      D: {
        text: "Buy it immediately without much thought",
        traits: { delayed_gratification: 0, impulsivity: 5 }
      }
    },
    category: "Impulse Control"
  },
  {
    id: 5,
    question: "You have ₹1,00,000 to invest. You choose:",
    options: {
      A: {
        text: "Government bonds or fixed deposits (safe, low return)",
        traits: { risk_aversion: 5, financial_responsibility: 4 }
      },
      B: {
        text: "Mix of safe and moderate-risk investments",
        traits: { risk_aversion: 3, financial_responsibility: 4 }
      },
      C: {
        text: "High-growth stocks with moderate risk",
        traits: { risk_aversion: 2, impulsivity: 3 }
      },
      D: {
        text: "High-risk speculative investments for quick gains",
        traits: { risk_aversion: 0, impulsivity: 5 }
      }
    },
    category: "Risk Tolerance"
  },
  {
    id: 6,
    question: "If a major financial emergency occurred, I would feel:",
    options: {
      A: {
        text: "Calm and confident I could handle it",
        traits: { emotional_stability: 5, financial_responsibility: 3 }
      },
      B: {
        text: "Some stress but able to manage",
        traits: { emotional_stability: 3, financial_responsibility: 2 }
      },
      C: {
        text: "Very anxious and worried",
        traits: { emotional_stability: 1 }
      },
      D: {
        text: "Completely overwhelmed and panicked",
        traits: { emotional_stability: 0 }
      }
    },
    category: "Stress Response"
  },
  {
    id: 7,
    question: "When making important financial decisions, I:",
    options: {
      A: {
        text: "Research thoroughly from multiple sources",
        traits: { financial_responsibility: 5, delayed_gratification: 4, consistency: 4 }
      },
      B: {
        text: "Do some research but decide reasonably quickly",
        traits: { financial_responsibility: 3, delayed_gratification: 2 }
      },
      C: {
        text: "Go with my gut instinct",
        traits: { impulsivity: 4, financial_responsibility: 2 }
      },
      D: {
        text: "Make quick decisions without much research",
        traits: { impulsivity: 5, financial_responsibility: 1 }
      }
    },
    category: "Decision Making"
  },
  {
    id: 8,
    question: "My approach to monthly budgeting is:",
    options: {
      A: {
        text: "I create detailed budgets and stick to them religiously",
        traits: { financial_responsibility: 5, consistency: 5, delayed_gratification: 4 }
      },
      B: {
        text: "I have a rough budget and try to stay within limits",
        traits: { financial_responsibility: 3, consistency: 3 }
      },
      C: {
        text: "I spend freely and hope money lasts until month-end",
        traits: { financial_responsibility: 1, impulsivity: 4 }
      },
      D: {
        text: "I don't track expenses or make budgets",
        traits: { financial_responsibility: 0, consistency: 0 }
      }
    },
    category: "Budget Management"
  },
  {
    id: 9,
    question: "When faced with a 'buy now, pay later' offer, I:",
    options: {
      A: {
        text: "Never use such offers, prefer to pay upfront",
        traits: { financial_responsibility: 5, risk_aversion: 4, delayed_gratification: 4 }
      },
      B: {
        text: "Use it occasionally for planned purchases",
        traits: { financial_responsibility: 3, delayed_gratification: 2 }
      },
      C: {
        text: "Use it frequently for various purchases",
        traits: { impulsivity: 4, financial_responsibility: 1 }
      },
      D: {
        text: "Always choose it when available",
        traits: { impulsivity: 5, financial_responsibility: 0 }
      }
    },
    category: "Credit Usage"
  },
  {
    id: 10,
    question: "If I had to choose between two job offers:",
    options: {
      A: {
        text: "Lower salary but very secure position",
        traits: { risk_aversion: 5, delayed_gratification: 4 }
      },
      B: {
        text: "Moderate salary with good growth potential",
        traits: { risk_aversion: 3, delayed_gratification: 4 }
      },
      C: {
        text: "Higher salary with moderate job security",
        traits: { risk_aversion: 2, financial_responsibility: 3 }
      },
      D: {
        text: "Highest salary regardless of job security",
        traits: { risk_aversion: 0, impulsivity: 4 }
      }
    },
    category: "Career Risk"
  },
  {
    id: 11,
    question: "My savings account balance typically:",
    options: {
      A: {
        text: "Grows steadily each month",
        traits: { financial_responsibility: 5, consistency: 5, delayed_gratification: 4 }
      },
      B: {
        text: "Stays relatively stable",
        traits: { financial_responsibility: 3, consistency: 3 }
      },
      C: {
        text: "Fluctuates significantly month to month",
        traits: { consistency: 1, emotional_stability: 2 }
      },
      D: {
        text: "Is usually close to zero or negative",
        traits: { financial_responsibility: 0, impulsivity: 4 }
      }
    },
    category: "Savings Pattern"
  },
  {
    id: 12,
    question: "When I make a financial mistake:",
    options: {
      A: {
        text: "I analyze what went wrong and create a plan to avoid it",
        traits: { emotional_stability: 5, financial_responsibility: 4, consistency: 4 }
      },
      B: {
        text: "I feel bad but learn from it and move on",
        traits: { emotional_stability: 3, consistency: 2 }
      },
      C: {
        text: "I get very upset and stressed about it",
        traits: { emotional_stability: 1, impulsivity: 2 }
      },
      D: {
        text: "I tend to make the same mistake again",
        traits: { consistency: 0, financial_responsibility: 0 }
      }
    },
    category: "Learning from Mistakes"
  },
  {
    id: 13,
    question: "My attitude toward credit cards is:",
    options: {
      A: {
        text: "I pay off the full balance every month",
        traits: { financial_responsibility: 5, consistency: 5, delayed_gratification: 3 }
      },
      B: {
        text: "I maintain a small balance but pay on time",
        traits: { financial_responsibility: 3, consistency: 4 }
      },
      C: {
        text: "I often carry significant balances",
        traits: { financial_responsibility: 1, impulsivity: 3 }
      },
      D: {
        text: "I max out cards and make minimum payments",
        traits: { financial_responsibility: 0, impulsivity: 5 }
      }
    },
    category: "Credit Management"
  },
  {
    id: 14,
    question: "When planning for retirement, I:",
    options: {
      A: {
        text: "Have a detailed plan and contribute regularly",
        traits: { delayed_gratification: 5, financial_responsibility: 5, consistency: 4 }
      },
      B: {
        text: "Contribute occasionally when I have extra money",
        traits: { delayed_gratification: 3, financial_responsibility: 2 }
      },
      C: {
        text: "Know I should plan but haven't started yet",
        traits: { delayed_gratification: 1, financial_responsibility: 1 }
      },
      D: {
        text: "Prefer to live in the present, worry about it later",
        traits: { impulsivity: 5, delayed_gratification: 0 }
      }
    },
    category: "Long-term Planning",
    mirroredWith: 1
  },
  {
    id: 15,
    question: "If offered a chance to double my money with 50% risk of losing it all:",
    options: {
      A: {
        text: "I would never take such a risk",
        traits: { risk_aversion: 5, emotional_stability: 4 }
      },
      B: {
        text: "I would consider it only with money I can afford to lose",
        traits: { risk_aversion: 3, financial_responsibility: 3 }
      },
      C: {
        text: "I would be very tempted and likely try it",
        traits: { risk_aversion: 1, impulsivity: 4 }
      },
      D: {
        text: "I would definitely do it - high risk, high reward",
        traits: { risk_aversion: 0, impulsivity: 5 }
      }
    },
    category: "Gambling Tendency"
  },
  {
    id: 16,
    question: "My spending habits are:",
    options: {
      A: {
        text: "Very consistent and predictable month to month",
        traits: { consistency: 5, financial_responsibility: 4, emotional_stability: 3 }
      },
      B: {
        text: "Mostly consistent with occasional splurges",
        traits: { consistency: 3, impulsivity: 2 }
      },
      C: {
        text: "Highly dependent on my mood and circumstances",
        traits: { consistency: 1, emotional_stability: 1, impulsivity: 4 }
      },
      D: {
        text: "I spend impulsively without much pattern",
        traits: { consistency: 0, impulsivity: 5, financial_responsibility: 0 }
      }
    },
    category: "Spending Consistency"
  },
  {
    id: 17,
    question: "When considering a loan for a major purchase:",
    options: {
      A: {
        text: "I compare multiple lenders and read all terms carefully",
        traits: { financial_responsibility: 5, delayed_gratification: 4, consistency: 4 }
      },
      B: {
        text: "I check a few options and choose the best rate",
        traits: { financial_responsibility: 3, delayed_gratification: 2 }
      },
      C: {
        text: "I go with the first reasonable offer I find",
        traits: { impulsivity: 3, financial_responsibility: 1 }
      },
      D: {
        text: "I take the quickest approval regardless of terms",
        traits: { impulsivity: 5, financial_responsibility: 0 }
      }
    },
    category: "Loan Shopping"
  },
  {
    id: 18,
    question: "If my income suddenly increased by 50%, I would:",
    options: {
      A: {
        text: "Increase my savings rate proportionally",
        traits: { financial_responsibility: 5, delayed_gratification: 5, consistency: 4 }
      },
      B: {
        text: "Save some and upgrade my lifestyle modestly",
        traits: { financial_responsibility: 3, delayed_gratification: 3 }
      },
      C: {
        text: "Significantly upgrade my lifestyle immediately",
        traits: { impulsivity: 4, financial_responsibility: 1 }
      },
      D: {
        text: "Spend it all on things I've always wanted",
        traits: { impulsivity: 5, delayed_gratification: 0 }
      }
    },
    category: "Lifestyle Inflation"
  },
  {
    id: 19,
    question: "Regarding bill payment deadlines:",
    options: {
      A: {
        text: "I always pay several days before the due date",
        traits: { financial_responsibility: 5, consistency: 5, emotional_stability: 4 }
      },
      B: {
        text: "I usually pay on or just before the due date",
        traits: { financial_responsibility: 4, consistency: 4 }
      },
      C: {
        text: "I sometimes pay a few days late",
        traits: { financial_responsibility: 1, consistency: 1 }
      },
      D: {
        text: "I often forget and pay late with penalties",
        traits: { financial_responsibility: 0, consistency: 0 }
      }
    },
    category: "Payment Timeliness",
    mirroredWith: 3
  },
  {
    id: 20,
    question: "When facing financial stress, I:",
    options: {
      A: {
        text: "Stay calm and systematically address the issues",
        traits: { emotional_stability: 5, consistency: 4, financial_responsibility: 4 }
      },
      B: {
        text: "Feel anxious but work through solutions methodically",
        traits: { emotional_stability: 3, consistency: 3 }
      },
      C: {
        text: "Get overwhelmed and may make poor quick decisions",
        traits: { emotional_stability: 1, impulsivity: 4, consistency: 1 }
      },
      D: {
        text: "Panic and avoid dealing with the problems",
        traits: { emotional_stability: 0, consistency: 0 }
      }
    },
    category: "Stress Management"
  },
  {
    id: 21,
    question: "My relationship with money can best be described as:",
    options: {
      A: {
        text: "Money is a tool for achieving long-term security",
        traits: { financial_responsibility: 5, delayed_gratification: 5, emotional_stability: 4 }
      },
      B: {
        text: "Money provides comfort and some freedom",
        traits: { financial_responsibility: 3, emotional_stability: 3 }
      },
      C: {
        text: "Money is meant to be enjoyed and spent",
        traits: { impulsivity: 4, delayed_gratification: 1 }
      },
      D: {
        text: "Money causes me anxiety and stress",
        traits: { emotional_stability: 0, risk_aversion: 4 }
      }
    },
    category: "Money Philosophy"
  },
  {
    id: 22,
    question: "If I discovered I had been overpaying for a service:",
    options: {
      A: {
        text: "I would research alternatives thoroughly before changing",
        traits: { financial_responsibility: 5, delayed_gratification: 4, consistency: 4 }
      },
      B: {
        text: "I would look for better options and switch",
        traits: { financial_responsibility: 4, consistency: 3 }
      },
      C: {
        text: "I would be upset but probably continue the same service",
        traits: { consistency: 1, emotional_stability: 2 }
      },
      D: {
        text: "I wouldn't really care much about it",
        traits: { financial_responsibility: 0, consistency: 0 }
      }
    },
    category: "Cost Optimization"
  },
  {
    id: 23,
    question: "My emergency fund situation is:",
    options: {
      A: {
        text: "I have 6+ months of expenses saved",
        traits: { financial_responsibility: 5, delayed_gratification: 5, risk_aversion: 4 }
      },
      B: {
        text: "I have 2-3 months of expenses saved",
        traits: { financial_responsibility: 3, delayed_gratification: 3 }
      },
      C: {
        text: "I have some savings but less than a month's expenses",
        traits: { financial_responsibility: 1, delayed_gratification: 1 }
      },
      D: {
        text: "I live paycheck to paycheck with no emergency fund",
        traits: { financial_responsibility: 0, impulsivity: 3 }
      }
    },
    category: "Emergency Preparedness"
  },
  {
    id: 24,
    question: "When making online purchases, I:",
    options: {
      A: {
        text: "Always compare prices and read reviews thoroughly",
        traits: { financial_responsibility: 4, delayed_gratification: 4, consistency: 4 }
      },
      B: {
        text: "Do some comparison but decide relatively quickly",
        traits: { financial_responsibility: 3, delayed_gratification: 2 }
      },
      C: {
        text: "Often buy impulsively based on recommendations",
        traits: { impulsivity: 4, consistency: 1 }
      },
      D: {
        text: "Frequently make purchases I later regret",
        traits: { impulsivity: 5, financial_responsibility: 0 }
      }
    },
    category: "Purchase Decisions"
  },
  {
    id: 25,
    question: "If I had to lend money to a friend in need:",
    options: {
      A: {
        text: "I would help if I can afford it, with clear repayment terms",
        traits: { financial_responsibility: 4, emotional_stability: 4, consistency: 4 }
      },
      B: {
        text: "I would help immediately without worrying about repayment",
        traits: { impulsivity: 3, emotional_stability: 3, risk_aversion: 1 }
      },
      C: {
        text: "I would be hesitant due to potential relationship complications",
        traits: { risk_aversion: 4, emotional_stability: 2 }
      },
      D: {
        text: "I would refuse as I need all my money for myself",
        traits: { financial_responsibility: 2, risk_aversion: 5 }
      }
    },
    category: "Social Financial Behavior"
  },
  {
    id: 26,
    question: "My investment philosophy is:",
    options: {
      A: {
        text: "Diversified portfolio with long-term focus",
        traits: { delayed_gratification: 5, financial_responsibility: 5, risk_aversion: 3 }
      },
      B: {
        text: "Conservative investments with guaranteed returns",
        traits: { risk_aversion: 5, delayed_gratification: 3 }
      },
      C: {
        text: "Mix of safe and risky investments for balance",
        traits: { financial_responsibility: 3, risk_aversion: 2 }
      },
      D: {
        text: "High-risk, high-reward investments for quick gains",
        traits: { impulsivity: 5, risk_aversion: 0, delayed_gratification: 0 }
      }
    },
    category: "Investment Strategy"
  },
  {
    id: 27,
    question: "When friends suggest expensive group activities:",
    options: {
      A: {
        text: "I participate only if it fits within my budget",
        traits: { financial_responsibility: 5, consistency: 4, delayed_gratification: 3 }
      },
      B: {
        text: "I usually find a way to join even if it's a stretch",
        traits: { impulsivity: 3, financial_responsibility: 2 }
      },
      C: {
        text: "I often skip due to cost concerns",
        traits: { risk_aversion: 4, financial_responsibility: 3 }
      },
      D: {
        text: "I always participate regardless of cost",
        traits: { impulsivity: 5, financial_responsibility: 0 }
      }
    },
    category: "Social Spending"
  },
  {
    id: 28,
    question: "My approach to financial goals is:",
    options: {
      A: {
        text: "I set specific, measurable goals with clear timelines",
        traits: { consistency: 5, delayed_gratification: 5, financial_responsibility: 5 }
      },
      B: {
        text: "I have general goals but flexible on how to achieve them",
        traits: { consistency: 3, delayed_gratification: 3 }
      },
      C: {
        text: "I have vague hopes but no concrete plans",
        traits: { consistency: 1, delayed_gratification: 1 }
      },
      D: {
        text: "I prefer to live spontaneously without planning",
        traits: { impulsivity: 5, consistency: 0, delayed_gratification: 0 }
      }
    },
    category: "Goal Setting"
  },
  {
    id: 29,
    question: "If I lost my job tomorrow, I would:",
    options: {
      A: {
        text: "Feel confident in my emergency fund and job search strategy",
        traits: { emotional_stability: 5, financial_responsibility: 5, delayed_gratification: 4 }
      },
      B: {
        text: "Feel worried but believe I could manage for a while",
        traits: { emotional_stability: 3, financial_responsibility: 3 }
      },
      C: {
        text: "Feel very stressed about immediate financial obligations",
        traits: { emotional_stability: 1, financial_responsibility: 1 }
      },
      D: {
        text: "Panic completely as I have no financial backup",
        traits: { emotional_stability: 0, financial_responsibility: 0 }
      }
    },
    category: "Financial Security"
  },
  {
    id: 30,
    question: "Overall, my financial behavior is:",
    options: {
      A: {
        text: "Very disciplined and consistent with long-term focus",
        traits: { financial_responsibility: 5, consistency: 5, delayed_gratification: 5, emotional_stability: 4 }
      },
      B: {
        text: "Generally responsible with occasional lapses",
        traits: { financial_responsibility: 3, consistency: 3, delayed_gratification: 3 }
      },
      C: {
        text: "Inconsistent and often driven by emotions or impulses",
        traits: { consistency: 1, impulsivity: 4, emotional_stability: 2 }
      },
      D: {
        text: "Completely disorganized and impulsive with money",
        traits: { financial_responsibility: 0, consistency: 0, impulsivity: 5, delayed_gratification: 0 }
      }
    },
    category: "Overall Assessment"
  }
];

export function calculateTraitsFromAnswers(answers: ('A' | 'B' | 'C' | 'D')[]): {
  financial_responsibility: number;
  delayed_gratification: number;
  impulsivity: number;
  consistency: number;
  risk_aversion: number;
  emotional_stability: number;
} {
  const traits = {
    financial_responsibility: 0,
    delayed_gratification: 0,
    impulsivity: 0,
    consistency: 0,
    risk_aversion: 0,
    emotional_stability: 0
  };

  answers.forEach((answer, index) => {
    const question = psychometric30QuestionsExact[index];
    const option = question.options[answer];
    
    Object.entries(option.traits).forEach(([trait, value]) => {
      traits[trait as keyof typeof traits] += value;
    });
  });

  // Normalize to 0-5 scale (approximately 6 questions per trait)
  Object.keys(traits).forEach(trait => {
    traits[trait as keyof typeof traits] = Math.min(5, traits[trait as keyof typeof traits] / 6);
  });

  return traits;
}