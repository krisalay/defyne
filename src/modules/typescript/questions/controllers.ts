import * as path from "path";
import inquirer from "inquirer";

import { ControllerFilename } from "../models/file";
import * as filesystem from "../../../utilities/filesystem";
import { TemplateGenerator } from "../../../utilities/template-generator";
import { StringUtility } from "../../../utilities/string";
import { InquirerOutput } from "../models/choice";
import { ControllerInputValidator } from "../controller-input-validator";

export class Controller {
  private static dir: string = "/src/controllers";

  public static async init(): Promise<void> {
    await this.generateIndex();
    await this.generateController(ControllerFilename.SAMPLE_CONTROLLER, { name: this.nameFormatter("sample"), endpoint: "/sample" });
  }

  public static async run(): Promise<void> {
    const controllerName: InquirerOutput = await this.controllerName();
    const controllerEndpoint: InquirerOutput = await this.controllerEndpoint();
    await this.generateController(StringUtility.toKebabCase(controllerName.value) + "-controller.ts", { name: this.nameFormatter(controllerName.value), endpoint: controllerEndpoint.value.toLowerCase() });
  }

  private static async generateController(filename: string, attributes: { name: string, endpoint: string }): Promise<void> {
    const template: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "controllers", "controller.template"));
    const fileContent: string = await TemplateGenerator.fill(template, attributes);
    await TemplateGenerator.createDefault(filename, fileContent, true, this.dir);
    await this.updateIndex(path.parse(filename).name);
  }

  private static async generateIndex(): Promise<void> {
    const filename: string = ControllerFilename.INDEX;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "controllers", "index.template"));
    await TemplateGenerator.createDefault(filename, fileContent, true, this.dir);
  }

  private static async updateIndex(controllerName: string): Promise<void> {
    const filename: string = ControllerFilename.INDEX;
    const file: string = await filesystem.readFile(path.join(".", this.dir, filename));
    let fileContent = `export * from "./${controllerName}";`;
    if (file.length) {
      fileContent = "\n" + fileContent;
    }
    await filesystem.appendFile(path.join(".", this.dir, filename), fileContent);
  }

  private static nameFormatter(name: string): string {
    return StringUtility.toStartCase(StringUtility.toCamelCase(name));
  }

  private static async controllerName(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the name of controller:",
        validate: ControllerInputValidator.controllerName
      }
    ]);
  }

  private static async controllerEndpoint(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the endpoint of controller:",
        validate: ControllerInputValidator.controllerEndpoint
      }
    ]);
  }
}
