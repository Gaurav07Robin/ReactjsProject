const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

dotenv.config({path: './config.env'});

app.use(express.json());

require('./db/conn');

app.use(require('./router/auth'));

const PORT = process.env.PORT;

const middleware = (req,res,next)=> {
 console.log(`Hello my middleware`);
 next();
}

app.get('/', (req,res)=> {
    res.send(`hello world from server`);
});

app.get('/about',middleware, (req,res)=> {
    res.send(`hello world about`);
});

app.get('/contact', (req,res)=> {
    res.cookie("test","thapa");
    res.send(`hello world contact`);
});

app.get('/signin', (req,res)=> {
    
    res.send(`hello world about`);
});

app.get('/signup', (req,res)=> {
    res.send(`hello world contact`);
});





app.listen(PORT, ()=> {
    console.log(`server is running`);
})
