import { getOptions } from "loader-utils";

export default function loader(source) {
  const options = getOptions(this);

  let data;
  let output = "";
  const moduleName = options.moduleName || "app.constants";
  const { configKey } = options;
  const createModule = options.createModule !== false;

  try {
    data = JSON.parse(source);
  } catch (e) {
    throw new Error(`${this.resourcePath} must be a valid JSON object`);
  }

  // Reduce data down to the requested key
  const parts = configKey.split(".");
  data = parts.reduce((acc, part) => acc?.[part], data);

  if (data) {
    let module = `angular.module("${moduleName}"${createModule ? ", []" : ""})`;
    Object.entries(data).forEach(([key, value]) => {
      module += `\n  .constant("${key}", ${JSON.stringify(value, null, 0)})`;
    });
    module += ";\n";

    if (options.wrap) {
      if (
        typeof options.wrap === "string" &&
        options.wrap.toUpperCase() === "ES6"
      ) {
        output = `import angular from "angular";\nexport default ${module}`;
      } else {
        output = `(function () { \n return ${module}\n})();\n`;
      }
    } else {
      output = module;
    }
  }
  return output;
}
