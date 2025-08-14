import { type User, type InsertUser, type Assessment, type InsertAssessment, type UpdateAssessment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Assessment operations
  getAssessment(id: string): Promise<Assessment | undefined>;
  getAssessmentByUserId(userId: string): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessment(id: string, updates: UpdateAssessment): Promise<Assessment | undefined>;
  getAllAssessments(): Promise<Assessment[]>;
  
  // Admin operations
  getAllUsers(): Promise<User[]>;
  getCompletedAssessments(): Promise<(Assessment & { user: User })[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private assessments: Map<string, Assessment>;

  constructor() {
    this.users = new Map();
    this.assessments = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      workExperience: insertUser.workExperience || null,
      dependents: insertUser.dependents || null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getAssessment(id: string): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async getAssessmentByUserId(userId: string): Promise<Assessment | undefined> {
    return Array.from(this.assessments.values()).find(
      (assessment) => assessment.userId === userId,
    );
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = randomUUID();
    const assessment: Assessment = {
      ...insertAssessment,
      id,
      uploadedDocuments: insertAssessment.uploadedDocuments as string[] | null || null,
      upiVolume: insertAssessment.upiVolume || null,
      billPaymentHabits: insertAssessment.billPaymentHabits || null,
      bankingPreference: insertAssessment.bankingPreference || null,
      savingsBehavior: insertAssessment.savingsBehavior || null,
      psychometricAnswers: insertAssessment.psychometricAnswers || null,
      traditionalScore: insertAssessment.traditionalScore || null,
      psychometricScore: insertAssessment.psychometricScore || null,
      aiScore: insertAssessment.aiScore || null,
      finalScore: insertAssessment.finalScore || null,
      confidenceFactor: insertAssessment.confidenceFactor || null,
      riskCategory: insertAssessment.riskCategory || null,
      defaultProbability: insertAssessment.defaultProbability || null,
      traditionalBreakdown: insertAssessment.traditionalBreakdown || null,
      psychometricBreakdown: insertAssessment.psychometricBreakdown || null,
      featureImportance: insertAssessment.featureImportance || null,
      isCompleted: insertAssessment.isCompleted || false,
      createdAt: new Date(),
      completedAt: null,
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async updateAssessment(id: string, updates: UpdateAssessment): Promise<Assessment | undefined> {
    const existing = this.assessments.get(id);
    if (!existing) return undefined;

    const updated: Assessment = {
      ...existing,
      ...updates,
      uploadedDocuments: updates.uploadedDocuments !== undefined ? (updates.uploadedDocuments as string[] | null) : existing.uploadedDocuments,
      completedAt: updates.isCompleted ? new Date() : existing.completedAt,
    };
    this.assessments.set(id, updated);
    return updated;
  }

  async getAllAssessments(): Promise<Assessment[]> {
    return Array.from(this.assessments.values());
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getCompletedAssessments(): Promise<(Assessment & { user: User })[]> {
    const completedAssessments = Array.from(this.assessments.values())
      .filter(assessment => assessment.isCompleted);
    
    return completedAssessments.map(assessment => {
      const user = this.users.get(assessment.userId);
      return { ...assessment, user: user! };
    });
  }
}

export const storage = new MemStorage();
