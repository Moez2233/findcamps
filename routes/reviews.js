const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const {validateReview,isLoggedIn,isReviewAuther} = require('../middleware');
const reviews = require('../controllers/reviews');

 

router.post('/',validateReview,isLoggedIn, catchAsync(reviews.createReview))
  

 router.delete('/:reviewId', isLoggedIn, isReviewAuther, catchAsync(reviews.deleteReview))

  module.exports = router;