import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import config from '../config/config';

// initialize apollo client
export var client = new ApolloClient({
  uri: config.apiURL,
  cache: new InMemoryCache()
});

// util function to make graph ql api call through the app
export function executeQuery(graphQuery, graphData) {
  return new Promise(async (resolve, reject) => {
    client.query({
      query: gql(graphQuery),
      fetchPolicy: "network-only",
      variables: graphData,
    }).then(data => {
      resolve(data);
    }).catch(err => {
      reject()
    });
  });
}