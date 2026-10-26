const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;