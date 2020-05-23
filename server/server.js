const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
// const SHA1 = require('crypto-js/sha1');
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const ObjectId = require('mongodb').ObjectID;

const app = express();
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// MODELS
const { User } = require('./models/user');
const { Product } = require('./models/product');
const { Gallery } = require('./models/gallery');
const { Contacts } = require('./models/contacts');
const { Slider } = require('./models/slider');

// Middlewares

const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

// UPLOAD FILES

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  transformations: { width: 220, height: 140, crop: 'fill' },
});

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single('file');

app.post('/api/users/uploadfile', auth, admin, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true });
  });
});

app.get('/api/users/admin_files', auth, admin, (req, res) => {
  const dir = path.resolve('.') + '/uploads/';
  fs.readdir(dir, (err, items) => {
    return res.status(200).send(items);
  });
});

app.get('/api/users/download/:id', auth, admin, (req, res) => {
  const file = path.resolve('.') + `/uploads/${req.params.id}`;
  res.download(file);
});

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
    }
  );
});

app.get('/api/users/removeimage', auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ succes: false, error });
    res.status(200).send('ok');
  });
});

// Gallery items

app.post('/api/galleries/images', (req, res) => {
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  findArgs['publish'] = true;

  Gallery.find(findArgs)
    .skip(skip)
    .exec((err, item) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: item.length,
        item,
      });
    });
});

app.get('/api/galleries/items', (req, res) => {
  Gallery.find({}, (err, item) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(item);
  });
});

app.post('/api/galleries/item', auth, admin, (req, res) => {
  const gallery = new Gallery(req.body);

  gallery.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      gallery: doc,
    });
  });
});

app.delete('/api/galleries/item/:id', auth, admin, (req, res) => {
  Gallery.findOneAndRemove({ _id: req.params.id }).then((data) => {
    res.send(data);
  });
});

// SLIDERIS

app.post('/api/slider/images', (req, res) => {
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  findArgs['publish'] = true;

  Gallery.find(findArgs)
    .skip(skip)
    .exec((err, item) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: item.length,
        item,
      });
    });
});

app.post('/api/slider/item', auth, admin, (req, res) => {
  const slider = new Slider(req.body);
  slider.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      slider: doc,
    });
  });
});

app.get('/api/slider/items', (req, res) => {
  Slider.find({}, (err, item) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(item);
  });
});

app.get('/api/slider/items/:id', auth, admin, (req, res) => {
  Product.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.patch('/api/slider/items/:id', auth, admin, (req, res) => {
  let updateObject = req.body;
  let id = req.params.id;
  Slider.update({ _id: ObjectId(id) }, { $set: updateObject })
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.delete('/api/slider/item/:id', auth, admin, (req, res) => {
  Slider.findOneAndRemove({ _id: req.params.id }).then((data) => {
    res.send(data);
  });
});

// PASLAUGOS

app.post('/api/product/service', auth, admin, (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      product: doc,
    });
  });
});

app.get('/api/product/service', (req, res) => {
  Product.find({}, (err, service) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(service);
  });
});

//get product by ID
app.get('/api/product/service/:id', auth, admin, (req, res) => {
  Product.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.delete('/api/product/service/:id', auth, admin, (req, res) => {
  Product.findOneAndRemove({ _id: req.params.id }).then((data) => {
    res.send(data);
  });
});

app.patch('/api/product/service/:id', auth, admin, (req, res) => {
  let updateObject = req.body;
  let id = req.params.id;
  Product.update({ _id: ObjectId(id) }, { $set: updateObject })
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//contacts

app.post('/api/contacts', auth, admin, (req, res) => {
  const contacts = new Contacts(req.body);
  contacts.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      contacts: doc,
    });
  });
});

app.get('/api/contacts', (req, res) => {
  Contacts.find({}, (err, service) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(service);
  });
});

app.patch('/api/contacts/', auth, admin, (req, res) => {
  let updateObject = req.body;
  Contacts.update({ $set: updateObject })
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// USERS

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
    });
  });
});

app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({ loginSuccess: false, message: 'Email not found' });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
