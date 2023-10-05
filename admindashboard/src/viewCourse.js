
import { Button } from '@mui/material';
import {Card, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateCourse from './updateCourse';
function ViewCourse(){

    
   const param=useParams();
   const navigate=useNavigate();
//    console.log(param?.id);
   const [course,setCourse]=useState({});
   const [update,setUpdate]=useState(false);

   useEffect(() => {

    fetch(`http://localhost:5000/admin/course?courseId=${param.id}`,{
        method:"GET",
        headers:{
            "authorization":"Bearer "+localStorage.getItem("token"),
        }
    }).then(response => response.json()).then( (data) => {
        console.log(data);
        if(data.course){
            setCourse(data.course);

        }
    }) ;

   },[]);

   async function deleteCourse(event){
        event.preventDefault();
        await fetch(`http://localhost:5000/admin/course?courseId=${course._id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(async response =>{
            if(response.ok){
                const data=await response.json();
                console.log(data);
                navigate("/courses");
            }
            else{
                alert("Course Not Deleted");
            }
        });
   }
   if(update){
     return <UpdateCourse course={course}></UpdateCourse>
   }
    return(
        <>

        <Card variant="outlined">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <p>{course.price}</p>
            <img src={course.imageLink}></img>
            <p>{course.published}</p>
         <Button variant='outlined' onClick={(event) => setUpdate(true)}>Update Course</Button>
         <Button variant='outlined' onClick={deleteCourse}>Delete Course</Button>
        </Card>

       
        </>
    )
}


export default ViewCourse;