# AltScore Credit Risk Management System

[![Built with React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Built with TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Built with Express](https://img.shields.io/badge/Express-4.21-green)](https://expressjs.com/)

## Overview

AltScore is a comprehensive credit risk management web application that addresses the problem of traditional credit bureaus excluding millions of Indians (gig workers, students, first-time borrowers) who lack formal credit history by implementing a multi-modal scoring approach using alternative data sources.

**Latest Update (January 2025)**: Successfully migrated from Replit Agent to standard Replit environment and implemented the complete AltScore 3-layer model with exact specifications:

- **Traditional Model**: 8 categories with precise point values (Identity/KYC, Financial Behavior, Credit/Loan Behavior, Education/Employment, Behavioral/Search History, App/Lifestyle Usage, Geolocation/Access, Asset Ownership)
- **Psychometric Model**: 6-trait mindset analysis (Financial Responsibility, Delayed Gratification, Impulsivity, Consistency, Risk Aversion, Emotional Stability) with CDD penalty detection
- **AI Model**: XGBoost-style pattern recognition with Probability of Default (PoD) calculation and inverse exponential curve conversion
- **Score Fusion Engine**: Confidence-weighted scoring with trust bonuses (max +0.5), drift penalties (max -1.5), and risk penalties (max -1.0)
- **Risk Categories**: Final scores mapped to Excellent (8.5-10), Safe (6.5-8.4), Monitor (4.5-6.4), High Risk (0-4.4)

## Project Structure

```
altscore/
├── client/           # React frontend
│   ├── src/          # Source files
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   └── types/       # TypeScript type definitions
├── server/           # Express backend
│   ├── routes.ts     # API routes
│   ├── storage.ts    # Data storage layer
│   └── index.ts      # Server entry point
├── shared/           # Shared code between client and server
│   └── schema.ts     # Data validation schemas
├── ml/               # Machine learning model
│   ├── model/        # Trained model files
│   └── ml_model_service.py  # Python service for AI scoring
└── feature-test/     # Standalone test implementations
    ├── document-processing/  # Document verification testing
    └── behavioral-analytics/ # User behavior analytics testing
```

## Technology Stack

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing
- **Tailwind CSS** with shadcn/ui components for styling
- **React Hook Form** with Zod validation for form handling
- **TanStack Query** for server state management

### Backend Architecture
- **Express.js** server with TypeScript
- **In-memory storage** using Maps for development (designed to be easily replaced with database)
- **Zod schemas** for data validation shared between client and server
- **RESTful API endpoints** for user and assessment management

### ML Model Architecture
- **Python** with scikit-learn for predictive modeling
- **XGBoost**-style credit risk model
- **RESTful** model serving interface

## Key Components

### 1. AltScore 3-Layer Model Implementation
- **Traditional Model**: 8-category behavior-based scoring (Identity/KYC, Financial Behavior, Credit/Loan Behavior, Education/Employment, Behavioral/Search History, App/Lifestyle Usage, Geolocation/Access, Asset Ownership)
- **Psychometric Model**: 6-trait mindset-based scoring (Financial Responsibility, Delayed Gratification, Impulsivity, Consistency, Risk Aversion, Emotional Stability) with CDD penalties
- **AI Model**: Pattern-based scoring with Probability of Default (PoD) calculation and inverse exponential curve conversion
- **Score Fusion Engine**: Confidence-weighted scoring with trust bonuses, risk penalties, and drift penalties
- **Demo Mode**: Three comprehensive profiles with step-by-step calculation visualization
- **Manual Entry Mode**: Complete form for testing custom scenarios with all AltScore parameters

### 2. Multi-Step Assessment Flow (Full Version)
- **Landing Page**: Problem explanation and solution overview
- **Registration**: Comprehensive user data collection
- **Document Upload**: Simulated file upload for identity verification
- **Psychometric Assessment**: Behavioral scoring through questionnaires
- **Results Dashboard**: Detailed score breakdown and explanations

### 2. Scoring Engine
Three independent scoring models that work together:
- **Traditional Score**: Based on financial data, KYC, assets, and employment
- **Psychometric Score**: Evaluates financial responsibility, risk aversion, and behavioral traits
- **AI Score**: Combines traditional and psychometric data with feature importance analysis
- **Final Score**: Weighted fusion of all three models with confidence metrics

### 3. Admin Dashboard
Comprehensive analytics and user management:
- User registration and assessment completion statistics
- Risk category distribution analysis
- Individual user score viewing and filtering
- Export capabilities for data analysis

### 4. UI Component System
Built on shadcn/ui with custom extensions:
- Responsive design supporting mobile-first approach (320px+)
- Score visualization components with animated progress circles
- Form components with proper validation and error handling
- Modern gradient themes and professional financial services styling

## Data Flow

1. **User Registration**: Collects personal, professional, and demographic information
2. **Document Simulation**: Simulates document upload and verification process
3. **Psychometric Assessment**: Presents behavioral questions and calculates trait scores
4. **Score Calculation**: Processes all collected data through three scoring models
5. **Results Generation**: Combines scores with confidence metrics and risk categorization
6. **Admin Analytics**: Aggregates data for administrative insights

## External Dependencies

### UI and Styling
- **Radix UI** primitives for accessible component foundations
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent iconography
- **Class Variance Authority** for component variant management

### Form and Data Management
- **React Hook Form** with **Hookform Resolvers** for form state
- **Zod** for schema validation and type safety
- **TanStack React Query** for server state synchronization

### Development Tools
- **Vite** with React plugin for fast development
- **ESBuild** for production bundling
- **TypeScript** for type safety across the entire application

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/altscore.git
cd altscore
```

2. Install dependencies:
```bash
npm install
```

3. Set up Python environment (for ML model):
```bash
cd ml
pip install -r requirements.txt
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Development Environment
- **Hot module replacement** through Vite for rapid development
- **TypeScript compilation** without emit for type checking

### Production Build
- **Client**: Vite builds optimized React bundle to `dist/public`
- **Server**: ESBuild creates Node.js bundle with external package resolution

### Future Plans
- Database: PostgreSQL with Neon Database integration
- Cloud Deployment: AWS or Vercel
- Mobile App: React Native version

## License

This project is licensed under the MIT License - see the LICENSE file for details.