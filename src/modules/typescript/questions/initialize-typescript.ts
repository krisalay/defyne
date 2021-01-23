import * as path from "path";
import { exec } from "child_process";

import { TemplateGenerator } from "../../../utilities/template-generator";
import { PackageMetadata } from "../../init/models/choice";
import { packages, devPackages } from "../models/packages";
import { Filename } from "../models/file";

import * as filesystem from "../../../utilities/filesystem";

import { Route } from "./route";
import { Response } from "./response";
import { Controller } from "./controllers";
import { Policy } from "./policy";

export class InitializeTypescript {
  public static async init(metadata: PackageMetadata): Promise<void> {
    await this.generateEslintrc();
    await this.generateEslintignore();
    await this.generateGitAttributes();
    await this.generateGitIgnore();
    await this.generatePrettierrc();
    await this.generateTSConfig();
    await this.generatePackageJson(metadata);
    await this.generateDotenv();

    await Route.init();
    await Response.generateBaseResponse();
    await Controller.init();
    await Policy.init();
    await this.generateHTTPServer();
    this.installDependencies();
  }

  private static async installDependencies(): Promise<void> {
    exec("npm install", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }

  private static async generateHTTPServer(): Promise<void> {
    const filename: string = Filename.HTTP;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "http.template"));
    await TemplateGenerator.createDefault(filename, fileContent, true, "/src");
  }

  private static async generateEslintrc(): Promise<void> {
    const filename: string = Filename.ESLINTRC;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "eslintrc.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generateEslintignore(): Promise<void> {
    const filename: string = Filename.ESLINT_IGNORE;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "eslintignore.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generateGitAttributes(): Promise<void> {
    const filename: string = Filename.GIT_ATTRIBUTES;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "gitattributes.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generateGitIgnore(): Promise<void> {
    const filename: string = Filename.GIT_IGNORE;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "gitignore.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generatePrettierrc(): Promise<void> {
    const filename: string = Filename.PRETTIERRC;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "prettierrc.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generateTSConfig(): Promise<void> {
    const filename: string = Filename.TSCONFIG;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "tsconfig.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }

  private static async generatePackageJson(metadata: PackageMetadata): Promise<void> {
    const filename: string = Filename.PACKAGE_JSON;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "package_json.template"));
    const parsedFileContent = JSON.parse(fileContent);
    parsedFileContent.dependencies = packages;
    parsedFileContent.devDependencies = devPackages;
    await TemplateGenerator.createDefault(filename, TemplateGenerator.fill(JSON.stringify(parsedFileContent, null, 2), {
      name: metadata.name,
      description: metadata.description,
      version: metadata.version,
      author: metadata.author
    }));
  }

  private static async generateDotenv(): Promise<void> {
    const filename: string = Filename.DOTENV;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "dotenv.template"));
    await TemplateGenerator.createDefault(filename, fileContent);
  }
}
