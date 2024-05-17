const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn,validateCampground,isAuther} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});

router.route('/')
      .get(catchAsync(campgrounds.index ))
       .post(isLoggedIn,upload.array('image'),validateCampground, catchAsync( campgrounds.createCampground))
      // .post(upload.array('image'), (req, res) =>{
      //       console.log(req.body, req.files)
      //       res.send('it worked')
            // res.status(req.file).send(req.body)
      
      // })

router.get('/new', isLoggedIn,campgrounds.renderNewForm)

router.route('/:id')
      .get(catchAsync(campgrounds.showCampground ))
      .put(isLoggedIn,isAuther,upload.array('image'), validateCampground, catchAsync( campgrounds.updateCampground))
      .delete(isLoggedIn,isAuther,catchAsync(campgrounds.deleteCampground ));


  router.get('/:id/edit',isLoggedIn,isAuther,catchAsync(campgrounds.renderEditForm))

 

  module.exports=router;

