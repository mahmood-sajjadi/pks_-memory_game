// / <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    // ENV values are undefined or string only
    readonly REACT_APP_START_DELAY: string;
    readonly REACT_APP_DISPLAY_RESET: string;
    readonly REACT_APP_CARDS_COUNT: string;
  }
}
