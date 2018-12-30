module.exports = {
  testEnvironment: 'node',
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
}