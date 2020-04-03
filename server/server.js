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

// Middlewares

const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

// /api/gallery/items

// app.post('/api/product/services', (req, res) => {
//   let order = req.body.order ? req.body.order : 'desc';
//   let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
//   let limit = req.body.limit ? parseInt(req.body.limit) : 100;
//   let skip = parseInt(req.body.skip);
//   let findArgs = {};

//   for (let key in req.body.filters) {
//     if (req.body.filters[key].length > 0) {
//       if (key === 'price') {
//         findArgs[key] = {
//           $gte: req.body.filters[key][0],
//           $lte: req.body.filters[key][1]
//         };
//       } else {
//         findArgs[key] = req.body.filters[key];
//       }
//     }
//   }

//   findArgs['publish'] = true;

//   Product.find(findArgs)
//     .sort([[sortBy, order]])
//     .skip(skip)
//     .limit(limit)
//     .exec((err, articles) => {
//       if (err) return res.status(400).send(err);
//       res.status(200).json({
//         size: articles.length,
//         articles
//       });
//     });
// });

app.post('/api/product/services', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  // let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 12;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  findArgs['publish'] = true;

  Product.find(findArgs)
    // .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles
      });
    });
});

app.get('/api/product/services', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  find()
    .populate('service')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, services) => {
      if (err) return res.status(400).send(err);
      res.send(services);
    });
});

app.get('/api/product/services_by_id', (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === 'array') {
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate('service')
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

// app.post('/api/product/services', auth, admin, (req, res) => {
//   const product = new Product(req.body);

//   product.save((err, doc) => {
//     if (err) return res.json({ success: false, err });
//     res.status(200).json({
//       success: true,
//       article: doc
//     });
//   });
// });

//////////////////////////////

// paslaugos. Kirpimas, dažymas, kirpimas + dažymas

app.post('/api/product/service', auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc
    });
  });
});

app.get('/api/product/service', (req, res) => {
  Product.find({}, (err, service) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(service);
  });
});

// TODO produkto trynimas. Adminkėj reiks išvest kažkokį lista su trynimo opcija

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single('file');

app.post('/api/users/uploadfile', auth, admin, (req, res) => {
  upload(req, res, err => {
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
    history: req.user.history
  });
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true
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
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

// Gallery items

app.get('/api/gallery/items', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  find()
    .populate('item')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, items) => {
      if (err) return res.status(400).send(err);
      res.send(items);
    });
});

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto'
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

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
