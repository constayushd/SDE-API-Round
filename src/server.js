require("dotenv").config();
const { initializeDatabase, closeDatabase } = require("./config/database");
const app = require("./app");
const PORT = process.env.PORT || 3000;

let server;

const startServer = async () => {
    try {
        // Initialize database
        await initializeDatabase();

        // Start the server
        server = app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
        });

        // Handle graceful shutdown
        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

const gracefulShutdown = async () => {
    console.log('🔄 Graceful shutdown initiated...');
    
    // Close server first (stop accepting new requests)
    if (server) {
        await new Promise((resolve) => {
            server.close((err) => {
                if (err) {
                    console.error('Error closing server:', err);
                    resolve();
                }
                console.log('✅ Server closed successfully');
                resolve();
            });
        });
    }

    // Close database connection
    try {
        await closeDatabase();
        console.log('✅ Database connection closed');
    } catch (error) {
        console.error('Error closing database:', error);
    }

    // Exit process
    process.exit(0);
};

// Start the server
startServer();
