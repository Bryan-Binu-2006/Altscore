# AltScore – Progress Report

**Date:** 2025-08-14

---

## Problem Statement
- Millions of gig workers and new-to-credit individuals are excluded from loans due to lack of traditional credit history, leaving them financially underserved.

## Proposed Solution
- AltScore uses behavioral data, psychometric testing, and AI scoring to fairly assess creditworthiness, even for those without formal credit history.

---

## Impact
- AltScore provides financial inclusion for gig workers, students, and digital-first users.
- The platform offers explainable credit scores with transparent breakdowns for users and lenders.
- By leveraging alternative and behavioral data, AltScore reduces bias and increases access to fair credit.

---

## Technical Overview
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Express, TypeScript, Drizzle ORM-ready
- **AI:** Python, Random Forest model trained on a synthetic dataset of 30,000 rows
- **Database:** In-memory (Postgres planned)

---

## Progress Checklist
| Feature              | Status      | Notes                                      |
|----------------------|------------|--------------------------------------------|
| Registration         | ✅ Completed| Multi-step form with validation            |
| Psychometric Test    | ✅ Completed| 30 questions + drift detection             |
| Document Upload      | ✅ Completed| KYC + income proof                         |
| AI Scoring           | ✅ Completed| Combines behavioral + psychometric + ML    |
| Results Page         | ✅ Completed| Score breakdown and visualization          |
| API Endpoints        | ✅ Completed| All core endpoints implemented             |
| Postgres Integration | ⏳ Pending  | Planned next step                          |
| Automated Testing    | ⏳ Pending  | To be added                                |
| Behavioral Analytics | ⏳ Planned  | Feature-test module ready                  |
| Document Processing  | ⏳ Planned  | Feature-test module ready                  |

---

## 1. Overview
- AltScore is a modern credit scoring web application designed for users with little or no traditional credit history.
- The platform combines behavioral data, such as spending patterns, bill payments, app usage, and asset ownership, with a psychometric testing module that uses a 30-question assessment to measure financial mindset.
- AltScore leverages an AI scoring system powered by a machine learning model (in .pkl format) to estimate the probability of default.
- The goal of the project is to deliver a fair and explainable credit score, ranging from 0 to 10, for new-to-credit individuals, gig workers, and digital users who are often excluded from traditional credit systems.
- The technology stack consists of a React frontend built with Vite and TypeScript, an Express backend written in TypeScript, and a Python-based machine learning model for AI scoring.
- The application currently uses in-memory storage, but it is designed to transition to a Postgres database with Drizzle ORM in the future.
- As of this report, the application supports registration, psychometric testing, document upload, scoring logic (including traditional, psychometric, and AI models), and all key API endpoints.
- The next steps include connecting a real database, adding more validations, refining the user interface, and preparing the system for deployment.
- For the AI model, a synthetic database of 30,000 rows was generated using a Random Forest algorithm to train and validate the credit risk model, ensuring robust and realistic predictions for a wide range of user profiles.

---

## 2. Directory Structure & File Roles (as of 2025-08-14)
- The `Assets` folder contains reports, progress documentation, and supporting files.
- The `client` directory houses the React frontend, with subfolders for UI components, custom hooks, utility libraries, page-level components, and TypeScript type definitions.
- The `server` directory contains the Express backend, including the server entry point, API endpoint definitions, storage logic, and Vite server integration.
- The `ml` directory is dedicated to the machine learning model and related scripts, including the trained .pkl model, model checker, training script, fixer utility, Python scoring service, and dependency files.
- The `feature-test` directory holds standalone test modules for planned features such as document processing (OCR/KYC) and behavioral analytics.
- Shared schemas and types for validation and type safety are located in the `shared` directory.
- Configuration files for UI components, Drizzle ORM, Node.js dependencies, PostCSS, Tailwind CSS, TypeScript, and Vite are present at the root level, along with the main project documentation and progress report.

---

## 3. MVP Scope (Version 1)
- The minimum viable product (MVP) for AltScore includes the ability to collect user details and behavioral data.
- The MVP also administers a 30-question psychometric test.
- The system calculates a combined credit score with a detailed breakdown.
- Users can upload supporting documents for verification.

