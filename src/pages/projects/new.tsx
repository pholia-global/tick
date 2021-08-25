import Head from "next/head"
import Link from "next/link"
import Image from "next/image"

const NewProject = () => {
    return (
        <div className="w-full min-h-screen bg-theme_dawn_pink">
            <Head>
                <title>Create Project</title>
                <meta name="description" content="Create Project on tick" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-full py-8 px-8 flex flex-col items-center md:px-24">
                <div className="w-full flex justify-between mb-4 md:w-3/4">
                    <Link href="/projects">
                        <a className="flex items-center font-bold text-lg text-black-sixty_op">
                            {`<- Projects`}
                        </a>
                    </Link>
                    <Link href="/api/auth/logout">
                        <a className="flex items-center font-bold text-lg text-black-sixty_op">
                            <div className="flex items-center mr-2">
                                <Image
                                    src={"/images/icons/logout2.png" as any}
                                    layout="fixed"
                                    height={14}
                                    width={14}
                                    alt="logout" />
                            </ div>
                            Logout
                        </a>
                    </Link>
                </div>
                <div className="font-primary font-bold text-2xl text-center mb-2 md:text-5xl">Create Project</div>
                <div className="h-px w-full bg-black mb-8 md:w-3/4"></div>
                <form className="w-full flex flex-col items-center">
                    <div className="w-full bg-white-900 rounded-md mb-4 md:w-96">
                        <input 
                            className="w-full h-full p-5 rounded-md border-0 bg-transparent"
                            type="text"
                            placeholder="name"
                            required />
                    </div>
                    <div className="w-full bg-white-900 rounded-md mb-4 md:w-96">
                        <input 
                            className="w-full h-full p-5 rounded-md border-0 bg-transparent"
                            type="text"
                            placeholder="description"
                            required />
                    </div>
                    <div className="w-full bg-white-900 rounded-md mb-4 md:w-96">
                        <input 
                            className="w-full h-full p-5 rounded-md border-0 bg-transparent"
                            type="text"
                            placeholder="tags"
                            required />
                    </div>
                    <input  type="submit" className="w-full py-4 px-8 mt-2 bg-theme_blue text-white rounded-md font-bold cursor-pointer md:w-52" />
                </form>
            </div>
        </div>
    )
}

export default NewProject