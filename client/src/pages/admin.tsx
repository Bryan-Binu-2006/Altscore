import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  BarChart3, 
  Search, 
  Filter,
  Download,
  Eye,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { ScoreVisualization } from "@/components/score-visualization";

interface AdminStats {
  totalUsers: number;
  completedAssessments: number;
  avgScore: number;
  riskDistribution: Record<string, number>;
}

function StatCard({ title, value, icon, change }: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  change?: string 
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className="text-sm text-green-600 mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                {change}
              </p>
            )}
          </div>
          <div className="text-blue-600">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RiskBadge({ category }: { category: string }) {
  const config = {
    excellent: { color: 'bg-blue-100 text-blue-800', text: 'Excellent' },
    safe: { color: 'bg-green-100 text-green-800', text: 'Safe' },
    monitor: { color: 'bg-yellow-100 text-yellow-800', text: 'Monitor' },
    'high-risk': { color: 'bg-red-100 text-red-800', text: 'High Risk' }
  };

  const { color, text } = config[category as keyof typeof config] || config.safe;

  return (
    <Badge className={`${color} text-xs`}>
      {text}
    </Badge>
  );
}

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  // Fetch all users
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
  });

  // Fetch all completed assessments
  const { data: assessments = [], isLoading: assessmentsLoading } = useQuery({
    queryKey: ["/api/admin/assessments"],
  });

  const isLoading = usersLoading || assessmentsLoading;

  // Calculate admin statistics
  const stats: AdminStats = {
    totalUsers: users.length,
    completedAssessments: assessments.length,
    avgScore: assessments.length > 0 
      ? assessments.reduce((sum, a) => sum + parseFloat(a.finalScore || "0"), 0) / assessments.length 
      : 0,
    riskDistribution: assessments.reduce((acc, a) => {
      const category = a.riskCategory || 'monitor';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  // Filter and sort assessments
  const filteredAssessments = assessments
    .filter(assessment => {
      const user = assessment.user;
      const matchesSearch = !searchTerm || 
        user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === "all" || assessment.riskCategory === filterCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return parseFloat(b.finalScore || "0") - parseFloat(a.finalScore || "0");
        case "name":
          return (a.user?.fullName || "").localeCompare(b.user?.fullName || "");
        case "createdAt":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const exportData = () => {
    const csvData = assessments.map(assessment => ({
      Name: assessment.user?.fullName || "",
      Email: assessment.user?.email || "",
      Score: assessment.finalScore || "0",
      Category: assessment.riskCategory || "monitor",
      Traditional: assessment.traditionalScore || "0",
      Psychometric: assessment.psychometricScore || "0",
      AI: assessment.aiScore || "0",
      Confidence: assessment.confidenceFactor || "0",
      Date: new Date(assessment.createdAt).toLocaleDateString()
    }));

    const csvContent = [
      Object.keys(csvData[0] || {}).join(","),
      ...csvData.map(row => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "altscore-assessments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-skeleton h-8 w-48"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and analyze credit assessments</p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="h-8 w-8" />}
            change="+12% from last month"
          />
          <StatCard
            title="Completed Assessments"
            value={stats.completedAssessments}
            icon={<FileText className="h-8 w-8" />}
            change="+8% from last month"
          />
          <StatCard
            title="Average Score"
            value={stats.avgScore.toFixed(1)}
            icon={<BarChart3 className="h-8 w-8" />}
            change="+0.3 from last month"
          />
          <StatCard
            title="High Quality Profiles"
            value={`${Math.round(((stats.riskDistribution.excellent || 0) + (stats.riskDistribution.safe || 0)) / stats.completedAssessments * 100)}%`}
            icon={<Award className="h-8 w-8" />}
            change="+5% from last month"
          />
        </div>

        <Tabs defaultValue="assessments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="assessments" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-48">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="safe">Safe</SelectItem>
                        <SelectItem value="monitor">Monitor</SelectItem>
                        <SelectItem value="high-risk">High Risk</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="createdAt">Latest First</SelectItem>
                        <SelectItem value="score">Highest Score</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={exportData} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Assessments List */}
            <div className="grid gap-4">
              {filteredAssessments.map((assessment) => (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
                      <div className="lg:col-span-2">
                        <h3 className="font-semibold text-gray-900">
                          {assessment.user?.fullName || "Unknown User"}
                        </h3>
                        <p className="text-sm text-gray-600">{assessment.user?.email}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(assessment.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <ScoreVisualization
                          scores={{
                            final: parseFloat(assessment.finalScore || "0"),
                            traditional: parseFloat(assessment.traditionalScore || "0"),
                            psychometric: parseFloat(assessment.psychometricScore || "0"),
                            ai: parseFloat(assessment.aiScore || "0"),
                            confidence: parseFloat(assessment.confidenceFactor || "0"),
                            category: assessment.riskCategory || "monitor",
                            defaultProbability: parseFloat(assessment.defaultProbability || "0"),
                            traditionalBreakdown: assessment.traditionalBreakdown || {},
                            psychometricBreakdown: assessment.psychometricBreakdown || {},
                            featureImportance: assessment.featureImportance || {}
                          }}
                          size="sm"
                        />
                      </div>

                      <div className="text-center">
                        <RiskBadge category={assessment.riskCategory || "monitor"} />
                        <div className="text-xs text-gray-500 mt-1">
                          Confidence: {Math.round(parseFloat(assessment.confidenceFactor || "0") * 100)}%
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Eye className="h-3 w-3" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredAssessments.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
                    <p className="text-gray-600">
                      {searchTerm || filterCategory !== "all" 
                        ? "Try adjusting your search or filter criteria."
                        : "No completed assessments yet."
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stats.riskDistribution).map(([category, count]) => {
                      const percentage = stats.completedAssessments > 0 ? (count / stats.completedAssessments) * 100 : 0;
                      
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <RiskBadge category={category} />
                            <span className="text-sm font-medium">{count} users ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                category === 'excellent' ? 'bg-blue-500' :
                                category === 'safe' ? 'bg-green-500' :
                                category === 'monitor' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Score Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Score Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {stats.avgScore.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">Average Score</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {assessments.length > 0 
                            ? Math.max(...assessments.map(a => parseFloat(a.finalScore || "0"))).toFixed(1)
                            : "0.0"
                          }
                        </div>
                        <div className="text-sm text-gray-600">Highest Score</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score Range Distribution</span>
                      </div>
                      <div className="w-full bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full h-4 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                          Score Distribution Visualization
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {users.slice(0, 10).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{user.fullName}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="mr-4">{user.occupation}</span>
                          <span>{user.city}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                        {assessments.find(a => a.userId === user.id) ? (
                          <Badge className="bg-green-100 text-green-800 mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800 mt-1">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
