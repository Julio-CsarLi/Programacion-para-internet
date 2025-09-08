const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res)=>{
    //res.send("hola mundo")
    res.sendFile("C:/Users/jcml5/OneDrive/Escritorio/Programacion para internet/Servidor/index.html")
    //res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(3000, ()=>{
    console.log("server listening on port", 3000);
});

//comando para iniciar el servidor: "npm run start"