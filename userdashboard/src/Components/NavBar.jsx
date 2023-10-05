import { AppBar, Button, Typography } from "@mui/material";
import { useState ,useEffect} from "react";
import {useNavigate} from 'react-router-dom';



function NavBar(){

    const navigate=useNavigate();
    const [user,setUser]=useState(null);

    useEffect( () => {
        fetch("http://localhost:5000/user/me",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(async response => {
            if(response.status===200){
                const data=await response.json();
                console.log(data);
                setUser(data.username);
            }
            else{
                const data=await response.json();
                console.log(data);
            }
        })
    },[])

    return(
        <>
        <AppBar  style={{
            position:"relative",
            display:'flex',
            flexDirection:'row',
            height:"10vh",
            justifyContent:'space-around',
            alignItems:"center"
        }}>
            <Typography  variant="h5">Course App</Typography>


        {
            user===null ?  
            (<div style={{
                color:"black",
                display:"flex",
                gap:"2vw"
                }}>
                <Button variant="contained" size='large' style={{
                width:"20vw",
                alignSelf:'center',
                border:"2px solid white",
                color:"white"
                }}
                onClick={event => {
                    navigate("/signup");
                }}
                >Register</Button>
                <Button variant="contained" size='large' style={{
                width:"20vw",
                alignSelf:'center',
                border:"2px solid white"
                }}
                onClick={event => {
                    navigate("/signin");
                }}
                >Login</Button>
            </div>)
            :
            (
            <div style={{display: "flex",gap:'1vw'}}>
              <Typography variant="h5" marginRight={"20px"}>{user}</Typography>
                <div style={{marginRight: 10}}>
                <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/dashboard")
                        }}
                        style={{marginRight:'1vw',
                                backgroundColor:'green'      
                              }}
                    >Dashboard</Button>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/";
                        }}
                        style={{backgroundColor:"#B4161B",}}
                    >Logout</Button>
                </div>
             </div>
            )
        }
        </AppBar>
        </>
    )
}




export default NavBar;