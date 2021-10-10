import { gql, useQuery } from "@apollo/client";
import toast from "react-hot-toast";

const GET_FEATURES = gql`
  query GetFeatures($id: uuid!) {
    projects(where: { id: { _eq: $id } }) {
      name
      status
      description
      features {
        id
        name
        status
        tags
      }
    }
  }
`;

function useFeatureData(project_id: string): any {
  const { data, loading, error, refetch } = useQuery(GET_FEATURES, {
    variables: { id: project_id },
    onError: (error) => {
      toast.error("Something went wrong 😭");
      console.log(error?.message);
    },
  });

  return { data, loading, error, refetch };
}

export default useFeatureData;
