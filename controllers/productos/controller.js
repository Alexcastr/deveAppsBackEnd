import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const getAllProducts = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection("productos").find({}).toArray(callback);
};

const createProduct = async (productData, callback) => {
  const dataBase = getDB();
  await dataBase.collection("productos").insertOne(productData, callback);
};

const updateProduct = async (id, edition, callback) => {
  const filteredProduct = { _id: new ObjectId(id) };
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
  await dataBase
    .collection("productos")
    .findOneAndUpdate(
      filteredProduct,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const deleteProduct = async (id, callback) =>{
    const filteredProduct ={_id: new ObjectId(id)};
    const dataBase =getDB();
    await dataBase.collection("productos").deleteOne(filteredProduct, callback);
}
export { getAllProducts, createProduct, updateProduct, deleteProduct };
