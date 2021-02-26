const db = require("../../database/connection.js");

async function add(user) {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  }
  
  function find() {
    return db("users").orderBy("id");
  }
  
  function findBy(filter) {
    return db("users").where(filter).orderBy("id");
  }
  
  function findById(id) {
    return db("users").where({ id }).first();
  }

  function remove(id) {
      return db('users').where({id}).del()
  }
  
  module.exports = { add, find, findBy, findById, remove };