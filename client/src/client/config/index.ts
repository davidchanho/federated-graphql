import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist";
import localforage from "localforage";
import { useEffect, useState } from "react";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

const storage: any = new LocalForageWrapper(localforage);

let newPersistor = new CachePersistor({
  cache,
  storage,
  debug: true,
  trigger: "write",
});

export function useClient() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>();

  useEffect(() => {
    async function init() {
      await newPersistor.restore();
      setPersistor(newPersistor);
      setClient(
        new ApolloClient({
          link: httpLink,
          cache,
          connectToDevTools: true,
        })
      );
    }

    init().catch(console.error);
  }, []);

  return { client };
}
