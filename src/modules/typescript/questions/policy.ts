import * as path from "path";

import { PolicyFilename } from "../models/file";
import * as filesystem from "../../../utilities/filesystem";
import { TemplateGenerator } from "../../../utilities/template-generator";

export class Policy {
  private static dir: string = "/src/policies";

  public static async init(): Promise<void> {
    await this.generateIndex();
  }

  private static async generateIndex(): Promise<void> {
    const filename: string = PolicyFilename.INDEX;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "policies", "index.template"));
    await TemplateGenerator.createDefault(filename, fileContent, true, this.dir);
  }
}
