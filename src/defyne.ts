import { TechStackAnswer, TechStackValue, PackageMetadata } from "./modules/init/models/choice";
import { chooseTechStack } from "./modules/init/questions/tech-stack";
import { Package } from "./modules/init/questions/package-metadata";
import { CommonFiles } from "./modules/common/questions/common-files";
import { InitializeTypescript } from "./modules/typescript/questions/initialize-typescript";
import * as logger from "./utilities/logger";

export async function Defyne(): Promise<void> {
  const techStackAnswer: TechStackAnswer = await chooseTechStack();
  logger.debug("selected technology stack: " + techStackAnswer.techStack);
  const packageMetadata: PackageMetadata = await Package.init();
  await CommonFiles.init(packageMetadata);
  switch (techStackAnswer.techStack) {
    case "Typescript":
      await InitializeTypescript.init(packageMetadata);
      break;
  }
}
