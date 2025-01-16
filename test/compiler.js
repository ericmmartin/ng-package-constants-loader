import path from "path";
import { createFsFromVolume, Volume } from "memfs"; // Updated memory-fs usage
import webpack from "webpack";

export default (fixture, options = {}) => {
  const compiler = webpack({
    mode: "production", // Add mode for better optimization
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

  compiler.outputFileSystem = createFsFromVolume(new Volume()); // Updated memory-fs usage

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
};
