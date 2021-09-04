import { ApolloProvider } from "@apollo/client";
import React from "react";
import { useClient } from "./client";
import Routing from "./routing";

function App() {
  const { client } = useClient();

  if (!client) return null;

  return (
    <ApolloProvider client={client}>
      <Routing />
    </ApolloProvider>
  );
}

export default App;
