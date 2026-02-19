const db = require('../config/db');

const getDashboardStats = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM dashboard_stats');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getDashboardStats };
