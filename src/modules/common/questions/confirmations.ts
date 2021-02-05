import inquirer from "inquirer";

import { InquirerOutput } from "../models/choice";

export async function shouldOverride(message: string): Promise<InquirerOutput> {
  return inquirer.prompt([
    {
      name: "value",
      type: "confirm",
      message: message,
      default: false
    }
  ]);
}
