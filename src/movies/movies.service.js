const db = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
  critic_id: "critics.critic_id",
  preferred_name: "critics.preferred_name",
  surname: "critics.surname",
  organization_name: "critics.organization_name",
  created_at:"critics.created_at",
  updated_at: "critics.updated_at",
})

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  return db("movies").select("*").where({movie_id: movie_id});  
}

async function getMoviesByTheaters(movie_id) {
  return db("theaters as t")
    .join("movies_theaters as mt", "mt.movie_id", "t.movie_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .where({"mt.movie_id":movie_id});
}

async function getMoviesByReviews(movie_id) {
  return db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({"r.movie_id":movie_id})
    .then(addCritic)
}

module.exports = {
  list,
  read,
  getMoviesByTheaters,
  getMoviesByReviews,
};
