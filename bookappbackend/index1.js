const express=require('express');
const mongoose=require('mongoose');
const JWT=require('jsonwebtoken');
const cors=require('cors');
const app=express();

app.use(express.json());
app.use(cors());

// database schema creation

//1. Admin schema usename password
const adminSchema=new mongoose.Schema({
    username:String,
    password:{
        type:String,
        required:true,
        maxLength:[12,'Paasword should not exceed 12 characters'],
    }
});


const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
            default:[]
        }
    ]
});

const courseSchema=new mongoose.Schema({
    title:String,
    description:{
        type:String,
        require:true,
        maxLength:[1500,"Course description should not exceed 150 characters"],
        default:"Book does not have any description"
    },
    price:{
        type:Number,
        require:true,
        default:500,
    },
    imageLink:String,
    published:Boolean
});

// models creation
const Admin=mongoose.model('Admin',adminSchema);
const User=mongoose.model('User',userSchema);
const Course=mongoose.model('Course',courseSchema);

// mongoose database connectivity
mongoose.connect("mongodb+srv://vamsiborusu28:jKcKaPQryVKBepfD@cluster0.vk0mcw8.mongodb.net/books",{useNewUrlParser: true, useUnifiedTopology: true, dbName: "books" });

// jwt secret key and jwt authentication
const jwtSecret='vamsiseceretkey';
const jwtAuthentication=function(req,res,next){
    const authHeader=req.headers.authorization.split(" ")[1];
    // console.log(authHeader);
    JWT.verify(authHeader,jwtSecret,function(error,user){
        if(error){
            res.status(401).json({
                message:"user is not authorized",
            });
            return;
        }
        req.user=user;
        next();
    });
}



// admin methods

app.post("/admin/signup",async function(req,res){

    // save the admin details in the database
    const {username,password}=req.body;
    if(!username || !password){
        res.status(400).json({
            message:"Fields cannot be empty",
        });
        return;
    }
    function saveDetails(admin){
        if(admin && admin.length!==0){
            console.log(admin);
            res.status(500).json({
                message:"Admin already exists in the database",
                admin
            });
            return;
        }
       
        const myAdmin=new Admin({username,password});
        console.log(myAdmin);
        myAdmin.save();
        // generate JWT Token after saving the details in the database
        const token=JWT.sign({username,role:'admin'},jwtSecret,{expiresIn:'1hr'});
        res.status(201).json({
            message:"Admin created and saved in the db successfully",
            token,
        });
    }

    await Admin.find({username}).then(saveDetails); // gives list of objects based on the condition
});



app.post("/admin/login",async function(req,res){
    const {username,password}=req.headers;
    console.log(username,password);
    if(!username || !password){
        res.status(400).json({
            message:"Fileds cannot be Empty"
        });
        return;
    }
    // authenticate the user
    async function authenticateUser(admin){
        console.log(admin);
        if(admin){
            //generate jwt token
            const token=JWT.sign({username:admin.username,role:'admin'},jwtSecret,{expiresIn:'1hr'});
            res.status(200).json({
                message:'admin authenicated successfully',
                token
            });
            return;
        }
        res.status(404).json({
            message:"admin not found or credentials invalid",
        })
    }

    await Admin.findOne({username,password}).then(authenticateUser);
});

app.get("/admin",jwtAuthentication,async function(req,res){

    async function sendDetails(admin){
        res.status(200).json(admin);
    } 

    await Admin.find().then(sendDetails);
});
app.get("/admin/me",jwtAuthentication,function(req,res){
        const username=req.user.username;
        console.log(username,typeof(username));
        res.status(200).json({
            message:"user authenticated sucessfully",
            username
        });
        return;
});
// add course
app.post("/admin/course",jwtAuthentication,async function(req,res){
    //
    const data={...req.body};
    
    async function saveCourse(course){
        console.log(course);
        if(course){
            res.status(500).json({
                message:"Course already exists"
            });
            return;
        }
        const myCourse=new Course(data);
        await myCourse.save();
        console.log(myCourse);
        res.status(201).json({
            message:"Course created and saved in the database successfully",
            courseId:myCourse.id
        })
    } 

    await Course.findOne({title:data.title}).then(saveCourse);

});


// not working prorperly
app.put("/admin/course",jwtAuthentication,async function(req,res){
    const courseId=req.query.courseId;
    const course=await Course.findByIdAndUpdate({_id:courseId},{...req.body});


    if(course){
        res.status(200).json({
            message:"Course Updated Successfuly",
        });
        return;
    }
    res.status(404).json({
        message:"Course not found"
      });
    // const course=Course.findById(id);
    /*
    if(course){
        console.log(course);
        res.status(200).json({
            message:"course is updated successfully",
        });
        return;
    }
    res.status(404).json({
        message:"course not found",
    });*/
    
});
// not working properly 
app.delete("/admin/course",jwtAuthentication,async function(req,res){
   const id=req.query.courseId;
   try{
   await Course.findByIdAndDelete({_id:id}).then((data,error)=>{
    console.log(error);
    if(error){
        console.log(error);
        res.status(404).json({
            message:"Coure cannot be deleted",

        });
        return;
    }
    res.status(200).json({
        message:"course deleted successfully",
    })
   });
   }catch(Error){
    console.error(Error);
   }
   /*
   if(course){
    console.log(course);
    res.status(200).json({
        message:"course deleted successfully",
    })
   }
   else{
    res.status(404).json({
        message:"Course cannot be deleted",
    });
   }
   */
});



