import { gql, useQuery } from '@apollo/client';
//Components
import ProjectCard from './ProjectCard';
import CreateProjectCard from './CreateProjectCard';
import Spinner from '../../Spinner/Spinner';

const GET_PROJECTS = gql`
    query MyQuery {
        projects(order_by: {status: asc}) {
            name
            description
            tags
            status
        }
    }
`;

type ProjectCardProps = {
    name: String,
    description: String,
    tags: String[],
    status: Number
}


const ProjectCards = () => {
    
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) {console.log('Loading...')};
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
                        : <div className="m-auto"><Spinner /></div>
            }
        </div>
    )

}

export default ProjectCards