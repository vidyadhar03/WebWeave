import express from "express";
import { S3 } from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());

const dataRoom = new S3({
  accessKeyId: process.env.access_key_id,
  secretAccessKey: process.env.secret_key_access,
  endpoint: process.env.r2_endpoint,
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});

app.get("/*", async (req, res) => {
  const host = req.hostname;

  const id = host.split(".")[0];
  // const id = "TAFLW";
  const filePath = req.path;

  const contents = await dataRoom
    .getObject({
      Bucket: "webweave",
      Key: `dist/${id}${filePath}`,
    })
    .promise();

  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";
  res.set("Content-Type", type);

  res.send(contents.Body);
});

app.listen(port, () => {
  console.log("app is listening on", { port });
});
