// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Railway Management System API',
            version: '1.0.0',
            description: 'API documentation for Railway Management System',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal server error',
            status: err.status || 500,
            timestamp: new Date().toISOString(),
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            status: 404,
            timestamp: new Date().toISOString(),
        }
    });
});

module.exports = app;