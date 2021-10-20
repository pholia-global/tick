import { graphql } from "msw";
import { GRAPHQL_URL } from "src/constants/urls";

interface UpdateTaskVariables {
  id: string;
  status: number;
}

interface AffectedRowsResponse {
  update_tasks: {
    affected_rows: number;
    __typename: string;
  };
}

const hasura = graphql.link(GRAPHQL_URL);

export const TaskHandlers = [
  hasura.mutation<AffectedRowsResponse, UpdateTaskVariables>(
    "UpdateTask",
    (req, res, ctx) => {
      const { status } = req.variables;

      if (status === 1 || status === 2) {
        return res(
          ctx.data({
            update_tasks: {
              affected_rows: 1,
              __typename: "tasks_mutation_response",
            },
          })
        );
      }
      return res(
        ctx.errors([
          {
            message: "Invalid Request variables",
            errorType: "RequestError",
          },
        ])
      );
    }
  ),
];
