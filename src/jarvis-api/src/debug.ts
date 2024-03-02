import debug from "debug";
export type Debugger = debug.Debugger;

const rootNamespace = "jarvis-api";

export default {
    common: debug(`${rootNamespace}:common`),
    http: debug(`${rootNamespace}:http`),
};
