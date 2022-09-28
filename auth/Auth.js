const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
    const checkAccessToken = req.header("accessToken");
    if (checkAccessToken) {
        jwt.verify(checkAccessToken, "mySecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401).json("You are not authenticated");
    }
}

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

exports.login = async (req, res) => {
    const { email } = req.body;
    try {
        await User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    message: "First create user",
                    error: "User not exist"
                });
            } else {
                const accessToken = jwt.sign({id: user._id, email: user.email}, "mySecretKey");
                res.status(200).json({
                    token: accessToken,
                    message: "Login successful",
                    user
                })
            }
        })
    } catch(err) {
        res.status(400).json({
            message: "Login not successful",
            error: console.log(err)
        })
    }
}