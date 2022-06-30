const express = require("express");
const app = express();

app.use((req, res)=> {
    console.log("WE GOT A NEW REQUEST");
    res.send("<h1>This is my webpage</h1>");
})

app.get("/cats", (res,req)=>{
    console.log("CAT REQUEST!!")
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

