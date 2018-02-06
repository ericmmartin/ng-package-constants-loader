import compiler from './compiler';

test('Verify Angular module name', async () => {
  const stats = await compiler('package.json', {
    moduleName: 'app.constants',
    configKey: 'config.all',
    wrap: 'es6',
  });

  const output = stats.toJson().modules[0].source;
  console.log(output);
});
