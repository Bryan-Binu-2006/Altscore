const { createWorker } = require('tesseract.js');
const fs = require('fs');
const path = require('path');

// Test documents directory - add your test images here
const TEST_DOCS_DIR = path.join(__dirname, 'test-docs');

// Create test-docs directory if it doesn't exist
if (!fs.existsSync(TEST_DOCS_DIR)) {
  fs.mkdirSync(TEST_DOCS_DIR);
  console.log('Created test-docs directory. Please add test images to this directory.');
  console.log('Example: Add sample-aadhaar.jpg, sample-pan.jpg, sample-utility.jpg');
  process.exit(0);
}

// Document processing functions from server.js
const extractAadhaarDetails = (text) => {
  const aadhaarPattern = /\b[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\b/;
  const namePattern = /\b(?:name|नाम)\s*:?\s*([A-Za-z\s]+)\b/i;
  const dobPattern = /\b(?:DOB|Date of Birth|जन्म तिथि)\s*:?\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})\b/i;
  const genderPattern = /\b(?:MALE|FEMALE|पुरुष|महिला|Male|Female)\b/i;
  
  const aadhaarMatch = text.match(aadhaarPattern);
  const nameMatch = text.match(namePattern);
  const dobMatch = text.match(dobPattern);
  const genderMatch = text.match(genderPattern);
  
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
  const panPattern = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/;
  const namePattern = /\b(?:name|नाम)\s*:?\s*([A-Za-z\s]+)\b/i;
  const dobPattern = /\b(?:DOB|Date of Birth|जन्म तिथि)\s*:?\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})\b/i;
  
  const panMatch = text.match(panPattern);
  const nameMatch = text.match(namePattern);
  const dobMatch = text.match(dobPattern);
  
  return {
    panNumber: panMatch ? panMatch[0] : null,
    name: nameMatch ? nameMatch[1].trim() : null,
    dob: dobMatch ? dobMatch[1] : null,
    verified: Boolean(panMatch),
    confidence: panMatch ? 0.85 : 0.2
  };
};

const extractUtilityBillDetails = (text) => {
  const amountPattern = /\b(?:Amount|Total|Due|Bill Amount|Amount Due)\s*:?\s*(?:Rs\.?|₹)?\s*([0-9,.]+)/i;
  const datePattern = /\b(?:Date|Bill Date|Due Date|Issue Date)\s*:?\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})/i;
  const consumerPattern = /\b(?:Consumer|Customer|Account)\s*(?:No|Number|ID)\s*:?\s*([A-Za-z0-9-]+)/i;
  const providerPattern = /\b(?:BSNL|Airtel|Jio|TATA|Vodafone|Idea|BESCOM|MSEB|Adani|Reliance)\b/i;
  
  const amountMatch = text.match(amountPattern);
  const dateMatch = text.match(datePattern);
  const consumerMatch = text.match(consumerPattern);
  const providerMatch = text.match(providerPattern);
  
  return {
    amount: amountMatch ? amountMatch[1].replace(/[,]/g, '') : null,
    date: dateMatch ? dateMatch[1] : null,
    consumerId: consumerMatch ? consumerMatch[1] : null,
    provider: providerMatch ? providerMatch[0] : null,
    verified: Boolean(consumerMatch && (amountMatch || dateMatch)),
    confidence: (consumerMatch && amountMatch) ? 0.75 : 0.3
  };
};

// Main test function
async function runTests() {
  console.log('Starting document processing tests...\n');
  
  // Get all files in the test-docs directory
  const files = fs.readdirSync(TEST_DOCS_DIR);
  if (files.length === 0) {
    console.log('No test documents found in test-docs directory.');
    return;
  }

  const worker = await createWorker('eng');
  
  for (const file of files) {
    const filePath = path.join(TEST_DOCS_DIR, file);
    const fileExt = path.extname(file).toLowerCase();
    
    // Only process image files
    if (!['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(fileExt)) {
      console.log(`Skipping non-image file: ${file}`);
      continue;
    }
    
    console.log(`Processing file: ${file}`);
    
    try {
      // Read the image file
      const { data } = await worker.recognize(filePath);
      const text = data.text;
      
      console.log('Extracted text:');
      console.log('======================');
      console.log(text.substring(0, 500) + (text.length > 500 ? '...' : ''));
      console.log('======================\n');
      
      // Try to identify document type based on patterns
      let docType = 'unknown';
      let result = null;
      
      // Check for Aadhaar patterns
      if (text.match(/\b[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\b/) || 
          text.toLowerCase().includes('aadhaar') ||
          text.toLowerCase().includes('uid')) {
        docType = 'aadhaar';
        result = extractAadhaarDetails(text);
      } 
      // Check for PAN patterns
      else if (text.match(/\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/) ||
               text.toLowerCase().includes('income tax') ||
               text.toLowerCase().includes('pan')) {
        docType = 'pan';
        result = extractPanDetails(text);
      } 
      // Check for utility bill patterns
      else if (text.match(/\b(?:bill|invoice|electricity|water|gas|telephone|mobile)\b/i)) {
        docType = 'utility';
        result = extractUtilityBillDetails(text);
      }
      
      console.log(`Detected document type: ${docType}`);
      console.log('Extracted information:');
      console.log(JSON.stringify(result, null, 2));
      console.log('\n' + '-'.repeat(50) + '\n');
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }
  
  await worker.terminate();
  console.log('Document processing tests completed.');
}

runTests().catch(console.error);
