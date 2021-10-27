import { graphql } from "msw";
import { GRAPHQL_URL } from "src/constants/urls";
import { PlaceholderImage } from "src/constants/constantImages";

interface GetProjectVariables {
  id: string;
}

interface ProjectType {
  id: string;
  name: string;
  description: string;
  plain_id: number;
  status: number;
  tags: string[];
  tech_stack?: string;
  created_at?: string;
  updated_at?: string;
  features: [
    {
      name: string;
    }
  ];
  versions: [
    {
      name: string;
      status: number;
    }
  ];
  project_technologies: [
    {
      technology: [
        {
          id: string;
          name: string;
          image_svg_url: string;
          type: string;
        }
      ];
    }
  ];
}

interface GetProjectResponse {
  projects: ProjectType[];
}

const hasura = graphql.link(GRAPHQL_URL);

export const ProjectHandlers = [
  hasura.query<GetProjectResponse, GetProjectVariables>(
    "GetProject",
    (req, res, ctx) => {
      const { id } = req.variables;
      return res(
        ctx.data({
          projects: [
            {
              id: id,
              name: "Test Project",
              description: "Test Project Description",
              plain_id: 123,
              status: 1,
              tags: ["eins", "zwei", "drei"],
              tech_stack: undefined,
              created_at: undefined,
              updated_at: undefined,
              features: [
                {
                  name: "Test Feature 1",
                },
              ],
              versions: [
                {
                  name: "Test Version 1",
                  status: 1,
                },
              ],
              project_technologies: [
                {
                  technology: [
                    {
                      id: "123",
                      name: "tech_1",
                      image_svg_url: PlaceholderImage,
                      type: "frontend",
                    },
                  ],
                },
              ],
            },
          ],
        })
      );
    }
  ),
];
