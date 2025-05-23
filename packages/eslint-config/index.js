module.exports = {
  extends: [
    "next/core-web-vitals",
    "turbo",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-a11y/anchor-is-valid": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "next/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "@/**",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "@cp/**",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "@components/**",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "@features/**",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "@utils/**",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "@types/**",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "@styles/**",
            "group": "internal",
            "position": "after"
          }
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  }
};
