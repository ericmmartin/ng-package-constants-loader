# ng-package-constants-loader

Webpack loader to generate an Angular constants module from values in your projects package.json file.

## Installation

```
npm install ng-package-constants-loader --save-dev
```

## Usage

Given a webpack config:

```javascript
module: {
  rules: [
    {
      // Let's take our config file by absolute url
      test: path.resolve(__dirname + 'package.json'),
      use: {
        loader: 'ng-package-constants-loader',
        options: {
          moduleName: 'app.constants' // name of the angular module
          configKey: 'config.all', // object to pull from package.json
          wrap: 'es6' // es6, true (default), false
        }
      }
    }
  ]
}
```

and package.json

``` json
{
...
"config": {
  "string": "my string",
  "integer": 12345,
  "object": {"one": 2, "three": ["four"]},
  "array": ["one", 2, {"three": "four"}, [5, "six"]],
  "all": {
    "string": "my string",
    "integer": 12345,
    "object": {"one": 2, "three": ["four"]},
    "array": ["one", 2, {"three": "four"}, [5, "six"]]
  }
  ...
}
```

include the `package.json` file in your project, to be loaded by Webpack:

```javascript
require('./package.json');
```

the loader will emit an angular module

``` javascript
import angular from "angular";
export default angular.module("app.constants")
  .constant("string", "my string")
  .constant("integer", 12345)
  .constant("object", {"one":2,"three":["four"]})
  .constant("array", ["one",2,{"three":"four"},[5,"six"]]);
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`moduleName`**|`{String}`|`app.constants`|The name of the Angular Module|
|**`createModule`**|`{Boolean}`|`true`|Whether or not to create a new module|
|**`configKey`**|`{String}`|``|The package.json property key to load. Can be dot a separated value|
|**`wrap`**|`{String}`|``|The format of the output. See [Wrap](#wrap) details below|

## Wrap

#### wrap: 'es6'

The loader will output an ES6 compliant Angular Module:

``` javascript
import angular from "angular";
export default angular.module("app.constants", [])
  .constant("string", "my string")
  .constant("integer", 12345)
  .constant("object", {"one":2,"three":["four"]})
  .constant("array", ["one",2,{"three":"four"},[5,"six"]]);
```

#### wrap: true

The loader will output an IIFE wrapped Angular Module:

``` javascript
(function () {
 return angular.module("app.constants", [])
  .constant("string", "my string")
  .constant("integer", 12345)
  .constant("object", {"one":2,"three":["four"]})
  .constant("array", ["one",2,{"three":"four"},[5,"six"]]);

})();
```

#### wrap: false (or no value)

The loader will output a bare Angular Module:

``` javascript
angular.module("app.constants", [])
  .constant("string", "my string")
  .constant("integer", 12345)
  .constant("object", {"one":2,"three":["four"]})
  .constant("array", ["one",2,{"three":"four"},[5,"six"]]);
```
