const { Router } = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = Router();

//api/auth
router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Min password length 6 chrs')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong registation data'
                })
            }
            const { email, body } = req.body;

            const isUser = await User.findOne({ email });
            //Check if user exist
            if (isUser) {
                res.status(400).json({ messsage: 'User is alredy exist' })
            }

            //Register new user
            //Hasg passsword
            const hashedPass = bcrypt.hash(password, 123);
            const user = new User({ email, password: hashedPass });

            await user.save()

            res.status(201).json({ message: 'User was cteated' })





        } catch (e) {
            res.status(500).json({ messsage: 'Something went wrong' })
        }
    })

//api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()

    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data entering'
                })
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User not founde' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong password' })
            }

        } catch (e) {
            res.status(500).json({ messsage: 'Something went wrong' });
        }

    })




module.exports = router
