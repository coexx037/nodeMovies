var express = require("express")
var router = express.Router({mergeParams: true});
var Movie = require("../models/movie")
var Comment = require("../models/comment")
var middleware = require("../middleware")

//Comments routes
//comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find movie by id
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log(err)
        }else {
           res.render("comments/new", {movie: movie}) 
        }
    })
    
})

//comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //find movie by id
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log(err)
            res.redirect("/movies")
        }else {
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err)
               }else {
                   //add username and id to comment
                   comment.author.id = req.user._id
                   comment.author.username = req.user.username
                   //save comment
                   comment.save()
                   movie.comments.push(comment)
                   movie.save()
                   console.log(comment)
                   res.redirect("/movies/"+movie._id)
               }
               
           })
        }
    })
})

//edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back")
        }else {
            res.render("comments/edit", {movie_id: req.params.id, comment: foundComment})
        }
    })
})

//update comment
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        }else {
            res.redirect("/movies/"+req.params.id)
        }
    })
})

//destory comment
router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back")
        }else{
            res.redirect("/movies/"+req.params.id)
        }
    })
})

module.exports = router;