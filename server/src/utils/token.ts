import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  } catch (err) {
    return { error: err.message };
  }

  if (!decodedToken.id) {
    return { error: 'jwt token invalid' };
  }

  return decodedToken;
};