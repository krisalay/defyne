import fs from "fs";
import { promisify } from "util";

export const checkExistence = (path: string): boolean => {
  return fs.existsSync(process.cwd() + path);
}

export const mkdirp = (path: string): void => {
  const dir: boolean = checkExistence(path);
  if (!dir) {
    fs.mkdirSync(process.cwd() + path, { recursive: true });
  }
}

export const createFile = async (filepath: string, filename: string, fileContent: string, fileExists = false): Promise<void> => {
  const newFilepath: string = process.cwd() + `${filepath}/${filename}`;
  try {
    await promisify(fs.writeFile)(newFilepath, fileContent);
    if (fileExists) {
      console.log("Updating file");
    }
    if (!fileExists) {
      console.log("Creating file");
    }
  } catch (e) {
    console.error(e);
  }
}

export const readFile = async (filepath: string): Promise<string> => {
  const content: string = await promisify(fs.readFile)(filepath, { encoding: "utf8" });
  return content;
}
