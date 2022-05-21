module.exports = {
    env: {
        es2021: true,
        node: true,
        jasmine: true
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        semi: [0],
        'no-use-before-define': ['error', { functions: true, classes: true }],
        'prettier/prettier': 'error', // Means error
        'no-console': 0, // Means warning
        'no-var': 'error',
        'prefer-const': 'error'
    }
}
