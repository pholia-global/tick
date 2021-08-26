import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from '@auth0/nextjs-auth0';
import client from "../../apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
          <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}
export default MyApp
