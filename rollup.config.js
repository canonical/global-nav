import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

export default {
  input: 'src/js/global.js',
  output: {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
    resolve(),
  ],
};
