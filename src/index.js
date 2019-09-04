import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { ApolloClient } from "apollo-client";
import introspectionQueryResultData from "./gql/fragmentTypes.json";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { config } from "./config";

import "./index.css";
import AppContainer from "./AppContainer";

const httpLink = new HttpLink({
  uri: config.dxHost + "/modules/graphql"
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
}
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({ fragmentMatcher }),
  defaultOptions: defaultOptions,
});

const isEditing = window.parent.jahiaGWTParameters !== undefined;

const app = isEditing ? (
  <MemoryRouter>
    <AppContainer client={client} isEditing={isEditing} />
  </MemoryRouter>
) : (
  <BrowserRouter>
    <AppContainer client={client} isEditing={isEditing} />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.register();
