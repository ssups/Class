import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["<rootDir>/**/*.test.(js|ts)"], //테스트 코드를 실행할 파일 이름
  moduleNameMapper: {
    // 경로의 별칭 작성
    "^@core/(.*)$": "<rootDir>/src/core/$1",
  },
  testEnvironment: "node",
  verbose: true, //터미널에서 테스트 확인할지 설정
  preset: "ts-jest",
};

export default config;
