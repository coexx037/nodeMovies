var express = require("express")
var router = express.Router();
var Movie = require("../models/movie")
var middleware = require("../middleware")

var cat = ['Comedy', 'Action', 'Sci-fi', 'Horror', 'Drama', 'Fantasy']

//Movies routes
router.get("/", function(req, res){
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err)
        } else{
            console.log(req.params.id)
           res.render("movies/index", {movies: allMovies, cat: cat, activeCat: null}) 
        }
    })
    
})

router.get("/category/:id", function(req, res){
    Movie.find({category: req.params.id}, function(err, catMovies){
        if(err){
            console.log(err)
        } else{
           res.render("movies/index", {movies: catMovies, cat: cat, activeCat: req.params.id}) 
        }
    })
    
})

//create a movie
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var category = req.body.category
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMovie = {name: name, image: image, description: desc, category: category, author: author}
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else {
            console.log(newlyCreated)
            res.redirect("/movies")
        }
    })
    
})

//NEW - show form to create new movie

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("movies/new")
})


//SHOW - show more info about a movie
router.get("/:id", function(req, res){
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if(err){
            console.log(err)
        }else{
            console.log(foundMovie)
            res.render("movies/show", {movie: foundMovie})
        }
    })
})

//EDIT - edit movie
router.get('/:id/edit', middleware.checkMovieOwner, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        res.render('movies/edit', {movie: foundMovie})  
    })
})

//UPDATE - update movie
router.put('/:id', function(req, res){
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie){
        if(err){
            res.redirect('/movies')
        }else{
            req.flash("success", "Movie Updated")
            res.redirect('/movies/'+ req.params.id)
        }
    })
})

//Movie Destroy
router.delete('/:id', middleware.checkMovieOwner, function(req, res){
    Movie.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/movies')
        }else{
            req.flash("success", "Movie Deleted")
            res.redirect('/movies')
        }
    })
})

module.exports = router;

