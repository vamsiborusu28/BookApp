
import { useNavigate } from "react-router-dom";



function Course(props){
    const course=props.course;
    const navigate=useNavigate();
    function viewCourse(event){
        event.preventDefault();
        if(localStorage.getItem("token")){
            console.log(course._id);
            navigate(`/viewcourse/${course._id}`);
        }
    }
    return(
        <>
        <div style={{
            color:'white',
            border:'1px solid white',
            padding:'2vh 1vw'
        }} onClick={viewCourse}>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <img src={course.imageLink} style={{width:"100%"}}></img>
            <p>{course.price}</p>
            <p style={{
                color : course.published ? 'green' : 'red'
            }}>{String(course.published)}</p>
        </div>
        </>
    )
}



export default Course;