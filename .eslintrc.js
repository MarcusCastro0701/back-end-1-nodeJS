/* eslint-disable no-undef */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
],
"plugins": ["@typescript-eslint", "react", "prettier"],
"parser": "@typescript-eslint/parser",
"parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
},
"rules": {
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": [1, {
    "extensions": [
      ".ts",
      ".tsx"
    ]
    }],
    "prettier/prettier": [
        "error",
        {
            "singleQuote": true,
            "trailingComma": "all",
            "arrowParens": "avoid",
            "endOfLine": "auto"
        }
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/extensions": ["error", "never"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "import/prefer-default-export": 0,
    "global-require": 0,
    "react/style-prop-object": 0
},
"ignorePatterns": [
  "node_modules/**",
  "build/**",
  "dist/**"
]
};
