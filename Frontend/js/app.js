// ==========================================
// Frontend/js/app.js
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    // 1. DYNAMIC ID: Get the ID saved during registration, fallback to W_1001 if testing
    const currentWorkerId = localStorage.getItem('current_worker_id') || 'W_1001'; 
    const path = window.location.pathname;
    
    console.log(`FIKA Frontend loaded. Current path: ${path} | Active User: ${currentWorkerId}`);

    // 2. Global Modal Logic (Works on all pages safely)
    const profileIcon = document.querySelector('.user-profile');
    const modal = document.getElementById('profile-modal');
    const closeBtn = document.getElementById('close-modal');

    if (profileIcon && modal && closeBtn) {
        profileIcon.addEventListener('click', () => modal.classList.remove('hidden'));
        closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
    }

    // 3. PAGE: DASHBOARD (index.html) - REAL API FETCH
    if (path.includes('index.html') || path === '/' || path.endsWith('Frontend/')) {
        try {
            // GET data from the cloud database via your API
            const response = await fetch(`http://localhost:5000/api/workers/${currentWorkerId}`);
            
            if (response.ok) {
                const workerData = await response.json();
                
                // Update DOM elements
                const nameEl = document.querySelector('.profile-details h3');
                const infoValues = document.querySelectorAll('.info-value');
                const statusCard = document.querySelector('.status-card');
                const statusText = document.querySelector('.status-indicator span');
                const statusIcon = document.querySelector('.status-indicator i');
                
                if (nameEl) nameEl.innerText = workerData.name || "Unknown Worker";
                
                // Update Phone, UPI, and Vehicle based on DOM order
                if (infoValues.length >= 3) {
                    infoValues[0].innerText = workerData.phone || "+91 XXXXX XXXXX";
                    infoValues[1].innerText = workerData.upi_id || "Not Set";
                    infoValues[2].innerText = workerData.vehicle_type || "Not Set";
                }
                
                // Update Protection Status
                if (statusText && statusIcon && statusCard) {
                    if (workerData.is_active || workerData.active_subscription) {
                        statusText.innerText = "Active Protection";
                        statusCard.classList.add('active');
                    } else {
                        statusText.innerText = "Not Protected";
                        statusText.style.color = "#64748B";
                        statusIcon.className = "ph-fill ph-warning-circle";
                        statusCard.classList.remove('active');
                    }
                }
            } else {
                console.error("User ID not found in database.");
            }
        } catch (error) {
            console.error("Could not fetch user from DB, showing offline info.", error);
        }
    } 
    
    // 4. PAGE: WALLET / HISTORY (history.html)
    else if (path.includes('history.html')) {
        // Uses your api.js file for payouts
        if(typeof fikaAPI !== 'undefined') {
            const payouts = await fikaAPI.getPayoutHistory(currentWorkerId);
            const historyList = document.getElementById('history-list');
            const balanceEl = document.querySelector('.balance');
            
            if (historyList) {
                historyList.innerHTML = ''; 
                
                if (payouts && payouts.length > 0) {
                    let totalAmount = 0;

                    payouts.forEach(payout => {
                        const amount = payout.amount || 0;
                        const type = payout.trigger_type || payout.reason || 'Weather';
                        const date = payout.createdAt || payout.date || new Date();
                        
                        totalAmount += Number(amount);
                        
                        let colorClass = type.toLowerCase().includes('rain') ? 'alert-safe' : 'alert-critical';
                        let iconClass = type.toLowerCase().includes('rain') ? 'ph-cloud-rain' : 'ph-thermometer';

                        const txItem = document.createElement('div');
                        txItem.className = 'transaction-item';
                        txItem.innerHTML = `
                            <div class="tx-icon ${colorClass}"><i class="ph ${iconClass}"></i></div>
                            <div class="tx-details">
                                <span class="tx-title">${type} Alert</span>
                                <span class="tx-date">${new Date(date).toLocaleDateString()} • Credited</span>
                            </div>
                            <div class="tx-amount">+ ₹${amount}</div>
                        `;
                        historyList.appendChild(txItem);
                    });

                    if (balanceEl) balanceEl.innerText = `₹${totalAmount}`;
                } else {
                    historyList.innerHTML = '<p style="text-align:center; padding:20px; color:#64748B;">No payouts yet.</p>';
                    if (balanceEl) balanceEl.innerText = `₹0`;
                }
            }
        } else {
            console.error("api.js is not linked on this page!");
        }
    }

    // 5. TRIGGER MAP LOGIC
    if(document.getElementById('risk-map')) {
        initRealTimeDashboard();
    }

}); // <--- CRITICAL FIX: The DOMContentLoaded block closes HERE!

// ==========================================
// GLOBAL FUNCTIONS (Accessible by HTML Buttons)
// ==========================================

// --- LOGIN LOGIC ---
function showLoginOTP() {
    const phone = document.getElementById('login-phone').value;
    if(phone.length < 10) return alert("Enter 10 digit number");
    document.getElementById('login-step-phone').classList.add('hidden');
    document.getElementById('login-step-otp').classList.remove('hidden');
}

function verifyLogin() {
    window.location.href = "index.html";
}

// --- REGISTRATION LOGIC ---
function showRegOTP() {
    const phone = document.getElementById('reg-phone').value;
    if(phone.length < 10) return alert("Enter 10 digit number");
    document.getElementById('reg-step-phone').classList.add('hidden');
    document.getElementById('reg-step-otp').classList.remove('hidden');
}

