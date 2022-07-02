import { Request, Response } from 'express';
import AuthDAO from '../dao/authDAO';
import hasOwnProperty from '../utils/hasOwnProperty';
import { User } from '../types/global.types';

class AuthController {
  static apiRegisterUser = async (
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> => {
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;
      const firstName: string = req.body.firstName;
      const lastName: string = req.body.lastName;

      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({ error: 'Missing request information.' });
        return;
      }

      const registerResponse: User | { error: any } =
        await AuthDAO.registerUser(email, password, firstName, lastName);

      console.log(registerResponse);

      if (
        typeof registerResponse === 'object' &&
        hasOwnProperty(registerResponse, 'error') &&
        typeof registerResponse.error === 'string'
      ) {
        res.status(400).json({ error: registerResponse.error });
      } else {
        // user.token = generateToken(registerResponse._id);
        res.json(registerResponse);
      }
    } catch (e) {
      console.error('[AuthController]: Failed to register user. ' + e);
    }
  };
}

export default AuthController;
