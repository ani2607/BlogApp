// import express  from "express";
require('dotenv').config()  
const express = require('express');
// import connection from './db/db.js'
const connection  = require('./db/db.js')
// import cors from 'cors';
const cors = require('cors');
// import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
// import cookieParser from "cookie-parser";
const cookieParser = require('cookie-parser');

const multer = require('multer');
// import multer from "multer"; // used to upload something into server to somewhere else
// import path from 'path';
const path = require('path');

// import fs from 'fs';
const fs = require('fs');


const UserModel = require('./models/user.model.js');
// import { UserModel } from "./models/user.model.js";
// import {Post} from "./models/post.model.js"
const Post = require('./models/post.model.js');



const  salt = bcrypt.genSaltSync((Number)(process.env.SALT_VALUE));
const secretKey = process.env.SECRET_KEY; // secret key for generating the token key for jwt

const uploadMiddleware = multer({dest:'uploads/'})
const port = process.env.PORT || 3000;










const app = express();
const mongoDB = async()=>{
   const result = await connection();

}
mongoDB(); // mongodb connected;

// middlewares 
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
})); // for communication between different ports

app.use(express.json()); // use to parse the json request ;
app.use(cookieParser());




app.use('/uploads', express.static(path.join(__dirname,'uploads')))



app.post('/register',async (req,res,next)=>{

    const {username,password} = req.body;

    try {
        const result = await UserModel.create({
            username,
            password : bcrypt.hashSync(password,salt)
        });

        // console.log(result);
        res.json(result);

    } catch (error) {

        res.status(400);
        next();
        
    }

    
})

app.post('/login',async (req,res)=>{

    const {username,password} = req.body;
    
    const result = await UserModel.findOne({username});

    const response = bcrypt.compareSync(password,result.password); // password validation

    if(response){

         jwt.sign({username,id : result._id},secretKey,{},(err,token)=>{

            if(err){
                res.json("something went wrong");
            }

            res.status(200).cookie('token',token).json({
                username,
                id : result._id
            });
        })
    }
    else{

        // alert("wrong credentials");
        res.status(400).json("wrong credentials")
    }
})

app.get('/profile',async(req,res)=>{                                                                            
    const {token} = req.cookies;
    try {
        const result = jwt.verify(token,secretKey)
        res.status(200).json(result);
        // console.log(result);
    } catch (error) {
        res.status(400).json("error occured while validating");
        console.log("error : ",error.message);
    }

})

app.post('/logout',(req,res)=>{

    res.cookie('token','').json("ok");
})

app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{

    const {originalname,path} = req.file;
    const parts  = originalname.split('.');

    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path,path+'.'+ext);


    try {
        const {token} = req.cookies;
        const result = jwt.verify(token,secretKey)

        const {title,summary,description} = req.body;
    
    
    
        const postDoc = await Post.create({
            title,
            summary,
            description,
            coverImage : newPath,
            author : result.id,
        })
        

    } catch (error) {
        console.log("error",error.message);
    }

   

    // res.json(postDoc);
    



    res.status(200).json("ok");

})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
  
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
  
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }
  
    const { token } = req.cookies;
  
    jwt.verify(token, secretKey, {}, async (err, info) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const { id, title, description } = req.body;
      try {
        const postDoc = await Post.findById(id);
  
        if (!postDoc) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        const isAuthor = postDoc.author.equals(info.id);
  
        if (!isAuthor) {
          return res.status(403).json({ error: 'You are not the author' });
        }
  
        postDoc.title = title;
        postDoc.description = description;
        postDoc.coverImage = newPath || postDoc.coverImage;
  
        await postDoc.save();
  
        res.json(postDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  });

app.get('/posts',async(req,res)=>{

    const arr = await Post.find().populate('author',['username']).sort({createdAt : -1});
    res.json(arr);
})

app.get('/post/:id',async(req,res)=>{

    const {id} = req.params;
    const post = await Post.findById(id).populate('author',['username']);
    // console.log(post);
    res.json(post);
})

app.delete('/delete/:id',async(req,res)=>{

    const {id} = req.params;

    
    try {
        const result = await Post.deleteOne({_id: id});

        if (result.deletedCount === 1) {
            res.json({ success: true, message: 'Document deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Document not found' });
        }
    } catch (error) {
       
        res.status(500).json({ success: false, message: 'Internal server error' });
    } 
})



app.listen(port,()=>{
    console.log(`port is listening  at port ${port}`);
})