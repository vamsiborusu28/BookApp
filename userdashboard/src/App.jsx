import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignIn from './Components/signin';
import SignUp from './Components/signup';
import NavBar from './Components/NavBar';
import Dashboard from './Components/Dashboard';
import Courses from './Components/Courses';
import ViewCourse from './Components/viewCourse';
function App() {
  return (
    <>

     <Router>

          <NavBar></NavBar>
          <Routes>
            <Route path="/signin" element={<SignIn></SignIn>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            {/* <Route path='/home' element={<>Home Dashboard</>}/> */}
            <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
            <Route path="/courses" element={<Courses></Courses>}></Route>
            <Route path="/viewcourse/:id" element={<ViewCourse></ViewCourse>}></Route>
            <Route path="/purchasedcourses" element={<></>}></Route>
          </Routes>
        </Router>
    </>
  )
}

export default App
