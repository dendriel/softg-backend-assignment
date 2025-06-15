import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import google from 'eslint-config-google';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: ['tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 2017
      },
      globals: {
        ...globals.node,     // console, process
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...google.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'require-jsdoc': 'off',
      'max-len': ['error', { code: 100 }],
      indent: ['warn', 2],
      'linebreak-style': ['warn', 'unix'],
      'new-cap': ['error', {
        capIsNewExceptions: ['Router']
      }],
      'no-redeclare': 'off'
    }
  },
  {
    ignores: ['lib/**/*', 'node_modules/**/*', 'eslint.config.js']
  }
];