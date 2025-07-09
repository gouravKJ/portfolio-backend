const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());

//mongo 

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(()=>console.log("MongoDB connection failed"));

const messageschema= new mongoose.Schema({
    name: String,
    email: String,
    message: String
},{ timeStamps: true});

const Message=mongoose.model('message',messageschema);

//routes
app.post('/api/message',async(req,res)=>{
    const{name,email,message}=req.body;
    try{
        const newmessage=new Message({
            name,
            email,
            message
        });
        await newmessage.save();
        res.json(newmessage);
    }
     catch(err){
        return res.status(500).json({message: "Error saving message"});
    }
   
});

//port
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});