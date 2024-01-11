const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register/signup user

router.post("/register", async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

        //validation

        //check if all fields are filled
        if (!email || !password || !passwordVerify) {
            return res.status(400).json({ message: `All fields are required.` })
        }

        //don't want passwords that are really short
        if (password.length < 8) {
            return res.status(400).json({ message: `Password must be at least 8 characters long.` })
        }

        //check that password and passwordVerify are the same
        if (password !== passwordVerify) {
            return res.status(400).json({ message: `Passwords do not match.` })
        }

        //check that there is no other account with the same email address 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: `An account with this email already exists` });
        }

        //hash the password

        const passwordHash = await bcrypt.hash(password, 10);

        //create new User

        const newUser = new User({ email, passwordHash });

        //save new user 

        const saveNewUser = await User.create(newUser);

        //  if (saveNewUser) {
        //     return res.status(201).json({ message: `New user with email ${email} was created.` })
        //  }

        const token = jwt.sign(
            {
                user: saveNewUser._id
            },
            process.env.JWT_SECRET
            //do we need expire here?
        );

        res.cookie("token", token, {
            httpOnly: true
        }).send();

        //do we need a refresh token here?

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Internal error` })
    }
});

//login endpoint

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: `All fields are required.` })
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ message: `Wrong email or password. Please try again.` });
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if (!passwordCorrect) {
            return res.status(401).json({ message: `Wrong email or password. Please try again.` });
        }

        // Generate and send token upon successful login
        const token = jwt.sign(
            {
                user: existingUser._id
            },
            process.env.JWT_SECRET
            //should this token expire?
        );

        res.cookie("token", token, {
            httpOnly: true
        }).send();

        //do we need a refresh token here?

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

//logged in endpoint
router.get("/loggedin", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json(false);
        }

        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
    } catch (err) {
        console.log(err);
        res.json(false);
    }
});

//logout endpoint

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});



module.exports = router;