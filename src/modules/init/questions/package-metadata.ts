import inquirer from "inquirer";

import { PackageMetadata, InquirerOutput } from "../models/choice";
import { InputValidator } from "../input-validator";
import * as logger from "../../../utilities/logger";

export class Package {
  public static async init(): Promise<PackageMetadata> {
    const packageName:InquirerOutput = await this.packageName();
    logger.debug(`entered ${packageName.value} as package name`);

    const packageDescription:InquirerOutput = await this.packageDescription();
    logger.debug(`entered "${packageDescription.value}" as package description`);
    
    const packageVersion:InquirerOutput = await this.packageVersion();
    logger.debug(`entered ${packageVersion.value} as package version`);
    
    const packageKeyword:InquirerOutput = await this.packageKeywords();
    logger.debug(`entered ${packageKeyword.value} as package keywords`);
    
    const packageAuthor:InquirerOutput = await this.packageAuthor();
    logger.debug(`entered ${packageAuthor.value} as package author`);

    const packageMetadata: PackageMetadata = {
      name: packageName.value.toLowerCase(),
      description: packageDescription.value,
      version: packageVersion.value,
      keywords: packageKeyword.value,
      author: packageAuthor.value
    };
    return packageMetadata;
  }

  private static packageName(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the name of project:",
        validate: InputValidator.packageName
      }
    ]);   
  }

  private static packageDescription(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the short description for the project:",
        validate: InputValidator.packageDescription
      }
    ]);   
  }

  private static packageVersion(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the version of project:",
        validate: InputValidator.packageVersion
      }
    ]);   
  }

  private static packageKeywords(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the keywords for the project:",
        validate: InputValidator.packageKeyword
      }
    ]);   
  }

  private static packageAuthor(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "input",
        message: "Enter the author for the project:",
        validate: InputValidator.packageAuthor
      }
    ]);   
  }
}
