import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const dataRoom = new S3({
  accessKeyId: process.env.access_key_id,
  secretAccessKey: process.env.secret_key_access,
  endpoint: process.env.r2_endpoint,
});

export async function fileDownloader(filepath: string) {
  const allFilesInPath = await dataRoom
    .listObjectsV2({
      Bucket: "webweave",
      Prefix: filepath,
    })
    .promise();

  const downloadPromises = (allFilesInPath.Contents || []).map(({ Key }) => {
    if (!Key) return Promise.resolve("");

    const finalOutputPath = path.join(__dirname, Key);
    const dirName = path.dirname(finalOutputPath);

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }

    const outputFile = fs.createWriteStream(finalOutputPath);

    const downloadFile = new Promise((resolve) => {
      const readStream = dataRoom
        .getObject({ Bucket: "webweave", Key })
        .createReadStream();

      readStream.pipe(outputFile);
      readStream.on("finish", () => resolve(""));
    });

    return downloadFile;
  });

  //   console.log("awaiting for promises");

  await Promise.all(downloadPromises);
}

export const uploadFinalDist = (id: string) => {
  const folderPath = path.join(__dirname, `output/${id}/dist`);
  const allFiles = getAllFilePaths(folderPath);
  allFiles.forEach((file) => {
    UploadFile(`dist/${id}/` + file.slice(folderPath.length + 1), file);
  });
};

const getAllFilePaths = (folderPath: string) => {
  let response: string[] = [];
  const allFoldersAndFiles = fs.readdirSync(folderPath);
  allFoldersAndFiles.forEach((file) => {
    const fileFullPath = path.join(folderPath, file);
    if (fs.statSync(fileFullPath).isDirectory()) {
      response = response.concat(getAllFilePaths(fileFullPath));
    } else {
      const normalizedPath = fileFullPath.replace(/\\/g, "/");
      response.push(normalizedPath);
    }
  });
  return response;
};

const UploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);
  const response = await dataRoom
    .upload({
      Body: fileContent,
      Bucket: "webweave",
      Key: fileName,
    })
    .promise();
};
