import { AxiosResponse } from 'axios';
import { getRequest, postRequest } from './http.common';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

class AuthAPI {
  static registerUser = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<AxiosResponse | null> => {
    const url: string = 'api/v1/auth/register';
    const body: User = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password,
    };
    const response = await postRequest(url, body);

    if (response) {
      return response;
    } else {
      return null;
    }
  };
}

export default AuthAPI;
