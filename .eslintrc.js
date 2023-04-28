module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  ignorePatterns: ['!.*', 'dist/**', 'node_modules/**', 'src/assets/vendor/**'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['prettier'],
  root: true,
};
