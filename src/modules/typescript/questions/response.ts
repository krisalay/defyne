import * as path from "path";
import inquirer from "inquirer";
import * as httpStatus from "http-status";

import { InquirerOutput } from "../models/choice";
import { ResponseFilename } from "../models/file";
import { ResponseInputValidator } from "../response-input-validator";
import * as logger from "../../../utilities/logger";
import { StringUtility } from "../../../utilities/string";
import * as filesystem from "../../../utilities/filesystem";
import { TemplateGenerator } from "../../../utilities/template-generator";

export class Response {
  private static responseDir: string = "/src/responses";
  private static fileExtension: string = ".ts";
  public static async init(): Promise<void> {
    const responseName: InquirerOutput = await this.responseName();
    const responseStatusCode: InquirerOutput = await this.responseStatusCode();
    let responseDefaultMessage: InquirerOutput = await this.responseDefaultMessage();
    await this.generateResponse(responseName.value, responseStatusCode.value, responseDefaultMessage.value);
  }

  public static async generateBaseResponse(): Promise<void> {
    const filename: string = ResponseFilename.BASE_RESPONSE;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "responses", "base-response.template"));
    await TemplateGenerator.createDefault(filename, fileContent, true, this.responseDir);
  }

  private static async generateResponse(value: string, statusCode: string, message: string): Promise<void> {
    const filename: string = StringUtility.toKebabCase(value) + this.fileExtension;
    logger.debug(`file name generated: ${StringUtility.toKebabCase(value)}`);
    const className: string = StringUtility.toStartCase(StringUtility.toCamelCase(value));
    logger.debug(`class name generated: ${StringUtility.toStartCase(StringUtility.toCamelCase(value))}`);
    if (message.length === 0) {
      message = httpStatus[statusCode].toString();
    }
    logger.debug(`response message: ${message}`);
    const fileTemplate: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "responses", "response.template"));
    const fileContent: string = TemplateGenerator.fill(fileTemplate, { className, name: value, defaultMessage: message });
    await TemplateGenerator.createDefault(filename, fileContent, true, this.responseDir);
  }

  private static async responseName(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the name of response:",
        validate: ResponseInputValidator.responseName
      }
    ]);
  }

  private static async responseStatusCode(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the status code for response",
        validate: ResponseInputValidator.responseStatusCode
      }
    ]);
  }

  private static async responseDefaultMessage(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the default message for the response:"
      }
    ]);
  }
}
