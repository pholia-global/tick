import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'

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
            <div className=".flex .flex-col">
                <Head>
                    <title>Projects</title>
                    <meta name="description" content="METEOR APP" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1>Projects</h1>
                <Link href="/api/session"><a>See Token</a></Link>
                <Link href="/api/auth/logout"><a>Logout</a></Link>
            </div>
    )
}

export default Projects