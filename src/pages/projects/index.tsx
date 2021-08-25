import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
//Components
import ProjectCard from '@/components/ui/Cards/ProjectCard/ProjectCard';

const GET_PROJECTS = gql`
    query MyQuery {
        projects {
            name
        }
    }
`;

const Projects = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const { user } = useUser();
    const router = useRouter()

    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) {console.log('Loading...')};
    if (error) { console.log(`Error! ${error.message}`) };
    if (data) {
        console.log(data)
    }

    useEffect(() => {
        if(user === undefined) {
            router.push('/') 
        } else {
            setIsAuthenticated(true)
        }
    }, [setIsAuthenticated, router, user]) 

    return (
        isAuthenticated && 
            <div className="w-full bg-theme_dawn_pink-light">
                <Head>
                    <title>Projects</title>
                    <meta name="description" content="METEOR APP" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="p-6 flex flex-col md:px-24">
                    <div className="flex items-center self-end">
                        <Image
                            src={"/images/icons/logout2.png" as any}
                            layout="fixed"
                            height={20}
                            width={20}
                            alt="logout" />
                        <Link href="/api/auth/logout">
                            <a className="font-bold text-lg text-black-sixty_op ml-2">
                                Logout
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center mt-4 mb-10">
                        <div className="h-24 w-24 mb-5">
                            <Image 
                                className="rounded-full"
                                src={user?.picture ?? '/images/placeholders/generic_placeholder.png' as any} 
                                alt="User profile icon"
                                width={96}
                                height={96}/>
                        </div>
                        <div className="font-primary font-bold text-4xl">
                            {user?.name}
                        </div>
                    </div>
                    <div className="project-cards">
                        <ProjectCard 
                            name="Meteor"
                            description="Inventory management website"
                            status="active"
                            tags={["website", "next.js", "tailwind", "portfolio"]}
                        />
                        <ProjectCard 
                            name="Meteor"
                            description="Inventory management website"
                            status="active"
                            tags={["website", "next.js", "tailwind", "portfolio"]}
                        />
                        <ProjectCard 
                            name="Meteor"
                            description="Inventory management website"
                            status="active"
                            tags={["website", "next.js", "tailwind", "portfolio"]}
                        />
                        <ProjectCard 
                            name="Meteor"
                            description="Inventory management website"
                            status="active"
                            tags={["website", "next.js", "tailwind", "portfolio"]}
                        />
                        <ProjectCard 
                            name="Meteor"
                            description="Inventory management website"
                            status="active"
                            tags={["website", "next.js", "tailwind", "portfolio"]}
                        />
                        <ProjectCard 
                            name="Meteor"
                            description="Inventory management website"
                            status="active"
                            tags={["website", "next.js", "tailwind", "portfolio"]}
                        />
                    </div>
                </div>
            </div>
    )
}

export default Projects