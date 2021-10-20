import { rest } from "msw";

export const SessionHandlers = [
  rest.get("/api/session", (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
