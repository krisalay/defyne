import * as joi from "joi";

export class InputValidator {
  private static __packageName: joi.Schema = joi.string().trim().required();
  private static __packageDescription: joi.Schema = joi.string().trim().required();
  private static __packageVersion: joi.Schema = joi.string().trim().regex(/^(\d+\.)?(\d+\.)?(\d+)$/).required();
  private static __packageKeyword: joi.Schema = joi.array().items(joi.string()).min(1);
  private static __packageAuthor: joi.Schema = joi.string().required();

  public static packageName(input: string): string | boolean {
    const { error } = InputValidator.__packageName.validate(input);
    if (error) {
      return error.details[0].message;
    }
    if (input.includes(" ")) {
      return "white spaces are not allowed in project name";
    }
    return true;
  }

  public static packageDescription(input: string): string | boolean {
    const { error } = InputValidator.__packageDescription.validate(input);
    if (error) {
      return error.details[0].message;
    }
    return true;
  }

  public static packageVersion(input: string): string | boolean {
    const { error } = InputValidator.__packageVersion.validate(input);
    if (error) {
      return "please enter a valid version number";
    }
    return true;
  }

  public static packageKeyword(input: string): string | boolean {
    const keywords: string[] = input.split(",");
    const { error } = InputValidator.__packageKeyword.validate(keywords);
    if (error) {
      return "please enter comma seperated values";
    }
    return true;
  }

  public static packageAuthor(input: string): string | boolean {
    const { error } = InputValidator.__packageAuthor.validate(input);
    if (error) {
      return "please enter a valid author";
    }
    return true;
  }
}
