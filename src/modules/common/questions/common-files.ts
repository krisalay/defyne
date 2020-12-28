import * as path from "path";

import { TemplateGenerator } from "../../../utilities/template-generator";
import { PackageMetadata } from "../../init/models/choice";
import { Filename } from "../models/file";

import * as filesystem from "../../../utilities/filesystem";

export class CommonFiles {
  public static async init(metadata: PackageMetadata): Promise<void> {
    await this.generateEditorConfig();
    await this.generateContributing(metadata);
    await this.generateReadme(metadata);
  }

  private static async generateEditorConfig(): Promise<void> {
    const filename: string = Filename.EDITOR_CONFIG;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "editorconfig.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generateContributing(metadata: PackageMetadata): Promise<void> {
    const filename: string = Filename.CONTRIBUTING;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "contributing.template"));
    await TemplateGenerator.createDefault(filename, TemplateGenerator.fill(fileContent, { name: metadata.name }));
  }

  private static async generateReadme(metadata: PackageMetadata): Promise<void> {
    const filename: string = Filename.README;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "readme.template"));
    await TemplateGenerator.createDefault(filename, TemplateGenerator.fill(fileContent, { name: metadata.name, description: metadata.description }));
  }
}
