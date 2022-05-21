const express = require("express");
const video = require("./video");

const app = express();


app.listen(3000, ()=> console.log("App corriendo"));

app.get("/", (res, req)=>{
    res.status(200).send("Diego Montoya 617111112")
});

app.use("/api/videos", video);
