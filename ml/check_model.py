import joblib
import sys
try:
    model = joblib.load('ml/model/credit_risk_model.pkl')
    print('Model type:', type(model))
    print('Model attributes:', dir(model))
    if hasattr(model, 'predict'):
        print('Model has predict method')
    else:
        print('Model does NOT have predict method')
except Exception as e:
    print(f'Error loading model: {str(e)}')
