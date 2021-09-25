import { useEffect, useState, useReducer } from "react";
import { gql, useMutation } from "@apollo/client";
import Head from "next/head";
import router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
// Components
import GeneralInput from "@/components/ui/Input/GeneralInput";
import TagInput from "@/components/ui/Input/TagInput";
import LogoutButton from "@/components/navigation/LogoutButton/LogoutButton";
import BackButton from "@/components/navigation/BackButton/BackButton";
import toast, { Toaster } from "react-hot-toast";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $description: String!
    $tags: jsonb!
    $owner_github_id: String!
  ) {
    insert_projects(
      objects: {
        name: $name
        owner_github_id: $owner_github_id
        tags: $tags
        description: $description
      }
    ) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`;

const NewProject = (): JSX.Element => {
  const { user } = useUser();

  const [projectName, setProjectName] = useState("" as string);
  const [projectDescription, setProjectDescription] = useState("" as string);
  const [projectTags, setProjectTags] = useState([] as string[]);

  const [createProject, { data }] = useMutation(CREATE_PROJECT);

  useEffect(() => {
    if (data) {
      toast("Redirecting...", {
        icon: "🚀",
      });
      router.push(`/project/${data?.insert_projects?.returning[0]?.id ?? ""}`);
    }
  }, [data]);

  return (
    <div className="w-full min-h-screen bg-theme_dawn_pink-light">
      <Head>
        <title>Create Project</title>
        <meta name="description" content="Create Project on tick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <div className="w-full py-8 px-8 flex flex-col items-center md:px-24">
        <div className="w-full flex justify-between mb-4 md:w-3/4">
          <BackButton pageName="Projects" />
          <LogoutButton />
        </div>
        <div className="font-primary font-bold text-2xl text-center mb-2 md:text-5xl">
          Create Project
        </div>
        <div className="h-px w-full bg-black mb-8 md:w-3/4"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (user?.sub) {
              toast.promise(
                createProject({
                  variables: {
                    name: projectName,
                    description: projectDescription,
                    tags: projectTags,
                    owner_github_id: user?.sub,
                  },
                }),
                {
                  loading: "Creating Project...",
                  success: <b>Project Created!</b>,
                  error: <b>Error! Try a different project name</b>,
                }
              );
            }
          }}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full mb-2 md:w-96">
            <GeneralInput
              id="name"
              labelText="Name"
              type="text"
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="w-full mb-2 md:w-96">
            <GeneralInput
              id="description"
              labelText="Description"
              type="text"
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
          </div>
          <TagInput
            onSubmit={(dataList: string[]) => setProjectTags(dataList)}
          />
          <input
            type="submit"
            role="submit"
            className="w-full py-4 px-8 mt-2 bg-theme_blue text-white rounded-md font-bold cursor-pointer md:w-52"
          />
        </form>
      </div>
    </div>
  );
};

export default NewProject;
