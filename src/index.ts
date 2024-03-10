import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import {generate} from "./utils";
import { getAllFilePaths } from "./filePathProvider";
import path from "path";
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome To Vidyadhar Hosting Services."})
})

app.post("/deploy",async(req,res)=>{
    const {repoUrl}= req.body;
    const id = generate();
    await simpleGit().clone(repoUrl,path.join(__dirname,`output/${id}`) );
    const files = getAllFilePaths(path.join(__dirname,`output/${id}`));
    console.log(files);
    res.status(200).json({id:id});
})

app.listen(port,()=>{console.log("listening on",{port})});

