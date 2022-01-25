const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Blog = require('./model/blogs.js')

const port = process.env.PORT || 3000;

const app = express();

//MAKING SERVER//server setup

app.set('view engine', 'ejs');


//for connecting the database in mongodb
const dbURI = 'mongodb+srv://app:apptest123@cluster0.aztj2.mongodb.net/webed?retryWrites=true&w=majority';


//mongoose is used 
//here assync function : function that is used separately and doesnot effect the main function
mongoose.connect(dbURI)
    .then(result => {

        app.listen(port);
        console.log('server running at ', port);

    })
    .catch(err => {
        console.log(err);
    })






//server setup middleware
//to get server detials ....200=ok.....304=no changes happened
app.use(morgan('dev'));

//to make folder public in the site
app.use(express.static( __dirname + "/public"));

//url parse or decode the entered data
app.use(express.urlencoded({extended:true}))


//home page




app.get('/', (req, res) => {


    Blog.find().sort({createdAt : -1})
    .then(result =>{

        res.render('home', { title: 'home', blogs: result });


    })
    .catch(err => console.log(err))


    
});

//blog page
app.get('/blog/:id', (req, res) => {

    const id = req.params.id;

    Blog.findById(id)
        .then(result =>{

            console.log(result);

            res.render('blog', {title:'blog', blogs:result});
        })
        .catch(err => console.log(err));

});

//simgle blog delete

app.delete('/blog/:id', (req, res) => {

    const id = req.params.id;

    const myresponse = {
        status : 'successfully deleted'
    }

    Blog.findByIdAndDelete(id)
        .then(result =>{

            res.json(myresponse);


        })
        .catch(err => console.log(err));

});



//create blog 
app.get('/create', (req, res) => {
    res.render('create', { title: 'create blog' });
});

//user input detials fetching 
app.post('/create' , (req,res) =>{
    console.log(req.body);

    const blog = new Blog(req.body);

    blog.save()
        .then(result =>{
            console.log(result)
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

//edit page

app.get('/edit', (req, res) => {

    const id = req.params.id;

    Blog.findByIdAndUpdate(id)
        .then(result =>{

            console.log(result);

            res.render('edit', {title:'edit', blogs:result});
        })
        .catch(err => console.log(err));

});

//edit a page
app.post('/edit' , (req,res) =>{
    console.log(req.body);

    const blog = new Blog(req.body);

    blog.save()
        .then(result =>{
            console.log(result)
            res.redirect('/editor')
        })
        .catch(err => console.log(err))
})

//delete current by edit
app.delete('/blog/:id', (req, res) => {

    const id = req.params.id;

    const myresponse = {
        status : 'successfully deleted'
    }

    Blog.findByIdAndDelete(id)
        .then(result =>{

            res.json(myresponse);


        })
        .catch(err => console.log(err));

});



//editor page
app.get('/editor', (req, res) => {


    Blog.find().sort({createdAt : -1})
        .then(result =>{


            res.render('editor', { title: 'editor', blogs: result });

        })
        .catch(err => console.log(err));



});





//middleware
app.use((req, res) => {
    res.send('404 not fount , oops!!!');
});