import { MongoClient, Collection } from 'mongodb';

let users: Collection;

class AuthDAO {
  static async injectedAuthDb(conn: MongoClient) {
    if (users) {
      return;
    } else {
      try {
        let dbType = process.env.MONGO_NS_DEV;
        if (process.env.NODE_ENV === 'production') {
          console.log('[AuthDAO]: Enabling authDAO production mode.');
          dbType = process.env.MONGO_NS_PRODUCTION;
        }

        users = await conn.db(dbType).collection('users');
      } catch (e) {
        console.error(
          '[AuthDAO]: Unable to establish a connection handle in AuthDAO. ' + e
        );
      }
    }
  }
}

export default AuthDAO;
