const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(req, res, next) {
  const foundReview = await service.read(req.params.reviewId);
  
    if (foundReview){
      return next()
    }
  
    next({ status: 404, message: "Review cannot be found." });
}

async function destroy(req, res) {
  await service.destroy(req.params.reviewId);
  res.sendStatus(204)
}

async function list(req, res) {
  // TODO: Write your code here

  response.json({  });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: req.params.reviewId,
  }

  const data = await service.update(updatedReview);
  res.json({data: data})

}

module.exports = {
  delete: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
