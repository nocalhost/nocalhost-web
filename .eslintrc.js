module.exports = {
    parser: 'babel-eslint',
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        // 'airbnb-base',
        'prettier',
        'prettier/react',
    ],
    settings: {
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    },
                },
            },
        },
    },
    ignorePatterns: ['*.d.ts'],
    rules: {
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        curly: 'error',
        'no-control-regex': 0,
        'no-useless-escape': 0,
        camelcase: 0,
        'no-console': 1,
        'no-debugger': 0,
        'no-alert': 2,
        'no-var': 2,
        'no-return-assign': 0,
        'no-confusing-arrow': 0,
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        'one-var': 0,
        'react/no-danger': 2,
        'react/display-name': 0,
        'react/jsx-no-target-blank': 0,
        'global-require': 0,
        'no-trailing-spaces': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
};
