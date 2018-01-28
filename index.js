import { getOptions } from 'loader-utils';

module.exports = function(source) {
  var options = getOptions(this);
  
  var data;
  var config = '';
  var output = '';
  var module;
  var moduleName = options.moduleName || 'app.constants';
  var configKey = options.configKey;
  var createModule = !!options.createModule
  
  try {
    data = JSON.parse(source);
  } catch (e) {
    throw new Error(this.resourcePath + ' must be a valid json object');
  }

  // reduce data down to requested key
  var parts = configKey.split('.');
  for (var i = 0, l = parts.length; i < l; ++i) {
    if (data[parts[i]]) {
      data = data[parts[i]];
    } else {
      data = null
      break;
    }
  }

  if (data) {
    module = 'angular.module("' + moduleName + '"' + (createModule ? ', []' : '') + ')';
    Object.keys(data).forEach(function(key) {
      module += '\n  .constant("' + key + '", ' + JSON.stringify(data[key], undefined, 0) + ')';
    })
    module += ';\n';
    
    if (options.wrap) {
      if (typeof options.wrap === 'string' && (options.wrap.toUpperCase() === 'ES6')) {
        output = 'import angular from "angular";\nexport default ' + module;
      } else if (typeof options.wrap === 'string') {
        output = options.wrap.replace('NG-PACKAGE-CONTENT', module);
      } else {
        output = '(function () { \n return ' + module + '\n})();\n';
      }
    } else {
      output = module;
    }
    return output;
  }
}
