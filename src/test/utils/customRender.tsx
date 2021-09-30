import { ApolloProvider } from "@apollo/client";
import client from "../../../apollo-client";
import { ReactElement } from "react";
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";

const Wrapper: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult => {
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};
