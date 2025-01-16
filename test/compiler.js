import path from "path";
import Memoryfs from "memory-fs";
import webpack from "webpack";

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: path.resolve(__dirname, "package.json"),
          use: {
            loader: path.resolve(__dirname, "../src/index.js"),
            options,
          },
        },
      ],
    },
  });

  compiler.outputFileSystem = new Memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }

      // Check for webpack compilation errors
      const info = stats.toJson();
      if (stats.hasErrors()) {
        reject(new Error(info.errors.join("\n")));
      }

      // Check for compilation warnings
      if (stats.hasWarnings()) {
        console.warn(info.warnings.join("\n"));
      }

      // Resolve with the compiled stats object
      resolve(stats);
    });
  });
};
