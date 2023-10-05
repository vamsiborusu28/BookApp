import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignUp from './signup';
import SignIn from './signin';
import NavBar from './NavBar';
import AddCourse from './addCourse';
import Dashboard from './Dashboard';
import Courses from './Courses';
import ViewCourse from './viewCourse';
function App(){

    return(
    <>
    
    <Router>
    <NavBar></NavBar>
    {/* <ViewCourse></ViewCourse> */}
    {/* <Dashboard></Dashboard> */}
    <Routes>
        <Route path="/notfound" element={<> <h1 style={{margin:"100px 100px"}}>Not Found Route</h1>Not Found Route wndjwn 2k2ecn</>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/addcourse" element={<AddCourse></AddCourse>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/courses" element={<Courses></Courses>}></Route>
        <Route path="/viewcourse/:id" element={<ViewCourse></ViewCourse>}></Route>
        <Route path="/users" element={<>users page</>}></Route>
        
    </Routes>
    </Router>
    </>
    );
}


export default App;