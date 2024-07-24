import jwt from "jsonwebtoken";
import multer from "multer";
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import { v2 as cloudinary } from "cloudinary"; 
import Post from "../models/post.js";
import path from "path";
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'jpg', 
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});
const upload = multer({ dest: 'uploads/' })
const secret = process.env.JWT_SECRET

export const posts = [upload.single('file'), 
    async (req,res)=>{
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'File is missing' });
              }
            const {path: fileUrl}= req.file;
    
            const {token} = req.cookies;
            jwt.verify(token,secret,{},async (err,info)=>{
                if (err) throw err;
                const {title,summary,content}= req.body;
                const postDoc= await Post.create ({
                    title,
                    summary,
                    content,
                    cover: fileUrl,
                    author: info.id,
                });
                res.json(postDoc);
            });
        } catch (err) {
            console.error('Internal server error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }
    ]
    
    export const updatedPost = [upload.single('file'), 
        async (req,res)=> {
            try{
              let newPath = null;
            if (req.file){
                const {path: fileUrl}= req.file;
                newPath= fileUrl;
            }
    
            const {token}= req.cookies;
            jwt.verify(token,secret,{},async(err,info)=>{
                if (err) throw err;
                const {id,title,summary,content}=req.body;
              const postDoc= await Post.findById(id);
              if (!postDoc) {
          return res.status(404).json({ error: 'Post not found' });
        }
              const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
              if (!isAuthor){
                return res.status(400).JSON('you are not the author')
              }
         const updatedData = {
          title,
          summary,
          content,
        };
        if (newPath) {
          updatedData.cover = newPath ? newPath : postDoc.cover;
        }
          await postDoc.updateOne(updatedData);
              res.json(postDoc);   
            });
       }catch(err){
        console.error('Internal server error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
       }
      },
    ];

    export const getPost = async (req,res)=>{
        const posts = await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20);
        res.json(posts);
    }

    export const PostById = async (req,res)=>{
        const {id}= req.params;
        const post = await Post.findById(id).populate('author',['username']);
        res.json(post);
    }