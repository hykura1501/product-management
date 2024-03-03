const express = require("express")
const route = require("./routes/client/index.route");

const database = require("./config/database")

database.connect()



require('dotenv').config();

const app = express()
const port = process.env.PORT

route(app)

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

app.listen(port, () => {
    console.log("Runnnnn");
})