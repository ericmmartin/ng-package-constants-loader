import compiler from "./compiler";

test("Verify Angular module with default options", async () => {
  const stats = await compiler("package.json", {
    configKey: "config.all",
  });

  const output = stats.toJson().modules[0].source;
  expect(output).toBe(
    `angular.module("app.constants", [])\n  .constant("string", "my string")\n  .constant("integer", 12345)\n  .constant("object", {"one":2,"three":["four"]})\n  .constant("array", ["one",2,{"three":"four"},[5,"six"]]);\n`
  );
});

test("Verify Angular module with ES6 wrap option", async () => {
  const stats = await compiler("package.json", {
    configKey: "config.all",
    wrap: "es6",
  });

  const output = stats.toJson().modules[0].source;
  expect(output).toBe(
    `import angular from "angular";\nexport default angular.module("app.constants", [])\n  .constant("string", "my string")\n  .constant("integer", 12345)\n  .constant("object", {"one":2,"three":["four"]})\n  .constant("array", ["one",2,{"three":"four"},[5,"six"]]);\n`
  );
});

test("Verify error for invalid JSON", async () => {
  try {
    await compiler("invalid.json", {
      configKey: "config.all",
    });
  } catch (e) {
    expect(e.message).toMatch(/must be a valid json object/);
  }
});

test("Verify Angular module with custom module name", async () => {
  const stats = await compiler("package.json", {
    configKey: "config.all",
    moduleName: "custom.constants",
  });

  const output = stats.toJson().modules[0].source;
  expect(output).toBe(
    `angular.module("custom.constants", [])\n  .constant("string", "my string")\n  .constant("integer", 12345)\n  .constant("object", {"one":2,"three":["four"]})\n  .constant("array", ["one",2,{"three":"four"},[5,"six"]]);\n`
  );
});

test("Verify Angular module with nested config keys", async () => {
  const stats = await compiler("package.json", {
    configKey: "config.object",
  });

  const output = stats.toJson().modules[0].source;
  expect(output).toBe(
    `angular.module("app.constants", [])\n  .constant("one", 2)\n  .constant("three", ["four"]);\n`
  );
});

test("Verify Angular module with missing config key", async () => {
  const stats = await compiler("package.json", {
    configKey: "config.nonexistent",
  });

  const output = stats.toJson().modules[0].source;
  expect(output).toBe("");
});

test("Verify Angular module without creating a new module", async () => {
  const stats = await compiler("package.json", {
    configKey: "config.all",
    createModule: false,
  });

  const output = stats.toJson().modules[0].source;
  expect(output).toBe(
    `angular.module("app.constants")\n  .constant("string", "my string")\n  .constant("integer", 12345)\n  .constant("object", {"one":2,"three":["four"]})\n  .constant("array", ["one",2,{"three":"four"},[5,"six"]]);\n`
  );
});
