export default {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx"],
};
