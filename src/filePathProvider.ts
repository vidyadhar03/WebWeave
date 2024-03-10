import fs from "fs";
import path from "path";

export function getAllFilePaths(folderPath: string) {
  let response: string[] = [];
  const allFoldersAndFiles = fs.readdirSync(folderPath);
  allFoldersAndFiles.forEach((file) => {
    const fileFullPath = path.join(folderPath, file);
    if (fs.statSync(fileFullPath).isDirectory()) {
      response = response.concat(getAllFilePaths(fileFullPath));
    } else {
      response.push(fileFullPath);
    }
  });
  return response;
}
