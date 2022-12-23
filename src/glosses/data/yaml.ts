import YAML from "yaml";

export * from "yaml";

export const encode = (object: any, options?: any): string => YAML.stringify(object, options);
export const decode = (string: string, options?: any): any => YAML.parse(string, options);

