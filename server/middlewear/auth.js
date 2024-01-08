const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: `Unauthorized.` })
        }

        //checks if token is created with the JWT_SECRET;
        const verifyJWT = jwt.verify(token, process.env.JWT_SECRET);
        //if token has been created with the JWT_SECRET, decode the payload of the jwt

        //console.log(verifyJWT)
        req.user = verifyJWT.user;
        console.log(req.user);

        //middlewear function
        //here, next will exit the auth middlewear, and will continue with the handle function in the listRouter.
        next();

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: `Unauthorized.` })
    }
};

module.exports = auth;