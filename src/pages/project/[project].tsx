import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
// Components
import ProjectLayout from "@/components/layout/ProjectLayout"
import toast, { Toaster } from "react-hot-toast";
import Spinner from '@/components/ui/Spinner/Spinner';
import ProjectBasicData from '@/components/ui/data/ProjectBasicData';
import ClientOnly from '@/components/utils/ClientOnly';
// Query
const GET_PROJECT = gql`
    query GetProject($id: uuid!) {
        projects(where: {id: {_eq: $id}}) {
            name
            status
            tags
            tech_stack
            description
            created_at
            updated_at
        }
    }
`;

const Project = () => {

    const router = useRouter()
    const { project } = router.query

    const { data, loading } = useQuery(
        GET_PROJECT,
        { 
            variables: { id: project },
            onError: (error) => {
                toast.error("Redirecting...")
                console.log(error?.message)
                setTimeout(() => {
                    router.push('/projects')
                }, 2000)
            }
        }
    );

    if(data) {
        console.log(data)
    }

    return (
        <div>
            <Toaster position="bottom-right" reverseOrder={false} />
            <ProjectLayout title={data?.projects[0]?.name ?? "Project"}>
                <div className="p-6 w-full min-h-screen md:p-8">
                    {
                        data ? 
                            <div>
                                <ClientOnly>
                                    <ProjectBasicData
                                        id={project as string}
                                        name={data?.projects[0]?.name}
                                        status={data?.projects[0]?.status}
                                        description={data?.projects[0]?.description} 
                                        />
                                </ClientOnly>
                            </div>
                                : loading ? <div className="m-auto"><Spinner /></div>
                                    : <div className="m-auto">Something went wrong :(</div>
                    }
                </div>
            </ProjectLayout>
        </div>
        
    )
}

export default Project