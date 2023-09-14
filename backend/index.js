const express = require('express')
const { PORT, URL } = require('./config')
const mongoose = require('mongoose')
const bookRouter = require('./routes/books-route')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methodS: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)*/

app.use('/books', bookRouter)

app.get('/', (req, res) => {
    res.send("Hello from backend")
})

app.use('/books', bookRouter)


mongoose.connect(URL).then(() => {
    console.log('Database connected')
}).catch((error) => {
    console.log(error)
})

app.listen(PORT, () => {
    console.log(`Successfully listening to port: ${PORT}`)
})