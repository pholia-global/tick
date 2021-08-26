import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
//HOC
import ClientOnly from '@/components/utils/ClientOnly';
//Components
import ProjectCards from '@/components/ui/Cards/ProjectCards/ProjectCards';
import LogoutButton from '@/components/navigation/LogoutButton/LogoutButton';

const Projects = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const { user } = useUser();
    const router = useRouter()

    useEffect(() => {
        if(user === undefined) {
            router.push('/') 
        } else {
            setIsAuthenticated(true)
        }
    }, [setIsAuthenticated, router, user]) 

    return (
        isAuthenticated && 
            <div className="w-full min-h-screen bg-theme_dawn_pink-light">
                <Head>
                    <title>Projects</title>
                    <meta name="description" content="Projects on tick" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="p-6 flex flex-col lg:px-24">
                    <div className="self-end">
                        <LogoutButton />
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
                    <div className="w-full">
                        <ClientOnly>
                            <ProjectCards />
                        </ClientOnly>
                    </div>
                </div>
            </div>
    )
}

export default Projects