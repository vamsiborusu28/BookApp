import {Card,TextField,Button, Typography} from '@mui/material';
import {useState} from 'react';

function SignUp(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [token,setToken]=useState(false);

    async function signup(event){
            event.preventDefault();
            if(username==="" || password===""){
                alert("fields cannot be empty");
                return;
            }
            await fetch("http://localhost:5000/user/signup",{
                method:"POST",
                body:JSON.stringify({
                    username,
                    password
                }),
                headers:{
                    "Content-type":"application/json",
                }
            }).then(response => {
                if(response.status===201){
                    const data=response.json();
                    localStorage.setItem("token",data?.token || null);
                    alert("user Created Successfully");
                    setToken(true);
                    window.location="/signin";
                }
                else if(response.status===403){
                    alert("User Already Exists");
                }

            });

            setUsername("");
            setPassword("");
    }

    return(
        <>

            <Typography variant='h4' textAlign={'center'} margin={'5vh'} color={"white"}>New User Register Here</Typography>
            <Card variant="outlined" style={{
                backgroundColor:"black",
                width:'50vw',
                margin:"5% 20vw",
                height:"30vh",
                display:"flex",
                border:"1px solid white",
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
                required
                />
                <TextField id="outlined-basic" label="password" variant="outlined" fullWidth
                style={{
                    // margin:"0 3%",s
                    border:'1px solid white',
                    color:"#fff",
                    backgroundColor:'white',
                }}
                onChange={event => setPassword(event.target.value)}
                required
                />

            <Button variant="contained" size='large' style={{
                width:"20vw",
                alignSelf:'center'
            }}
            onClick={signup}
            >Register</Button>
            </Card>


            <div>
               token && <Typography>user Created Successfully</Typography>
            </div>
        </>
    )

}



export default SignUp;