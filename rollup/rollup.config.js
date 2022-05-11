// rollup.config.js

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";


// 以下注释是为了能使用 VSCode 的类型提示
/**
 * @type { import('rollup').RollupOptions }
 */
 const buildOptions = {
    input: ["src/index.js", "src/util.js"],
    // 将 output 改造成一个数组
    output: [
        {
        dir: "dist/es",
        format: "esm",
        },
        {
        dir: "dist/cjs",
        format: "cjs",
        },
    ],
    plugins: [resolve(), commonjs()],
  };
  
  export default buildOptions;



  // rollup.config.js
/**
 * @type { import('rollup').RollupOptions }
 */
// const buildIndexOptions = {
//     input: ["src/index.js"],
//     output: [
//       // 省略 output 配置
//     ],
//   };
  
//   /**
//    * @type { import('rollup').RollupOptions }
//    */
//   const buildUtilOptions = {
//     input: ["src/util.js"],
//     output: [
//       // 省略 output 配置
//     ],
//   };
  
//   export default [buildIndexOptions, buildUtilOptions];