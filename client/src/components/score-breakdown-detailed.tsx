/**
 * Detailed Score Breakdown Component for AltScore Results
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScoreBreakdown } from '@/lib/altscore-engine';
import { 
  TrendingUp, 
  Brain, 
  Zap, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  User,
  CreditCard,
  GraduationCap,
  Search,
  Smartphone,
  MapPin,
  Home,
  Target
} from 'lucide-react';

interface ScoreBreakdownDetailedProps {
  breakdown: ScoreBreakdown;
  finalScore: number;
  category: 'EXCELLENT' | 'SAFE' | 'MONITOR' | 'HIGH_RISK';
}

export default function ScoreBreakdownDetailed({ 
  breakdown, 
  finalScore, 
  category 
}: ScoreBreakdownDetailedProps) {
  
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'EXCELLENT': return 'text-green-600 bg-green-100';
      case 'SAFE': return 'text-blue-600 bg-blue-100';
      case 'MONITOR': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH_RISK': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const categoryDescriptions = {
    'EXCELLENT': 'Instant approval, high limits, best interest rates',
    'SAFE': 'Standard loans, good terms, reliable borrower',
    'MONITOR': 'Manual review, reduced limits, moderate risk',
    'HIGH_RISK': 'Loan rejection likely, high risk of default'
  };

  const traditionaICons = {
    identity_kyc: User,
    financial_behavior: CreditCard,
    credit_loan_behavior: CreditCard,
    education_employment: GraduationCap,
    behavioral_search: Search,
    app_lifestyle: Smartphone,
    geolocation: MapPin,
    asset_ownership: Home
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Final Score Header */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <div className="text-4xl font-bold text-gray-900">
                    {finalScore.toFixed(1)}
                  </div>
                </div>
                <Progress 
                  value={(finalScore / 10) * 100} 
                  className="absolute top-2 left-2 w-28 h-28 rounded-full"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge className={`text-lg px-6 py-2 ${getCategoryColor(category)}`}>
                {category.replace('_', ' ')}
              </Badge>
              <p className="text-sm text-gray-600">
                {categoryDescriptions[category]}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown Tabs */}
      <Tabs defaultValue="traditional" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traditional" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Traditional</span>
          </TabsTrigger>
          <TabsTrigger value="psychometric" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Psychometric</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>AI Model</span>
          </TabsTrigger>
          <TabsTrigger value="fusion" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Score Fusion</span>
          </TabsTrigger>
        </TabsList>

        {/* Traditional Model Breakdown */}
        <TabsContent value="traditional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Traditional Behavior-Based Model</span>
                <Badge variant="outline">Score: {breakdown.traditional.score.toFixed(1)}/10</Badge>
              </CardTitle>
              <CardDescription>
                Based on document verification, financial data, and behavioral patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Scores */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(breakdown.traditional.categoryScores).map(([category, score]) => {
                  const IconComponent = traditionaICons[category as keyof typeof traditionaICons] || User;
                  const categoryName = category.replace(/_/g, ' ').split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ');
                  
                  return (
                    <div key={category} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <IconComponent className="h-5 w-5 text-blue-500" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{categoryName}</div>
                          <div className="text-xs text-gray-500">
                            Weight varies by category
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {(score * 10).toFixed(1)}
                        </Badge>
                      </div>
                      <Progress value={score * 100} className="h-2" />
                    </div>
                  );
                })}
              </div>

              {/* Penalties and Adjustments */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Adjustments & Confidence</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">
                      -{breakdown.traditional.penalties.drift.toFixed(2)}
                    </div>
                    <div className="text-xs text-red-600">Drift Penalty</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {(breakdown.traditional.confidence * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-blue-600">Confidence</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      8/8
                    </div>
                    <div className="text-xs text-green-600">Data Categories</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Psychometric Model Breakdown */}
        <TabsContent value="psychometric" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Psychometric Mindset-Based Model</span>
                <Badge variant="outline">Score: {breakdown.psychometric.score.toFixed(1)}/10</Badge>
              </CardTitle>
              <CardDescription>
                Based on 30-question behavioral assessment measuring 6 key traits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Trait Scores */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(breakdown.psychometric.traitScores).map(([trait, score]) => {
                  const traitName = trait.replace(/_/g, ' ').split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ');
                  
                  const normalizedScore = Math.min(100, (score / 30) * 100);
                  
                  return (
                    <div key={trait} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium text-sm">{traitName}</div>
                        <Badge variant="secondary">
                          {score.toFixed(1)}/30
                        </Badge>
                      </div>
                      <Progress value={normalizedScore} className="h-2" />
                      <div className="mt-2 text-xs text-gray-500">
                        Trait contribution to overall psychometric score
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CDD Penalties and Confidence */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Quality Checks & Confidence</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">
                      -{breakdown.psychometric.penalties.cdd.toFixed(2)}
                    </div>
                    <div className="text-xs text-red-600">CDD Penalty</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Contradiction Detection
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {(breakdown.psychometric.confidence * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-blue-600">Confidence</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Response Quality
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Model Breakdown */}
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>AI Pattern-Based Model</span>
                <Badge variant="outline">Score: {breakdown.ai.score.toFixed(1)}/10</Badge>
              </CardTitle>
              <CardDescription>
                XGBoost-style pattern recognition with Probability of Default calculation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PoD Calculation */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <h4 className="font-medium mb-4 flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Probability of Default (PoD) Analysis</span>
                </h4>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400">
                      {(breakdown.ai.basePoD * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">Base PoD</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {(breakdown.ai.adjustedPoD * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-purple-600">Adjusted PoD</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {breakdown.ai.score.toFixed(1)}
                    </div>
                    <div className="text-xs text-blue-600">AI Score</div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 bg-white p-3 rounded border">
                  <div className="font-medium mb-1">Conversion Formula:</div>
                  <code className="text-xs">AI Score = 10 × (1 - PoD)^0.6</code>
                  <div className="mt-2">
                    Lower Probability of Default = Higher AI Score
                  </div>
                </div>
              </div>

              {/* AI Confidence */}
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {(breakdown.ai.confidence * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-blue-600">AI Model Confidence</div>
                <div className="text-xs text-gray-500 mt-1">
                  Based on available AI signal count
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Score Fusion Breakdown */}
        <TabsContent value="fusion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Score Fusion Engine</span>
                <Badge variant="outline">Final: {breakdown.fusion.finalScore.toFixed(1)}/10</Badge>
              </CardTitle>
              <CardDescription>
                Confidence-weighted combination of all three models with bonuses and penalties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Model Weights */}
              <div>
                <h4 className="font-medium mb-3">Model Weights (Confidence-Based)</h4>
                <div className="space-y-3">
                  {Object.entries(breakdown.fusion.weights).map(([model, weight]) => (
                    <div key={model} className="flex items-center space-x-3">
                      <div className="w-24 text-sm capitalize">
                        {model === 'ai' ? 'AI Model' : `${model} Model`}
                      </div>
                      <Progress value={weight * 100} className="flex-1 h-3" />
                      <div className="text-sm font-medium w-12">
                        {(weight * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Final Calculation */}
              <div>
                <h4 className="font-medium mb-3">Final Score Calculation</h4>
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Weighted Base Score:</span>
                    <span className="font-mono">
                      {(
                        breakdown.traditional.score * breakdown.fusion.weights.traditional +
                        breakdown.psychometric.score * breakdown.fusion.weights.psychometric +
                        breakdown.ai.score * breakdown.fusion.weights.ai
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>+ Trust Bonus:</span>
                    <span className="font-mono">+{breakdown.fusion.bonuses.trust.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>- Risk Penalty:</span>
                    <span className="font-mono">-{breakdown.fusion.penalties.risk.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Final Score:</span>
                    <span className="font-mono">{breakdown.fusion.finalScore.toFixed(1)}/10</span>
                  </div>
                </div>
              </div>

              {/* Bonuses and Penalties Explanation */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-700">Trust Bonus</span>
                  </div>
                  <div className="text-xs text-green-600">
                    Applied when overall confidence ≥ 50%
                  </div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="font-medium text-red-700">Risk Penalty</span>
                  </div>
                  <div className="text-xs text-red-600">
                    Applied when ≥2 models show red flags
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}