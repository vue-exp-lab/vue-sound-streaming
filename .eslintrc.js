module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    "parser": "babel-eslint",
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard',
    "eslint:recommended",
    "plugin:vue/recommended"
    // "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    "vue"
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-new": "off",
    "new-cap": "off",
    "camelcase": "off",
    "vue/jsx-uses-vars": 2,
  },
  "env": {
      "browser": true,
      "node": true
  }
}
