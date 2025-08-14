# Behavioral Analytics Feature Test

This is a standalone test implementation for behavioral analytics capabilities that can be integrated into the AltScore Credit Risk Management System.

## Features

- User interaction tracking
- Form completion time analysis
- Navigation pattern detection
- Risk scoring based on behavioral patterns
- Lightweight client-side tracking with minimal performance impact

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   node server.js
   ```

3. Open a browser and navigate to http://localhost:3200

4. To analyze collected data:
   ```
   node analysis.js
   ```

## Usage

- Interact with the demo form to generate behavioral data
- View real-time tracking in the browser console
- Check the data directory for stored behavioral logs
- Run the analysis script to see behavioral risk assessment

## Dependencies

- express: Web server
- fs: File system for data storage
- cors: Cross-origin resource sharing

## Integration with AltScore Application

Follow these steps to integrate behavioral analytics into the main AltScore application:

### Step 1: Add Client-Side Tracking

1. Create a custom React hook for behavioral tracking:

```typescript
// Create file: client/src/hooks/use-behavior-tracking.ts
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface TrackingEvent {
  type: string;
  timestamp: number;
  target?: string;
  value?: string;
  path?: string;
}

export function useBehaviorTracking(userId: string, formId: string) {
  const events = useRef<TrackingEvent[]>([]);
  const startTime = useRef<number>(Date.now());
  
  // Track form interactions
  const trackEvent = (event: TrackingEvent) => {
    events.current.push({
      ...event,
      timestamp: Date.now()
    });
  };
  
  // Debounced function to send events to server
  const sendEvents = useDebouncedCallback(() => {
    if (events.current.length === 0) return;
    
    const completionTime = Date.now() - startTime.current;
    const navigationPath = events.current
      .filter(e => e.type === 'navigation')
      .map(e => e.path)
      .join(' > ');
      
    fetch('/api/analytics/behavior', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        formId,
        events: events.current,
        metrics: {
          completionTimeMs: completionTime,
          navigationPath,
          eventCount: events.current.length,
          inputChangeCount: events.current.filter(e => e.type === 'input').length
        }
      })
    }).catch(err => console.error('Failed to send behavioral data:', err));
    
    // Clear events after sending
    events.current = [];
  }, 2000);
  
  useEffect(() => {
    // Track focus/blur events
    const handleFocus = () => trackEvent({ type: 'focus', timestamp: Date.now() });
    const handleBlur = () => {
      trackEvent({ type: 'blur', timestamp: Date.now() });
      sendEvents();
    };
    
    // Track navigation
    const handleNavigation = () => {
      trackEvent({ 
        type: 'navigation', 
        timestamp: Date.now(),
        path: window.location.pathname
      });
      sendEvents();
    };
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('beforeunload', sendEvents);
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('beforeunload', sendEvents);
      window.removeEventListener('popstate', handleNavigation);
      sendEvents();
    };
  }, [userId, formId, sendEvents]);
  
  // Return functions to track different events
  return {
    trackInputChange: (fieldId: string, value: string) => {
      trackEvent({
        type: 'input',
        target: fieldId,
        value,
        timestamp: Date.now()
      });
    },
    trackSubmitAttempt: () => {
      trackEvent({
        type: 'submit_attempt',
        timestamp: Date.now()
      });
      sendEvents();
    }
  };
}
```

### Step 2: Add Tracking to Form Components

1. Update your form components to use the tracking hook:

```typescript
// In client/src/components/essential-info-form.tsx
import { useBehaviorTracking } from '../hooks/use-behavior-tracking';