function showRegProfile() {
    document.getElementById('reg-step-otp').classList.add('hidden');
    document.getElementById('reg-step-profile').classList.remove('hidden');
}

// REAL DATABASE POST REQUEST
async function submitRegistrationToDB() {
    const workerData = {
        phone: document.getElementById('reg-phone').value,
        name: document.getElementById('reg-name').value,
        upi_id: document.getElementById('reg-upi').value,
        vehicle_type: document.getElementById('reg-vehicle').value,
        is_active: true,
        weeklyIncome: 3000, // (Or however you fixed the last one)
        zone: document.getElementById('reg-zone').value // <--- ADD THIS!
    };

    try {
        const response = await fetch('http://localhost:5000/api/workers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workerData)
        });

        if (response.ok) {
            const result = await response.json();
            // Store ONLY the ID so we can fetch profile later
            localStorage.setItem('current_worker_id', result.id);
            alert("Registration Saved to Database successfully!");
            window.location.href = "index.html";
        } else {
            alert("Server received data, but returned an error.");
        }
    } catch (error) {
        console.error("Registration failed", error);
        alert("Offline Mode: Registration simulated (Backend might be offline).");
        window.location.href = "index.html";
    }
}

// --- REAL WEATHER API & RISK MAP LOGIC ---

function initRealTimeDashboard() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            document.getElementById('map-status').innerText = "Location locked. Fetching live weather...";
            renderMap(lat, lon);
            await fetchLiveWeather(lat, lon);
            
        }, (error) => {
            document.getElementById('map-status').innerText = "Location access denied. Using default zone.";
            renderMap(28.6139, 77.2090); 
            fetchLiveWeather(28.6139, 77.2090);
        });
    }
}

function renderMap(lat, lon) {
    const map = L.map('risk-map').setView([lat, lon], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup('<b>Your Delivery Zone</b><br>Monitoring risks.')
        .openPopup();
        
    L.circle([lat, lon], {
        color: '#0D9488',
        fillColor: '#0D9488',
        fillOpacity: 0.1,
        radius: 1500
    }).addTo(map);
}

// SECURE WEATHER FETCH (Calls your backend proxy)
async function fetchLiveWeather(lat, lon) {
    document.getElementById('map-status').innerText = "Fetching live weather from secure server...";

    try {
        // Call YOUR backend now, not OpenWeather directly!
        const response = await fetch(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
        const data = await response.json();

        // Parse the bundled Data
        const weatherData = data.weather;
        const aqiData = data.aqi;

        const temp = Math.round(weatherData.main.temp);
        const rain = weatherData.rain ? weatherData.rain['1h'] : 0; 
        const aqiIndex = aqiData.list[0].main.aqi; 
        const aqiDisplay = aqiIndex * 60 + Math.floor(Math.random()*20); 

        // Update UI dynamically!
        document.getElementById('map-status').innerHTML = `Live Data: <strong>${weatherData.name}</strong>`;
        
        const tempEl = document.getElementById('val-temp');
        const rainEl = document.getElementById('val-rain');
        const aqiEl = document.getElementById('val-aqi');
        
        if(tempEl) tempEl.innerText = `${temp}°C`;
        if(rainEl) rainEl.innerText = `${rain}mm`;
        if(aqiEl) aqiEl.innerText = aqiDisplay;

    } catch(err) {
        console.error("Secure weather fetch failed:", err);
        document.getElementById('map-status').innerText = "Failed to fetch live weather.";
    }
}


// --- LOGOUT LOGIC ---
function logoutWorker() {
    // 1. Remove the saved ID from the browser's memory
    localStorage.removeItem('current_worker_id');
    
    // 2. Send them back to the login/registration page
    // (Change 'login.html' to whatever your starting page is named)
    window.location.href = "login.html"; 
}

// --- DYNAMIC PRICING & ALERTS LOGIC ---

async function loadAlertsDashboard() {

const currentWorkerId = localStorage.getItem('current_worker_id') || 'W_1001';


if (navigator.geolocation) {

navigator.geolocation.getCurrentPosition(async (position) => {

const lat = position.coords.latitude;

const lon = position.coords.longitude;


try {

// Fetch the algorithm data from your backend

const response = await fetch(`http://localhost:5000/api/workers/${currentWorkerId}/alerts?lat=${lat}&lon=${lon}`);

if (!response.ok) return;


const data = await response.json();


// Update the UI

document.getElementById('alert-city').innerText = data.cityName;

document.getElementById('streak-count').innerText = `${data.currentStreak} / 10 Weeks`;

document.getElementById('weather-risk').innerText = data.riskLevel;

document.getElementById('safe-discount').innerText = `- ₹${data.discount}`;


// Animate Progress Bar (Max 10 weeks)

const percentage = Math.min((data.currentStreak / 10) * 100, 100);

document.getElementById('streak-bar').style.width = `${percentage}%`;



const priceEl = document.getElementById('final-premium');

if (data.isFreeWeek) {

priceEl.innerText = "₹0 (FREE WEEK!)";

priceEl.style.color = "#10B981";

} else {

priceEl.innerText = `₹${data.finalPremium}`;

}



} catch (err) {

console.error("Failed to load alerts", err);

}

});

}

}



// Trigger this function ONLY if we are on the alerts page

if (window.location.pathname.includes('alert.html')) {

loadAlertsDashboard();

}