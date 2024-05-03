const express = require("express")
const path = require('path');
const route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route")
const systemConfig = require("./config/system")
const database = require("./config/database")
const dateFormat = require("date-format")

//Ocerride method
const methodOverride = require('method-override')

//Body parser
const bodyParser = require('body-parser')

//Express Flash - Message Infor
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')

database.connect()

require('dotenv').config();

const app = express()
const port = process.env.PORT


app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.dateFormat = dateFormat

route(app)
adminRoute(app)

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

app.use(express.static(`${__dirname}/public`))

app.listen(port, () => {
    console.log("Runnnnn");
})