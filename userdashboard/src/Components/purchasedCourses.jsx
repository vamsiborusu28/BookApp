
import {useEffect} from 'react';


function purchasedCourses(){


    return(
        <>
            
            <section style={{
                display:"grid",
                gridTemplateColumns:'1fr 1fr 1fr',
                justifyContent:"center",
                alignItems:'center',
                color:"white", 
                gap:'2vw',
                margin:"5% 0",
                border:'1px solid gray',
                boxShadow:"0 0 10px gray",
                padding:"10vh 2vw",
            }}
            >
{/*                 
               {
                    courses.map((course) => {
                        return(<div style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            flexDirection:"column",
                            gap:"2vh",
                            boxShadow:'0 0 5px gray',
                            padding:"2vh 2vw",
                            // height:"40vh"
                        }}
                        onClick={event => {
                            navigate(`/viewcourse/${course._id}`);
                        }}
                        >
                            <h1>{course.title}</h1>
                            <p>{course.description}</p>
                            <p>Price : ${course.price}</p>
                            <img src={course.imageLink}></img>
                            <Button variant="outlined" size={"large"} style={{
                                backgroundColor: course.published ? "green": "red",
                                color:"white",
                                border:"none",
                                padding:'2vh 2vw',
                            }}>{course.published ? "Published" :"Not Published"}</Button>
                        </div>)
                    })
                } */}
            </section>
        </>
    );
}



export default purchasedCourses;