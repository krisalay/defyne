#!/usr/bin/env node
import { program } from "commander";

import * as logger from "./utilities/logger";
import { SUPPORTED_LOG_LEVELS } from "./constants/app";
import { Defyne } from "./defyne";

program.version("1.0.0");

program
  .option("-i, --init", "create a new project")
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
}
