import { bgBlue, red } from "kleur";
import { ConsoleMessage } from "../constants/message";

export const debug = (message: string): void => {
  if (process.env.LOG_LEVEL === "debug") {
    console.debug(bgBlue().white("\n" + ConsoleMessage.DEBUG + message));
  }
}

export const showError = (message: string | Error | NodeJS.ErrnoException | null): void => {
  console.error(red(ConsoleMessage.ERROR) + message);
};
