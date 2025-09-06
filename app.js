const express=require("express");
const app=express();
const {getPgVersion}=require("./utils/database");

app.listen(3000,()=>{
    getPgVersion();
    console.log("Server started on port 3000");
});

app.use(express.json());

const shortlistroute=require("./routes/shortlistroute");
app.use("/api/shortlistCampign",shortlistroute);
