import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

export const register = async(req,res)=>{
    const hashedPassword= await bcrypt.hash(req.body.password,10)
    try{
        const userDoc= new User ({
            username:req.body.username,
            password: hashedPassword,
        })
        await userDoc.save()
        return res.status(200).send({message:"user added successfully"})
    }catch(err){
        return res.status(500).send({err: "Bad Request"})
    }
}

export const login = async (req,res)=>{
    try{
        const { username, password } = req.body;
    
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
    
        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) {
          return res.status(400).json({ error: 'Wrong credentials' });
        }
    
        jwt.sign({ username: user.username, id: user._id }, secret, {}, (err, token) => {
          if (err) {
            return res.status(500).json({ error: 'Token creation failed' });
          }
          res.cookie('token', token,{httpOnly : true}).json({
            username: user.username,
            id: user._id,
          });
        });
      } catch (err) {
        console.error('Internal server error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    };

export const getProfile = (req,res)=>{
    const {token}= req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, token is missing' });
      }
    jwt.verify(token,secret,{},async(err,info)=>{
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
          };
        res.json(info)
    })
}

export const logout = (req,res)=>{
   res.cookie('token','').json('ok')
}