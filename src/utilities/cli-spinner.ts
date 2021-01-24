import { StreamOptions } from 'inquirer';
import ora from "ora";
import * as stream from 'stream';

export class Spinner {
  public ora: ora.Ora; 
  constructor(initialText: string, stream: stream.Writable = process.stderr) {
    if (!stream) {
      this.ora = ora({ text: initialText });
    } else {
      this.ora = ora({ text: initialText, stream });
    }
  }

  public start() {
    return this.ora.start();
  }

  public changeText(text: string, color: ora.Color = "yellow") {
    this.ora.color = color;
    this.ora.text = text;
  }

  public succeed(text: string) {
    this.ora.succeed(text);
  }

  public error(text: string) {
    this.ora.fail(text);
  }
}
