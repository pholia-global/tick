import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// Components
import Sidebar from "./Sidebar/Sidebar";
// Context
import { useAppContext } from "src/context/state";

type ProjectLayoutProps = {
  children: any;
  title: string;
};

const ProjectLayout = ({ children, title }: ProjectLayoutProps) => {
  const { activeProject, setActiveProject } = useAppContext();

  const router = useRouter();
  const { project } = router.query;

  useEffect(() => {
    if (activeProject !== project) {
      setActiveProject(project as string);
    }
  }, [project, activeProject, setActiveProject]);

  return (
    <div className="bg-theme_dawn_pink-light">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Projects on tick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:grid md:grid-cols-sidebar-15">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ProjectLayout;
