import * as path from "path";

import { Filename } from "../models/file";
import * as filesystem from "../../../utilities/filesystem";
import { TemplateGenerator } from "../../../utilities/template-generator";

export class Dockerfile {
  public static async init(): Promise<void> {
    await this.generate();
  }

  private static async generate(): Promise<void> {
    const filename: string = Filename.DOCKERFILE;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "docker.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }
}
