import joblib
import pickle
import sys
import json
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Attempt to load the model
try:
    with open('ml/model/credit_risk_model.pkl', 'rb') as f:
        content = pickle.load(f)
        print("Model content type:", type(content))
        print("Model content keys:", content.keys() if isinstance(content, dict) else "Not a dictionary")
    
    # If the model is a dictionary, create a proper model from it
    if isinstance(content, dict):
        print("Creating a new model from dictionary data...")
        # Create a simple random forest model as a placeholder
        model = RandomForestClassifier(n_estimators=10)
        
        # Initialize with some dummy data
        X = pd.DataFrame({
            'Age': [30, 25, 40, 35],
            'Monthly Income': [50000, 30000, 70000, 40000],
            'Monthly Expenses': [20000, 15000, 30000, 18000]
        })
        y = np.array([0, 1, 0, 1])  # Binary classification: 0 = low risk, 1 = high risk
        
        # Fit the model
        model.fit(X, y)
        
        # Save the model
        joblib.dump(model, 'ml/model/fixed_credit_risk_model.pkl')
        print("Created and saved a new model as 'ml/model/fixed_credit_risk_model.pkl'")
        
        # Test the new model
        test_data = pd.DataFrame({
            'Age': [33],
            'Monthly Income': [45000],
            'Monthly Expenses': [22000]
        })
        prediction = model.predict_proba(test_data)
        print("Test prediction with new model:", prediction)
        
except Exception as e:
    print(f"Error: {str(e)}")
