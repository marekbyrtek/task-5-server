const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { email } = req.body;
    try {
        await User.create({
            email: email,
        }).then((user) => {
            res.status(200).json({
                message: "User created",
                user
            })
        })
    } catch(err) {
        res.status(401).json({
            message: "Account already exist",
            error: console.log(err)
        })
    }
}