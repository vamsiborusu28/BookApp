
import { Card,Button, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    async function login(event){
        event.preventDefault();
       const token=await fetch("http://localhost:5000/admin/login",{
            method:"POST",
            headers:{
                "username":username,
                "password":password
            },
         }).then( response => response.json()).then(data => data.token);
         
         setUsername('');
         setPassword('');
         if(token){
            localStorage.setItem("token",token);
            console.log(token);
            window.location="/dashboard";
         }
    }
    return(
        <>

            <Typography variant="h4" style={{textAlign:'center',marginTop:'5%'}}>Login here</Typography>
            <Card variant="outlined" style={{
                width:"40vw",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                margin:"5% 25%",
                padding:"4vh 5vw"
            }}>

            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth onChange={event => setUsername(event.target.value)}/>
            <br></br>
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth onChange={event => setPassword(event.target.value)}/>
            <br></br>

            <Button variant="outlined" size={"large"} onClick={login} type="password">
                    Login
            </Button>
            </Card>
        </>
    )
}


export default SignIn;