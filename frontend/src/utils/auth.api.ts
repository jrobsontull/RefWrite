import { getRequest, postRequest } from './http.common';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

class AuthAPI {
  static registerUser = async (user: User) => {};
}

export default AuthAPI;
