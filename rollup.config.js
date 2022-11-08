import typescript from '@rollup/plugin-typescript';

module.exports = {
  input: './src/index.ts',
  output: {
    name: 'watchmanProcessor',
    sourcemap: true,
    format: 'cjs',
    file: 'index.js',
  },
  context: 'this',
  external: [
    'chai',
    'child_process',
    'fb-watchman',
    'fs',
    'inversify',
    'path',
    'sinon',
    'reflect-metadata',
    'tslib'
  ],
  strictDeprecations: true,
  plugins: [
    typescript(),
  ]
};
