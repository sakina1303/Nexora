const express = require('express');
const cors = require('cors');
const servicesRouter = require('./routes/services');
const ordersRouter = require('./routes/orders');

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*'
  })
);
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Nexora Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/services', servicesRouter);
app.use('/api/orders', ordersRouter);

// Root Route (optional, just to show something)
app.get('/', (req, res) => {
  res.send('Nexora Backend Service');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

module.exports = app;
