import { promises } from 'fs';
import inquirer from "inquirer";

import { TechStackValue, TechStackAnswer } from "../models/choice";

export async function chooseTechStack(): Promise<TechStackAnswer> {
  return inquirer.prompt([
    {
      name: "techStack",
      type: "list",
      message: "Select a technology stack:",
      choices: [{ name: "Typescript", value: TechStackValue.TYPESCRIPT }]
    }
  ]);
}
