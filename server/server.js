const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
require('dotenv').config()

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE,  { useNewUrlParser: true })

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())

// MODELS
const { User } = require('./models/user')
const { Service } = require('./models/service')
const { Product } = require('./models/product')
const { Gallery }  = require('./models/gallery')

// Middlewares

const { auth } = require('./middleware/auth')
const { admin } = require('./middleware/admin')







app.post('/api/product/shop',(req,res)=>{

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    Product.
    find(findArgs).
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})

// BY ARRIVAL
// /services?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=100
app.get('/api/product/services',(req,res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    find().
    populate('service').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,services)=>{
        if(err) return res.status(400).send(err);
        res.send(services)
    })
})


/// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get('/api/product/services_by_id',(req,res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
    find({ '_id':{$in:items}}).
    populate('service').
    exec((err,docs)=>{
        return res.status(200).send(docs)
    })
});


app.post('/api/product/services',auth,admin,(req,res)=>{
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})





//////////////////////////////


// paslaugos. Kirpimas, dažymas, kirpimas + dažymas

app.post('/api/product/service',auth,admin,(req,res)=>{
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})


app.get('/api/product/service', (req, res) => {
    Product.find(
        {}, (err, service) => {
            if(err) return res.status(400).send(err)
            res.status(200).send(service)
        }
    )
})


// gallery

app.post('/api/product/gallery',auth,admin,(req,res)=>{
    const gallery = new Gallery(req.body);

    gallery.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})


app.get('/api/product/image', (req, res) => {
    Gallery.find(
        {}, (err, gallery) => {
            if(err) return res.status(400).send(err)
            res.status(200).send(gallery)
        }
    )
})




// USERS

app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, doc)=>{
        if(err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
        })
    })
})


app.post('/api/users/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if(!user) return res.json({loginSuccess:false, message: 'Email not found'})

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({loginSuccess:false, message: 'Wrong password'})

            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('x_auth', user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })
})


app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
})

const port = process.env.PORT || 3002

app.listen(port, ()=>{
    console.log(`Server running at ${port}`)
})