const express = require("express")
const route = require("./routes/client/index.route")

const app = express()
const port = 3000

route(app)

app.set('views', './views')
app.set('view engine', 'pug')

app.listen(port, () => {
    console.log("Runnnnn");
})