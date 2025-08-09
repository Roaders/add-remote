import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores(['**/dist/']),
    {
        extends: compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
            'prettier',
            'plugin:prettier/recommended',
        ),

        plugins: {
            '@typescript-eslint': typescriptEslint,
        },

        rules: {
            indent: 'off',
            semi: ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'off',

            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
        },
    },
]);
