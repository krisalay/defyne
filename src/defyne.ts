import { TechStackAnswer, TechStackValue } from "./modules/init/models/choice";
import { chooseTechStack } from "./modules/init/questions/tech-stack";
import { Package } from "./modules/init/questions/package-metadata";
import * as logger from "./utilities/logger";

export async function Defyne(): Promise<void> {
  const techStackAnswer: TechStackAnswer = await chooseTechStack();
  logger.debug("selected technology stack: " + techStackAnswer.techStack);
  await Package.init();
}
