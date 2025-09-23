export default {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/test/Nota.test.jsx"],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx"],
};
