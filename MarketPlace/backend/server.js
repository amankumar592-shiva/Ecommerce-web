import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './config/db.js'
import logger from './utils/logger.js'

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    logger.info(`Server started on port ${PORT}`)
})

process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`)
    logger.error(`Unhandled Rejection: ${err.message}`)
    server.close(() => process.exit(1))
})

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...')
    logger.info('SIGTERM received. Shutting down gracefully...')
    server.close(() => {
        console.log('Process terminated')
        logger.info('Process terminated')
    })
})