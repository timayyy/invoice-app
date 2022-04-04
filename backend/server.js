import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import invoiceRoutes from './routes/invoiceRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import docRoutes from './routes/docRoutes.js'

//Initialize dotenv config
dotenv.config()

//Connect to Database
connectDB()

//Initialize the app
const app = express()

//Body parser
app.use(express.json())

//Handle users route
app.use('/api/users', userRoutes)
app.use('/api/invoice', invoiceRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/doc', docRoutes)

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}


//Not found middleware for routes that do not exist, better error handling
app.use(notFound)

//Error handler middleware
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))