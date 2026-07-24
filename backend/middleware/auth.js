const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Anauthorised, pls Login !!"
        });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {

        const verify = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verify;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }
};

module.exports = auth;