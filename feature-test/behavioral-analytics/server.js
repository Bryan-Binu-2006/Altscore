const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = 3200;

// Enable CORS
app.use(cors());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Initialize storage for behavioral data
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const behavioralDataFile = path.join(dataDir, 'behavioral-data.json');
if (!fs.existsSync(behavioralDataFile)) {
  fs.writeFileSync(behavioralDataFile, JSON.stringify([], null, 2));
}

// Load existing data
let behavioralData = [];
try {
  const rawData = fs.readFileSync(behavioralDataFile);
  behavioralData = JSON.parse(rawData);
} catch (error) {
  console.error('Error loading behavioral data:', error);
}

// Behavioral data endpoint
app.post('/api/behavior', (req, res) => {
  try {
    const data = req.body;
    
    if (!data.userId || !data.eventType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Add timestamp
    const eventData = {
      ...data,
      timestamp: new Date().toISOString(),
      id: `event-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    
    // Store data
    behavioralData.push(eventData);
    
    // Save to file (in a real app, you'd want to do this less frequently)
    fs.writeFileSync(behavioralDataFile, JSON.stringify(behavioralData, null, 2));
    
    res.json({ success: true, eventId: eventData.id });
  } catch (error) {
    console.error('Error storing behavioral data:', error);
    res.status(500).json({ error: 'Failed to store behavioral data' });
  }
});

// Get behavioral data
app.get('/api/behavior', (req, res) => {
  try {
    const { userId } = req.query;
    
    let filteredData = behavioralData;
    
    if (userId) {
      filteredData = behavioralData.filter(item => item.userId === userId);
    }
    
    res.json(filteredData);
  } catch (error) {
    console.error('Error retrieving behavioral data:', error);
    res.status(500).json({ error: 'Failed to retrieve behavioral data' });
  }
});

// Generate insights
app.get('/api/behavior/insights', (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const userData = behavioralData.filter(item => item.userId === userId);
    
    if (userData.length === 0) {
      return res.status(404).json({ error: 'No data found for this user' });
    }
    
    // Analysis insights
    const insights = {
      totalEvents: userData.length,
      eventTypes: {},
      formInteractions: {
        focusCount: 0,
        blurCount: 0,
        submitCount: 0,
        averageFocusTime: 0
      },
      navigationPatterns: {},
      riskAssessment: {
        score: 0,
        flags: [],
        confidence: 0
      }
    };
    
    // Count event types
    userData.forEach(event => {
      // Count event types
      insights.eventTypes[event.eventType] = (insights.eventTypes[event.eventType] || 0) + 1;
      
      // Track form interactions
      if (event.eventType === 'form-field-focus') {
        insights.formInteractions.focusCount++;
      } else if (event.eventType === 'form-field-blur') {
        insights.formInteractions.blurCount++;
      } else if (event.eventType === 'form-submit') {
        insights.formInteractions.submitCount++;
      }
      
      // Track navigation patterns
      if (event.path) {
        insights.navigationPatterns[event.path] = (insights.navigationPatterns[event.path] || 0) + 1;
      }
      
      // Track focus times
      if (event.durationMs) {
        insights.formInteractions.averageFocusTime += event.durationMs;
      }
    });
    
    // Calculate average focus time
    if (insights.formInteractions.blurCount > 0) {
      insights.formInteractions.averageFocusTime /= insights.formInteractions.blurCount;
    }
    
    // Risk assessment
    let riskScore = 0;
    
    // Too fast form completion suggests automation/fraud
    if (insights.formInteractions.averageFocusTime < 500 && insights.formInteractions.blurCount > 5) {
      riskScore += 0.2;
      insights.riskAssessment.flags.push('Unusually fast form completion');
    }
    
    // Many form submissions without much interaction
    if (insights.formInteractions.submitCount > 3 && insights.formInteractions.focusCount < 10) {
      riskScore += 0.1;
      insights.riskAssessment.flags.push('Multiple submissions with minimal interaction');
    }
    
    // Erratic navigation patterns
    const navigationCount = Object.keys(insights.navigationPatterns).length;
    if (navigationCount > 10 && userData.length / navigationCount < 2) {
      riskScore += 0.1;
      insights.riskAssessment.flags.push('Erratic navigation pattern');
    }
    
    // Set risk score and confidence
    insights.riskAssessment.score = Math.min(1, riskScore);
    insights.riskAssessment.confidence = Math.min(1, userData.length / 50); // More data = higher confidence
    
    res.json(insights);
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// Clear data (for testing)
app.delete('/api/behavior', (req, res) => {
  try {
    behavioralData = [];
    fs.writeFileSync(behavioralDataFile, JSON.stringify([], null, 2));
    
    res.json({ success: true, message: 'All behavioral data cleared' });
  } catch (error) {
    console.error('Error clearing behavioral data:', error);
    res.status(500).json({ error: 'Failed to clear behavioral data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Behavioral analytics test server running on port ${PORT}`);
});
