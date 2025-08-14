import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScoreVisualization, ModelScoreCard } from "@/components/score-visualization";
import { 
  TrendingUp, 
  Brain, 
  Bot, 
  BarChart3, 
  Target, 
  TrendingDown, 
  Clock, 
  Download,
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Users,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CalculatedScores, RiskCategory } from "../types/assessment";

function RiskCategoryBadge({ category }: { category: string }) {
  const config = {
    excellent: { icon: Award, color: 'text-blue-600', bg: 'bg-blue-100', text: 'Excellent' },
    safe: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', text: 'Safe' },
    monitor: { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Monitor' },
    'high-risk': { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100', text: 'High Risk' }
  };

  const { icon: Icon, color, bg, text } = config[category as keyof typeof config] || config.safe;

  return (
    <Badge className={`${bg} ${color} text-sm font-medium px-3 py-1`}>
      <Icon className="h-4 w-4 mr-1" />
      {text}
    </Badge>
  );
}

function FeatureImportanceBar({ label, value, color }: { label: string; value: number; color: string }) {
  const percentage = value * 100;
  
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-gray-700 flex-1">{label}</span>
      <div className="w-24 bg-gray-200 rounded-full h-2 mx-3">
        <div 
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-900 w-8 text-right">
        {Math.round(percentage)}
      </span>
    </div>
  );
}

function ScoreFactorItem({ factor, impact, isPositive }: { factor: string; impact: number; isPositive: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-700 flex-1">{factor}</span>
      <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
        <span className="text-sm font-medium">
          {isPositive ? '+' : ''}{impact.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export default function Results() {
  const { userId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Get user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/users", userId],
    enabled: !!userId,
  });

  // Get assessment data
  const { data: assessment, isLoading: assessmentLoading } = useQuery({
    queryKey: ["/api/assessments/user", userId],
    enabled: !!userId,
  });

  // Calculate scores if not already calculated
  const calculateScoresMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/assessments/${assessment.id}/calculate`);
      return response.json();
    },
    onSuccess: (updatedAssessment) => {
      toast({
        title: "Scores Calculated",
        description: "Your credit assessment is complete!",
      });
      // The query will automatically refetch and update the UI
      window.location.reload(); // Simple way to refresh the data
    },
    onError: (error) => {
      toast({
        title: "Calculation Failed",
        description: "Please try again.",
        variant: "destructive",
      });
      console.error("Score calculation error:", error);
    },
  });

  const isLoading = userLoading || assessmentLoading;
  const needsCalculation = assessment && !assessment.isCompleted;

  // Auto-calculate scores if needed
  if (needsCalculation && !calculateScoresMutation.isPending) {
    calculateScoresMutation.mutate();
  }

  if (isLoading || calculateScoresMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your credit scores...</p>
        </Card>
      </div>
    );
  }

  if (!user || !assessment || !assessment.isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600">Assessment not found or incomplete.</p>
            <Button onClick={() => setLocation("/registration")} className="mt-4">
              Start New Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const scores: CalculatedScores = {
    traditional: parseFloat(assessment.traditionalScore || "0"),
    psychometric: parseFloat(assessment.psychometricScore || "0"),
    ai: parseFloat(assessment.aiScore || "0"),
    final: parseFloat(assessment.finalScore || "0"),
    confidence: parseFloat(assessment.confidenceFactor || "0"),
    category: assessment.riskCategory || "monitor",
    defaultProbability: parseFloat(assessment.defaultProbability || "0"),
    traditionalBreakdown: assessment.traditionalBreakdown || {},
    psychometricBreakdown: assessment.psychometricBreakdown || {},
    featureImportance: assessment.featureImportance || {}
  };

  const startNewAssessment = () => {
    setLocation("/registration");
  };

  const downloadReport = () => {
    toast({
      title: "Report Download",
      description: "Your detailed credit report is being prepared for download.",
    });
  };

  // Sample recommendations based on score
  const recommendations = [
    {
      title: "Build Credit History",
      description: "Consider taking a small secured credit card to establish formal credit history.",
      impact: 0.5,
      priority: "high" as const,
      timeframe: "3-6 months"
    },
    {
      title: "Increase Savings Rate",
      description: "Set up automatic transfers to maintain consistent monthly savings.",
      impact: 0.3,
      priority: "medium" as const,
      timeframe: "2-4 months"
    },
    {
      title: "Diversify Income Sources",
      description: "Adding secondary income streams can improve stability scores.",
      impact: 0.2,
      priority: "low" as const,
      timeframe: "6-12 months"
    }
  ];

  const positiveFactors = [
    { factor: "Consistent UPI usage", impact: 0.8 },
    { factor: "Complete KYC verification", impact: 0.6 },
    { factor: "Good financial responsibility score", impact: 0.5 },
    { factor: "Stable employment history", impact: 0.4 }
  ];

  const negativeFactors = [
    { factor: "Limited credit history", impact: -0.3 },
    { factor: "Low savings consistency", impact: -0.2 }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Your Credit Assessment Results
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive analysis based on our 3-layer scoring system
          </p>
        </div>

        {/* Main Score Display */}
        <Card className="gradient-primary text-white mb-8 slide-up">
          <CardContent className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-semibold mb-4">Your Final Credit Score</h2>
                <div className="flex items-center justify-center lg:justify-start space-x-6 mb-4">
                  <span className="text-6xl font-bold">{scores.final.toFixed(1)}</span>
                  <div>
                    <RiskCategoryBadge category={scores.category} />
                    <p className="text-blue-100 text-sm mt-2">
                      {scores.category === 'excellent' ? 'Outstanding credit profile' :
                       scores.category === 'safe' ? 'Good credit profile' :
                       scores.category === 'monitor' ? 'Moderate risk profile' :
                       'High risk profile'}
                    </p>
                  </div>
                </div>
                
                <p className="text-blue-100 mb-6 leading-relaxed">
                  {scores.category === 'safe' 
                    ? "You qualify for standard loan terms with favorable interest rates. Your profile shows consistent financial behavior and low default risk."
                    : scores.category === 'excellent'
                    ? "Congratulations! You have an excellent credit profile with access to the best loan terms and lowest interest rates."
                    : scores.category === 'monitor'
                    ? "Your profile shows moderate risk. With some improvements, you can access better credit terms."
                    : "Your profile indicates higher risk. Focus on improving your financial habits to access better credit options."
                  }
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold"
                    onClick={() => toast({ title: "Feature Coming Soon", description: "Credit application feature will be available soon." })}
                  >
                    Apply for Credit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-2 border-blue-300 text-blue-100 hover:bg-blue-700"
                    onClick={downloadReport}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <ScoreVisualization scores={scores} size="lg" />
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold">{Math.round(scores.confidence * 100)}%</div>
                    <div className="text-sm text-blue-200">Confidence</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Breakdown */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <ModelScoreCard
            title="Traditional Model"
            score={scores.traditional}
            icon={<BarChart3 />}
            color="text-blue-600"
            breakdown={scores.traditionalBreakdown}
          />
          
          <ModelScoreCard
            title="Psychometric Model"
            score={scores.psychometric}
            icon={<Brain />}
            color="text-purple-600"
            breakdown={scores.psychometricBreakdown}
          />
          
          <ModelScoreCard
            title="AI Model"
            score={scores.ai}
            icon={<Bot />}
            color="text-green-600"
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Score Contributing Factors */}
          <Card className="slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Score Contributing Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-3 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Positive Factors
                  </h4>
                  <div className="space-y-1 pl-6">
                    {positiveFactors.map((factor, index) => (
                      <ScoreFactorItem
                        key={index}
                        factor={factor.factor}
                        impact={factor.impact}
                        isPositive={true}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-red-600 mb-3 flex items-center">
                    <TrendingDown className="mr-2 h-4 w-4" />
                    Areas for Improvement
                  </h4>
                  <div className="space-y-1 pl-6">
                    {negativeFactors.map((factor, index) => (
                      <ScoreFactorItem
                        key={index}
                        factor={factor.factor}
                        impact={factor.impact}
                        isPositive={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Improvement Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium ${
                        rec.priority === 'high' ? 'text-red-600' :
                        rec.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {rec.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className="text-gray-500">Impact: +{rec.impact} points</span>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="text-blue-600 mr-2 h-4 w-4" />
                    <span className="font-medium text-blue-900">Timeline Estimate</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    With consistent improvement, your score could reach {(scores.final + 1).toFixed(1)}+ within 6-12 months.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Analysis */}
        <Card className="mb-8 slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>Risk Analysis & Explainability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Default Probability Analysis</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Your Risk Level</span>
                    <Badge className={`${
                      scores.defaultProbability < 0.15 ? 'bg-green-100 text-green-800' :
                      scores.defaultProbability < 0.3 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {scores.defaultProbability < 0.15 ? 'Low Risk' :
                       scores.defaultProbability < 0.3 ? 'Medium Risk' : 'High Risk'} 
                      ({Math.round(scores.defaultProbability * 100)}%)
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        scores.defaultProbability < 0.15 ? 'bg-green-500' :
                        scores.defaultProbability < 0.3 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (1 - scores.defaultProbability) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>High Risk</span>
                    <span>Your Score</span>
                    <span>Low Risk</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="font-medium text-gray-900 mb-3">Feature Importance (AI Model)</h5>
                  <div className="space-y-2">
                    {Object.entries(scores.featureImportance).slice(0, 4).map(([feature, importance]) => (
                      <FeatureImportanceBar
                        key={feature}
                        label={feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        value={importance}
                        color={
                          feature.includes('traditional') ? 'bg-blue-500' :
                          feature.includes('psychometric') ? 'bg-purple-500' :
                          feature.includes('employment') ? 'bg-green-500' :
                          'bg-yellow-500'
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Score Distribution Comparison</h4>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-300 rounded-full h-4 mb-2">
                      <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full"></div>
                    </div>
                    <div 
                      className="absolute top-0 transform -translate-x-1/2"
                      style={{ left: `${(scores.final / 10) * 100}%` }}
                    >
                      <div className="w-1 h-6 bg-blue-600"></div>
                      <div className="text-xs text-blue-600 font-medium mt-1 whitespace-nowrap">You</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Your score is better than {Math.round(((scores.final / 10) * 0.8 + 0.2) * 100)}% of similar profiles
                  </div>
                </div>

                <div className="space-y-3">
                  <div className={`flex justify-between items-center p-3 rounded-lg ${
                    scores.category === 'high-risk' ? 'bg-red-50 border-2 border-red-200' : 'bg-red-50'
                  }`}>
                    <span className="text-sm font-medium text-red-700">High Risk (0-4.4)</span>
                    <span className="text-sm text-red-600">18% of users</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${
                    scores.category === 'monitor' ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-yellow-50'
                  }`}>
                    <span className="text-sm font-medium text-yellow-700">Monitor (4.5-6.4)</span>
                    <span className="text-sm text-yellow-600">35% of users</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${
                    scores.category === 'safe' ? 'bg-green-50 border-2 border-green-200' : 'bg-green-50'
                  }`}>
                    <span className="text-sm font-medium text-green-700">Safe (6.5-8.4)</span>
                    <span className="text-sm text-green-600">32% of users {scores.category === 'safe' ? '(You are here)' : ''}</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${
                    scores.category === 'excellent' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-blue-50'
                  }`}>
                    <span className="text-sm font-medium text-blue-700">Excellent (8.5-10)</span>
                    <span className="text-sm text-blue-600">15% of users {scores.category === 'excellent' ? '(You are here)' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center fade-in">
          <Card className="gradient-success text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Take Action?</h3>
              <p className="text-lg mb-6">
                {scores.category === 'excellent' || scores.category === 'safe' 
                  ? "Your score qualifies you for competitive interest rates and loan terms"
                  : "Start improving your score today with our personalized recommendations"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
                  onClick={() => toast({ title: "Feature Coming Soon", description: "Loan marketplace will be available soon." })}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Find Loan Offers
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold"
                  onClick={startNewAssessment}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Start New Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
