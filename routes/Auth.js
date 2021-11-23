const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//signup 
router.post('/signup', async (req, res) => {
    const confirm = await User.find({ Username: req.body.username });
    /*if (confirm) {
        res.status(400).send({ success: false, message: 'user already exists' });
    } else {*/
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const savedUser = await new User({
                username: req.body.username,
                password: hashedPass
            });
            const resultUser = await savedUser.save();
            res.status(200).send({ success: true, message: resultUser });
        } catch (error) {
            res.status(500).send({ success: true, message: error });
        }
    /*}*/
});
//login endpoint
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(400).send({ success: false, message: 'invalid username' });
        } else {
            const validate = await bcrypt.compare(req.body.password, user.password);
            if (!validate) {
                res.status(400).send({ success: false, message: 'wrong password' });
            } // const { password, ...others } = user._doc;
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = { username: user.username, time: Date() };
            const token = jwt.sign(data, jwtSecretKey);
            res.status(200).send({ success: true, token: token });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error });
    }
});
module.exports = router;