import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, decimal, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  age: integer("age").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  city: text("city").notNull(),
  occupation: text("occupation").notNull(),
  income: text("income").notNull(),
  residential: text("residential").notNull(),
  education: text("education").notNull(),
  workExperience: text("work_experience"),
  dependents: integer("dependents"),
  
  // Manual Mode Essential Information Fields
  gender: text("gender"),
  monthlyIncome: integer("monthly_income"),
  monthlyExpenses: integer("monthly_expenses"),
  employmentType: text("employment_type"),
  industry: text("industry"),
  educationLevel: text("education_level"),
  loanHistory: text("loan_history"),
  loanType: text("loan_type"),
  creditCardUsage: text("credit_card_usage"),
  hasDefaults: text("has_defaults"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  
  // Document uploads
  uploadedDocuments: jsonb("uploaded_documents").$type<string[]>(),
  
  // Financial behavior data
  upiVolume: text("upi_volume"),
  billPaymentHabits: text("bill_payment_habits"),
  bankingPreference: text("banking_preference"),
  savingsBehavior: text("savings_behavior"),
  
  // Psychometric answers
  psychometricAnswers: jsonb("psychometric_answers").$type<Record<string, number>>(),
  
  // Calculated scores
  traditionalScore: decimal("traditional_score", { precision: 3, scale: 1 }),
  psychometricScore: decimal("psychometric_score", { precision: 3, scale: 1 }),
  aiScore: decimal("ai_score", { precision: 3, scale: 1 }),
  finalScore: decimal("final_score", { precision: 3, scale: 1 }),
  
  // Confidence and risk metrics
  confidenceFactor: decimal("confidence_factor", { precision: 3, scale: 2 }),
  riskCategory: text("risk_category"),
  defaultProbability: decimal("default_probability", { precision: 3, scale: 2 }),
  
  // Detailed breakdowns
  traditionalBreakdown: jsonb("traditional_breakdown").$type<Record<string, number>>(),
  psychometricBreakdown: jsonb("psychometric_breakdown").$type<Record<string, number>>(),
  featureImportance: jsonb("feature_importance").$type<Record<string, number>>(),
  
  // Status
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const updateAssessmentSchema = insertAssessmentSchema.partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type UpdateAssessment = z.infer<typeof updateAssessmentSchema>;
