import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";
import jwt_decode from 'jwt-decode';

const getAllUsers = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection("usuarios").find({}).toArray(callback);
};

const getSellers = async (role, callback) => {
  const dataBase = getDB();
  await dataBase.collection("usuarios").find({'role': role}).toArray(callback);
};

const createUser = async (dataUser, callback) => {
  const dataBase = getDB();
  await dataBase.collection("usuarios").insertOne(dataUser, callback);
};

const checkOrCreateUser = async (req, callback)=>{
  //obtener los datos del usuario desde el token
  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData']
  console.log(user);

  //Con el correo del usuario o con el id de auth0 verificar si el usuario ya está en la BD
  const dataBase = getDB();
  await dataBase.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
    console.log('response consulta bd', response);
    if (response) {
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(err, response);
    } else {
      // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
      user.auth0ID = user._id;
      delete user._id;
      user.rol = 'inactivo';
      await createUser(user, (err, respuesta) => callback(err, user));
    }
  });

}
  

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

const deleteUser = async (id, callback) => {
  const filteredUser = { _id: new ObjectId(id) };
  const dataBase = getDB();
  await dataBase.collection("usuarios").deleteOne(filteredUser, callback);
};

export { getAllUsers, createUser, updateUser, deleteUser, getSellers, checkOrCreateUser };
