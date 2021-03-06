var express = require("express")
var router = express.Router();
var User = require("../models/user")
var passport = require("passport")

router.get("/", function(req, res){
    res.render("landing")
})

//Auth Routes

//show register form

router.get("/register", function(req, res){
    res.render("register")
})

//handle signup

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message)
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome "+user.username)
            res.redirect("/movies")
        })
    })
})

//show login form
router.get("/login", function(req, res){
    res.render("login")
})

//handle login
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/movies", 
        failureRedirect: "/login"
        
    }), function(req, res){
    
})

//handle logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged Out")
    res.redirect("/movies")
})


module.exports = router;