"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFilePaths = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getAllFilePaths(folderPath) {
    let response = [];
    const allFoldersAndFiles = fs_1.default.readdirSync(folderPath);
    allFoldersAndFiles.forEach((file) => {
        const fileFullPath = path_1.default.join(folderPath, file);
        if (fs_1.default.statSync(fileFullPath).isDirectory()) {
            response = response.concat(getAllFilePaths(fileFullPath));
        }
        else {
            response.push(fileFullPath);
        }
    });
    return response;
}
exports.getAllFilePaths = getAllFilePaths;
