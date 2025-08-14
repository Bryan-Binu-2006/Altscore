# AltScore Feature Testing Environment

This directory contains standalone test implementations for new features that can be tested independently from the main application.

## Available Test Features

1. **Document Processing** - OCR-based verification of Aadhaar, PAN, and utility bills
2. **Behavioral Analytics** - User interaction tracking and risk assessment

## How to Run the Tests

Each feature has its own separate environment and can be run independently without affecting the main application.

### Document Processing Test

```
cd feature-test/document-processing
npm install
npm start
```

Then open your browser to: http://localhost:3100

This will provide a simple web interface to test document processing capabilities. You can:
- Upload sample documents (Aadhaar Card, PAN Card, or Utility Bill)
- View extracted information
- Test the OCR capabilities

For automated testing of multiple documents:

```
cd feature-test/document-processing
npm test
```

This will scan all images in the `test-docs` folder and extract information based on detected document type.

### Behavioral Analytics Test

```
cd feature-test/behavioral-analytics
npm install
npm start
```

Then open your browser to: http://localhost:3200

This will provide a test environment to:
- Track user interactions with forms and navigation
- Analyze behavioral patterns
- Generate risk assessments based on user behavior

## Integration with Main Application

After testing and validation, these features can be integrated into the main AltScore application with minimal changes to the existing codebase. Integration points are clearly defined in the test implementations.
