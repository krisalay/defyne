import * as path from "path";

import { TemplateGenerator } from "../../../utilities/template-generator";
import { PackageMetadata } from "../../init/models/choice";
import { Filename } from "../models/file";

import * as filesystem from "../../../utilities/filesystem";

export class InitializeTypescript {
  public static async init(metadata: PackageMetadata): Promise<void> {
    await this.generateEslintrc();
    await this.generateEslintignore();
    await this.generateGitAttributes();
    await this.generateGitIgnore();
    await this.generatePrettierrc();
    await this.generateTSConfig();
  }

  private static async generateEslintrc(): Promise<void> {
    const filename: string = Filename.ESLINTRC;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "eslintrc.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generateEslintignore(): Promise<void> {
    const filename: string = Filename.ESLINT_IGNORE;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "eslintignore.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generateGitAttributes(): Promise<void> {
    const filename: string = Filename.GIT_ATTRIBUTES;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "gitattributes.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generateGitIgnore(): Promise<void> {
    const filename: string = Filename.GIT_IGNORE;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "gitignore.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generatePrettierrc(): Promise<void> {
    const filename: string = Filename.PRETTIERRC;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "prettierrc.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generateTSConfig(): Promise<void> {
    const filename: string = Filename.TSCONFIG;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "tsconfig.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  // private static async generateContributing(metadata: PackageMetadata): Promise<void> {
  //   const filename: string = Filename.CONTRIBUTING;
  //   const fileContent: string = await filesystem.readFile(path.join(__dirname, "..","templates", "contributing.template"));
  //   await TemplateGenerator.createDefault(filename, TemplateGenerator.fill(fileContent, { name: metadata.name }));
  // }
}
