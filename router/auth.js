const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

require('../db/conn');
const User = require("../model/schema");

router.get('/', (req, res) => {
    res.send(`Hello world from the server router from authjs`);
});

router.post('/register', async(req, res) => {
    const {name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "plz fill the boxes"});
    }else if(password != cpassword){
        return res.status(422).json({error: "password don't match"});
    }else{

    const user = new User({name, email, phone, work, password, cpassword});

    const tokenn = await user.generateAuthToken();
    console.log(tokenn);
    user.save();

    res.status(201).json({message: "user registered successfully"});
    }
});

router.post('/signin', async(req, res) => {
    try{
        let token;
        const {email, password} = req.body;
        console.log(req.body);

        if(!email || !password){
            return res.status(400).json({error:"complete properly"});
        }

        const userLogin = await User.findOne({email : email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password, cpassword);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires:new Date (Date.now() + 100000),
                httpOnly:true
            })

            if(!isMatch){
                res.status(400).json({error: "invalid Credentials"});

            }else{
                res.json({message: "user signed successfully"});
            }
        }
        else{
            return res.status(200).json({error: "Invalid credentials"});
        }

    }
    
    catch(err){
        return res.status(400).json({error:"Fill properly"});
    }

});

module.exports = router;


/*

    try{
        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(422).json({error: "Email already Exist"});

        }
        
        const user = new User({name, email, phone, work, password, cpassword});

        await user.save();

        res.status(201).json({message: "user registered successfully"});

    }catch(err){
        console.log(err);
    }
});

*/