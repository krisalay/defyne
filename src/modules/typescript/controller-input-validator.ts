import * as joi from "joi";
import { StringUtility } from "../../utilities/string";

export class ControllerInputValidator {
  private static __controllerName: joi.Schema = joi.string().trim().required();
  private static __controllerEndpoint: joi.Schema = joi.string().trim().regex(/^\//).required()

  public static controllerName(input: string): string | boolean {
    const { error } = ControllerInputValidator.__controllerName.validate(input);
    if (error) {
      return error.details[0].message;
    }
    return true;
  }

  public static controllerEndpoint(input: string): string | boolean {
    const { error } = ControllerInputValidator.__controllerEndpoint.validate(input);
    if (error) {
      return error.details[0].message;
    }
    if (input.includes(" ")) {
      return "white spaces are not allowed";
    }
    return true;
  }
}
