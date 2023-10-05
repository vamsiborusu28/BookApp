import {  Button, Typography } from "@mui/material";
import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar(){
    const navigate=useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    // console.log(userEmail===true);
    // const [isLoading,setLoading]=useState(true);
    useEffect( async () => {
            const response=await fetch("http://localhost:5000/admin/me",{
                   method:"GET",
                   headers:{
                       // "Content-type":"application/json",
                       'Accept': 'application/json',
                       "Authorization":"Bearer "+localStorage.getItem("token"),
                   }
               });
           console.log(response);
           if(response.status===204){
            //    const data=await response.json();
            //    console.log(data);
               setUserEmail(true);
           }
           else{
               const data=await response.json();
               console.log(data);
           }
                

    },[])

  

    // getUser();

     if(userEmail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4
        }}>
            <div>
                <Typography variant={"h6"}>Course App</Typography>
            </div>

            
            <div style={{display: "flex",gap:'1vw'}}>
            <Typography variant="h5">{userEmail}</Typography>
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
        </div>
    } else {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4
        }}>
            <div>
                <Typography variant={"h6"}>Course App</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/signin")
                        }}
                    >Signin</Button>
                </div>
            </div>
        </div>
    }
}


export default NavBar;