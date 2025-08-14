export interface PsychometricOption {
  text: string;
  scores: Record<string, number>;
}

export interface PsychometricQuestion {
  id: number;
  question: string;
  options: PsychometricOption[];
  traits: string[];
}

export const psychometricQuestions: PsychometricQuestion[] = [
  {
    id: 1,
    question: "When planning a large purchase (e.g. an appliance), you:",
    options: [
      { text: "Save up and wait until you can afford it outright", scores: { financial_responsibility: 5, delayed_gratification: 5 } },
      { text: "Put it on a credit card and pay it off gradually", scores: { financial_responsibility: 3, delayed_gratification: 3 } },
      { text: "Buy it immediately and figure out payment later", scores: { financial_responsibility: 1, impulsivity: 5, delayed_gratification: 0 } },
      { text: "Grab a good deal on credit, even if it means higher rates", scores: { financial_responsibility: 2, impulsivity: 4, delayed_gratification: 2 } }
    ],
    traits: ["financial_responsibility", "delayed_gratification", "impulsivity"]
  },
  {
    id: 2,
    question: "If you unexpectedly received ₹50,000, you would:",
    options: [
      { text: "Deposit it into savings or pay off debt", scores: { financial_responsibility: 5, delayed_gratification: 4 } },
      { text: "Pay off outstanding bills immediately", scores: { financial_responsibility: 4, delayed_gratification: 3 } },
      { text: "Spend it on non-essential luxury items", scores: { financial_responsibility: 0, impulsivity: 5 } },
      { text: "Invest in a high-risk opportunity hoping for big gains", scores: { financial_responsibility: 2, impulsivity: 4, risk_aversion: 0 } }
    ],
    traits: ["financial_responsibility", "impulsivity", "risk_aversion"]
  },
  {
    id: 3,
    question: "I pay all my bills (utilities, loan payments, etc.) by their due dates:",
    options: [
      { text: "Strongly agree", scores: { financial_responsibility: 5, consistency: 5 } },
      { text: "Agree", scores: { financial_responsibility: 4, consistency: 4 } },
      { text: "Disagree", scores: { financial_responsibility: 1, consistency: 1 } },
      { text: "Strongly disagree", scores: { financial_responsibility: 0, consistency: 0 } }
    ],
    traits: ["financial_responsibility", "consistency"]
  },
  {
    id: 4,
    question: "When I see a limited-time sale on something I want, I usually:",
    options: [
      { text: "Take time to think it over before buying", scores: { delayed_gratification: 5, impulsivity: 0 } },
      { text: "Decide quickly to take advantage of the deal", scores: { delayed_gratification: 2, impulsivity: 4 } },
      { text: "Buy it immediately without much thought", scores: { delayed_gratification: 0, impulsivity: 5 } },
      { text: "Avoid buying even if it's a good deal", scores: { delayed_gratification: 5, risk_aversion: 4 } }
    ],
    traits: ["delayed_gratification", "impulsivity", "risk_aversion"]
  },
  {
    id: 5,
    question: "You have ₹1,00,000 to invest. You choose:",
    options: [
      { text: "Government bonds or fixed deposits (safe, low return)", scores: { risk_aversion: 5, impulsivity: 0 } },
      { text: "Blue-chip stocks (moderate risk)", scores: { risk_aversion: 3, impulsivity: 1 } },
      { text: "A high-risk startup or speculative scheme", scores: { risk_aversion: 0, impulsivity: 5 } },
      { text: "Keep it as cash in the bank (very safe)", scores: { risk_aversion: 4, impulsivity: 0 } }
    ],
    traits: ["risk_aversion", "impulsivity"]
  },
  {
    id: 6,
    question: "If a major financial emergency occurred, I would feel:",
    options: [
      { text: "Calm and confident that I could handle it", scores: { emotional_stability: 5 } },
      { text: "Some stress but able to manage", scores: { emotional_stability: 3 } },
      { text: "Very anxious and worried", scores: { emotional_stability: 1 } },
      { text: "Panicked and unfocused", scores: { emotional_stability: 0 } }
    ],
    traits: ["emotional_stability"]
  },
  {
    id: 7,
    question: "I prefer to take out a loan rather than deplete all my savings for purchases:",
    options: [
      { text: "Strongly agree", scores: { financial_responsibility: 0, impulsivity: 5 } },
      { text: "Somewhat agree", scores: { financial_responsibility: 1, impulsivity: 3 } },
      { text: "Somewhat disagree", scores: { financial_responsibility: 3, impulsivity: 2 } },
      { text: "Strongly disagree", scores: { financial_responsibility: 5, impulsivity: 0 } }
    ],
    traits: ["financial_responsibility", "impulsivity"]
  },
  {
    id: 8,
    question: "I create a monthly spending plan (budget) and stick to it:",
    options: [
      { text: "Always", scores: { consistency: 5, financial_responsibility: 5 } },
      { text: "Usually", scores: { consistency: 4, financial_responsibility: 4 } },
      { text: "Sometimes", scores: { consistency: 2, financial_responsibility: 2 } },
      { text: "Rarely", scores: { consistency: 0, financial_responsibility: 0 } }
    ],
    traits: ["consistency", "financial_responsibility"]
  },
  {
    id: 9,
    question: "Would you prefer ₹5,000 now or ₹7,000 in one month?",
    options: [
      { text: "Take ₹5,000 now", scores: { delayed_gratification: 0, impulsivity: 5 } },
      { text: "Wait and take ₹7,000 in one month", scores: { delayed_gratification: 5, impulsivity: 0 } }
    ],
    traits: ["delayed_gratification", "impulsivity"]
  },
  {
    id: 10,
    question: "I have a dedicated emergency fund saved for unexpected expenses:",
    options: [
      { text: "Strongly agree", scores: { financial_responsibility: 5, consistency: 5 } },
      { text: "Agree", scores: { financial_responsibility: 4, consistency: 4 } },
      { text: "Disagree", scores: { financial_responsibility: 1, consistency: 1 } },
      { text: "Strongly disagree", scores: { financial_responsibility: 0, consistency: 0 } }
    ],
    traits: ["financial_responsibility", "consistency"]
  },
  {
    id: 11,
    question: "I often change my mind about big financial decisions if circumstances shift:",
    options: [
      { text: "Strongly agree", scores: { impulsivity: 5, consistency: 0 } },
      { text: "Agree", scores: { impulsivity: 4, consistency: 1 } },
      { text: "Disagree", scores: { impulsivity: 1, consistency: 4 } },
      { text: "Strongly disagree", scores: { impulsivity: 0, consistency: 5 } }
    ],
    traits: ["impulsivity", "consistency"]
  },
  {
    id: 12,
    question: "If friends encourage you to make a risky investment, you would:",
    options: [
      { text: "Refuse because you dislike risk", scores: { risk_aversion: 5, impulsivity: 0 } },
      { text: "Carefully consider the advice before deciding", scores: { risk_aversion: 3, impulsivity: 1 } },
      { text: "Invest enthusiastically with them", scores: { risk_aversion: 0, impulsivity: 5 } },
      { text: "Doubt it and probably not invest", scores: { risk_aversion: 4, impulsivity: 0 } }
    ],
    traits: ["risk_aversion", "impulsivity"]
  },
  {
    id: 13,
    question: "I always pay at least the minimum on all my credit cards by the due date:",
    options: [
      { text: "Always", scores: { financial_responsibility: 5, consistency: 5 } },
      { text: "Mostly", scores: { financial_responsibility: 4, consistency: 4 } },
      { text: "Sometimes", scores: { financial_responsibility: 2, consistency: 2 } },
      { text: "Rarely", scores: { financial_responsibility: 0, consistency: 0 } }
    ],
    traits: ["financial_responsibility", "consistency"]
  },
  {
    id: 14,
    question: "I avoid the stock market because I dislike the possibility of losses:",
    options: [
      { text: "Strongly agree", scores: { risk_aversion: 5 } },
      { text: "Agree", scores: { risk_aversion: 4 } },
      { text: "Disagree", scores: { risk_aversion: 1 } },
      { text: "Strongly disagree", scores: { risk_aversion: 0 } }
    ],
    traits: ["risk_aversion"]
  },
  {
    id: 15,
    question: "I prefer steady growth on my investments over quick high gains:",
    options: [
      { text: "Strongly agree", scores: { risk_aversion: 5, impulsivity: 0 } },
      { text: "Agree", scores: { risk_aversion: 4, impulsivity: 0 } },
      { text: "Disagree", scores: { risk_aversion: 1, impulsivity: 4 } },
      { text: "Strongly disagree", scores: { risk_aversion: 0, impulsivity: 5 } }
    ],
    traits: ["risk_aversion", "impulsivity"]
  },
  {
    id: 16,
    question: "When I get extra money (e.g. bonus), I first save or invest most of it:",
    options: [
      { text: "Always", scores: { financial_responsibility: 5, delayed_gratification: 5 } },
      { text: "Often", scores: { financial_responsibility: 4, delayed_gratification: 4 } },
      { text: "Sometimes", scores: { financial_responsibility: 2, delayed_gratification: 2 } },
      { text: "Rarely", scores: { financial_responsibility: 0, delayed_gratification: 0 } }
    ],
    traits: ["financial_responsibility", "delayed_gratification"]
  },
  {
    id: 17,
    question: "Before any major financial decision, I gather as much information as possible:",
    options: [
      { text: "Always", scores: { consistency: 5, financial_responsibility: 5 } },
      { text: "Usually", scores: { consistency: 4, financial_responsibility: 4 } },
      { text: "Sometimes", scores: { consistency: 2, financial_responsibility: 2 } },
      { text: "Rarely", scores: { consistency: 0, financial_responsibility: 0 } }
    ],
    traits: ["consistency", "financial_responsibility"]
  },
  {
    id: 18,
    question: "I rely heavily on credit cards for my daily spending:",
    options: [
      { text: "Completely disagree", scores: { financial_responsibility: 5, impulsivity: 0 } },
      { text: "Disagree", scores: { financial_responsibility: 4, impulsivity: 0 } },
      { text: "Agree", scores: { financial_responsibility: 2, impulsivity: 4 } },
      { text: "Completely agree", scores: { financial_responsibility: 0, impulsivity: 5 } }
    ],
    traits: ["financial_responsibility", "impulsivity"]
  },
  {
    id: 19,
    question: "I often make spontaneous purchases just for fun or entertainment:",
    options: [
      { text: "Always", scores: { impulsivity: 5 } },
      { text: "Often", scores: { impulsivity: 4 } },
      { text: "Rarely", scores: { impulsivity: 1 } },
      { text: "Never", scores: { impulsivity: 0 } }
    ],
    traits: ["impulsivity"]
  },
  {
    id: 20,
    question: "If an unexpected large expense occurred, you would:",
    options: [
      { text: "Replan your budget calmly and adjust", scores: { emotional_stability: 5 } },
      { text: "Feel stressed but manage it", scores: { emotional_stability: 3 } },
      { text: "Panic and worry a lot", scores: { emotional_stability: 0 } },
      { text: "Ignore the problem and hope it goes away", scores: { emotional_stability: 0, impulsivity: 5 } }
    ],
    traits: ["emotional_stability", "impulsivity"]
  },
  {
    id: 21,
    question: "I would rather save money than take a loan for purchases:",
    options: [
      { text: "Strongly agree", scores: { financial_responsibility: 5, delayed_gratification: 5 } },
      { text: "Agree", scores: { financial_responsibility: 4, delayed_gratification: 4 } },
      { text: "Disagree", scores: { financial_responsibility: 1, delayed_gratification: 1 } },
      { text: "Strongly disagree", scores: { financial_responsibility: 0, delayed_gratification: 0 } }
    ],
    traits: ["financial_responsibility", "delayed_gratification"]
  },
  {
    id: 22,
    question: "I sometimes adjust my budget plans to indulge in unexpected treats:",
    options: [
      { text: "Always", scores: { impulsivity: 5, consistency: 0 } },
      { text: "Sometimes", scores: { impulsivity: 2, consistency: 2 } },
      { text: "Rarely", scores: { impulsivity: 0, consistency: 4 } },
      { text: "Never", scores: { impulsivity: 0, consistency: 5 } }
    ],
    traits: ["impulsivity", "consistency"]
  },
  {
    id: 23,
    question: "I follow the same routine each month to manage my finances (check balances, track expenses):",
    options: [
      { text: "Always", scores: { consistency: 5 } },
      { text: "Usually", scores: { consistency: 4 } },
      { text: "Sometimes", scores: { consistency: 2 } },
      { text: "Rarely", scores: { consistency: 0 } }
    ],
    traits: ["consistency"]
  },
  {
    id: 24,
    question: "If your income increased steadily, you would:",
    options: [
      { text: "Spend more and enjoy life", scores: { impulsivity: 5, financial_responsibility: 1 } },
      { text: "Increase savings/investment first", scores: { financial_responsibility: 5, delayed_gratification: 5 } },
      { text: "Save some and spend some", scores: { financial_responsibility: 3, impulsivity: 2, delayed_gratification: 2 } },
      { text: "Be extra cautious and save most", scores: { financial_responsibility: 4, delayed_gratification: 4 } }
    ],
    traits: ["financial_responsibility", "delayed_gratification", "impulsivity"]
  },
  {
    id: 25,
    question: "If an investment you made was losing money, you would:",
    options: [
      { text: "Keep putting in more, hoping it recovers", scores: { risk_aversion: 0, impulsivity: 4 } },
      { text: "Sell it and cut your losses", scores: { risk_aversion: 5, impulsivity: 0 } },
      { text: "Hold and seek advice", scores: { risk_aversion: 2, impulsivity: 2 } },
      { text: "Do nothing and avoid thinking about it", scores: { risk_aversion: 1, impulsivity: 3 } }
    ],
    traits: ["risk_aversion", "impulsivity"]
  },
  {
    id: 26,
    question: "On payday, your first action is to:",
    options: [
      { text: "Allocate a portion to savings/emergency fund", scores: { financial_responsibility: 5, delayed_gratification: 5 } },
      { text: "Pay any outstanding bills or debts", scores: { financial_responsibility: 4, consistency: 3 } },
      { text: "Treat yourself to something nice, then save the rest", scores: { impulsivity: 2, delayed_gratification: 4 } },
      { text: "Spend freely without planning", scores: { impulsivity: 5, financial_responsibility: 0 } }
    ],
    traits: ["financial_responsibility", "delayed_gratification", "impulsivity", "consistency"]
  },
  {
    id: 27,
    question: "When an advertisement shows a great limited-time deal, I usually:",
    options: [
      { text: "Pause and evaluate whether I need it", scores: { delayed_gratification: 4, impulsivity: 0 } },
      { text: "Buy immediately to secure the deal", scores: { impulsivity: 5, delayed_gratification: 0 } },
      { text: "Bookmark it and think more before buying", scores: { delayed_gratification: 3, consistency: 3 } },
      { text: "Ignore it because deals tempt me too much", scores: { risk_aversion: 4, impulsivity: 0 } }
    ],
    traits: ["impulsivity", "delayed_gratification", "consistency", "risk_aversion"]
  },
  {
    id: 28,
    question: "I keep a liquid emergency fund (easily accessible) at all times:",
    options: [
      { text: "Strongly agree", scores: { financial_responsibility: 5, consistency: 5 } },
      { text: "Agree", scores: { financial_responsibility: 4, consistency: 4 } },
      { text: "Disagree", scores: { financial_responsibility: 1, consistency: 1 } },
      { text: "Strongly disagree", scores: { financial_responsibility: 0, consistency: 0 } }
    ],
    traits: ["financial_responsibility", "consistency"]
  },
  {
    id: 29,
    question: "I occasionally buy lottery tickets or gamble money:",
    options: [
      { text: "Never", scores: { risk_aversion: 5, impulsivity: 0 } },
      { text: "Rarely", scores: { risk_aversion: 4, impulsivity: 0 } },
      { text: "Sometimes", scores: { risk_aversion: 2, impulsivity: 2 } },
      { text: "Often", scores: { risk_aversion: 0, impulsivity: 4 } }
    ],
    traits: ["risk_aversion", "impulsivity"]
  },
  {
    id: 30,
    question: "I consistently stick to a well-defined financial plan:",
    options: [
      { text: "Strongly agree", scores: { consistency: 5, financial_responsibility: 5 } },
      { text: "Agree", scores: { consistency: 4, financial_responsibility: 4 } },
      { text: "Disagree", scores: { consistency: 1, financial_responsibility: 1 } },
      { text: "Strongly disagree", scores: { consistency: 0, financial_responsibility: 0 } }
    ],
    traits: ["consistency", "financial_responsibility"]
  }
];
