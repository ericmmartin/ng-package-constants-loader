# ng-package-constants-loader

Webpack loader to generate an Angular constants module from values in your projects package.json file.

## Installation

```
npm install ng-package-config-loader --save-dev
```

## Usage

Given a webpack config

```javascript
module: {
  rules: [
    {
      // Let's take our config file by absolute url
      test: path.resolve(__dirname + 'app/env-config.json'),
      use: {
        loader: 'ng-package-constants-loader',
        options: {
          moduleName: 'app.constants' // name of the angular module
          configKey: process.env.NODE_ENV || 'development', // object to pull from package.json
          wrap: 'es6' // es6, true (default), false, or a custom string
        }
      }
    }
  ]
}
```
