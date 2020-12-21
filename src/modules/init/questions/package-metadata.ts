import inquirer from "inquirer";

import { PackageMetadata } from "../models/choice";
import { InputValidator } from "../input-validator";

export class Package {
  public static async init() {
    const packageName:PackageMetadata = await this.packageName();
    console.log(packageName);
  }

  private static packageName(): Promise<PackageMetadata> {
    return inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Enter the name of project:",
        validate: InputValidator.packageName
      }
    ]);   
  }
}
