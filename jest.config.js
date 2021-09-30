module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "^@/components/(.*)$": ["<rootDir>/src/components/$1"],
    "^@/context/(.*)$": ["<rootDir>/src/context/$1"],
    "^@/images/(.*)$": ["<rootDir>/public/images/$1"],
    "^@/tests/(.*)$": ["<rootDir>/src/test/$1"],
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleDirectories: ["node_modules", "src", "<rootDir>"],
};
