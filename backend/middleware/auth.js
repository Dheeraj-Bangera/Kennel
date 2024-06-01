const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ "auth_message": "unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ "auth_message": "unauthorized" });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
   
    if (!verify) {
      return res.status(401).json({ "auth_message": "unauthorized" });
    }

    req.body.userData = verify;
   
    next();
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ "auth_message": "internal server error" });
  }
};

module.exports = auth;
