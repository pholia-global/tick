// Hook to retrieve project information from DB
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
// Context
import { useAppContext } from "src/context/state";
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

function useProjectData(project_id: string): any {
  const router = useRouter();

  const AppMachine = useAppContext();
  const { send, state }: any = AppMachine;

  const { data, loading, error, refetch } = useQuery(GET_PROJECT, {
    variables: { id: project_id },
    onError: (error) => {
      toast.error("Redirecting...");
      console.log(error?.message);
      setTimeout(() => {
        router.push("/projects");
      }, 2000);
    },
  });

  useEffect(() => {
    if (state?.context?.id !== data?.projects[0]?.id) {
      send({
        type: "SET",
        id: data?.projects[0]?.id,
        name: data?.projects[0]?.name,
        status: data?.projects[0]?.status,
        description: data?.projects[0]?.description,
      });
    }
  }, [data, send, state]);

  return { data, loading, error, refetch };
}

export default useProjectData;
