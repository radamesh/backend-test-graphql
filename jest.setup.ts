import {Logger} from "./src/server";

global.beforeAll(() => {
  Logger.silent = true;
});
