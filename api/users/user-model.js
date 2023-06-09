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

const remove = async (id) => {
  try {
    const count = await db("users").where("user_id", id).delete();
    return count;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, updatedUser) => {
  const updated = await db("users")
    .where({ user_id: userId })
    .update(updatedUser);
  return updated;
};

module.exports = {
  create,

  getAll,

  getByUsernameOrEmail,

  getById,

  getBy,

  updateUser,

  remove,
};
