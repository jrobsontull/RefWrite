import jwt from 'jsonwebtoken';

const verifyToken = async (
  token: string
): Promise<jwt.JwtPayload | string | null> => {
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) {
      return verified;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export default verifyToken;
