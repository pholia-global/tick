import Link from 'next/link'

type ProjectCardProps = {
    name: string,
    description: string,
    tags: string[],
    status: number
}

const ProjectCard = ({ name, description, tags, status }: ProjectCardProps) => {
    return (
        <Link href={`/project?name=${name}`}>
            <a>
                <div className="w-80 h-52 px-7 py-6 flex flex-col rounded-2xl bg-white border border-theme_dawn_pink md:h-full">
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-bold text-2xl">{name ?? "N/A"}</div>
                        <div className={status === 1 ? "w-2 h-2 bg-green-500 rounded-full" : status === 3 ? "w-2 h-2 bg-red-500 rounded-full" : "w-2 h-2 bg-yellow-500 rounded-full"}>

                        </div>
                    </div>
                    <div className="font-light text-lg mb-3">
                        {description ?? ""}
                    </div>
                    <div className="flex flex-wrap">
                        {tags.map((tag, index) => {
                            return (
                                <div 
                                    className="px-3 py-1 rounded bg-theme_blue text-white mr-1 mb-1"
                                    key={`${name}-tag-${index}`}
                                    >{tag}</div>
                            )
                        })}
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProjectCard