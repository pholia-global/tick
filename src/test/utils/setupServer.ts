import "whatwg-fetch";
// import {
//   GraphQLHandler,
//   GraphQLRequest,
//   RestHandler,
//   MockedRequest,
//   DefaultRequestBody,
// } from "msw";
import { setupServer as mswSetupServer } from "msw/node";
import client from "../../../apollo-client";

import "../__mocks__/intersectionObserverMock";
import { ProjectTechnologiesHandlers } from "../__mocks__/project-technologies";
import { TaskHandlers } from "../__mocks__/tasks";
import { SessionHandlers } from "../__mocks__/session";

export const server = mswSetupServer(
  ...ProjectTechnologiesHandlers,
  ...TaskHandlers,
  ...SessionHandlers
);

export const setupServer = (): // handlers: (
//   | GraphQLHandler<GraphQLRequest<any>>
//   | RestHandler<MockedRequest<DefaultRequestBody>>
// )[]
void => {
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
