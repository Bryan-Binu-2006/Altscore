# Document Processing Feature Test

This is a standalone test implementation for document processing capabilities that can be integrated into the AltScore Credit Risk Management System.

## Features

- OCR-based document verification for Aadhaar cards, PAN cards, and utility bills
- Intelligent data extraction from processed documents
- Confidence scoring for verification results
- Lightweight implementation with minimal dependencies

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Add test document images to the `test-docs` folder

3. Run the test script to process documents offline:
   ```
   node test.js
   ```

4. Start the server for interactive testing:
   ```
   node server.js
   ```

5. Open a browser and navigate to http://localhost:3100

## Usage

- Upload a document image through the web interface
- Select the document type (Aadhaar, PAN, or Utility Bill)
- Submit and view the extracted information and verification status
- Check the console for detailed processing information

## Dependencies

- express: Web server
- multer: File upload handling
- tesseract.js: OCR processing
- cors: Cross-origin resource sharing

## Integration with AltScore Application

Follow these steps to integrate this feature into the main AltScore application:

### Step 1: Add Dependencies

```bash
cd /path/to/altscore
npm install tesseract.js multer
```

### Step 2: Copy Core Files

1. Copy the document processing service files:
   ```bash
   cp feature-test/document-processing/extractors.js server/services/document-service.js
   ```

2. Modify the service file to use TypeScript and match your project structure

### Step 3: Backend Integration

1. Add document processing routes to `server/routes.ts`:

```typescript
// Import the document processing service
import { processDocument } from './services/document-service';
import multer from 'multer';

// Configure storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Add document processing endpoint
app.post('/api/documents/process', upload.single('document'), async (req, res) => {
  try {
    const documentType = req.body.documentType;
    const file = req.file;
    
    if (!file || !documentType) {
      return res.status(400).json({ error: 'Missing document or document type' });
    }
    
    const result = await processDocument(file.buffer, documentType);
    return res.json(result);
  } catch (error) {
    console.error('Document processing error:', error);
    res.status(500).json({ error: 'Document processing failed' });
  }
});
```

### Step 4: Frontend Integration

1. Create a new DocumentUploader component:

```typescript
// Create file: client/src/components/document-uploader.tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';

export const DocumentUploader = ({ onDocumentProcessed }) => {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('aadhaar');
  const [isUploading, setIsUploading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', docType);
    
    try {
      const response = await fetch('/api/documents/process', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      onDocumentProcessed(result);
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Select 
          value={docType} 
          onValueChange={setDocType}
          options={[
            { value: 'aadhaar', label: 'Aadhaar Card' },
            { value: 'pan', label: 'PAN Card' },
            { value: 'utility', label: 'Utility Bill' }
          ]}
        />
        
        <Input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        
        <Button type="submit" disabled={isUploading}>
          {isUploading ? 'Processing...' : 'Upload Document'}
        </Button>
      </div>
    </form>
  );
};
```

2. Add the component to your relevant forms:

```typescript
// In client/src/pages/kyc-page.tsx or another relevant file
import { DocumentUploader } from '../components/document-uploader';

export function KYCPage() {
  const [documentData, setDocumentData] = useState(null);
  
  return (
    <div>
      <h2>Upload Your Documents</h2>
      <DocumentUploader onDocumentProcessed={setDocumentData} />
      
      {documentData && (
        <div className="mt-4">
          <h3>Extracted Information</h3>
          <pre>{JSON.stringify(documentData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

### Step 5: Scoring Engine Integration

Update your scoring engine to incorporate document verification:

```typescript
// In your scoring engine
function calculateTraditionalScore(user) {
  let score = 0;
  let confidence = 0;
  
  // Other scoring factors...
  
  // Document verification boost
  if (user.documents) {
    // Verified Aadhaar adds points
    if (user.documents.aadhaar?.verified) {
      score += 15;
      confidence += 0.1;
    }
    
    // Verified PAN adds points
    if (user.documents.pan?.verified) {
      score += 10;
      confidence += 0.1;
    }
    
    // Verified utility bill adds points
    if (user.documents.utility?.verified) {
      score += 5;
      confidence += 0.05;
    }
  }
  
  return { score, confidence };
}
```

### Step 6: Security Considerations

- Store document verification results, not the actual documents
- Implement proper access controls for document endpoints
- Consider adding rate limiting for document processing
- Implement audit logging for document verification attempts

### Step 7: Testing

- Test with different document qualities and formats
- Verify scoring impact from document verification
- Test edge cases (blurry images, incorrect document types)
