const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const specs = require('./src/config/swagger');
const connectDB = require('./src/config/db');
const patientRoutes = require('./src/routes/patientRoutes');
const authRoutes = require('./src/routes/auth.routes');
const admissionRoutes = require('./src/routes/admission.routes');
const wardRoutes = require('./src/routes/ward.routes');
const transferRoutes = require('./src/routes/transfer.routes');
const labTestRoutes = require('./src/routes/labTest');
const testResultRoutes = require('./src/routes/testResult.routes');
const dischargeRoutes = require('./src/routes/discharge.routes');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/wards', wardRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/lab/tests', labTestRoutes);
app.use('/api/lab/results', testResultRoutes);
app.use('/api/discharges', dischargeRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Don't start the server here
// Instead, export the app
module.exports = app; 