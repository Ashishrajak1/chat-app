import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.jwt;
  if (!token) {
    return response.status(401).send("You are not authenticated!");
  } else {
    jwt.verify(token, process.env.JWT_KEY, async (error, user) => {
      if (error) {
        return response.status(403).send("Token is not valid!");
      }
      request.userId = user.userId;
      next();
    });
  }
};
