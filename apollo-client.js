import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";

const httpLink = createHttpLink({
  uri: "https://tick-backend.hasura.app/v1/graphql",
  fetch: (...args) => fetch(...args),
});

async function fetchSession() {
  const res = await axios.get(`/api/session`);
  return res.data.session.idToken;
}

const authLink = setContext((_, { headers }) => {
  const authLinkWithHeader = fetchSession().then((token) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return authLinkWithHeader;
});

export const client = new ApolloClient({
  link: process.env.NODE_ENV === "test" ? httpLink : authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
