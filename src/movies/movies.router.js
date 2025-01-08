const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .all(methodNotAllowed);

router
    .route("/:movieId/theaters")
    .get(controller.getMoviesByTheaters)
    .all(methodNotAllowed);

router
    .route("/:movieId/reviews")
    .get(controller.getMoviesByReviews)

module.exports = router;
