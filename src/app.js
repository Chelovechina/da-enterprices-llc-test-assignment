const express = require('express');
const container = require('./container/awilix.setup');
const initDB = require('./models/db.models');
const corsMiddleware = require('./middlewares/cors.middleware');
const authRoutes = require('./routes/auth.routes');
const fileRoutes = require('./routes/file.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

initDB(container.resolve('pool'));

app.use(express.json());
app.use(corsMiddleware);

const authController = container.resolve('authController');
const fileController = container.resolve('fileController');

app.use('', authRoutes(authController));
app.use('/file', fileRoutes(fileController));
app.use(errorMiddleware);

module.exports = app;
