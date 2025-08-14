/**
 * Updated AltScore Demo Page with Complete 3-Layer Scoring Engine
 * Features both Demo Mode (10 profiles) and Manual Mode (full assessment)
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { exactDemoProfiles, ExactDemoProfile, calculateAllProfileResults, getProfileBreakdown } from '@/lib/demo-profiles-exact';
import { 
  calculateTraditionalScoreExact, 
  calculatePsychometricScoreExact, 
  calculateAIScoreExact, 
  calculateFinalScoreExact,
  TraditionalInputsExact,
  PsychometricTraits,
  PsychometricAnswersExact,
  AIInputsExact
} from '@/lib/altscore-exact';
import { psychometric30QuestionsExact, calculateTraitsFromAnswers } from '@/lib/psychometric-30-exact';
import PsychometricAssessment from '@/components/psychometric-assessment';
import ScoreBreakdownDetailed from '@/components/score-breakdown-detailed';
import { EssentialInfoForm } from '@/components/essential-info-form';
import { 
  User, 
  Brain, 
  Zap, 
  Target, 
  Play, 
  Settings, 
  ArrowRight,
  Users,
  FileText,
  Calculator
} from 'lucide-react';

type DemoMode = 'selection' | 'profile-details' | 'calculation' | 'results';
type ManualMode = 'form' | 'psychometric' | 'results';

export default function Demo() {
  const [activeTab, setActiveTab] = useState<'demo' | 'manual'>('demo');
  
  // Demo Mode State
  const [demoMode, setDemoMode] = useState<DemoMode>('selection');
  const [selectedProfile, setSelectedProfile] = useState<ExactDemoProfile | null>(null);
  const [showCalculationSteps, setShowCalculationSteps] = useState(false);
  const [demoResult, setDemoResult] = useState<ReturnType<typeof calculateFinalScoreExact> | null>(null);
  const [profileBreakdown, setProfileBreakdown] = useState<string>('');
  
  // Manual Mode State
  const [manualMode, setManualMode] = useState<ManualMode>('form');
  const [manualPsychometricAnswers, setManualPsychometricAnswers] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [manualResult, setManualResult] = useState<ReturnType<typeof calculateFinalScoreExact> | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [testStartTime] = useState(Date.now());
  const [essentialInfoData, setEssentialInfoData] = useState<any>(null);
  const [mlPrediction, setMlPrediction] = useState<any>(null);

  const handleDemoProfileSelect = (profile: ExactDemoProfile) => {
    setSelectedProfile(profile);
    setDemoMode('profile-details');
  };

  const handleDemoCalculation = async () => {
    if (!selectedProfile) return;
    
    setDemoMode('calculation');
    setShowCalculationSteps(true);
    
    // Generate detailed breakdown
    const breakdown = getProfileBreakdown(selectedProfile.id);
    setProfileBreakdown(breakdown);
    
    // Simulate step-by-step calculation with delays for demo effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate using exact PDF formulas
    const traditionalResult = calculateTraditionalScoreExact(selectedProfile.traditionalInputs);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const psychometricResult = calculatePsychometricScoreExact(
      selectedProfile.psychometricTraits,
      selectedProfile.psychometricAnswers
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const aiResult = calculateAIScoreExact(selectedProfile.aiInputs);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const finalResult = calculateFinalScoreExact(traditionalResult, psychometricResult, aiResult);
    
    setDemoResult(finalResult);
    setDemoMode('results');
  };

  const handleManualAnswer = (answer: 'A' | 'B' | 'C' | 'D') => {
    const newAnswers = [...manualPsychometricAnswers, answer];
    setManualPsychometricAnswers(newAnswers);
    
    if (currentQuestion < psychometric30QuestionsExact.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionStartTime(Date.now());
    } else {
      // Test completed - calculate results
      const totalTime = Math.round((Date.now() - testStartTime) / 1000);
      const traits = calculateTraitsFromAnswers(newAnswers);
      
      // Create simplified traditional data for demo
      const defaultTraditional: TraditionalInputsExact = {
        pan_verified: true,
        aadhaar_verified: true,
        voter_id: false,
        bank_passbook: true,
        salary_slips: false,
        digilocker_verified: false,
        upi_monthly_volume: 25000,
        utility_bills_ontime: true,
        salary_sms_verified: false,
        emi_payments_ontime: false,
        failed_upi_messages: false,
        bnpl_unpaid_dues: false,
        loan_apps_count: 1,
        loan_emi_repaid_ontime: false,
        loan_emi_missed: false,
        no_loan_verified_salary: true,
        degree_verified: true,
        employment_verified_linkedin: false,
        job_duration_months: 12,
        self_employed_verified: false,
        studying_fee_upi: false,
        online_courses_completed: false,
        quick_loan_searches: false,
        learning_finance_searches: false,
        betting_sites_visits: false,
        educational_govt_sites: false,
        budgeting_apps_usage: false,
        paid_ott_subscription: false,
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
        two_wheeler_rc: false,
        rent_income_monthly: 0,
        land_property_verified: false,
        gst_business_verified: false
      };
      
      const psychometricAnswersData: PsychometricAnswersExact = {
        answers: newAnswers,
        time_taken_seconds: totalTime,
        session_consistent: true,
        device_consistent: true
      };
      
      const aiInputsData: AIInputsExact = {
        upi_emi_activity_score: 0.5,
        psychometric_traits: traits,
        app_behaviour_risk_score: 0.2,
        employment_kyc_signals: 0.6,
        search_browser_risk: 0.1,
        data_recency_score: 0.8
      };
      
      // Calculate scores using exact formulas
      const traditionalResult = calculateTraditionalScoreExact(defaultTraditional);
      const psychometricResult = calculatePsychometricScoreExact(traits, psychometricAnswersData);
      
      // Use ML prediction if available, otherwise use default AI calculation
      const aiResult = mlPrediction ? {
        score: mlPrediction.ai_score,
        confidence: mlPrediction.confidence,
        pod: mlPrediction.pod
      } : calculateAIScoreExact(aiInputsData);
      
      const finalResult = calculateFinalScoreExact(traditionalResult, psychometricResult, aiResult);
      
      setManualResult(finalResult);
      setManualMode('results');
    }
  };

  const resetDemo = () => {
    setDemoMode('selection');
    setSelectedProfile(null);
    setDemoResult(null);
    setShowCalculationSteps(false);
  };

  const resetManual = () => {
    setManualMode('form');
    setManualResult(null);
    setManualPsychometricAnswers([]);
    setCurrentQuestion(0);
    setQuestionStartTime(Date.now());
    setEssentialInfoData(null);
    setMlPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            AltScore Credit Risk Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience India's most advanced 3-layer credit scoring model combining traditional behavior analysis, 
            psychometric assessment, and AI-powered risk prediction.
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Traditional Model</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Psychometric Model</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>AI Model</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Score Fusion</span>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'demo' | 'manual')}>
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="demo" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Demo Mode</span>
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Manual Mode</span>
            </TabsTrigger>
          </TabsList>

          {/* Demo Mode */}
          <TabsContent value="demo" className="space-y-6">
            {demoMode === 'selection' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Choose a Demo Profile</span>
                  </CardTitle>
                  <CardDescription>
                    Select from 10 comprehensive profiles showcasing different scoring scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exactDemoProfiles.map((profile) => (
                      <Card key={profile.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{profile.name}</h3>
                              <p className="text-sm text-gray-600">{profile.occupation}, Age {profile.age}</p>
                            </div>
                            <Badge className={`
                              ${profile.expectedCategory === 'EXCELLENT' ? 'bg-green-100 text-green-800' :
                                profile.expectedCategory === 'SAFE' ? 'bg-blue-100 text-blue-800' :
                                profile.expectedCategory === 'MONITOR' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'}
                            `}>
                              {profile.expectedCategory}
                            </Badge>
                          </div>
                          
                          <p className="text-xs text-gray-500 mb-3">{profile.description}</p>
                          
                          <div className="space-y-2">
                            {profile.keyHighlights.slice(0, 3).map((highlight, idx) => (
                              <div key={idx} className="text-xs flex items-center space-x-1">
                                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button 
                            className="w-full mt-4" 
                            size="sm"
                            onClick={() => handleDemoProfileSelect(profile)}
                          >
                            View Full Breakdown
                            <ArrowRight className="h-3 w-3 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {demoMode === 'profile-details' && selectedProfile && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <User className="h-5 w-5" />
                          <span>{selectedProfile.name}</span>
                        </CardTitle>
                        <CardDescription>
                          {selectedProfile.occupation}, Age {selectedProfile.age} • Expected Category: {selectedProfile.expectedCategory}
                        </CardDescription>
                      </div>
                      <Button variant="outline" onClick={resetDemo}>
                        Back to Selection
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Profile Overview:</strong> {selectedProfile.description}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="font-medium">Key Highlights:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedProfile.keyHighlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button size="lg" onClick={handleDemoCalculation}>
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate AltScore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {demoMode === 'calculation' && (
              <Card className="text-center">
                <CardContent className="py-12">
                  <div className="space-y-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Calculating AltScore...</h3>
                      <p className="text-gray-600">Processing through all three scoring models</p>
                    </div>
                    <div className="flex justify-center space-x-8 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blue-500" />
                        <span>Traditional</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-purple-500" />
                        <span>Psychometric</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>AI Model</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {demoMode === 'results' && demoResult && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">AltScore Results - {selectedProfile?.name}</h2>
                  <Button variant="outline" onClick={resetDemo}>
                    Try Another Profile
                  </Button>
                </div>
                
                {/* Final Score Display */}
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-6xl font-bold text-blue-600">
                        {demoResult.finalScore.toFixed(1)}
                      </div>
                      <Badge className={`text-lg px-6 py-2 ${
                        demoResult.riskCategory === 'EXCELLENT' ? 'bg-green-100 text-green-800' :
                        demoResult.riskCategory === 'SAFE' ? 'bg-blue-100 text-blue-800' :
                        demoResult.riskCategory === 'MONITOR' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {demoResult.riskCategory}
                      </Badge>
                      <p className="text-gray-600">
                        {demoResult.riskCategory === 'EXCELLENT' && 'Very low risk. Suitable for instant approval, high limits.'}
                        {demoResult.riskCategory === 'SAFE' && 'Good profile. Eligible for standard loans with favourable terms.'}
                        {demoResult.riskCategory === 'MONITOR' && 'Moderate risk. Needs manual review or reduced limits.'}
                        {demoResult.riskCategory === 'HIGH_RISK' && 'Poor profile. High default probability, consider rejection.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Breakdown */}
                {profileBreakdown && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Score Breakdown</CardTitle>
                      <CardDescription>Step-by-step calculation following PDF specifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                        {profileBreakdown}
                      </pre>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          {/* Manual Mode */}
          <TabsContent value="manual" className="space-y-6">
            {manualMode === 'form' && (
              <EssentialInfoForm 
                onComplete={(data) => {
                  setEssentialInfoData(data);
                  setMlPrediction(data.mlPrediction);
                  setManualMode('psychometric');
                }}
              />
            )}

            {manualMode === 'psychometric' && (
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        Question {currentQuestion + 1} of {psychometric30QuestionsExact.length}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetManual}>
                      Exit Assessment
                    </Button>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all" 
                      style={{ width: `${((currentQuestion + 1) / psychometric30QuestionsExact.length) * 100}%` }}
                    />
                  </div>
                  
                  <CardTitle className="text-lg mt-4">
                    {psychometric30QuestionsExact[currentQuestion]?.question}
                  </CardTitle>
                  
                  <CardDescription>
                    Category: {psychometric30QuestionsExact[currentQuestion]?.category}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {psychometric30QuestionsExact[currentQuestion] && 
                      Object.entries(psychometric30QuestionsExact[currentQuestion].options).map(([optionKey, optionData]) => (
                        <Button
                          key={optionKey}
                          variant="outline"
                          className="h-auto p-4 text-left justify-start hover:bg-blue-50"
                          onClick={() => handleManualAnswer(optionKey as 'A' | 'B' | 'C' | 'D')}
                        >
                          <div className="flex items-start space-x-3">
                            <Badge variant="secondary" className="mt-1">
                              {optionKey}
                            </Badge>
                            <div className="flex-1 text-sm">
                              {optionData.text}
                            </div>
                          </div>
                        </Button>
                      ))
                    }
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-700">
                      <div className="font-medium">Assessment Guidelines:</div>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Answer honestly based on your actual behavior</li>
                        <li>There are no right or wrong answers</li>
                        <li>Take your time to consider each question</li>
                        <li>Your responses determine your psychometric credit score</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {manualMode === 'results' && manualResult && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Your AltScore Results</h2>
                  <Button variant="outline" onClick={resetManual}>
                    Start Over
                  </Button>
                </div>
                
                {/* Final Score Display */}
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-6xl font-bold text-blue-600">
                        {manualResult.finalScore.toFixed(1)}
                      </div>
                      <Badge className={`text-lg px-6 py-2 ${
                        manualResult.riskCategory === 'EXCELLENT' ? 'bg-green-100 text-green-800' :
                        manualResult.riskCategory === 'SAFE' ? 'bg-blue-100 text-blue-800' :
                        manualResult.riskCategory === 'MONITOR' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {manualResult.riskCategory}
                      </Badge>
                      <p className="text-gray-600">
                        {essentialInfoData ? 
                          `Based on ML model prediction and psychometric assessment for ${essentialInfoData.fullName}` :
                          'Based on your psychometric assessment and default profile data'
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal & Financial Summary */}
                {essentialInfoData && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal & Financial Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Name:</strong> {essentialInfoData.fullName} | <strong>Age:</strong> {essentialInfoData.age} | <strong>City:</strong> {essentialInfoData.city}, {essentialInfoData.state}
                        </div>
                        <div>
                          <strong>Monthly Income:</strong> ₹{essentialInfoData.monthlyIncome.toLocaleString()} | <strong>Expenses:</strong> ₹{essentialInfoData.monthlyExpenses.toLocaleString()}
                        </div>
                        <div>
                          <strong>Employment:</strong> {essentialInfoData.employmentType} | <strong>Industry:</strong> {essentialInfoData.industry}
                        </div>
                        <div>
                          <strong>Education:</strong> {essentialInfoData.educationLevel} | <strong>Credit History:</strong> {essentialInfoData.loanHistory}
                        </div>
                      </div>
                      {mlPrediction && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <div className="text-sm">
                            <strong>AI Model Score:</strong> {mlPrediction.ai_score}/10 
                            <span className="ml-2 text-green-600">
                              ({mlPrediction.confidence ? (mlPrediction.confidence * 100).toFixed(0) : 'N/A'}% confidence)
                            </span>
                            {mlPrediction.error && (
                              <div className="text-orange-600 text-xs mt-1">
                                Note: {mlPrediction.error}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Score Components */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {(manualResult.weights.traditional * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-600">Traditional Weight</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {(manualResult.weights.psychometric * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-600">Psychometric Weight</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {(manualResult.weights.ai * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-600">AI Weight</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}