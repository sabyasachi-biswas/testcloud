const express = require('express');
const router = express.Router();
const app = express();
const bodyparser = require('body-parser');
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.listen(5000, () => console.log("App running at port:",5000));

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
//Database connection
const db = mysql.createConnection({
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
db.connect((err) => {
    if (err){
        throw err;
    }
    else{
        console.log('MySQL connected...');
    }
})
module.exports = db;


//Routes
app.get('/', function(req, res) {
    res.redirect('/signup');
  });
app.get('/login', function(req, res) {
    res.render('login');
  });
app.get('/signup', function(req, res) {
    res.render('signup');
  });

//API
app.post('/signup',function(req,res){
    const{email,password} = req.body;
    console.log(email,password);
    db.query('INSERT into  user SET ?', {email:email, password:password}, (error,results)=>{
      if(error){
          console.log(error);
      } else {
          
      }});
})

app.post('/login',function(req,res){
  const{email,password} = req.body;
  console.log(email,password);
  db.query('SELECT * FROM user WHERE email= ?', [email], (error,results)=>{
    if(error){
        console.log(error);
    } else {
      if(results[0].password==password)
      {
        console.log("Password match",results[0].email);
        res.render('user',{ title: 'username', rows:results});
      }      
    }
  });
})
