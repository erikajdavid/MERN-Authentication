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
        );

        res.cookie("token", token, {
            httpOnly: true
        }).send();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Internal error` })
    }
});

module.exports = router;