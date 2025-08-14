import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

print("Creating a new credit risk model...")

# Create a simple random forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Define features that will be used in the application
features = [
    'Age', 'Monthly Income', 'Monthly Expenses', 'Gender', 
    'Employment Type', 'Industry', 'Education Level',
    'Credit Card Usage', 'Loan History', 'Defaults'
]

# Generate synthetic training data
n_samples = 1000
np.random.seed(42)

# Create numerical features
data = {
    'Age': np.random.randint(20, 70, n_samples),
    'Monthly Income': np.random.randint(10000, 200000, n_samples),
    'Monthly Expenses': np.random.randint(5000, 150000, n_samples),
}

# Create categorical features
data['Gender'] = np.random.choice([0, 1, 2], n_samples)  # Male, Female, Other
data['Employment Type'] = np.random.choice([0, 1, 2, 3, 4], n_samples)  # Salaried, Self-Employed, Freelancer, Student, Unemployed
data['Industry'] = np.random.choice([0, 1, 2, 3, 4, 5, 6, 7], n_samples)  # Various industries
data['Education Level'] = np.random.choice([0, 1, 2, 3, 4], n_samples)  # Various education levels
data['Credit Card Usage'] = np.random.choice([0, 1, 2], n_samples)  # Low, Medium, High
data['Loan History'] = np.random.choice([0, 1], n_samples)  # No, Yes
data['Defaults'] = np.random.choice([0, 1], n_samples)  # No, Yes

X = pd.DataFrame(data)

# Generate target: probability of default
# Higher income, lower expenses, better education, and no defaults lead to lower default probability
default_probability = (
    0.5 - 0.3 * (X['Monthly Income'] / 200000) 
    + 0.2 * (X['Monthly Expenses'] / X['Monthly Income'].clip(lower=1)) 
    - 0.1 * (X['Education Level'] / 4)
    + 0.3 * X['Defaults']
    + 0.1 * (X['Credit Card Usage'] / 2)
    - 0.1 * (X['Age'] / 70)
)
default_probability = default_probability.clip(0.05, 0.95)
y = (default_probability > 0.5).astype(int)  # Binary classification: 0 = low risk, 1 = high risk

# Train the model
print("Training the model...")
model.fit(X, y)

# Test the model
test_data = pd.DataFrame({
    'Age': [33],
    'Monthly Income': [45000],
    'Monthly Expenses': [22000],
    'Gender': [0],  # Male
    'Employment Type': [0],  # Salaried
    'Industry': [0],  # IT
    'Education Level': [1],  # Bachelor's
    'Credit Card Usage': [1],  # Medium
    'Loan History': [1],  # Yes
    'Defaults': [0]  # No
})
prediction = model.predict_proba(test_data)
print("Test prediction:", prediction)
print(f"Probability of default: {prediction[0][1]:.2f}")
print(f"Credit score (0-10): {(1 - prediction[0][1]) * 10:.2f}")

# Save the model
print("Saving the model...")
joblib.dump(model, 'ml/model/credit_risk_model.pkl')
print("Model saved successfully as 'ml/model/credit_risk_model.pkl'")
