const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async(req, res) => {
    const {username, password} = req.body;
    const hashpassword = await bcrypt.hash(password, 12)
    try {
        const newUser = await User.create({
            username, password: hashpassword
        });
        res.status(201).json({
             status: "success",
             data: {
                user: newUser,
             }
        })
    } catch(e) {
        res.status(400).json({
            status:"fail",
        })
    }
}

exports.login = async(req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.create(username);
        if(!user){
            res.status(404).json({
                status: "failed",
                message: "user not found"
            })            
        }
        const isCorrect =  await bcrypt.compare(password, user.password)
        if(isCorrect){
            res.satus(200).json({
                satus: "success"
            })
        } else {
            res.status(400).json({
                satus: "fail",
                message: "incorrect username or password"
            })
        }
    } catch(e) {
        res.status(400).json({
            status:"fail",
        })
    }
}