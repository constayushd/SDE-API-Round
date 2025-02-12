// src/config/database.js
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "railway_management",
    entities: [__dirname + "/../models/*.js"],
    synchronize: process.env.NODE_ENV !== 'production', // Only sync in development
    logging: process.env.NODE_ENV !== 'production',
    // Connection pool settings
    poolSize: 10,
    maxQueryExecutionTime: 1000, // Log slow queries
    // Retry settings
    retryAttempts: 3,
    retryDelay: 3000,
    // SSL settings (if needed)
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const initializeDatabase = async () => {
    let retries = 5;
    while (retries) {
        try {
            await AppDataSource.initialize();
            console.log("✅ Database connected successfully!");
            
            // Test the connection
            await AppDataSource.query('SELECT 1');
            console.log("✅ Database connection verified!");
            
            return AppDataSource;
        } catch (error) {
            console.error(`❌ Database connection attempt failed (${retries} retries left):`, error.message);
            retries -= 1;
            if (retries === 0) {
                console.error("❌ Failed to connect to database after multiple retries");
                throw error;
            }
            // Wait for 5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

// Graceful shutdown handler
const closeDatabase = async () => {
    try {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log("Database connection closed gracefully");
        }
    } catch (error) {
        console.error("Error while closing database connection:", error);
        throw error;
    }
};

module.exports = { AppDataSource, initializeDatabase, closeDatabase };
