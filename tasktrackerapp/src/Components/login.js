import React, { useState } from 'react';
import axios from 'axios';
import{useNavigate} from 'react-router-dom'

 const  Login = ({onLogin,setUserData}) => {
    let navigate= useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if(!email){
            alert("please enter a email ....")
        }
        if(!password){
            alert("please enter a Password ....")
        }

       const logdata={email:email,password:password}
       axios.post("/api/loginuser",logdata).then((res)=>{ 
        if(res.data.code===200){
            onLogin()
            setUserData(res.data.userdata)
           // console.log(res.data.user)
          //  userdata(res.data.user)
            navigate("/task")
        }
        else
        {
            alert("Please Enter Valid User name and password");
        }
    });
    }

    return (
        <div className='main'>
            <form className="add-form">
                <div className='header'>
                    <h2>Login Page  </h2> 
                </div>
                <div className="form-control">
                    <label>User Email</label>
                    <input 
                    type="text" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="Enter Email"/>
                </div>

                <div className="form-control">
                    <label>Password</label>
                    <input type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter Password"/>
                </div>
                <input type='submit' className="btn btn-block " onClick={onSubmit} value='Login' />
            </form>
        </div>
    )
}

export default Login;