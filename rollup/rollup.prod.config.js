const baseConf = require("./rollup.base");
const filesize = require("rollup-plugin-filesize");
const { uglify } = require("rollup-plugin-uglify");
const { minify } = require("uglify-es");
const path = require("path");
const { terser } = require("rollup-plugin-terser");
const { name, version, author } = require("../package.json");

const componentName = process.env.COMPONENT;
const banner =
  `${"/*!\n" + " * "}${name}.js v${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the MIT License.\n` +
  ` */`;

module.exports = [
  {
    input: path.resolve(__dirname, `../src/${componentName}/index.ts`),
    ...baseConf,
    output: [
      {
        file: path.resolve(
          __dirname,
          `../src/${componentName}/dist/${componentName}.min.js`
        ),
        format: "umd",
        name,
        banner,
        sourcemap: true
      }
    ],
    plugins: [...baseConf.plugins, uglify({}, minify), filesize()]
  },
  {
    input: path.resolve(__dirname, `../src/${componentName}/index.ts`),
    ...baseConf,
    output: {
      file: path.resolve(
        __dirname,
        `../src/${componentName}/dist/${componentName}.min.esm.js`
      ),
      format: "esm",
      banner
    },
    plugins: [...baseConf.plugins, terser(), filesize()]
  }
];
