import "whatwg-fetch";
import {
  GraphQLHandler,
  GraphQLRequest,
  RestHandler,
  MockedRequest,
  DefaultRequestBody,
} from "msw";
import { setupServer as mswSetupServer } from "msw/node";
import client from "../../../apollo-client";

export const setupServer = (
  handlers: (
    | GraphQLHandler<GraphQLRequest<any>>
    | RestHandler<MockedRequest<DefaultRequestBody>>
  )[]
): void => {
  const server = mswSetupServer(...handlers);

  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "warn",
    })
  );
  beforeEach(() => {
    return client.clearStore();
  });
  afterAll(() => {
    server.close();
  });
  afterEach(() => server.resetHandlers());
};
