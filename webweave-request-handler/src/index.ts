import express from "express";
import { S3 } from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3002;

app.use(express.json());

const dataRoom = new S3({
  accessKeyId: process.env.access_key_id,
  secretAccessKey: process.env.secret_key_access,
  endpoint: process.env.r2_endpoint,
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});


// app.get("/:id/*", async (req: express.Request<{ id: string }>, res) => {
//   const id = req.params.id;
//   //@ts-ignore
//   const filePath = req.params['0'] as string;

//   // console.log(`ID: ${id}`);
//   // console.log(`File Path: ${filePath}`);
//   console.log(`dist/${id}/${filePath}`)

//   const contents = await dataRoom
//     .getObject({
//       Bucket: "webweave",
//       Key: `dist/${id}/${filePath}`,
//       // Key: `dist${filePath}`,
//     })
//     .promise();

//   const type = filePath.endsWith("html")
//     ? "text/html"
//     : filePath.endsWith("css")
//     ? "text/css"
//     : "application/javascript";
//   res.set("Content-Type", type);

//   res.send(contents.Body);

// });

app.get("/*", async (req, res) => {
  const host = req.hostname;
  const id = host.split(".")[1].toUpperCase();

  const filePath = req.path;
  console.log(`dist/${id}${filePath}`);


  const contents = await dataRoom.getObject({
      Bucket: "webweave",
      Key: `dist/${id}${filePath}`
  }).promise();
  
  const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
  res.set("Content-Type", type);

  res.send(contents.Body);
});

app.listen(port, () => {
  console.log("app is listening on", { port });
});
