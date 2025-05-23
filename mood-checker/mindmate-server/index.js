require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // ✅ CommonJS style
const moodRoutes = require('./routes/mood'); // ✅ CommonJS style

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);     // ✅ Corrected
app.use('/api/mood', moodRoutes);     // ✅ Corrected

// Basic health check
app.get('/', (req, res) => res.send('MindMate API running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
