import {Card,TextField,Button, Typography} from '@mui/material';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn(){
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    
    async function login(event){
        event.preventDefault();
        console.log(username,password);
       const data= await fetch("http://localhost:5000/user/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "username":username,
                "password":password
            },
        }).then(async response => {
            if(response.status===200){
                const data=await response.json();
                console.log(data);
                localStorage.setItem("token",data.jwtToken);
                alert(data.message);
                window.location="/dashboard";
            }
            else if(response.status===404){
                const data=await response.json()
                alert(data.message);
            }   

        });
        // console.log(data);
        setUsername("");
        setPassword("");
    }
    return(
        <>

            <Typography variant='h4' textAlign={'center'} margin={'5vh'} color={"white"}>Already a User! Login Here</Typography>

            <Card variant="outlined" style={{
                backgroundColor:"black",
                width:'50vw',
                margin:"5% 20vw",
                height:"30vh",
                border:"1px solid white",
                display:"flex",
                flexDirection:"column",
                padding:"5vh 5vw",
                // alignItems:"center",
                // justifyContent:"center",
                gap:'2vh'
            }}>
                <TextField id="outlined-basic" label="username" variant="outlined" fullWidth
                style={{
                    // margin:"0 3%",
                    border:'1px solid white',
                    color:"white",
                    backgroundColor:'white',
                }}
                onChange={event => setUsername(event.target.value)}
                />
                <TextField id="outlined-basic" label="password" variant="outlined" fullWidth
                style={{
                    // margin:"0 3%",s
                    border:'1px solid white',
                    color:"#fff",
                    backgroundColor:'white',
                }}
                onChange={event => setPassword(event.target.value)}/>

            <Button variant="contained" size='large' style={{
                width:"20vw",
                alignSelf:'center'
            }}
            onClick={login}
            >SignIn</Button>
            </Card>
        </>
    )
}



export default SignIn;