---

## 4. Current Tech Setup
- The frontend is built using React, TypeScript, Vite, TanStack Query, shadcn/ui, and Lucide icons, providing a modern and responsive user interface.
- The backend is implemented with Express and TypeScript, with key files including index.ts, routes.ts, storage.ts, and vite.ts.
- Shared code such as the Drizzle ORM schema and Zod validation logic is located in shared/schema.ts.
- The application currently uses in-memory storage, but is architected to support Postgres (Neon) with Drizzle ORM for future scalability.
- Build tools include Vite, esbuild, and Tailwind CSS.
- The AI service is implemented by having the Node backend call a Python script that loads the .pkl model and returns predictions.

---

## 5. Progress by Feature
- The registration process is implemented as a multi-step form with validation, capturing identity, work, and income details, and is accessible via the API endpoints POST /api/users and GET /api/users/:id.
- The psychometric test consists of 30 questions with progress tracking and consistency drift detection logic, with results saved via POST /api/assessments and retrievable by user ID.
- Document upload functionality allows users to submit supporting documents such as KYC and income proof, using the POST /api/documents/upload endpoint.
- The scoring engine combines traditional profile and behavior data, psychometric questionnaire traits, and AI predictions from the ML model, fusing them into a weighted final score between 0 and 10.
- The results page displays the final score and its breakdown, with calculations triggered by POST /api/assessments/:id/calculate.

---

## 6. API Endpoints
- Users can be created and retrieved using POST /api/users and GET /api/users/:id.
- Assessments are managed with POST /api/assessments and GET /api/assessments/user/:userId.
- Score calculations are performed via POST /api/assessments/:id/calculate.
- The AI model is accessed through POST /api/ml-predict.
- Document uploads are handled by POST /api/documents/upload.

---

## 7. Data Model & Validation
- User data, including personal details, is stored in the users table.
- Assessment data—comprising answers, documents, and scores—is stored in the assessments table.
- All API data is validated using Zod schemas to ensure type safety and data integrity.
- Although the current implementation uses in-memory storage, the system is designed to migrate to Postgres for persistent storage.

---

## 8. User Experience & Design
- The user interface is mobile-friendly and responsive.
- The UI features progress indicators, robust form validation, and clear visualizations of credit scores and their components.

---

## 9. Testing
- Testing includes logging API calls and timings.
- Manual end-to-end tests cover the registration, scoring, and results workflow.
- The addition of automated tests is planned for future releases to further ensure reliability.

---

## 10. Deployment Plan
- For development, the application can be started with `npm run dev`.
- Production builds are created using `npm run build`.
- The production server is launched with `npm start` on port 5000.
- The next steps for deployment include connecting to a Postgres database, setting environment variables, and deploying to a production environment.

---

## Known Limitations
- The application does not yet use a production-grade database; all data is currently stored in memory.
- The AI model has been trained and validated only on synthetic data so far, not on real-world user data.
- Document security is limited in the current build, with enhancements planned for future releases.

---

## Future Impact & Scalability
- The psychometric test can be expanded to support multiple languages, increasing accessibility and inclusivity.
- The platform can be integrated with lending partners’ APIs to enable real-world credit decisions and loan disbursement.
- A mobile app version can be launched to reach a broader user base and provide on-the-go access to credit scoring and financial tools.

---

## Roadmap
- Migrate from in-memory storage to a persistent Postgres database using Drizzle ORM for scalability and reliability.
- Integrate document processing (OCR/KYC) for automated verification of user-submitted documents.
- Add behavioral analytics to track and analyze user interaction patterns for improved risk assessment.
- Expand the psychometric question bank to provide deeper insights into user financial behavior.
- Implement advanced fraud detection algorithms and real-time risk monitoring.
- Develop a mobile application version to increase accessibility.
- Enhance admin analytics with more granular reporting and export capabilities.
- Integrate additional alternative data sources, such as social media and digital footprint analysis.
- Improve document privacy and secure storage mechanisms.
- Automate retraining and versioning of the AI model as new data becomes available.

---

*For visuals, see: System Overview, Architecture, Scoring Flow, ER Diagram, Test Plan, Deployment Checklist (to be added).*
