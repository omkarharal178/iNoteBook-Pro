const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Omkarisagoodboy'; //  Use .env in real apps

// ROUTE 1: Create a User using POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success , errors: errors.array() });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success ,error: "Sorry, a user with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        });

        // Generate JWT
        const data = {
            user: {
                id: user.id
            }
        };
        success =true;
        const jwtData = jwt.sign(data, JWT_SECRET);
        res.json({ user, jwtData,success  });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 2: Login using POST "/api/auth/login"

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),

], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success ,errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success , error: "please try to login with correct credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            success = false
            return res.status(400).json({ success, error: "please try to login with correct credentials" });
        }

        // Generate JWT
        const data = {
            user: {
                id: user.id
            }
        };

        const jwtData = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ user, jwtData, success });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get logged in user details using POST "/api/auth/getuser" login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        // Fetch user details from the database
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); // Exclude password from response
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
