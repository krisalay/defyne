import * as path from "path";
import { exec } from "child_process";

import { Spinner } from "../../../utilities/cli-spinner";
import { TemplateGenerator } from "../../../utilities/template-generator";
import { PackageMetadata } from "../../init/models/choice";
import { packages, devPackages } from "../models/packages";
import { Filename } from "../models/file";

import * as filesystem from "../../../utilities/filesystem";

import { Route } from "./route";
import { Response } from "./response";
import { Controller } from "./controllers";
import { Policy } from "./policy";
import { Dockerfile } from "./docker";
import { CICD } from "./CI-CD";

export class InitializeTypescript {
  private static spinner: Spinner = new Spinner("Initializing project setup");
  public static async init(metadata: PackageMetadata): Promise<void> {
    await CICD.init();
    this.spinner.start();
    this.spinner.changeText("generating .eslintrc file");
    await this.generateEslintrc();
    this.spinner.changeText("generating .eslintignore file");
    await this.generateEslintignore();
    this.spinner.changeText("generating .gitattributes file");
    await this.generateGitAttributes();
    this.spinner.changeText("generating .gitignore file");
    await this.generateGitIgnore();
    this.spinner.changeText("generating .prettierrc file");
    await this.generatePrettierrc();
    this.spinner.changeText("generating tsconfig.json file");
    await this.generateTSConfig();
    this.spinner.changeText("generating package.json file");
    await this.generatePackageJson(metadata);
    this.spinner.changeText("generating .env file");
    await this.generateDotenv();

    this.spinner.changeText("generating route files");
    await Route.init();
    this.spinner.changeText("generating response helper files");
    await Response.generateBaseResponse();
    this.spinner.changeText("generating controller files");
    await Controller.init();
    this.spinner.changeText("generating policy files");
    await Policy.init();
    this.spinner.changeText("generating http server");
    await this.generateHTTPServer();
    this.spinner.changeText("generating dockerfile");
    await Dockerfile.init();
    this.spinner.changeText("installing dependency");
    await this.installDependencies();
  }

  private static installDependencies(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec("npm install", (error, stdout, stderr) => {
        if (error) {
          this.spinner.error(error.message);
          reject(error);
        }
        this.spinner.succeed("dependency installation is successful");
        resolve();
      });
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
