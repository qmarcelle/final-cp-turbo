module.exports = {
  extends: ["eslint-config-custom"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}; 