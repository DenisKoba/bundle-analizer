module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {},
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    plugins: [
        "@typescript-eslint/eslint-plugin"
    ],
}
