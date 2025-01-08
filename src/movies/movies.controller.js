const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const foundMovie = await service.read(req.params.movieId);

  if (foundMovie){
    res.locals.movie = foundMovie;
    next()
  }

  next({ status: 404, message: "Movie cannot be found." });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

async function getMoviesByTheaters(req,res) {
  res.json({data: await service.getMoviesByTheaters(req.params.movieId)});
}

async function getMoviesByReviews(req,res) {
  res.json({data: await service.getMoviesByReviews(req.params.movieId)});
}

async function list(req, res) {
  if (req.query){
    res.json({data: await service.list(req.query)});
  }
  res.json({data: await service.list()});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  getMoviesByTheaters: [asyncErrorBoundary(movieExists), getMoviesByTheaters],
  getMoviesByReviews: [asyncErrorBoundary(movieExists), getMoviesByReviews],
};
