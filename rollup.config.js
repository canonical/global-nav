import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'postcss';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.iife,
      format: 'iife',
      name: 'canonicalGlobalNav',
      sourcemap: true,
    },
    plugins: [
      babel({
        babelrc: false,
        exclude: ['node_modules/**', 'src/**/*.scss'],
        presets: [['@babel/env', { modules: false }]],
      }),
      commonjs(),
      resolve(),
      sass({
        insert: true,
        processor: css =>
          postcss([autoprefixer, cssnano])
            .process(css, { from: undefined })
            .then(result => result.css),
      }),
      terser(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'esm',
      name: 'canonicalGlobalNav',
      sourcemap: true,
    },
    plugins: [
      babel({
        babelrc: false,
        exclude: ['node_modules/**', 'src/**/*.scss'],
        presets: [['@babel/env', { modules: false }]],
      }),
      commonjs(),
      resolve(),
      sass({
        insert: true,
        processor: css =>
          postcss([autoprefixer, cssnano])
            .process(css, { from: undefined })
            .then(result => result.css),
      }),
    ],
  },
];
