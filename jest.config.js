export default {
  transform: {
    "^.+\\.js$": ["babel-jest", { configFile: "./.babelrc" }],
  },
  transformIgnorePatterns: ["/node_modules/(?!loader-utils|webpack)"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
