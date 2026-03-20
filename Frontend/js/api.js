// frontend/js/api.js
const API_BASE_URL = 'https://fika-climate-insurance-1.onrender.com/'; // placemnent of the dummy data api link!

const fikaAPI = {
    // Fetch dashboard stats
    getDashboardData: async (workerId) => {
        try {
            // Matches your backend route: workerRoutes.js or triggerRoutes.js
            const response = await fetch(`${API_BASE_URL}/workers/${workerId}/dashboard`);
            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            return null;
        }
    },

    // Subscribe worker to premium
    subscribeWorker: async (workerId, planData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/workers/${workerId}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planData)
            });
            return await response.json();
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    },

    // Fetch payout history
    getPayoutHistory: async (workerId) => {
        try {
            // Matches backend route: payoutRoutes.js
            const response = await fetch(`${API_BASE_URL}/payouts/${workerId}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching payouts:", error);
        }
    }
};