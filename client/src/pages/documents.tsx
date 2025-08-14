import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Clock, FileText, CreditCard, Banknote, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { DocumentStatus } from "../types/assessment";

interface DocumentUploadProps {
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onUpload: (type: string) => void;
  status: DocumentStatus;
}

function DocumentUpload({ type, title, description, icon, onUpload, status }: DocumentUploadProps) {
  return (
    <div 
      className={`document-upload-area ${status.uploaded ? 'uploaded' : ''}`}
      onClick={() => !status.uploaded && onUpload(type)}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="text-3xl">
          {status.uploaded ? (
            <CheckCircle className="text-green-500 h-8 w-8" />
          ) : status.verified ? (
            <Clock className="text-blue-500 h-8 w-8 animate-spin" />
          ) : (
            icon
          )}
        </div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
        
        {status.uploaded && (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Uploaded
          </Badge>
        )}
        
        {!status.uploaded && !status.verified && (
          <p className="text-xs text-blue-600 cursor-pointer hover:underline">
            Click to upload (Max 5MB)
          </p>
        )}
      </div>
    </div>
  );
}

export default function Documents() {
  const { userId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [documentStatuses, setDocumentStatuses] = useState<Record<string, DocumentStatus>>({
    pan: { type: 'pan', uploaded: false, verified: false },
    aadhar: { type: 'aadhar', uploaded: false, verified: false },
    salary: { type: 'salary', uploaded: false, verified: false },
    bank: { type: 'bank', uploaded: false, verified: false },
  });

  // Verify user exists
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["/api/users", userId],
    enabled: !!userId,
  });

  const form = useForm({
    defaultValues: {
      upiVolume: "",
      billPaymentHabits: "",
      bankingPreference: "",
      savingsBehavior: "",
    },
  });

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/assessments", {
        userId,
        uploadedDocuments: Object.keys(documentStatuses).filter(key => documentStatuses[key].uploaded),
        ...data,
      });
      return response.json();
    },
    onSuccess: (assessment) => {
      toast({
        title: "Documents Saved",
        description: "Your financial information has been recorded. Let's continue with the assessment.",
      });
      setLocation(`/psychometric/${userId}`);
    },
    onError: (error) => {
      toast({
        title: "Save Failed",
        description: "Please try again.",
        variant: "destructive",
      });
      console.error("Assessment creation error:", error);
    },
  });

  const uploadDocumentMutation = useMutation({
    mutationFn: async (documentType: string) => {
      const response = await apiRequest("POST", "/api/documents/upload", {
        documentType,
        assessmentId: "temp-id", // This would be the actual assessment ID in a real app
      });
      return response.json();
    },
    onSuccess: (data) => {
      setDocumentStatuses(prev => ({
        ...prev,
        [data.documentType]: {
          type: data.documentType,
          uploaded: true,
          verified: data.verified,
          processingTime: data.processingTime,
        }
      }));
      
      toast({
        title: "Document Uploaded",
        description: `${data.documentType.toUpperCase()} has been successfully uploaded and verified.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: "Please try uploading the document again.",
        variant: "destructive",
      });
    },
  });

  const handleDocumentUpload = (type: string) => {
    // Set processing state
    setDocumentStatuses(prev => ({
      ...prev,
      [type]: { ...prev[type], verified: true }
    }));
    
    uploadDocumentMutation.mutate(type);
  };

  const onSubmit = (data: any) => {
    createAssessmentMutation.mutate(data);
  };

  const goBack = () => {
    setLocation("/registration");
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-skeleton h-8 w-48"></div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600">User not found. Please start the registration process again.</p>
            <Button onClick={() => setLocation("/registration")} className="mt-4">
              Go to Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const uploadedCount = Object.values(documentStatuses).filter(status => status.uploaded).length;
  const canContinue = uploadedCount >= 2; // Allow continuation with at least 2 documents

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8 fade-in">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step 2 of 4: Document Verification</span>
            <span>50% Complete</span>
          </div>
          <Progress value={50} className="w-full" />
        </div>

        <Card className="shadow-lg slide-up">
          <CardContent className="p-6 lg:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Document Upload
              </h2>
              <p className="text-gray-600">
                Upload your documents for identity and income verification
              </p>
              <div className="mt-4">
                <Badge variant="outline" className="text-sm">
                  {uploadedCount} of 4 documents uploaded
                </Badge>
              </div>
            </div>

            <div className="space-y-8">
              {/* Document Upload Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Identity Documents */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CreditCard className="text-blue-600 mr-2 h-5 w-5" />
                    Identity Documents
                  </h3>
                  
                  <DocumentUpload
                    type="pan"
                    title="PAN Card"
                    description="Permanent Account Number"
                    icon={<FileText className="text-gray-400 h-8 w-8" />}
                    onUpload={handleDocumentUpload}
                    status={documentStatuses.pan}
                  />

                  <DocumentUpload
                    type="aadhar"
                    title="Aadhar Card"
                    description="Unique Identification Number"
                    icon={<CreditCard className="text-gray-400 h-8 w-8" />}
                    onUpload={handleDocumentUpload}
                    status={documentStatuses.aadhar}
                  />
                </div>

                {/* Income Documents */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Banknote className="text-green-600 mr-2 h-5 w-5" />
                    Income Documents
                  </h3>

                  <DocumentUpload
                    type="salary"
                    title="Salary Slips"
                    description="Last 3 months"
                    icon={<Receipt className="text-gray-400 h-8 w-8" />}
                    onUpload={handleDocumentUpload}
                    status={documentStatuses.salary}
                  />

                  <DocumentUpload
                    type="bank"
                    title="Bank Statements"
                    description="Last 6 months"
                    icon={<Banknote className="text-gray-400 h-8 w-8" />}
                    onUpload={handleDocumentUpload}
                    status={documentStatuses.bank}
                  />
                </div>
              </div>

              {/* Financial Behavior Declaration */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Financial Behavior Declaration
                </h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="upiVolume"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly UPI Transaction Volume</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select volume" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="0-5k">₹0 - ₹5,000</SelectItem>
                                <SelectItem value="5k-15k">₹5,000 - ₹15,000</SelectItem>
                                <SelectItem value="15k-30k">₹15,000 - ₹30,000</SelectItem>
                                <SelectItem value="30k-50k">₹30,000 - ₹50,000</SelectItem>
                                <SelectItem value="50k+">₹50,000+</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="billPaymentHabits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bill Payment Habits</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select habits" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="always-on-time">Always on time</SelectItem>
                                <SelectItem value="usually-on-time">Usually on time</SelectItem>
                                <SelectItem value="sometimes-late">Sometimes late</SelectItem>
                                <SelectItem value="often-late">Often late</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="bankingPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Banking Preference</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select preference" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="digital-first">Digital-first</SelectItem>
                                <SelectItem value="mixed">Mixed usage</SelectItem>
                                <SelectItem value="prefer-cash">Prefer cash</SelectItem>
                                <SelectItem value="minimal">Minimal banking</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="savingsBehavior"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Savings Behavior</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select behavior" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="regular-saver">Regular saver</SelectItem>
                                <SelectItem value="occasional-saver">Occasional saver</SelectItem>
                                <SelectItem value="spend-everything">Spend everything</SelectItem>
                                <SelectItem value="no-savings">No savings</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-6">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={goBack}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </Button>
                      
                      <Button 
                        type="submit" 
                        disabled={!canContinue || createAssessmentMutation.isPending}
                        className="flex items-center gap-2"
                      >
                        {createAssessmentMutation.isPending ? "Saving..." : "Continue"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
