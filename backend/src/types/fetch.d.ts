// backend/src/types/fetch.d.ts

export { };

declare global {
    // minimal types so TS won't fail if DOM lib isn't enabled
    // (runtime is available in Node 18+ / Node 24)
    // eslint-disable-next-line no-var
    var fetch: typeof globalThis.fetch;
}
