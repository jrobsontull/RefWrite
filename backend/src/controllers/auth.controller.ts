import { Request, Response } from 'express';
import AuthDAO from '../dao/authDAO';
import hasOwnProperty from '../utils/hasOwnProperty';
import generateToken from '../utils/generateToken';
import verifyToken from '../utils/verifyToken';
import { User, AuthCookie } from '../types/global.types';
import jwt from 'jsonwebtoken';

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

      if (
        typeof registerResponse === 'object' &&
        hasOwnProperty(registerResponse, 'error') &&
        typeof registerResponse.error === 'string'
      ) {
        res.status(400).json({ error: registerResponse.error });
      } else {
        const user: User = registerResponse as User;
        const authCookie: AuthCookie = {
          auth: await generateToken({
            _id: user._id.toString(),
            permission: user.permission,
          }),
        };
        res
          .cookie('sessionId', authCookie, {
            maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
            httpOnly: true,
            sameSite: true,
          })
          .send();
      }
    } catch (e) {
      console.error('[AuthController]: Failed to register user. ' + e);
      res.status(500).json({ error: 'Server error. ' + e });
    }
  };

  static apiLoginUser = async (
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> => {
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;

      if (!email || !password) {
        res.status(400).json({ error: 'Missing request information.' });
        return;
      }

      const loginResponse: User | { error: any } = await AuthDAO.loginUser(
        email,
        password
      );

      if (
        typeof loginResponse === 'object' &&
        hasOwnProperty(loginResponse, 'error') &&
        typeof loginResponse.error === 'string'
      ) {
        res.status(400).json({ error: loginResponse.error });
      } else {
        // Create and sign JWT token for cookie
        const user = loginResponse as User;
        const authCookie: AuthCookie = {
          auth: await generateToken({
            _id: user._id.toString(),
            permission: user.permission,
          }),
        };
        res
          .cookie('sessionId', authCookie, {
            maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
            httpOnly: true,
            sameSite: true,
          })
          .send();
      }
    } catch (e) {
      console.error('[AuthController]: Failed to login user. ' + e);
      res.status(500).json({ error: 'Server error. ' + e });
    }
  };

  static apiLogoutUser = async (
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> => {
    try {
      res.clearCookie('sessionId').send();
    } catch (e) {
      console.error('[AuthController]: Failed to logout user. ' + e);
      res.status(500).json({ error: 'Server error. ' + e });
    }
  };

  static apiVerifyUser = async (
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> => {
    try {
      const token: string = req.cookies.sessionId?.auth;
      const verified = await verifyToken(token);
      if (verified) {
        const jwt = verified as jwt.JwtPayload;
        console.log(jwt.payload); // do something more here
        res.json({ verified: true });
      } else {
        res.json({ verified: false });
      }
    } catch (e) {
      console.error('[AuthController]: Failed to verify user. ' + e);
      res.status(500).json({ error: 'Server error. ' + e });
    }
  };
}

export default AuthController;
