const mongoose = require('mongoose');


// here class and object are used ......
//class = Schema & object = blohSchema....
//object is structured based on the class defined
//required is used for to decide the element (detials) in the object is manidatory or optional


const Schema = mongoose.Schema;

const blogSchema = new Schema({
    heading:{
        type:String,
        require:true,
    },
    blog:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    }
}  , {timestamps:true});

//my database collection name is blogs
//here blog will pluralise to blogs
//after running this database will search the collection name blogs and fetch the blogshema data to that collection
const Blog = mongoose.model('blog', blogSchema);

//exporting of file 
module.exports = Blog;