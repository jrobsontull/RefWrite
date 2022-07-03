import jwt from 'jsonwebtoken';

interface Payload {
  _id: string;
  permission: string;
}

const generateToken = async (payload: Payload): Promise<string> => {
  return jwt.sign({ payload }, process.env.TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
