module.exports = {
  extends: ["next", "eslint-config-custom"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Disable some rules for the router package that might cause problems with our TS ignore comments
    "@typescript-eslint/ban-ts-comment": "off",
    // Allow use of NextResponse.headers which TypeScript doesn't detect properly
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off"
  },
}; 