const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: `Unauthorized.` })
        }

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: `Unauthorized.` })
    }
};

module.exports = auth;