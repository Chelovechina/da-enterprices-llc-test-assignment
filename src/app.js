const express = require('express');
const cors = require('cors');
const container = require('./container/awilix.setup');
const initDB = require('./models/db.models');
const errorMiddleware = require('./middlewares/error.middleware');
const authRoutes = require('./routes/auth.routes');
const fileRoutes = require('./routes/file.routes');

const app = express();

initDB(container.resolve('pool'));

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

const authController = container.resolve('authController');
const fileController = container.resolve('fileController');

app.use('/auth', authRoutes(authController));
app.use('/file', fileRoutes(fileController));

module.exports = app;
