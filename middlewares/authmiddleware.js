import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  // Get the cookie from the request
  const cookie = req.cookies.authToken;

  if (!cookie) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(cookie, process.env.ACESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  });

  // req.user= decoded;
  next();
};
