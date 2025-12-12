module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    settings: {
        react: {
            version: 'detect', 
        },
    },
    env: {
        browser: true,
        es2021: true,
    },
    plugins: ["react-hooks", "@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
};