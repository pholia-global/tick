import client from "apollo-client";
import { gql } from "@apollo/client";
import { ProjectContext } from "../projectMachine";
// Query
const GET_PROJECT = gql`
  query GetProject($id: uuid!) {
    projects(where: { id: { _eq: $id } }) {
      id
      plain_id
      name
      status
      tags
      tech_stack
      description
      created_at
      updated_at
      features(limit: 5) {
        name
      }
      versions(limit: 5) {
        name
        status
      }
      project_technologies {
        technology {
          id
          name
          image_svg_url
          type
        }
      }
    }
  }
`;

async function getProjectData(context: ProjectContext) {
  const { id } = context;
  if (id) {
    const response = await client.query({
      query: GET_PROJECT,
      variables: {
        id,
      },
    });

    return response?.data?.projects[0];
  } else {
    return {};
  }
}

export default getProjectData;
