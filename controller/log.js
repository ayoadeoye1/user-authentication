import logAuth from "../model/log.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRETE = process.env.SECRETE_KEY || 'ADSFlbj58975175khkabkv}}x9';

export const geh = (req, res) =>{
    res.status(201).json('hello world, good morning Nigeria');
}

export const Register = (req, res) =>{
    const {fullname, username, email, password} = req.body;
    if(!fullname || !username || !email || !password){
        return res.status(400).json({error: 'all input field are required!'})
    }
    logAuth.findOne({email: email})
    .then((dbUser)=>{
        if(dbUser){
            return res.status(400).json({error: 'user with email alrealdy exist!'})
        }
        bcrypt.hash(password, 20)
        .then((hashedPass)=>{
            const user = new logAuth({fullname, username, email, password:hashedPass});
            user.save()
            .then(()=>{
                return res.status(201).json({success: 'registered successfully'})
            })
            .catch((error)=>{
                console.log(error)
            })
        })
    })
    .catch((error)=>{
        console.log(error)
    })
}


export const Login = (req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status.json({error: "all input are required"});
    }
    logAuth.findOne({email: email})
    .then((dbUser)=>{
        if(!dbUser){
            return res.status(400).json({error: "user does not exist"})
        }
        bcrypt.compare(password, dbUser.password)
        .then((matched)=>{
            if(!matched){
                return res.status(400).json({error: "incorrect password"});
            }else{
                const userToken = jwt.sign({_id:dbUser._id, JWT_SECRETE});
                return res.status(201).json({userToken: userToken});
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    })
    .catch((error)=>{
        console.log(error);
    })
}