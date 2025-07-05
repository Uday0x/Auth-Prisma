import express from 'express';
const app = express();

const port = 4000
app.get("/test",(req,res)=>{
    res.send("this is a testing route")
})


app.listen(port ,()=>{
    console.log(`app is listening on port ${port}`)
})