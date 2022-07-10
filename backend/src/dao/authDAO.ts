import { MongoClient, Collection, WithId, Document } from 'mongodb';
import bcrypt from 'bcrypt';
import { User } from '../types/global.types';

let users: Collection;

class AuthDAO {
  static injectedAuthDb = async (conn: MongoClient): Promise<void> => {
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

        console.log('[AuthDAO]: Database loaded successfully.');
      } catch (e) {
        console.error(
          '[AuthDAO]: Unable to establish a connection handle in AuthDAO. ' + e
        );
      }
    }
  };

  static registerUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    permission: string = 'user'
  ) => {
    try {
      const emailExists: WithId<Document> = await users.findOne({
        email: email,
      });
      if (emailExists) {
        return {
          error:
            'This email is already registered with us. Please log in or use a different email.',
        };
      }

      // Hash password
      const salt: string = await bcrypt.genSalt(10);
      const hashedPass: string = await bcrypt.hash(password, salt);

      // Insert docunent into db
      const document = {
        email: email,
        password: hashedPass,
        firstName: firstName,
        lastName: lastName,
        permission: permission,
        dateCreated: new Date(),
      };

      const response = await users.insertOne(document);

      const user: User = {
        _id: response.insertedId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        permission: permission,
      };

      return user;
    } catch (e) {
      console.error('[AuthDAO]: Failed to register user. ' + e);
      return { error: e };
    }
  };

  static loginUser = async (email: string, password: string) => {
    try {
      // See if user exists
      const userFound: WithId<Document> = await users.findOne({ email: email });

      if (!userFound) {
        // No account with that email exists
        return { error: 'Invalid username or password.' };
      }

      // Check password validity
      const validPass: boolean = await bcrypt.compare(
        password,
        userFound.password
      );

      if (!validPass) {
        return { error: 'Invalid username or password.' };
      }

      const user: User = {
        _id: userFound._id,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        permission: userFound.permission,
      };

      return user;
    } catch (e) {
      console.error('[AuthDAO]: Failed to login user. ' + e);
      return { error: e };
    }
  };
}

export default AuthDAO;
