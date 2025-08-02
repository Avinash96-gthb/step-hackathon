const express = require('express');
const { createDashboardRoutes } = require('./dist/routes/dashboard');
const { PlayWiseEngine } = require('./dist/engine/PlayWiseEngine');

const app = express();
const engine = new PlayWiseEngine();

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Direct route works!' });
});

// Test dashboard routes
console.log('Creating dashboard router...');
const dashboardRouter = createDashboardRoutes(engine);
console.log('Mounting dashboard router...');
app.use('/api/dashboard', dashboardRouter);
console.log('Dashboard router mounted');

app.listen(3001, () => {
  console.log('Debug server running on port 3001');
  console.log('Test: curl http://localhost:3001/test');
  console.log('Test: curl http://localhost:3001/api/dashboard');
});
