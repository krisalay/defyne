import * as filesystem from "./filesystem";

import { InquirerOutput } from "../modules/common/models/choice";
import { shouldOverride } from "../modules/common/questions/confirmations";

export class TemplateGenerator {
  static async createDefault(filenameWithExtension: string, fileContent: string, hasPath = false, filepath = ""): Promise<void> {
    if (hasPath) {
      filesystem.mkdirp(filepath);
    }
    const fileExists: boolean = filesystem.checkExistence(`${filepath}/${filenameWithExtension}`);
    if (!fileExists) {
      return await filesystem.createFile(filepath, filenameWithExtension, fileContent);
    }
    const override: InquirerOutput = await shouldOverride("This file already exist. Do you want to override it?");
    if (override.value === true) {
      return  await filesystem.createFile(filepath, filenameWithExtension, fileContent);
    }
  }
}
