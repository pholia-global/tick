module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/test/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "^@/components/(.*)$": ["<rootDir>/src/components/$1"],
    "^@/context/(.*)$": ["<rootDir>/src/context/$1"],
    "^@/images/(.*)$": ["<rootDir>/public/images/$1"],
    "^@/tests/(.*)$": ["<rootDir>/src/test/$1"],
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleDirectories: ["node_modules", "src", "<rootDir>"],
};
