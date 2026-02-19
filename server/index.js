const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const paymentRoutes = require('./src/routes/payments');
const expenseRoutes = require('./src/routes/expenses');
const dashboardRoutes = require('./src/routes/dashboard');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
    res.send('Proza Finance API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
