const express = require('express')
const cors = require('cors')
const appRouter = require('./routes/appRoute')



const app = express()

app.use(cors())


app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(appRouter)


app.listen(4005,() => {

    console.log("Server running on port 5000")
})


module.exports = {app}