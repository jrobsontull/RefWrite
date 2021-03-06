import { MongoClient, Collection } from 'mongodb';

let users: Collection;

class ReferenceDAO {
  static injectedAuthDb = async (conn: MongoClient): Promise<void> => {
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

        console.log('[ReferenceDAO]: Database loaded successfully.');
      } catch (e) {
        console.error(
          '[ReferenceDAO]: Unable to establish a connection handle in ReferencesDAO. ' +
            e
        );
      }
    }
  };
}

export default ReferenceDAO;
