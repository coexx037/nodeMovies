var mongoose = require("mongoose")
var Movie = require("./models/movie")
var Comment = require("./models/comment")

var data = [
    {
        name: "lotr", 
        image: "http://az616578.vo.msecnd.net/files/2016/03/11/6359333648355712821253840626_lord-of-the-rings-2.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "star wars", 
        image: "http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/10/tfa_poster_wide_header-1536x864-959818851016.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "fight club", 
        image: "https://images-na.ssl-images-amazon.com/images/M/MV5BZGY5Y2RjMmItNDg5Yy00NjUwLThjMTEtNDc2OGUzNTBiYmM1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
]


function seedDB(){
    //Remove all movies
    Movie.remove({}, function(err){
    if(err){
        console.log(err)
    }
    console.log("removed movies!")
        //Add a few campgrounds
        data.forEach(function(seed){
            Movie.create(seed, function(err, movie){
                if(err){
                    console.log(err)
                }
                console.log("added new movie!")
                //create a comment
                Comment.create(
                    {
                        text: "this movie is interesting",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        }else{
                            movie.comments.push(comment)
                            movie.save();
                            console.log("created new comment!")
                        }
                        
                    }
                    
                )
            })
        })
    })
    
}

module.exports = seedDB;

