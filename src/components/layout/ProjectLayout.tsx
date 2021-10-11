import { useEffect } from "react";
import { useSelector } from "@xstate/react";
// Context
import { useAppContext } from "src/context/state";
// Hooks
import { useQueryParams } from "src/hooks/useQueryParams";
// Components
import Head from "next/head";
import Sidebar from "./Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

type ProjectLayoutProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
};

const ProjectLayout = ({
  children,
  title,
}: ProjectLayoutProps): JSX.Element => {
  const project = useQueryParams();

  const AppService = useAppContext();
  const activeProject = useSelector<any, any>(
    AppService,
    (state: any) => state?.context?.id
  );
  const { send }: any = AppService;

  useEffect(() => {
    if (project !== undefined && activeProject !== project) {
      send({
        type: "UPDATE_ID",
        id: project,
      });
    }
  }, [project, activeProject, send]);

  return (
    <div className="bg-theme_dawn_pink-light">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Projects on tick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex flex-col md:grid md:grid-cols-sidebar-15">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ProjectLayout;
