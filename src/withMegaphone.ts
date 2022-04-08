import { ApolloCache } from "@apollo/client";

export function withMegaphone<TCacheShape>(
  baseCache: ApolloCache<TCacheShape>,
  cacheId: string
): ApolloCache<TCacheShape> {
  if (typeof BroadcastChannel === "undefined") {
    console.warn(
      "BroadcastChannel API is not supported; OriginWideCache will not engage."
    );
    return baseCache;
  }

  const writeChannel = new BroadcastChannel(`${cacheId}::write`);
  writeChannel.onmessage = (messageEvent) => {
    baseCache.write(messageEvent.data);
  };

  type WriteFunction = ApolloCache<TCacheShape>["write"];
  const write: WriteFunction = function write(options) {
    writeChannel.postMessage(options);
    return baseCache.write(options);
  };

  const originCache = Object.assign({}, baseCache, { write });

  Object.setPrototypeOf(originCache, Object.getPrototypeOf(baseCache));

  return originCache;
}
