require("dotenv").config();
import { S3 } from "aws-sdk";
import fs from "fs";

const dataRoom = new S3({
  accessKeyId: process.env.access_key_id,
  secretAccessKey: process.env.secret_key_access,
  endpoint: process.env.r2_endpoint,
});

export async function UploadFile(fileName: string, localFilePath: string) {
  const fileContent = fs.readFileSync(localFilePath);
  const response = await dataRoom
    .upload({
      Body: fileContent,
      Bucket: "webweave",
      Key: fileName,
    })
    .promise();
//   console.log(response);
}
