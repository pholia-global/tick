import Sidebar from "./sidebar/Sidebar"

type ProjectLayoutProps = {
    children: any,
}

const ProjectLayout = ({ children }: ProjectLayoutProps) => {
    return(
        <div>
            <Sidebar />
            {children}
        </div>
    )
}

export default ProjectLayout