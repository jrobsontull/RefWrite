import { MongoClient, Collection } from 'mongodb';

let users: Collection;

class ReferenceDAO {
  static async injectedAuthDb(conn: MongoClient) {
    if (users) {
      return;
    } else {
      try {
        let dbType = process.env.MONGO_NS_DEV;
        if (process.env.NODE_ENV === 'production') {
          console.log('[AuthDAO]: Enabling referenceDAO production mode.');
          dbType = process.env.MONGO_NS_PRODUCTION;
        }

        users = await conn.db(dbType).collection('references');
      } catch (e) {
        console.error(
          '[ReferenceDAO]: Unable to establish a connection handle in ReferencesDAO. ' +
            e
        );
      }
    }
  }
}

export default ReferenceDAO;
