import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const getAllUsers = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection("usuarios").find({}).toArray(callback);
};

const updateUser = async (id, edition, callback) => {
  const filteredUser = { _id: new ObjectId(id) };
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
  await dataBase
    .collection("usuarios")
    .findOneAndUpdate(
      filteredUser,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

export { getAllUsers, updateUser };
