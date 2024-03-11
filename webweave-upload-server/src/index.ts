import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import path from "path";
import {generate} from "./utils";
import { getAllFilePaths } from "./filePathProvider";
import { UploadFile } from "./fileUploader";
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();
// import { createClient } from "redis";
// const publisher = createClient();
// publisher.connect();
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
    // console.log(files);
    files.forEach(async file=>{
        await UploadFile(file.slice(__dirname.length+1),file);
    })
    publisher.lPush("build-queue",id);
    res.status(200).json({id:id});
})

app.listen(port,()=>{console.log("listening on",port)});

