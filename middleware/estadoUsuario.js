import { ObjectId } from 'mongodb';
import { getDB } from '../db/db.js';
import jwt_decode from 'jwt-decode';

const autorizacionEstadoUsuario = async (req, res, next) => {

  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData'];
  console.log(user);

  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
    if (response) {
      console.log(response);
      if (response.state === 'No Autorizado') {
        res.sendStatus(401);
        res.end();
      } else {
        console.log('Autorizado');
        next();
      }
    }
    else{
      next();
    }
  });
};

export default autorizacionEstadoUsuario;