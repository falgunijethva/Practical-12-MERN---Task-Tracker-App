const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 4000
app.use(express.json())

mongoose
    .connect("mongodb://127.0.0.1:27017/tbltask")
    .then(() => console.log("Mongodb connected....") )

const userModel =require("./models/user")
const taskModel =require("./models/task")

//registration 
app.post('/api/registeruser',async(req,res)=>{
    const user = req.body
    const adduser= await userModel.create(user)
    return res.json({msg:"Registration succeesfuuly ..",userdata:adduser,code:200})

})


//login page 
app.post('/api/loginuser',async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userlist = await userModel.find({email:email,password:password})
    if(userlist.length === 1)
    {
        return res.json({msg:"login successfully...",userdata:userlist,code:200})
    }
    else{
        return res.json({msg:"login faild"})
    }

})

//get all task
app.get("/api/list",async(req,res)=> {
    const taskList = await taskModel.find();
    return res.json({task:taskList})
});


//Add task 
app.post('/api/addtask',async(req,res) => {
    const task = req.body
    const newtask = await taskModel.create(task)
    return res.json({msg:"Task successfully added..",task:newtask,code:200})
})

 
//update reminder of task
app.put("/api/updatetask/reminder",async(req,res)=>{
    const user=req.body
    const updatedUser= await taskModel.findOneAndUpdate(
        {_id:user._id},
        {reminder:user.reminder},
        {new:true}
       )
       return res.json({msg:"Updated Successfully",code:200,user:updatedUser})
})

//delete Task
app.post("/api/deleteTask",async(req,res)=>{
    const id=req.body._id;
    const deleteduser= await taskModel.findOneAndDelete({_id:id})
    return res.json({msg:"successfully deleted ....",code:200,user:deleteduser})
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))