import "styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "@auth0/nextjs-auth0";
import client from "../../apollo-client";
import { AppWrapper } from "src/context/state";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ApolloProvider>
    </UserProvider>
  );
}
export default MyApp;
