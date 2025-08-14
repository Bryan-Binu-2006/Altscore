import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Clock, Users, UserX, BarChart3, ShieldAlert, Rocket, BookOpen } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const startAssessment = () => {
    setLocation("/registration");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Fair Credit Scoring for <span className="text-yellow-300">Everyone</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Get your credit score even without formal banking history. Our AI-powered system evaluates your creditworthiness using alternative data, behavioral analysis, and psychometric assessment.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={startAssessment}
                  size="lg"
                  className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold text-lg"
                >
                  <Rocket className="mr-3 h-5 w-5" />
                  Start Free Assessment
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-blue-300 text-blue-100 hover:bg-blue-700 font-semibold text-lg"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="text-green-400 h-5 w-5" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-yellow-400 h-5 w-5" />
                  <span>Results in 10 mins</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="text-blue-300 h-5 w-5" />
                  <span>Trusted by 50K+</span>
                </div>
              </div>
            </div>

            {/* Score Preview Card */}
            <div className="relative slide-up">
              <Card className="relative z-10 bg-white shadow-2xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">Credit Score Preview</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Live Demo
                      </span>
                    </div>
                    
                    <div className="text-center py-8">
                      <div className="relative inline-block">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="transparent"/>
                          <circle 
                            cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="8" fill="transparent" 
                            strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">7.8</div>
                            <div className="text-sm text-gray-600">Safe</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">8.2</div>
                        <div className="text-xs text-gray-600">Traditional</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-semibold text-purple-600">7.5</div>
                        <div className="text-xs text-gray-600">Psychometric</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">7.9</div>
                        <div className="text-xs text-gray-600">AI Model</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            The Credit Gap Problem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Millions of Indians are excluded from formal credit due to lack of traditional banking history. 
            We're changing that with inclusive, AI-powered credit assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border border-red-100 bg-red-50 slide-up">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserX className="text-red-600 h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">67% Excluded</h3>
              <p className="text-gray-600">
                Gig workers, students, and first-time borrowers denied credit due to no CIBIL score
              </p>
            </CardContent>
          </Card>

          <Card className="border border-yellow-100 bg-yellow-50 slide-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-yellow-600 h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Limited Data</h3>
              <p className="text-gray-600">
                Traditional bureaus only use historical repayment data, missing behavioral patterns
              </p>
            </CardContent>
          </Card>

          <Card className="border border-blue-100 bg-blue-50 slide-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fraud Risk</h3>
              <p className="text-gray-600">
                Current systems miss early fraud patterns and risky behavioral indicators
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Solution Overview */}
        <Card className="gradient-primary text-white slide-up">
          <CardContent className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6">Our 3-Layer Solution</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-900 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Traditional Model</h4>
                      <p className="text-blue-100 text-sm">
                        Analyzes digital behavior, UPI usage, bill payments, and asset ownership
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-900 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Psychometric Assessment</h4>
                      <p className="text-blue-100 text-sm">
                        30-question test measuring financial mindset and behavioral traits
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-900 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">AI Pattern Recognition</h4>
                      <p className="text-blue-100 text-sm">
                        Machine learning model predicts default probability with full explainability
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Card className="bg-white shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-gray-900">
                        <span className="font-medium">Assessment Progress</span>
                        <span className="text-sm text-gray-600">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="gradient-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mt-6">
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <Shield className="text-green-500 h-6 w-6 mx-auto mb-1" />
                          <div className="text-xs text-gray-700">Traditional</div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <BookOpen className="text-blue-500 h-6 w-6 mx-auto mb-1" />
                          <div className="text-xs text-gray-700">Psychometric</div>
                        </div>
                        <div className="text-center p-2 bg-gray-100 rounded-lg">
                          <TrendingUp className="text-gray-400 h-6 w-6 mx-auto mb-1" />
                          <div className="text-xs text-gray-500">AI Analysis</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Your Credit Score?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have discovered their creditworthiness through our comprehensive assessment platform.
          </p>
          <Button 
            onClick={startAssessment}
            size="lg"
            className="gradient-primary text-white font-semibold text-lg px-8 py-4"
          >
            <Rocket className="mr-3 h-5 w-5" />
            Start Your Assessment Now
          </Button>
        </div>
      </section>
    </div>
  );
}
