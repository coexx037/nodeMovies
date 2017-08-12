var express = require("express")
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose')
var flash = require("connect-flash")
var passport = require('passport')
var LocalStrategy = require('passport-local')
var methodOverride = require('method-override')
var Movie = require('./models/movie')
var Comment = require('./models/comment')
var User = require('./models/user')
var seedDB = require('./seeds')


//mongoose.connect("mongodb://localhost/nodeMovies")
mongoose.connect("mongodb://coexx037:Barretff7@ds147821.mlab.com:47821/barret")

app.use(bodyParser.urlencoded({extended: true}));
app.use(flash())
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
//seedDB(); //seed the database

var commentRoutes = require("./routes/comments")
var movieRoutes = require("./routes/movies")
var indexRoutes = require("./routes/index")

//Passport Config
app.use(require("express-session")({
    secret: "i heart dogs",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next()
})

//requiring routes
app.use("/", indexRoutes)
app.use("/movies", movieRoutes)
app.use("/movies/:id/comments", commentRoutes)


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server is listening!')
})