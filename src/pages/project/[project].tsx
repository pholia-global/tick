import Head from "next/head"
// Components
import ProjectLayout from "@/components/ui/layout/ProjectLayout"

const Project = () => {
    return (
        <div>
            <Head>
                <title>Projects</title>
                <meta name="description" content="Projects on tick" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProjectLayout>
                <h1>This is where stuff happens!</h1>
            </ProjectLayout>
        </div>
        
    )
}

export default Project