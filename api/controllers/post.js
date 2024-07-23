import jwt from "jsonwebtoken";
import multer from "multer";
import fs from 'fs';
import Post from "../models/post.js";
import path from "path";


const upload = multer({ dest: 'uploads/' })
const secret = 'jwt3456cd'

export const posts = [upload.single('file'), 
    async (req,res)=>{
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'File is missing' });
              }
            const {originalname,path: filePath}= req.file;
            const parts= originalname.split('.');
            const ext=parts[parts.length-1]
            const newPath=path.join('uploads', `${path.basename(filePath)}.${ext}`);
            fs.renameSync(filePath,newPath);
    
            const {token} = req.cookies;
            jwt.verify(token,secret,{},async (err,info)=>{
                if (err) throw err;
                const {title,summary,content}= req.body;
                const postDoc= await Post.create ({
                    title,
                    summary,
                    content,
                    cover: path.basename(newPath),
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
                const {originalname,path: filePath}= req.file;
                const ext= originalname.split('.').pop();
                newPath =path.join('uploads',`${path.basename(filePath)}.${ext}`);
                fs.renameSync(filePath,newPath);
                newPath= path.basename(newPath);
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
          updatedData.cover = newPath;
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