import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, User, DollarSign, MapPin, Briefcase, GraduationCap, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const essentialInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  age: z.number().min(18, "Age must be at least 18").max(100, "Please enter a valid age"),
  gender: z.string().min(1, "Please select gender"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  monthlyIncome: z.number().min(1, "Monthly income must be greater than 0"),
  monthlyExpenses: z.number().min(1, "Monthly expenses must be greater than 0"),
  employmentType: z.string().min(1, "Please select employment type"),
  industry: z.string().min(1, "Please select industry"),
  educationLevel: z.string().min(1, "Please select education level"),
  loanHistory: z.string().min(1, "Please select loan history"),
  loanType: z.string().optional(),
  creditCardUsage: z.string().min(1, "Please select credit card usage"),
  hasDefaults: z.string().min(1, "Please select defaults status")
});

type EssentialInfoData = z.infer<typeof essentialInfoSchema>;

interface EssentialInfoFormProps {
  onComplete: (data: EssentialInfoData & { mlPrediction: any }) => void;
}

export function EssentialInfoForm({ onComplete }: EssentialInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<EssentialInfoData>({
    resolver: zodResolver(essentialInfoSchema),
    defaultValues: {
      fullName: "",
      age: 25,
      gender: "",
      city: "",
      state: "",
      monthlyIncome: 50000,
      monthlyExpenses: 30000,
      employmentType: "",
      industry: "",
      educationLevel: "",
      loanHistory: "",
      loanType: "",
      creditCardUsage: "",
      hasDefaults: ""
    }
  });

  const watchLoanHistory = form.watch("loanHistory");

  const onSubmit = async (data: EssentialInfoData) => {
    setIsSubmitting(true);
    
    try {
      // Call ML model prediction API
      const mlResponse = await fetch("/api/ml-predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Full Name": data.fullName,
          "Age": data.age,
          "Gender": data.gender,
          "City": `${data.city}, ${data.state}`,
          "Monthly Income": data.monthlyIncome,
          "Monthly Expenses": data.monthlyExpenses,
          "Employment Type": data.employmentType,
          "Industry": data.industry,
          "Education Level": data.educationLevel,
          "Loan History": data.loanHistory,
          "Credit Card Usage": data.creditCardUsage,
          "Defaults": data.hasDefaults
        })
      });

      const mlPrediction = await mlResponse.json();
      
      if (mlPrediction.error) {
        toast({
          title: "ML Model Notice",
          description: mlPrediction.error + " - Using fallback prediction.",
          variant: "default"
        });
      } else {
        toast({
          title: "AI Assessment Complete",
          description: `AI Score: ${mlPrediction.ai_score}/10 (${(mlPrediction.confidence * 100).toFixed(0)}% confidence)`,
          variant: "default"
        });
      }

      // Pass data and ML prediction to parent
      onComplete({ ...data, mlPrediction });
      
    } catch (error) {
      console.error("Failed to get ML prediction:", error);
      toast({
        title: "Error",
        description: "Failed to process AI prediction. Using fallback score.",
        variant: "destructive"
      });
      
      // Provide fallback prediction
      onComplete({ 
        ...data, 
        mlPrediction: { 
          ai_score: 5.0, 
          confidence: 0.3, 
          pod: 0.5, 
          error: "ML service unavailable" 
        } 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <User className="h-6 w-6" />
          Essential Information
        </CardTitle>
        <p className="text-gray-600">Please provide your details for credit assessment</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Details
                </h3>
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} data-testid="input-fullname" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="25" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-age"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </h3>

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" {...field} data-testid="input-city" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <FormControl>
                        <Input placeholder="Maharashtra" {...field} data-testid="input-state" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Financial Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Details
                </h3>

                <FormField
                  control={form.control}
                  name="monthlyIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Income (₹) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="50000" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-income"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monthlyExpenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Expenses (₹) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="30000" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-expenses"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creditCardUsage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit Card Usage *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-credit-usage">
                            <SelectValue placeholder="Select usage level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Employment
                </h3>

                <FormField
                  control={form.control}
                  name="employmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-employment">
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Salaried">Salaried</SelectItem>
                          <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                          <SelectItem value="Freelancer">Freelancer</SelectItem>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Unemployed">Unemployed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-industry">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Level *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-education">
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                          <SelectItem value="Master's">Master's</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Credit History */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Credit History
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="loanHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan History *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-loan-history">
                            <SelectValue placeholder="Do you have any loans?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchLoanHistory === "Yes" && (
                  <FormField
                    control={form.control}
                    name="loanType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Personal Loan, Home Loan" {...field} data-testid="input-loan-type" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="hasDefaults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any defaults or late payments in past 12 months? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-defaults">
                            <SelectValue placeholder="Select defaults status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={isSubmitting}
              data-testid="button-submit-essential-info"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing AI Assessment...
                </>
              ) : (
                "Continue to Psychometric Assessment"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}