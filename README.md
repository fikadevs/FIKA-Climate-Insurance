FIKA – Climate Risk Insurance for Delivery Workers
Overview
FIKA is a parametric micro-insurance platform designed for delivery workers that automatically compensates them when extreme environmental conditions affect their ability to work.
Delivery workers often lose income due to:
•	Heavy rainfall
•	Extreme heat
•	Dangerous air pollution
•	Flooding
•	Weather disruptions
Traditional insurance requires manual claims, verification, and long waiting periods.
FIKA solves this by:
Automatic trigger-based payouts
AI-driven income estimation
No paperwork or claims

Problem Statement
Gig economy delivery workers face income instability during environmental disruptions.
Key Issues:
1.	No protection from weather disruptions
2.	Loss of earnings during floods, heatwaves, or pollution
3.	Complex insurance claim processes
4.	Lack of affordable insurance options
 Result: Workers face financial uncertainty every week

Our Solution
FIKA introduces a parametric insurance model that automatically compensates workers when predefined environmental triggers occur.
Key Principles:
•	No claim filing
•	Automatic payout
•	AI-driven fair compensation
•	Affordable weekly premiums
The system monitors:
•	Rainfall
•	Temperature
•	AQI
When thresholds are exceeded → Automatic payout is triggered.

Core Features
1. Weather-Triggered Automatic Payouts
If environmental thresholds cross:
•	Rainfall > threshold
•	Temperature > safe limit
•	AQI > dangerous level
System triggers payout automatically
Benefits:
•	No paperwork
•	No verification delay
•	Payout within 24–48 hours


2. AI-Based Income Loss Estimator
AI calculates worker’s expected income using:
•	Last 8–12 weeks earnings
•	Working hours
•	Demand patterns
Example:
•	Normal income: ₹6000
•	Disruption income: ₹3000
 System compensates the gap
3. Hyperlocal Risk Zoning
Cities divided into small zones
Example:
Zone	Rainfall
A	95mm
B	25mm
Only affected zones receive payouts
Benefits:
•	Accurate payouts
•	Reduced fraud
•	Lower cost
4. AI Fraud Detection System
Detects:
•	Fake GPS
•	Multiple accounts
•	Abnormal patterns
•	Intentional inactivity
Persona-Based Scenario
Rahul – Delivery Rider
•	Age: 27
•	Weekly Income: ₹6000
Situation:
Heavy rainfall reduces work → earns ₹3000
System Response:
1.	Weather trigger activated
2.	Zone verified
3.	AI calculates average income
4.	Compensation calculated
5.	Auto payout sent
 Rahul receives compensation without any claim

 Application Workflow
Step 1 – Registration
•	Phone number
•	Platform details
•	UPI / Bank
Step 2 – Subscription
•	₹30–₹50 per week
•	Auto UPI payment
Step 3 – Monitoring
System tracks:
•	Weather
•	AQI
•	Disaster alerts
Step 4 – Trigger Detection
Example:
Rainfall > 80mm → Trigger activated
Step 5 – Worker Verification
•	GPS
•	Zone
•	Activity
Step 6 – AI Calculation
•	Income estimation
•	Disruption analysis
Step 7 – Payout
Transferred within 24–48 hours

Weekly Premium Model
Example:
•	100,000 workers
•	₹40/week
₹40,00,000 weekly pool
Distribution:
Category	%
Payouts	65%
Insurance	15%
Ops Cost	10%
Platform	10%


AI/ML Integration
1. Income Prediction
2. Fraud Detection
3. Risk Forecasting

AI Risk Prediction Model (Advanced Feature)
Unlike traditional systems, FIKA also predicts risks.
Example:
AI predicts:
•	80% chance of heavy rain tomorrow
System:
•	Alerts workers
•	Prepares payout
•	Updates risk score

Technology Stack
Frontend
•	React Native / Flutter
•	Next.js
Backend
•	Node.js / FastAPI
Database
•	PostgreSQL
AI/ML
•	Python
•	Scikit-learn
•	TensorFlow
APIs
•	Weather API
•	AQI API
•	Maps API
Payments
•	Razorpay / UPI
Cloud
•	AWS / GCP

System Architecture
Weather API → Data Layer → Trigger Engine → Risk Zoning → AI Models → Payout Engine → Payment Gateway → Worker App
Development Plan
Week 1
•	Research
•	Architecture
•	UI prototype
Week 2
•	Trigger system
•	Subscription
•	AI prototype

Adversarial Defense & Anti-Spoofing Strategy (Market Crash)
Problem
Fraudsters use:
•	Fake GPS
•	Multiple accounts
•	Coordinated attacks
Result: Massive fake payouts

Our Defense System
1. Multi-Signal Location Verification
We validate using:
•	GPS
•	IP location
•	Cell tower
•	Device sensors
 Mismatch = suspicious
2. Behavioral Analysis
Track:
•	Work hours
•	Movement
•	Patterns
 Sudden abnormal change = flagged


3. Activity Cross-Validation
Compare:
•	Claimed work
•	Actual activity
4. Device Fingerprinting
Detect:
•	Multiple accounts per device
•	Device switching
5. Fraud Ring Detection
Identify:
•	Clustered fake activity
•	Same timing patterns
6. AI Fraud Risk Score
Risk Score:
0.0 → Safe
1.0 → Fraud
7. Fairness System
Risk	Action
Low	Full payout
Medium	Partial payout
High	Review

8. Secure Payout Control
Before payout:
 Location verified
Behavior validated
Risk score checked
 Why This is Powerful
Prevents fake GPS fraud
Detects coordinated attacks
Protects insurance pool
Ensures fairness
 Future Scope
•	Health insurance
•	Accident coverage
•	Platform integrations
•	Global scaling

Repository Structure
FIKA

README.md
docs/
backend/
frontend/
ml_models/
prototype/

 Demo Video
 (FIKA: Automated Climate Risk Insurance for Delivery Workers | Guidewire Hackathon 2026)
Conclusion
FIKA is not just an insurance platform.
It is a secure, AI-powered financial protection system built for the future of the gig economy.