export function EssentialInfoForm({ userId, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    income: '',
    employment: ''
    // other fields
  });
  
  // Initialize behavior tracking
  const { trackInputChange, trackSubmitAttempt } = useBehaviorTracking(
    userId, 
    'essential-info-form'
  );
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Track the input change
    trackInputChange(name, value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    trackSubmitAttempt();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {/* Other fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Step 3: Create Backend API Endpoint

Add a new route in your server to collect behavioral data:

```typescript
// In server/routes.ts
app.post('/api/analytics/behavior', async (req, res) => {
  try {
    const { userId, formId, events, metrics } = req.body;
    
    if (!userId || !formId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Store behavioral data
    await storage.saveBehavioralData(userId, {
      timestamp: new Date().toISOString(),
      formId,
      events,
      metrics
    });
    
    return res.json({ success: true });
  } catch (error) {
    console.error('Failed to save behavioral data:', error);
    return res.status(500).json({ error: 'Failed to save behavioral data' });
  }
});
```

### Step 4: Update Data Storage

Add behavioral data storage to your database or storage system:

```typescript
// In server/storage.ts
export async function saveBehavioralData(userId: string, data: any) {
  // Using your existing database connection
  const db = await getDatabase();
  
  // Store behavioral data
  await db.collection('behavioralData').insertOne({
    userId,
    ...data
  });
}

export async function getBehavioralData(userId: string) {
  const db = await getDatabase();
  return db.collection('behavioralData')
    .find({ userId })
    .sort({ timestamp: -1 })
    .toArray();
}
```

### Step 5: Update Scoring Engine

Modify your scoring engine to incorporate behavioral data:

```typescript
// In your scoring-engine.ts
import { getBehavioralData } from './storage';

// Calculate behavioral risk score
function calculateBehavioralRisk(behavioralData) {
  if (!behavioralData || behavioralData.length === 0) {
    return { score: 0, confidence: 0 };
  }
  
  let riskScore = 0;
  let anomalyCount = 0;
  
  // Check for suspicious patterns
  behavioralData.forEach(record => {
    // Extremely fast form completion (less than 10 seconds)
    if (record.metrics.completionTimeMs < 10000) {
      riskScore += 2;
      anomalyCount++;
    }
    
    // Excessive input changes (suggesting automated filling)
    if (record.metrics.inputChangeCount > 50) {
      riskScore += 2;
      anomalyCount++;
    }
    
    // Unusual navigation patterns (entering directly to form pages)
    if (!record.metrics.navigationPath.includes('home')) {
      riskScore += 1;
      anomalyCount++;
    }
  });
  
  // Calculate confidence based on amount of data
  const confidence = Math.min(0.7, behavioralData.length * 0.1);
  
  return { 
    score: Math.min(10, riskScore), 
    confidence,
    anomalyCount
  };
}

// Update your scoring function
export async function calculateUserScore(userId) {
  // Get user data
  const userData = await getUserData(userId);
  
  // Get behavioral data
  const behavioralData = await getBehavioralData(userId);
  
  // Calculate traditional score
  const traditionalScore = calculateTraditionalScore(userData);
  
  // Calculate alternative score
  const alternativeScore = calculateAlternativeScore(userData);
  
  // Calculate behavioral risk
  const behavioralRisk = calculateBehavioralRisk(behavioralData);
  
  // Apply behavioral risk adjustment to final score
  let finalScore = (traditionalScore.score * 0.6) + 
                   (alternativeScore.score * 0.4);
  
  // Reduce score based on behavioral risk
  if (behavioralRisk.score > 5 && behavioralRisk.confidence > 0.3) {
    finalScore = finalScore * (1 - (behavioralRisk.score / 100));
  }
  
  return {
    score: finalScore,
    traditional: traditionalScore,
    alternative: alternativeScore,
    behavioral: behavioralRisk,
    confidence: (traditionalScore.confidence * 0.6) + 
                (alternativeScore.confidence * 0.3) + 
                (behavioralRisk.confidence * 0.1)
  };
}
```

### Step 6: Privacy and Performance Considerations

1. **Privacy:**
   - Implement clear user consent for behavioral tracking
   - Only store aggregated metrics, not raw events after analysis
   - Implement data retention policies

2. **Performance:**
   - Use debounced event handling to reduce API calls
   - Implement client-side batching of events
   - Consider using a dedicated analytics service for high-volume applications

### Step 7: Testing

1. Test with different user behaviors:
   - Normal completion patterns
   - Rapid form filling (potential automation)
   - Unusual navigation paths
   - Repeated form submission attempts

2. Calibrate the behavioral risk thresholds based on real user data
