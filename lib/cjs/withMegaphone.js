"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withMegaphone = void 0;
function withMegaphone(baseCache, cacheId) {
    if (typeof BroadcastChannel === "undefined") {
        console.warn("BroadcastChannel API is not supported; OriginWideCache will not engage.");
        return baseCache;
    }
    const writeChannel = new BroadcastChannel(`${cacheId}::write`);
    writeChannel.onmessage = (messageEvent) => {
        baseCache.write(messageEvent.data);
    };
    const write = function write(options) {
        writeChannel.postMessage(options);
        return baseCache.write(options);
    };
    const originCache = Object.assign({}, baseCache, { write });
    Object.setPrototypeOf(originCache, Object.getPrototypeOf(baseCache));
    return originCache;
}
exports.withMegaphone = withMegaphone;
//# sourceMappingURL=withMegaphone.js.map