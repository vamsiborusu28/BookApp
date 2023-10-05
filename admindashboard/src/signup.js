
import { Card,Button,Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";

function SignUp(){


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    async function addUser(event){
        event.preventDefault();
      const data= await fetch("http://localhost:5000/admin/signup",{
            method:"POST",
            body:JSON.stringify({
                username:email,
                password
            }),
            headers:{
                "Content-type":"application/json"
            }
        }).then((response) => response.json()).then(data => data);
        console.log(data);
        localStorage.setItem("token",data.token);
        setEmail('');
        setPassword('');
        navigate("/");


    }
    return(
        <>
            <Typography variant="h4" style={{textAlign:'center',marginTop:'5%'}}>New User Sign up Here </Typography>
            <Card variant="outlined" style={{
                width:"40vw",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                margin:"5% 25%",
                padding:"4vh 5vw"
        }}>
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth onChange={event => setEmail(event.target.value)}/>
            <br></br>
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth onChange= {event => setPassword(event.target.value)} />
            <br></br>
            <Button variant="contained" size={"large"} onClick={addUser}>
                    SignUp
            </Button>
            </Card>
        </>
    )
}


export default SignUp;