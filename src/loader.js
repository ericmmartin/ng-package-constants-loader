import { getOptions } from 'loader-utils';

export default function loader(source) {
// module.exports = function(source) {
  const options = getOptions(this);

  let data;
  let output = '';
  let module;
  const moduleName = options.moduleName || 'app.constants';
  const { configKey } = options;
  const createModule = !!options.createModule;

  try {
    data = JSON.parse(source);
  } catch (e) {
    throw new Error(`${this.resourcePath} must be a valid json object`);
  }

  // reduce data down to requested key
  const parts = configKey.split('.');
  for (let i = 0, l = parts.length; i < l; ++i) {
    if (data[parts[i]]) {
      data = data[parts[i]];
    } else {
      data = null;
      break;
    }
  }

  if (data) {
    module = `angular.module("${moduleName}"${(createModule ? ', []' : '')})`;
    Object.keys(data).forEach((key) => {
      module += `\n  .constant("${key}", ${JSON.stringify(data[key], null, 0)})`;
    });
    module += ';\n';

    if (options.wrap) {
      if (typeof options.wrap === 'string' && (options.wrap.toUpperCase() === 'ES6')) {
        output = `import angular from "angular";\nexport default ${module}`;
      } else if (typeof options.wrap === 'string') {
        output = options.wrap.replace('NG-PACKAGE-CONTENT', module);
      } else {
        output = `(function () { \n return ${module}\n})();\n`;
      }
    } else {
      output = module;
    }
  }
  return output;
}
