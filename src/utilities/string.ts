export class StringUtility {
  public static toKebabCase(text: string): string {
    return text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!.map(x => x.toLowerCase()).join("-");
  }

  public static toCamelCase(text: string): string {
      return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr: string) => chr.toUpperCase())
  }

  public static toStartCase(text: string): string {
    return text.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substring(1));
  }
}
