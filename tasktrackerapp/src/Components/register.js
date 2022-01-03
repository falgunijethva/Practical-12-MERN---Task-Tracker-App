import React, { useState } from 'react';
import axios from "axios";
import{useNavigate} from 'react-router-dom'

const Register = () => {
    
    let navigate= useNavigate();
    const [email,setEmail] = useState();   
    const [password,setPassword] = useState();
    
    
   const onSubmit = (e) => {
       e.preventDefault()
       if(!email){
        alert("Please Enter Email ")
       
    }
    if(!password){
        alert("Please Enter Password")
        return;
    }

    const user ={email,password}
    axios.post('/api/registeruser',user).then((res)=>{
        console.log(res.data)
        if(res.data.code === 200){
            alert("registration successfully");
            navigate("/",{replace:false})  
        }else{
            alert("registration faild")
        }
    })
   
    setEmail("")
    setPassword("")
    }


  return (
        <>
        <h1 style={{color:'green'}}>Registration</h1>
      <form className="add-form" onSubmit={onSubmit}>
          <div className="form-control">
              <label>User Name</label>
              <input 
              type="text"
              placeholder="Enter User Email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
               />
          </div>

          <div className="form-control">
              <label>User Password</label>
              <input 
              type="password"
              placeholder="Enter User Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
               />
          </div>

         <input type="submit"  value="Register" className="btn btn-block" />
      </form>
  </>

    )
}

export default Register;
