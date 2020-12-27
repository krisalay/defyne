import * as path from "path";

import { TemplateGenerator } from "../../../utilities/template-generator";
import { Filename } from "../models/file";
import * as logger from "../../../utilities/logger";

import * as filesystem from "../../../utilities/filesystem";

export class CommonFiles {
  public static async init(): Promise<void> {
    await this.generateEditorConfig();
  }

  private static async generateEditorConfig(): Promise<void> {
    const filename: string = Filename.EDITOR_CONFIG;
    const fileContent: string = await filesystem.readFile("lib/modules/common/templates/editorconfig.template");
    await TemplateGenerator.createDefault(filename, fileContent);
  }
}
