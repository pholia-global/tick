import { graphql } from "msw";
import { GRAPHQL_URL } from "src/constants/urls";

interface GetStackVariables {
  type: string;
}

interface TechnologyType {
  id: number;
  image_svg_url: string;
  name: string;
  __typename: string;
}

interface GetStackResponse {
  technologies: TechnologyType[];
}

interface InsertStackVariables {
  stack: {
    project_id: string;
    technology_id: string;
  }[];
}

interface AffectedRowsResponse {
  insert_project_technology: {
    affected_rows: number;
    __typename: string;
  };
}

const hasura = graphql.link(GRAPHQL_URL);

export const ProjectTechnologiesHandlers = [
  hasura.query<GetStackResponse, GetStackVariables>(
    "GetStacks",
    (req, res, ctx) => {
      const { type } = req.variables;
      if (type === "frontend") {
        return res(
          ctx.data({
            technologies: [
              {
                id: 1,
                image_svg_url: "image.png",
                name: "react",
                __typename: "technologies",
              },
              {
                id: 2,
                image_svg_url: "image.png",
                name: "vue",
                __typename: "technologies",
              },
              {
                id: 3,
                image_svg_url: "image.png",
                name: "angular",
                __typename: "technologies",
              },
            ],
          })
        );
      }
      return res(
        ctx.data({
          technologies: [
            {
              id: 1,
              image_svg_url: "image.png",
              name: "heroku",
              __typename: "technologies",
            },
            {
              id: 2,
              image_svg_url: "image.png",
              name: "aws",
              __typename: "technologies",
            },
            {
              id: 3,
              image_svg_url: "image.png",
              name: "vercel",
              __typename: "technologies",
            },
          ],
        })
      );
    }
  ),
  hasura.mutation("ResetStack", (req, res, ctx) => {
    const { project_id, type } = req.variables;
    if (project_id && (type === "frontend" || type === "backend")) {
      return res(
        ctx.data({
          delete_project_technology: {
            affected_rows: 2,
            __typename: "project_technology_mutation_response",
          },
        })
      );
    } else {
      return res(
        ctx.errors([
          {
            message: "Invalid Request variables",
            errorType: "RequestError",
          },
        ])
      );
    }
  }),
  hasura.mutation<AffectedRowsResponse, InsertStackVariables>(
    "InsertStack",
    (req, res, ctx) => {
      const { stack } = req.variables;
      if (stack.length > 0) {
        return res(
          ctx.data({
            insert_project_technology: {
              affected_rows: 2,
              __typename: "project_technology_mutation_response",
            },
          })
        );
      } else {
        return res(
          ctx.errors([
            {
              message: "Stack empty. Nothing to insert",
              errorType: "RequestError",
            },
          ])
        );
      }
    }
  ),
];
