const db = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at:"critic.created_at",
  updated_at: "critic.updated_at",
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
  return db("movies").select("*").where({movie_id}).first();  
}

async function getMoviesByTheaters(movie_id) {
  return db("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .where({"mt.movie_id":movie_id});
}

async function getMoviesByReviews(movie_id) {
  return db("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({"r.movie_id":movie_id})
    .then(reviews => reviews.map(review => addCritic(review)))
}

module.exports = {
  list,
  read,
  getMoviesByTheaters,
  getMoviesByReviews,
};
