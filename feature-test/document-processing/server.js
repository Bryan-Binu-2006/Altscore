const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { createWorker } = require('tesseract.js');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = 3100;

// Enable CORS
app.use(cors());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Configure storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Document processing functions
const extractAadhaarDetails = (text) => {
  console.log("Extracting Aadhaar details from:", text);
  
  // Aadhaar number pattern (with or without spaces)
  const aadhaarPattern = /\b[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\b/;
  const namePattern = /\b(?:name|नाम)\s*:?\s*([A-Za-z\s]+)\b/i;
  const dobPattern = /\b(?:DOB|Date of Birth|जन्म तिथि)\s*:?\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})\b/i;
  const genderPattern = /\b(?:MALE|FEMALE|पुरुष|महिला|Male|Female)\b/i;
  
  const aadhaarMatch = text.match(aadhaarPattern);
  const nameMatch = text.match(namePattern);
  const dobMatch = text.match(dobPattern);
  const genderMatch = text.match(genderPattern);
  
  console.log("Matches:", { aadhaarMatch, nameMatch, dobMatch, genderMatch });
  
  return {
    aadhaarNumber: aadhaarMatch ? aadhaarMatch[0].replace(/\s/g, '') : null,
    name: nameMatch ? nameMatch[1].trim() : null,
    dob: dobMatch ? dobMatch[1] : null,
    gender: genderMatch ? genderMatch[0] : null,
    verified: Boolean(aadhaarMatch),
    confidence: aadhaarMatch ? 0.8 : 0.2
  };
};

const extractPanDetails = (text) => {
  console.log("Extracting PAN details from:", text);
  
  // PAN card pattern (5 letters followed by 4 digits followed by 1 letter)
  const panPattern = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/;
  const namePattern = /\b(?:name|नाम)\s*:?\s*([A-Za-z\s]+)\b/i;
  const dobPattern = /\b(?:DOB|Date of Birth|जन्म तिथि)\s*:?\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})\b/i;
  
  const panMatch = text.match(panPattern);
  const nameMatch = text.match(namePattern);
  const dobMatch = text.match(dobPattern);
  
  console.log("Matches:", { panMatch, nameMatch, dobMatch });
  
  return {
    panNumber: panMatch ? panMatch[0] : null,
    name: nameMatch ? nameMatch[1].trim() : null,
    dob: dobMatch ? dobMatch[1] : null,
    verified: Boolean(panMatch),
    confidence: panMatch ? 0.85 : 0.2
  };
};

const extractUtilityBillDetails = (text) => {
  console.log("Extracting Utility Bill details from:", text);
  
  const amountPattern = /\b(?:Amount|Total|Due|Bill Amount|Amount Due)\s*:?\s*(?:Rs\.?|₹)?\s*([0-9,.]+)/i;
  const datePattern = /\b(?:Date|Bill Date|Due Date|Issue Date)\s*:?\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})/i;
  const consumerPattern = /\b(?:Consumer|Customer|Account)\s*(?:No|Number|ID)\s*:?\s*([A-Za-z0-9-]+)/i;
  const providerPattern = /\b(?:BSNL|Airtel|Jio|TATA|Vodafone|Idea|BESCOM|MSEB|Adani|Reliance)\b/i;
  
  const amountMatch = text.match(amountPattern);
  const dateMatch = text.match(datePattern);
  const consumerMatch = text.match(consumerPattern);
  const providerMatch = text.match(providerPattern);
  
  console.log("Matches:", { amountMatch, dateMatch, consumerMatch, providerMatch });
  
  return {
    amount: amountMatch ? amountMatch[1].replace(/[,]/g, '') : null,
    date: dateMatch ? dateMatch[1] : null,
    consumerId: consumerMatch ? consumerMatch[1] : null,
    provider: providerMatch ? providerMatch[0] : null,
    verified: Boolean(consumerMatch && (amountMatch || dateMatch)),
    confidence: (consumerMatch && amountMatch) ? 0.75 : 0.3
  };
};

// Document processing endpoint
app.post('/api/process-document', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const docType = req.body.documentType;
    if (!['aadhaar', 'pan', 'utility'].includes(docType)) {
      return res.status(400).json({ error: 'Invalid document type' });
    }
    
    console.log(`Processing ${docType} document`);
    
    // Initialize OCR worker
    const worker = await createWorker('eng');
    
    // Process image
    const { data } = await worker.recognize(req.file.buffer);
    await worker.terminate();
    
    console.log('OCR Text Result:', data.text);
    
    // Extract details based on document type
    let result;
    switch (docType) {
      case 'aadhaar':
        result = extractAadhaarDetails(data.text);
        break;
      case 'pan':
        result = extractPanDetails(data.text);
        break;
      case 'utility':
        result = extractUtilityBillDetails(data.text);
        break;
    }
    
    // Return results
    res.json({
      success: true,
      documentType: docType,
      extractedText: data.text, // for debugging
      result
    });
  } catch (error) {
    console.error('Document processing error:', error);
    res.status(500).json({ 
      error: 'Document processing failed', 
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Document processing test server running on port ${PORT}`);
});
