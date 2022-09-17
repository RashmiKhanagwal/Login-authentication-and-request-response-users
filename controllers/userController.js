const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd"


exports.register = async(req,res) => {
    const { username,email,password,role,contact,dateOfJoining } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        await User.create({
            username,
            email,
            password: hashedPass,
            role,
            contact,
            dateOfJoining
        })
        .then((user) => {
            const maxAge = 3*60*60;
            const token = jwt.sign(
                { id: user._id, username, role: user.role },
                jwtSecret,
                {
                    expiresIn: maxAge,
                }
            );
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
            });
            res.status(201).json({msg: "user successfully created", user: user._id})
        })

        
    }catch(err){
        res.status(500).json(err)
    }
}

exports.signin = async(req,res) => {
    const {username} = req.body;
    const user = await User.findOne({ username: req.body.username });

    try{
        await bcrypt.compare(req.body.password, user.password)
        .then((result)=>{
            if (result) {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                  { id: user._id, username, role: user.role },
                  jwtSecret,
                  {
                    expiresIn: maxAge, // 3hrs in sec
                  }
                );
                res.cookie("jwt", token, {
                  httpOnly: true,
                  maxAge: maxAge * 1000, // 3hrs in ms
                });
                res.status(201).json({
                  message: "User successfully Logged in",
                  user: user._id,
                });
            } else {
                res.status(400).json({ message: "Login not succesful" });
            }
        })
    } catch(e) {
        console.log(e)
    }
}

