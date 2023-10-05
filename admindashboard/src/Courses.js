import {useEffect, useState} from 'react';
import {useNavigate } from 'react-router-dom';
import Course from './Course';

function Courses(){
    const navigate=useNavigate();
    const [courses,setCourses]=useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/admin/courses",{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
            setCourses(data);

        })
    },[])

    return(
        <>
        <section style={{
            display:"grid",
            gridTemplateColumns:"35vw 35vw",
            gap:"2vw",
            padding:"2vh 2vw",
            justifyContent:'center',
            alignItems:"center",
            backgroundColor:"black",
            width:"80vw",
            margin:"10% 10vw",
        }}>
                {
                    courses.map((course) => {
                       return <Course course={course} key={course._id}></Course>
                    })
                }
        </section>
        </>
    )
}



export default Courses;