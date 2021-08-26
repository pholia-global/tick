import Head from "next/head"
// Components
import ProjectLayout from "@/components/ui/layout/ProjectLayout"

const Features = () => {
    return (
        <div>
            <Head>
                <title>Features</title>
                <meta name="description" content="Projects on tick" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProjectLayout>
                <h1>Features Page</h1>
            </ProjectLayout>
        </div>
        
    )
}

export default Features