import compiler from "./compiler";

test("Verify Angular module name", async () => {
  const stats = await compiler("package.json", {
    moduleName: "app.constants",
    configKey: "config.all",
    wrap: "es6",
    createModule: true,
  });

  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toMatchSnapshot(); // Use Jest snapshots for better testing
});
