import ascii from "rollup-plugin-ascii";
import node from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import * as meta from "./package.json";

const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`;

export default [
  {
    input: "index.js",
    external: Object.keys(meta.dependencies || {}).filter(key => /^d3-/.test(key)),
    output: {
      file: "dist/d3.node.js",
      format: "cjs"
    }
  },
  {
    input: "index.js",
    plugins: [
      node(),
      ascii()
    ],
    output: {
      extend: true,
      banner: copyright,
      file: "dist/d3.js",
      format: "umd",
      indent: false,
      name: "d3"
    }
  },
  {
    input: "index.js",
    plugins: [
      node(),
      ascii(),
      terser({output: {preamble: copyright}})
    ],
    output: {
      extend: true,
      file: "dist/d3.min.js",
      format: "umd",
      indent: false,
      name: "d3"
    }
  }
];
