import * as path from "path";

import { RouteFilename } from "../models/file";
import * as filesystem from "../../../utilities/filesystem";
import { TemplateGenerator } from "../../../utilities/template-generator";

export class Route {
  private static dir: string = "/src/routes";

  public static async init(): Promise<void> {
    await this.generateDecorators();
    await this.generateIndex();
  }

  private static async generateDecorators(): Promise<void> {
    const filename: string = RouteFilename.DECORATOR;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "routes", "decorators.template"));
    await TemplateGenerator.createDefault(filename, fileContent, true, this.dir);
  }

  private static async generateIndex(): Promise<void> {
    const filename: string = RouteFilename.INDEX;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "routes", "index.template"));
    await TemplateGenerator.createDefault(filename, fileContent, true, this.dir);
  }
}
