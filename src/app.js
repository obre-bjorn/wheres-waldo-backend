const express = require('express')
const appRouter = require('./routes/appRoute')



const app = express()


app.use(express.json())

app.use(express.urlencoded({extended: false}))


app.use(appRouter)


app.listen(5000,() => {

    console.log("Server running on port 5000")
})


module.exports = {app}