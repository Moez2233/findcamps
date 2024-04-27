const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn,validateCampground,isAuther} = require('../middleware');



router.get('/',catchAsync( async (req, res)=>{
    const  campgrounds= await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
  
 }))
 router.get('/new', isLoggedIn, (req, res)=>{
     res.render( 'campgrounds/new' )
     })
 
  router.post('/',isLoggedIn,validateCampground, catchAsync( async (req, res)=>{
   //  if(!req.body.campground) throw new  ExpressError('Please add a valid campground',404)
     const campground =  new Campground(req.body.campground);
     campground.auther = req.user._id;
     await campground.save();
     req.flash('success','successfully made a new campground')

  res.redirect(`/campgrounds/${campground._id}`);
  }))
 
  router.get('/:id',catchAsync(async (req, res)=>{
     const campground= await Campground.findById(req.params.id).populate('reviews').populate('auther');
     console.log(campground);
     if(!campground){
      req.flash('error','cannot find that campground!');
      return res.redirect('/campgrounds');
     }
  res.render('campgrounds/show',{campground});
  }))
 
  router.get('/:id/edit',isLoggedIn,isAuther,catchAsync( async (req, res)=>{
   const {id} = req.params;  
   const campground= await Campground.findById(id)
     if(!campground){
      req.flash('error','cannot find that campground!');
      return res.redirect('/campgrounds');
     }
  res.render('campgrounds/edit',{campground});
  }))
  router.put('/:id',isLoggedIn,isAuther, validateCampground, catchAsync( async(req, res)=> {
     const { id  } = req.params;
     const campground = await Campground.findByIdAndUpdate(id,{ ...req.body.campground});
     req.flash('success', 'successfully updated campground')
     res.redirect(`/campgrounds/${campground._id}`)
  }))
 
  router.delete('/:id',isLoggedIn,isAuther,catchAsync( async (req, res)=>{
     const { id }= req.params;
     await Campground.findByIdAndDelete(id);
     req.flash('success',' successfully deleted campground')

     res.redirect('/campgrounds');
  }));

  module.exports=router;

