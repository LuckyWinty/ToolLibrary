const alias = require("rollup-plugin-alias");
const tslint = require("rollup-plugin-tslint");
const resolve = require("rollup-plugin-node-resolve"); //help find node package
const commonjs = require("rollup-plugin-commonjs"); //transform commonjs to esm
const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");
const typescript = require("rollup-plugin-typescript");

module.exports = {
  plugins: [
    alias({
      resolve: [".ts,.js"]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      )
    }),
    resolve(),
    typescript(),
    commonjs({
      include: "node_modules/**"
    }),
    tslint({
      include: ["src/**/*.ts"]
    }),
    babel({
      runtimeHelpers: true,
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
};
