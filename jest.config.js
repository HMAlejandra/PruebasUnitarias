export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(css|scss|sass|less)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};