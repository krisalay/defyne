import * as joi from "joi";
import * as httpStatus from "http-status";

export class ResponseInputValidator {
  private static __responseName: joi.Schema = joi.string().trim().required();
  private static __responseStatusCode: joi.Schema = joi.number().required();

  public static responseName(input: string): string | boolean {
    const { error } = ResponseInputValidator.__responseName.validate(input);
    if (error) {
      return error.details[0].message;
    }
    return true;
  }

  public static responseStatusCode(input: string): string | boolean {
    const { error } = ResponseInputValidator.__responseStatusCode.validate(input);
    if (error) {
      return error.details[0].message;
    }
    if (!httpStatus[input]) {
      return "Not a valid status code. Type defyne --help -r to get information about status codes";
    }
    return true;
  }
}