app.get("/admin/courses",jwtAuthentication,async function(req,res){

    function getCourses(courses){
            res.status(200).json(courses);
    }

    await Course.find({}).then(getCourses);
})


app.get("/admin/course",jwtAuthentication,async function(req,res){
    const id=(req.query.courseId);

    async function getCourse(course){
        // console.log(course);
        if(course){
            res.status(200).json({course});
        }
        else{
            res.status(404).json({
                message:"Course Not Found"
            })
        }
    }

    try{
    await Course.findOne({_id:id}).then(getCourse);
    }catch(error){
        res.status(404).json({
            message:"failed to get data",
        })
    }
})

// user methdos
app.post("/user/signup",async function(req,res){
    const {username,password}=req.body;
       
    function saveUser(user){
        if(user && user.length!==0){
            res.status(403).json({
                message:"user already exists",
            });
            return;
        }
        const myUser=new User({username,password});
        myUser.save();
        console.log(myUser);
        const token=JWT.sign({username,role:'user'},jwtSecret,{expiresIn:'1hr'});
        res.status(201).json({
            message:"user created successfully",
            token
        });
    }

    User.find({username}).then(saveUser);

});



app.post("/user/login",async function(req,res){

    const {username,password}=req.headers;

    async function authenticateUser(user,error){
        if(error){
            res.status(403).json({
                message:"error occured while getting the user data",
            })
        }
        if(user){
            const jwtToken=JWT.sign({username,role:'user'},jwtSecret,{expiresIn:'1hr'});
            res.status(200).json({
                message:"user authenticated successfully",
                jwtToken
            });
        }
        else{
            res.status(404).json({
                message:"user details are incorrect",
            })
        }
    }


   await  User.findOne({username,password}).then(authenticateUser);
});

app.get("/user/me",jwtAuthentication,async function(req,res){
    const username=req.user.username;
    console.log(username);
    res.status(200).json({
        message:"getting users details",
        username
    });
});
app.delete("/users",jwtAuthentication,async function(req,res){
        const user=req.user;
        console.log(user);
        
        async function deleteUser(user,error){
            if(error){
                res.status(404).json({
                    message:"User cannot be deleted"
                });
            }
            if(user){
                console.log(user);
                await user.deleteOne();
                res.status(200).json({
                    message:"user is deletd successfully",
                });
            }
        }

        await User.findOne({username:user.username}).then(deleteUser);
}); 

app.get('/user/courses',jwtAuthentication,async function(req,res){

    function getCourses(courses){
        res.status(200).json(courses);
    }
    await Course.find().then(getCourses);
});

app.get("/user/course",jwtAuthentication,async function(req,res){

    const id=req.query.id;

    async function getCourse(course){
        console.log(course);
        if(course){
            res.status(200).json({
                success:true,
                course
            });
            return;
        }
       
    }


    await Course.findOne({_id:id}).then(getCourse).catch(error =>{ 
        res.status(400).json({
            message:"course not found",
        })
        console.error("Error Occued While Fetching course details"+error)
});
});
// purchase course
app.put("/user/course",jwtAuthentication,async function(req,res){
    const user=req.user;
    const courseId=req.query.courseId;
    try{
        await Course.findOne({_id:courseId}).then(async function(course){
            if(course){
                const myuser=await User.findOne({username:user.username});
                myuser.purchasedCourses.push(course);
                await myuser.save();
                res.status(200).json({
                    message:"course purchased successfully",
                })
                return;
            }
            res.status(400).json({
                message:"Course Not Found"
            });
        });
    }catch(error){
        console.error(error);
    }
});


//purchased Courses of User
app.get("/user/purchasedCourses",jwtAuthentication,async function(req,res){
    const username=req.user.username;
    const user=await User.findOne({username});
    console.log(user.purchasedCourses);
    let purchasedCourses=user?.purchasedCourses;
    purchasedCourses=purchasedCourses.map(async (courseId,index) => {
       await  Course.findOne({_id:courseId}).then(async function(course){
            if(course){
                console.log(course);
                return course;
            }
            else{
                return {};
            }
        })
    });

    res.status(200).json(purchasedCourses);
});



app.all("*", async function(req,res){
    res.status(404).json({
        message:"invalid"
    })
});

app.listen(5000,() => console.log("App running on port 5000 successfully")); 