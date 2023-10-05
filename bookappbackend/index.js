const express = require('express');
const JWT=require('jsonwebtoken');
const mongoose=require('mongoose');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];


// schema design

const adminSchema=new mongoose.Schema({
  username:String,
  password:String,
},{
  timestamps:true,
});

const courseSchema=new mongoose.Schema({
  title:String,
  description:String,
  price:Number,
  imageLink:String,
  published:Boolean
});

const userSchema=new mongoose.Schema({
  username:String,
  password:String,
  purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Course'}],
})




// defining models
const Admin=mongoose.model('Admin',adminSchema);
const User=mongoose.model('User',userSchema);
const Course=mongoose.model('Course',courseSchema);


// database mongoose.connection

mongoose.connect("mongodb+srv://vamsiborusu28:jKcKaPQryVKBepfD@cluster0.vk0mcw8.mongodb.net/courses",{
   useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });


//JWT Authentication
const jwtSecret="nithin-secret-key";

const jwtAuthentication=function(req,res,next){
  const authHeader=req.headers.authorization.split(" ")[1]; // Bearer token 
  console.log(authHeader);

  JWT.verify(authHeader,jwtSecret,function(error,user){
      if(error){
        res.status(403).json({
          message:"Not authorized",
        });
        return;
      }
      req.user=user;
      next();
  });
  // return;
}


// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const {username,password}=req.body;

  const saveAdmin=function(admin){
    console.log(admin);
    if(admin){
      res.status(403).json({
        message:"Admin Already Exists",
      });
      return;
    }
    const myAdmin=new Admin({username,password});
    myAdmin.save();
    const token=JWT.sign({username},jwtSecret,{expiresIn:'1hr'});
    res.status(200).json({
      message:"admin details are saved successfully",
      token
    });
  }
  Admin.findOne({username}).then(saveAdmin);
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const {username,password}=req.headers;
  const admin=Admin.findOne({username,password});
  if(admin){
    // console.log(admin);
    const jwtToken=JWT.sign({username},jwtSecret,{expiresIn:'1hr'});
    res.status(200).json({
      message:"Admin Authenticated Successfully",
      jwtToken
    });
    return;
  }
  res.status(404).json({
    message:"Admin Not Found",
  });
});

app.post('/admin/courses', jwtAuthentication,(req, res) => {
  // logic to create a course
  console.log(req.body);
  const data={...req.body};

  const addCourse=function(course){
    if(course){
      res.status(403).json({
        message:"course already exists",
      });
      return;
    }
    const myCourse=new Course(data);
    myCourse.save();
    res.status(200).json({
      message:"course saved successfully",
      courseId:myCourse.id,
    });
  }
  Course.findOne({title:data.title}).then(addCourse);
});

app.put('/admin/courses/',jwtAuthentication, async (req, res) => {
  // logic to edit a course
  const id=req.query.courseId;
  const course=await Course.findByIdAndUpdate(id,req.body,{new:true});
  console.log(course);
  if(course){
    res.status(200).json({
      message:"Course updated successfully",
    })
  }
  else{
    res.status(404).json({
      message:"Course Not Found",
    });
  }
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
