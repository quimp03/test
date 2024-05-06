const express  = require("express");
const routeClient = require("./routes/admin/index.route.js")
const routeAdmin = require("./routes/client/index.route.js")
const dotenv = require("dotenv");
const database = require('./config/database.js')
const methodOverride = require("method-override")
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
dotenv.config();
const systemConfig = require("./config/system.js")
database.connect()
const app = express();
const port = process.env.PORT
//flash
app.use(cookieParser('IUQCUHPIAM'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//end-flash

app.set('view engine', 'pug');
app.set('views',  `${__dirname}/views`)


app.use(express.static(`${__dirname}/public`))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false}))
//app locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
routeClient(app)
routeAdmin(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})