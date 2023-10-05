import { Card,Typography,Select,MenuItem,Button} from "@mui/material"
import TextField from "@mui/material/TextField";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
 function AddCourse(){
    const navigate=useNavigate();
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState('');
    const [published,setPublished]=useState(false);

    const addCourse=async function(event){
        event.preventDefault();
        const token=localStorage.getItem("token");
        if(token){
          await fetch("http://localhost:5000/admin/course",{
            method:"POST",
            body:JSON.stringify({
                title,
                description,
                price,
                imageLink:image,
                published
            }),
            headers:{
                "Content-type":"application/json",
                "authorization":"Bearer "+token,
            },
          }).then(response => response.json()).then(data => {
            
            console.log(data)
            alert("Course Added Successfully");
        }); 

        }
        else{
            alert("Course Not Added Successfully");
            navigate('/notfound');
        }
    }
    return(
        <>
        <Typography variant="h4" textAlign={"center"} style={{marginTop:'5%'}}>Add Course</Typography>
        <Card variant="outlined" style={{ width:"40vw",
                display:"flex",
                flexDirection:"column",
                gap:"10px",
                justifyContent:"center",
                alignItems:"center",
                margin:"3% 25%",
                padding:"4vh 5vw"}}>

            {/* // title ,description,price,imageLink,published */}
            <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth onChange={event => setTitle(event.target.value)}/>   
            <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth onChange={event => setDescription(event.target.value)}/>
            <TextField id="outlined-basic" label="price" variant="outlined" fullWidth onChange={event => setPrice(parseInt(event.target.value))}/>
            {/* <div style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                gap:"1vw"
            }}>
            <Typography variant="h6">Upload Course Image</Typography>
            <input type="file" onChange={event => {
                console.log(event.target.value);
                setFile(event.target.value);
            }}></input>
            </div> */}
            <TextField id="outlined-basic" label="Image" variant="outlined" fullWidth onChange={event => setImage(event.target.value)}/>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={published}
            label="Age" fullWidth onChange={event => setPublished(event.target.value)}>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>

            <Button variant="outlined" size={"large"} onClick={addCourse}>Add Course</Button>
        </Card>
        </>
    )

}


export default AddCourse;