const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");
//Reviews
//post Route

//common part he /listings/:id/reviews

router.post("/",
    isLoggedIn,
    (req, res, next) => {
        console.log(req.body);
        next();
    },
    validateReview,
    wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);


module.exports = router;