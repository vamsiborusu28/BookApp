import {Card,TextField,Button} from '@mui/material';
import { useState } from 'react';

function UpdateCourse(props){

    const course=props.course;
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState('');
    const [published,setPublished]=useState(false);


    async function updateCourse(event){
        event.preventDefault();

        await fetch(`http://localhost:5000/admin/course?courseId=${course._id}`,{
            method:"PUT",
            body:JSON.stringify({
                title,
                description,
                price,
                imageLink:image,
                published
            }),
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token"),
            }

        }).then(response => response.json()).then(data => console.log(data));

    }
    return(
        <>
         <Card variant="outlined" style={{
            // backgroundColor:'black',
            display:'flex',
            flexDirection:"column",
            gap:'1vh',
            padding:'1vh 1vw',
            width:'60vw',
            margin:"10% 15vw",
        }}>
            <TextField label='title' fullWidth variant='outlined' style={{border:'1px solid white',color:'white'}} value={course.title} required onChange={event => setTitle(event.target.value)}></TextField>
            <TextField label='Description' fullWidth onChange={event => setDescription(event.target.value)}></TextField>
            <TextField label='Price' fullWidth value={course.price} onChange={event => setPrice(event.target.value)}></TextField>
            <TextField label="Image" fullWidth onChange={event => setImage(event.target.value)}></TextField>
            <TextField label="Published" fullWidth  onChange={event => 
                {
                    if(event.target.value==="yes"){
                        setPublished(true);
                    }
                    else{
                        setPublished(false);
                    }
                    
                }
                }></TextField>
            <Button variant='contained' size={'large'} onClick={updateCourse}>Update Course</Button>

        </Card>
        </>
    )
}


export default UpdateCourse;