var Movie = require("../models/movie")
var Comment = require("../models/comment")

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
                                if(req.isAuthenticated()){
                                    return next()
                                }
                                req.flash("error", "Please Login")
                                res.redirect("/login")
                            }
middlewareObj.checkCommentOwner = function(req, res, next){
                                    if(req.isAuthenticated()){
                                        Comment.findById(req.params.comment_id, function(err, foundComment){
                                            if(err){
                                                res.redirect("back")
                                            }else {
                                                if(foundComment.author.id.equals(req.user._id)){
                                                  next(); 
                                                }else {
                                                    res.redirect("back")
                                                }
                                            }
                                        })
                                    }else {
                                        req.flash("error", "Please Login")
                                        res.redirect("back")
                                    }
                                }

middlewareObj.checkMovieOwner = function(req, res, next){
                                    if(req.isAuthenticated()){
                                        Movie.findById(req.params.id, function(err, foundMovie){
                                            if(err){
                                                res.redirect("back")
                                            }else {
                                                if(foundMovie.author.id.equals(req.user._id)){
                                                  next(); 
                                                }else {
                                                    res.redirect("back")
                                                }
                                            }
                                        })
                                    }else {
                                        req.flash("error", "Please Login")
                                        res.redirect("back")
                                    }
                                }

module.exports = middlewareObj;