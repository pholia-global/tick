import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import axios from 'axios';

const httpLink = createHttpLink({
    uri: 'https://tick-backend.hasura.app/v1/graphql',
});

async function fetchSession() {
    const res = await axios.get(`${process.env.BASE_URL}/api/session`)
    return res.data.session.idToken
}

const authLink = setContext((_, { headers }) => {
    const authLinkWithHeader = fetchSession().then(token => {
        return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            }
        }
    })

    return authLinkWithHeader
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

export default client;