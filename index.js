const express = require("express")
const route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route")
const systemConfig = require("./config/system")
const database = require("./config/database")
const methodOverride = require('method-override')

database.connect()

require('dotenv').config();

const app = express()
const port = process.env.PORT

app.use(methodOverride('_method'))

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin


route(app)
adminRoute(app)

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

app.listen(port, () => {
    console.log("Runnnnn");
})