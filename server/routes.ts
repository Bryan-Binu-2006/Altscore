import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAssessmentSchema, updateAssessmentSchema } from "@shared/schema";
import { calculateScores } from "../client/src/lib/scoring-engine";
import { spawn } from "child_process";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User registration
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create assessment
  app.post("/api/assessments", async (req, res) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(assessmentData);
      res.json(assessment);
    } catch (error) {
      console.error("Error creating assessment:", error);
      res.status(400).json({ error: "Invalid assessment data" });
    }
  });

  // Get assessment by user ID
  app.get("/api/assessments/user/:userId", async (req, res) => {
    try {
      const assessment = await storage.getAssessmentByUserId(req.params.userId);
      if (!assessment) {
        return res.status(404).json({ error: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      console.error("Error fetching assessment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update assessment
  app.patch("/api/assessments/:id", async (req, res) => {
    try {
      const updates = updateAssessmentSchema.parse(req.body);
      const assessment = await storage.updateAssessment(req.params.id, updates);
      if (!assessment) {
        return res.status(404).json({ error: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      console.error("Error updating assessment:", error);
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  // Calculate and finalize scores
  app.post("/api/assessments/:id/calculate", async (req, res) => {
    try {
      const assessment = await storage.getAssessment(req.params.id);
      if (!assessment) {
        return res.status(404).json({ error: "Assessment not found" });
      }

      const user = await storage.getUser(assessment.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Calculate all scores using the scoring engine
      const scores = calculateScores({
        user,
        assessment,
        psychometricAnswers: assessment.psychometricAnswers || {}
      });

      // Update assessment with calculated scores
      const updatedAssessment = await storage.updateAssessment(req.params.id, {
        traditionalScore: scores.traditional.toString(),
        psychometricScore: scores.psychometric.toString(),
        aiScore: scores.ai.toString(),
        finalScore: scores.final.toString(),
        confidenceFactor: scores.confidence.toString(),
        riskCategory: scores.category,
        defaultProbability: scores.defaultProbability.toString(),
        traditionalBreakdown: scores.traditionalBreakdown,
        psychometricBreakdown: scores.psychometricBreakdown,
        featureImportance: scores.featureImportance,
        isCompleted: true
      });

      res.json(updatedAssessment);
    } catch (error) {
      console.error("Error calculating scores:", error);
      res.status(500).json({ error: "Error calculating scores" });
    }
  });

  // Admin endpoints
  app.get("/api/admin/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/assessments", async (req, res) => {
    try {
      const assessments = await storage.getCompletedAssessments();
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // ML Model Prediction for Manual Mode
  app.post("/api/ml-predict", async (req, res) => {
    try {
      const formData = req.body;
      
      // Call Python ML service
      const prediction = await callMLService(formData);
      res.json(prediction);
    } catch (error) {
      console.error("Error in ML prediction:", error);
      res.status(500).json({ 
        error: "ML prediction failed",
        ai_score: 5.0, // Default fallback
        confidence: 0.3,
        pod: 0.5
      });
    }
  });

  // Document upload simulation
  app.post("/api/documents/upload", async (req, res) => {
    try {
      const { documentType, assessmentId } = req.body;
      
      // Simulate document processing
      setTimeout(() => {
        res.json({
          success: true,
          documentType,
          verified: true,
          processingTime: Math.random() * 2000 + 1000
        });
      }, 1500);
    } catch (error) {
      console.error("Error processing document:", error);
      res.status(500).json({ error: "Document processing failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// ML Service Helper Function
async function callMLService(formData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonPath = process.env.PYTHON_PATH || 'python';
    const scriptPath = path.join(process.cwd(), 'ml', 'ml_model_service.py');
    
    const child = spawn(pythonPath, [scriptPath, JSON.stringify(formData)]);
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdout.trim());
          resolve(result);
        } catch (error) {
          console.error("Failed to parse ML service output:", stdout);
          resolve({
            ai_score: 5.0,
            confidence: 0.3,
            pod: 0.5,
            error: "Failed to parse ML output"
          });
        }
      } else {
        console.error("ML service error:", stderr);
        resolve({
          ai_score: 5.0,
          confidence: 0.3,
          pod: 0.5,
          error: stderr || "ML service failed"
        });
      }
    });
    
    child.on('error', (error) => {
      console.error("Failed to start ML service:", error);
      resolve({
        ai_score: 5.0,
        confidence: 0.3,
        pod: 0.5,
        error: "Failed to start ML service"
      });
    });
  });
}
