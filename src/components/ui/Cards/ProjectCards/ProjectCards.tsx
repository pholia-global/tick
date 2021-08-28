import { gql, useQuery } from '@apollo/client';
//Components
import ProjectCard from './ProjectCard';
import CreateProjectCard from './CreateProjectCard';
import Spinner from '@/components/ui/Spinner/Spinner'

const GET_PROJECTS = gql`
    query GetProjects {
        projects(order_by: {status: asc}) {
            id
            name
            description
            tags
            status
        }
    }
`;

type ProjectCardProps = {
    id: string,
    name: string,
    description: string,
    tags: string[],
    status: number
}


const ProjectCards = () => {
    
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (error) { console.log(`Error! ${error.message}`) };

    return(
        <div className="w-full">
            {
                data ? 
                    <div className="grid grid-cols-fill-50 gap-7 justify-center">
                        {
                            data.projects.map((project: ProjectCardProps, index: number)  => {
                                return(
                                    <ProjectCard { ...project } key={index}  />
                                )
                            })  
                        }
                        <CreateProjectCard />
                    </div>
                        : loading ? <div className="m-auto"><Spinner /></div>
                            : <div className="m-auto">Something went wrong :(</div>
            }
        </div>
    )

}

export default ProjectCards