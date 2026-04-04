// Frontend/js/api.js
// Added /api to the end and removed the trailing slash!
const API_BASE_URL = 'https://fika-climate-insurance-4.onrender.com/api'; 

const fikaAPI = {
    getWorkerData: async (workerId) => {
        try {
            console.log(`Fetching data for worker: ${workerId}...`);
            const response = await fetch(`${API_BASE_URL}/workers/${workerId}`);
            if (!response.ok) throw new Error(`Backend returned ${response.status}`);
            const data = await response.json();
            console.log("Backend Worker Data:", data); 
            return data;
        } catch (error) {
            console.error("API Connection Failed (Worker):", error);
            return null;
        }
    },

    getPayoutHistory: async (workerId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/payouts/history/${workerId}`);
            if (!response.ok) throw new Error("Payouts fetch failed");
            const data = await response.json();
            console.log("Backend Payout Data:", data);
            return data;
        } catch (error) {
            console.error("API Connection Failed (Payouts):", error);
            return [];
        }
    },

    subscribeWorker: async (workerId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/subscriptions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workerId: workerId, planId: 'premium_weekly' })
            });
            return await response.json();
        } catch (error) {
            console.error("API Connection Failed (Subscribe):", error);
            return null;
        }
    }
};