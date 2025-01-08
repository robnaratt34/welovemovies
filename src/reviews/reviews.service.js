const db = require("../db/connection");

const tableName = "reviews";

async function destroy(review_Id) {
  return db("reviews").where({review_Id}).del()  
}

async function list(movie_id) {
  // TODO: Write your code here
  
}

async function read(review_Id) {
  return db("reviews").select("*").where({review_Id}).first();  
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
