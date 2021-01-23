#!/usr/bin/env node
import { program } from "commander";
import * as joi from "joi";

import * as logger from "./utilities/logger";
import { SUPPORTED_LOG_LEVELS } from "./constants/app";
import { Defyne } from "./defyne";
import { Response } from "./modules/typescript/questions/response";
import { Controller } from "./modules/typescript/questions/controllers";

program.version("1.0.0");

program
  .option("-i, --init", "create a new project")
  .option("-g, --generate", "generate the components in the codebase")
  .option("-r, --response", "generates the error response")
  .option("-c, --controller", "generates the controller")
  .option("-l, --log-level <logLevel>", "Enter the log level. Expected values are 'debug', 'info'");
program.parse(process.argv);

if (program.logLevel) {
  if (!SUPPORTED_LOG_LEVELS.includes(program.logLevel.toLowerCase())) {
    logger.showError("unsupported log level. Please enter one of 'debug', 'info' as log level");
    process.exit(1);
  }
  process.env.LOG_LEVEL = program.logLevel.toLowerCase();
  logger.debug("received '" + program.logLevel + "' as log level");
}

if (program.init) {
  logger.debug("initializing the project");
  Defyne();
} else if (program.generate) {
  if (program.response) {
    Response.init();
  } else if (program.controller) {
    Controller.run();
  }
}
