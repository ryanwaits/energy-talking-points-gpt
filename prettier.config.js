const pluginSortImports = require('@ianvs/prettier-plugin-sort-imports');
const pluginTailwindCss = require('prettier-plugin-tailwindcss');

/** @type {import("prettier").Parser}  */
const parser = {
  ...pluginSortImports.parsers.typescript,
  parse: pluginTailwindCss.parsers.typescript.parse,
};

/** @type {import("prettier").Plugin}  */
const myPlugin = {
  parsers: {
    typescript: parser,
  },
};

/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '^@/providers/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@local/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/components/(.*)$',
    '^@/ui/(.*)$',
    '^@/hooks/(.*)$',
    '^@/styles/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: [myPlugin],
  tailwindConfig: './tailwind.config.js',
};
