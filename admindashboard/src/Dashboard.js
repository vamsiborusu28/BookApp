
import { Button ,Card, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Dashboard(){
    const navigate=useNavigate();
    const sectionStyle={
        // width:"40vw",
        display:"grid",
        gridTemplateRows:'1fr 1fr',
        gridTemplateColumns:"1fr 1fr 1fr",
        // flexDirection:"row",
        justifyContent:"center",
        gap:'4vw',
        alignItems:"center",
        margin:"10% 0",
        padding:"0 5vw"
    }

    const cardStyle={
        display:'flex',
        justifyContent:'center',
        alignItems:"center",
        width:'20vw',
        height:'20vh',
        backgroundColor:'black',
    }

    return(
        <>
        <Typography variant="h3" style={{textAlign:"center",marginTop:'5vh'}}>Dashboard</Typography>
        <section style={sectionStyle}>
             <Card variant="outlined" style={cardStyle}><Button variant="contained" onClick={event => navigate("/addcourse")}>Add Course</Button></Card>
             <Card variant="outlined" style={cardStyle}><Button variant="contained" onClick={event => navigate("/courses")}>All Courses</Button></Card>
             <Card variant="outlined" style={cardStyle}><Button variant="contained" onClick={
                event => navigate("/users")
             }>All Users</Button></Card>
             <Card variant="outlined" style={cardStyle}><Button variant="contained">Update Course</Button></Card>
             <Card variant="outlined" style={cardStyle}><Button variant="contained">Delete Course</Button></Card>
             <Card variant="outlined" style={cardStyle}><Button variant="contained"> Admin Profile</Button></Card>
        </section>
        </>
    )
}




export default Dashboard;