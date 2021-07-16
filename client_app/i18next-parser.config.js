module.exports = {
  createOldCatalogs: true, // save previous translation catalogs to the \_old folder

  lexers: {
    js: ["JavascriptLexer"], // we're writing jsx inside .js files
    jsx: ["JsxLexer"],
    default: ["JavascriptLexer"],
  },

  locales: ["en", "fr"],
  // An array of the locales in your applications

  // Namespace separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  output: "public/locales/$LOCALE/$NAMESPACE.json",
  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()

  input: [
    "src/**/*.jsx",
    "src/**/*.js",
  ],
  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file
  // Globs syntax: https://github.com/isaacs/node-glob#glob-primer
};
