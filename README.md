# 🌍 FIKA – Climate Risk Insurance for Delivery Workers

---

## 📌 Overview
FIKA is a **parametric micro-insurance platform** designed for delivery workers that automatically compensates them when extreme environmental conditions affect their ability to work.

### 🚀 What's New in Phase 2
For the second phase of development, we implemented our core AI logic and automated backend systems to create a truly zero-touch experience:
* **🧠 AI-Driven Dynamic Pricing:** Weekly premiums adjust automatically based on hyper-local weather risk forecasts and a "No Claim Bonus" behavior model.
* **⚙️ Zero-Touch Claims:** Integrated background Cron Jobs that monitor public APIs and automatically disburse funds to linked UPI IDs—no claim buttons, no paperwork.
* **📊 Interactive Alerts Dashboard:** A live worker dashboard tracking their safe streak, current environmental risk, and real-time premium calculations.

---

## ❗ Problem Statement
Gig economy delivery workers face **income instability** during environmental disruptions. Traditional insurance involves manual claims, lengthy verification, and delayed payouts, leaving workers vulnerable.

👉 **Result:** Workers face financial uncertainty every week.

---

## 💡 Our Solution
FIKA introduces a **parametric insurance model** that automatically compensates workers when predefined environmental triggers occur.

### 🔑 Key Principles
- **No claim filing:** Completely automated, seamless UX.
- **Dynamic Pricing:** Fair, AI-adjusted weekly premiums.
- **Instant Liquidity:** Direct-to-UPI payouts via automated triggers.

---

## 🚀 Core Features & Technical Implementation

### 1. 🌦️ Automated API Triggers (Zero-Touch Claims)
We utilize the **OpenWeatherMap API** to monitor hyper-local zones. Background Cron Jobs check conditions hourly. If a threshold is crossed, a payout is automatically pushed to the worker's wallet/UPI.
* **Trigger 1 (Heavy Rainfall):** Precipitation > 15mm/hr in the worker's registered zone.
* **Trigger 2 (Extreme Heat):** Temperatures > 40°C.
* **Trigger 3 (Severe Air Quality):** AQI > 300 (Smog/Pollution alerts).

### 2. 📉 Dynamic Pricing Model (Machine Learning/Heuristics)
Premiums are calculated dynamically every week to ensure fairness and incentivize safe working habits:
* **Hyper-Local Risk Assessment:** If predictive weather modeling forecasts heavy rain or storms for a specific zone, the base premium temporarily increases to cover the higher risk of payout.
* **"No Claim Bonus" Streak:** The algorithm rewards workers who operate safely. For every consecutive week without a payout trigger, the premium drops by ₹2. 
* **Free Coverage Reward:** Hitting a 10-week safe streak automatically drops the premium to ₹0 for the following week, maximizing user retention.

### 3. 🛡️ Robust Fraud Prevention Architecture
* **Location Verification:** Cross-referencing registered zones with API weather data.
* **Device Fingerprinting:** Detects multiple accounts per device or device switching.
* **Fraud Ring Detection:** Identifies clustered fake activity and matching timing patterns.

| AI Risk Score | Action        |
|--------------|-------------|
| 0.0          | Safe (Auto Payout) |
| 1.0          | Fraud (Review) |

---

## 💻 Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (DOM Manipulation, Fetch API).
* **Backend:** Node.js, Express.js.
* **Database:** PostgreSQL with Sequelize ORM.
* **Validation & Security:** Joi (Schema Validation), CORS.
* **External APIs:** OpenWeatherMap API.
* **Automation:** Node Cron (for background weather polling and payouts).

---

## 🔮 Future Scope
- Predictive Machine Learning models trained on historical payout data.
- Expansion to cover personal health and accident coverage.
- Deep platform integrations with food delivery apps (Zomato/Swiggy).
- Global scaling across emerging markets.

---

## 📂 Repository Structure
```text
FIKA/
│── README.md
│── docs/
│── Backend/
│   ├── controllers/
│   ├── models/ (Sequelize DB Models)
│   ├── routes/
│   ├── services/
│   └── server.js
│── Frontend/
│   ├── css/
│   ├── js/
│   └── alert.html, register.html, index.html