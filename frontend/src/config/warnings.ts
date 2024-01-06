const consoleWarn = console.warn;
const SUPPRESSED_WARNINGS = ["AnnotationLayer", "%c%s %s", "%c%s"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.warn = function filterWarnings(msg: string, ...args: any[]) {
  if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
    consoleWarn(msg, ...args);
  }
};
