
import './App.css';
import Login from './Components/login';
import Logout  from './Components/Logout';
import {useSelector,useDispatch} from 'react-redux';
import {login , logout } from './action'
import {useState,createContext,useEffect} from 'react';
import axios from 'axios';
import './index.css';
//import { Router } from 'express';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
//import Logout from './component/logout';
import Register from './Components/register';
import Footer from './Components/Footer';
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import About from "./Components/About";
import Update from './Components/Update';

export  const UserContext =createContext();

function App() {
  const [user,setUser]=useState([]);
  const isLogged = useSelector(state =>state.isLogged)
  const dispatch = useDispatch();

  const [tasks,setTask]=useState([]);
  const [showAddTask,setShowAddTask]=useState(false);


  const dologin =() =>{
      dispatch(login());
  }

  const dologout = () => {
    dispatch(logout());
  }

  const setUserData =(userData)=>{
      setUser(userData)
     // console.log(user)
  }

  const settaskdata = ()=>{
    axios.get("/api/list").then((res)=>{
         setTask(res.data.task);
        });
  }

  useEffect(()=>{
    axios.get("/api/list").then((res)=>{
    setTask(res.data.task);

    });
    
})
  
const deleteTask = (taskid)=>{
  axios.post("/api/deleteTask",{_id:taskid}).then(res=>{
    if(res.data.code=== 200){
      settaskdata()
    }
    else{
      alert("record not deleteted.....")
    }
  })
}
const toggleReminder = (taskid,reminder) =>{
  axios.put("/api/updatetask/reminder",{_id:taskid,reminder:reminder})
  .then((res)=>{
    settaskdata()
  })
}


  // add task
  const addTask=(task)=>{
    axios.post("/api/addtask",task).then((res)=>{
      const data=res.data;
      if(data.code === 200){
        console.log("adding task successfully")
      }else{
        console.log("something wrong ")
      }
    })
}

  return (

    <Router>

    <div className="container">

    <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAddTask={showAddTask}
          />
      <Routes>    

         {/* Login */}
        <Route path='/'
            element={
              <>
            { !isLogged ? 
            <>
                  <Login onLogin={dologin} setUserData={setUserData}/>
                  <Footer text="New user ?"
                          texttolink="Registration"
                          href="/register" />
            </> 
           :""
            } 
            </>
            }/>

            {/* registration */}
            
              <Route path='/register' 
                    element={
                      <>
                      <Register />
                      <Footer text="already have account .."
                               texttolink="Login"
                               href="/" />
                      </>
                    }
              />


<Route 
            path="/task"
            element={
              <>
               <Logout
                color="red"
                text="Logout"
                onClick={() => dispatch(logout())}/>
                
         
                {showAddTask && <AddTask onAdd={addTask} />} 
               
                {  tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                     onDelete={deleteTask}
                     onToggle={toggleReminder}
                    
                  />
                  ) : (
                  "No  Task to Show"
                )}
              </>
            }
          />

          <Route path="/updatetask/:task" element={ <Update  />} />
          </Routes>

            

    </div>
    </Router>
  );
}

export default App;
