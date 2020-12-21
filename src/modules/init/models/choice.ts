export enum TechStackValue {
  JAVASCRIPT = "Javascript",
  TYPESCRIPT = "Typescript"
}

export interface TechStackAnswer {
  techStack: TechStackValue
}

export interface InquirerOutput {
  value: string;
}

export interface PackageMetadata {
  name: string;
  version: string;
  description: string;
  keywords: string | string[];
  author: string;
}
