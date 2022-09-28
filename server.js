const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const { register, login, verify } = require("./auth/Auth");
const User = require("./models/User");
const cors = require("cors");

app.use(cors());

const PORT = 3001;
const dbURI = "mongodb://marek:SaK5Gh5FQKn9Pfld@ac-iumnszd-shard-00-00.xv5ytxz.mongodb.net:27017,ac-iumnszd-shard-00-01.xv5ytxz.mongodb.net:27017,ac-iumnszd-shard-00-02.xv5ytxz.mongodb.net:27017/task-5?ssl=true&replicaSet=atlas-wk6ic3-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log(`Connected to port ${PORT}`)))
    .catch((err) => console.log(err));

app.post("/register", register);
app.post("/login", login);
app.get("/auth", verify, (req, res) => {
    const user = req.user;
    res.status(200).json({
        message: "It works",
        user
    })
})

app.get("/users", (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
})

app.get("/users/:userId", (req, res) => {
    const id = req.params.userId;
    User.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
})
