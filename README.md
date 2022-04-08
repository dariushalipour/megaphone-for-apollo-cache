# Megaphone for Apollo Cache

## What is it

Users change a setting using GraphQL mutation, but they don't see the effect in other tabs until they refetch GraphQL queries on the other tabs? ServiceWorker and GraphQL subscriptions are not for free? Let the sync happen solely on the browser among all the open tabs of your web application!

It also works while using multiple apollo caches running in the same application without causing any interference.

## What it isn't

It is not a library to persist cache and that will never be the purpose of `megaphone-for-apollo-cache`. However technically using a persist/restore library in addition to `megaphone-for-apollo-cache` should simply work.

## Installation

```sh
$ npm install megaphone-for-apollo-cache @apollo/client graphql
```

## Usage

Let's assume you're setting up the ApolloClient like this:

```js
export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: anOrdinaryApolloCache,
});
```

Simply wrap the apollo cache you've created in `withMegaphone` and provide a name unique to this apollo cache object, in case you multiple apollo clients and multiple apollo cache instances.

```js
import { withMegaphone } from "megaphone-for-apollo-cache";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: withMegaphone(anOrdinaryApolloCache, "anOrdinaryApolloCache"),
});
```

It's ready!

Now whenever apollo goes to write something to `anOrdinaryApolloCache` it also informs the other open tabs of your same application and they will apply the changes too.

## How it Works

`megaphone-for-apollo-cache` is relying on `BroadcastChannel` API of the browsers which enables this library to broadcast a message to all open tabs of the same origin.
