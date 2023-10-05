
import {Card,Button} from '@mui/material';
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
function ViewCourse(){

    const params=useParams();
    const [course,setCourse]=useState({});

    // console.log(params.id);
    useEffect(() => {
        fetch(`http://localhost:5000/user/course?id=${params.id}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token"),
            }
        }).then(response => response.json()).then(data =>
            { 
                console.log(data);
                if(data.course){
                    console.log(data.course);
                    setCourse(data.course);
                }
            });
    },[])


    async function purchaseCourse(event){
        event.preventDefault();
        const published=course.published;

        if(!published){
            alert("Course cannot be published");
        }
        else{
            await fetch(`http://localhost:5000/user/course?courseId=${params.id}`,{
                method:"PUT",
                headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token") 
                }
            }).then(async (response) => {
                const data=await response.json();
                console.log(data);
                if(response.status===200){
                    alert(data.message);
                }
            });
        }

    }
    return(
        <>
        <Card variant='outlined' style={{
            display:'flex',
            flexDirection:"column",
            gap:'2vh',
            padding:"2vh 2vw",
            justifyContent:"center",
            alignItems:"center",
            margin:"5% 10vw",
            boxShadow:"0 0 20px gray",
            backgroundColor:'wheat',
        }}>
                <h1>{course.title}</h1>
                <p style={{color:'gray'}}>{course.description}</p>
                <h3>Price : ${course.price}</h3>
                <img src={course.imageLink}></img>
                <label style={{
                                backgroundColor: course.published ? "green": "red",
                                color:"white",
                                border:"none",
                                padding:'1vh 1vw',
                 }}>{course.published ? "Published" :"Not Published"}</label>
                <div>
                <Button variant="outlined" size={"large"} style={{
                    backgroundColor:'black',
                    color:'green',
                }}
                onClick={purchaseCourse}
                >Purchase Course</Button>
                </div>
                
            
        </Card>
        </>
    )
}


export default ViewCourse;