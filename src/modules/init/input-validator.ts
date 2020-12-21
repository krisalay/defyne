import * as joi from "joi";

export class InputValidator {
  private static __packageName: joi.Schema = joi.string().trim().required();

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
}
