import inquirer from "inquirer";
import * as path from "path";

import { GithubCICD } from "../models/file";
import { InquirerOutput } from "../models/choice";
import * as logger from "../../../utilities/logger";
import * as filesystem from "../../../utilities/filesystem";
import { TemplateGenerator } from "../../../utilities/template-generator";

export class  CICD {
  private static dir: string = "/.github/workflows"
  public static async init(): Promise<void> {
    const cicdPlatform:InquirerOutput = await this.getCICDPlatform();
    logger.debug(`entered ${cicdPlatform.value} as CI/CD platform`);

    await this.githubCICD();
  }

  private static getCICDPlatform(): Promise<InquirerOutput> {
    return inquirer.prompt([
      {
        name: "value",
        type: "list",
        message: "Select the CI/CD environment:",
        choices: [{ name: "Github", value: "Github" }]
      }
    ]);   
  }

  private static async githubCICD(): Promise<void> {
    const filename: string = GithubCICD.BUILD;
    const fileContent: string = await filesystem.readFile(path.join(__dirname, "..", "templates", "CI-CD", "build.template"));
    await TemplateGenerator.createDefault(filename, fileContent, true, this.dir);
  }
}
