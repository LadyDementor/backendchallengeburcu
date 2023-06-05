const db = require("../../data/dbConfig");

function getAll() {
  return db("users");
}

const getBy = (filter) => {
  return db("users").where(filter).first();
};

const getById = async (id) => {
  return db("users").where("user_id", id).first();
};

async function getByUsernameOrEmail(username, email) {
  const user = await db("users").where(username).orWhere(email).first();
  return user;
}

const create = async (user) => {
  const inserted = await db("users").insert(user);
  return getById(inserted[0]);
};

module.exports = {
  create,

  getAll,

  getByUsernameOrEmail,

  getById,

  getBy,
};
