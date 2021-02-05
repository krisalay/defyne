import fs from "fs";
import { promisify } from "util";

import * as logger from "./logger";

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
      logger.debug(`Updating file: ${newFilepath}`);
    }
    if (!fileExists) {
      logger.debug(`Creating file: ${newFilepath}`);
    }
  } catch (e) {
    logger.showError(e);
  }
}

export const readFile = async (filepath: string): Promise<string> => {
  const content: string = await promisify(fs.readFile)(filepath, { encoding: "utf8" });
  return content;
}

export const appendFile = async (filepath: string, dataToAppend: string): Promise<void> => {
  await promisify(fs.appendFile)(filepath, dataToAppend);
}
