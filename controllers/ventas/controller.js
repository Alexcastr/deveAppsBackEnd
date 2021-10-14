import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const getAllSales = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection("ventas").find({}).toArray(callback);
};

const createSale = async (productData, callback) => {
  const dataBase = getDB();
  await dataBase.collection("ventas").insertOne(productData, callback);
};

const updateSale = async (id, edition, callback) => {
  const filteredSale = { _id: new ObjectId(id) };
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
  await dataBase
    .collection("ventas")
    .findOneAndUpdate(
      filteredSale,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const deleteSale = async (id, callback) => {
  const filteredSale = { _id: new ObjectId(id) };
  const dataBase = getDB();
  await dataBase.collection("ventas").deleteOne(filteredSale, callback);
};

export { createSale, getAllSales, updateSale, deleteSale };
