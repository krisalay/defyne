import { TemplateGenerator } from "./template-generator";
import { encrypt } from "./crypto";
import * as fiilesystem from "./filesystem";

export enum DEFYNERC_ATTRIBUTES {
  EDITOR_CONFIG = "editor-config",
  CONTRIBUTING = "contributing",
  README = "readme",
  CICD = "cicd",
  HTTP_SERVER = "http",
  ESLINTRC = "eslintrc",
  ESLINT_IGNORE = "eslint-ignore",
  GIT_ATTRIBUTES = "git-attributes",
  GIT_IGNORE = "git-ignore",
  PRETTIERRC = "prettierrc",
  TSCONFIG = "tsconfig",
  PACKAGE_JSON = "package-json",
  DOT_ENV = "dot-env"
}

export class Defynerc {
  private static FILENAME: string = ".defynerc";

  public static async generate(packageName: string): Promise<void> {
    const fileContent: string = JSON.stringify({ "hash": encrypt(JSON.stringify({ timestamp: Date.now(), name: packageName })) }, null, 2);
    await TemplateGenerator.createDefault(this.FILENAME, fileContent);
  }

  public static async update(key: string, value: string | null | boolean): Promise<void> {
    const fileContent: string = await fiilesystem.readFile(this.FILENAME);
    const parsedContent: { [key:string]: string | null | boolean | { [key: string]: string | null | boolean} } = JSON.parse(fileContent);
    parsedContent[key] = value;
    await fiilesystem.createFile("/", this.FILENAME, JSON.stringify(parsedContent, null, 2), true);
  }
}
