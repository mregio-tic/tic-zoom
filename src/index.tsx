import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import reportWebVitals from './reportWebVitals';
import { onError } from "@apollo/client/link/error";
import * as https from "https";
//graphql server
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => {
      console.log("GraphQL Error:", message)

      window.location.replace("/");

      return null;
    });
  }
})
const link = from([
  errorLink,
  new HttpLink({ uri: "https://tic-zoom-api.herokuapp.com/graphql" }),
])
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
