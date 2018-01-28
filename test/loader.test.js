import compiler from './compiler.js';

test('Verify Angular module name', async () => {
  const stats = await compiler('config.json', {
    moduleName: 'app.constants',
    configKey: 'all'
  });
  console.log(stats);
  const output = stats.toJson().modules[0].source;
  console.log(output);
  //expect(output).toBe(`export default "Hey Alice!\\n"`);
});