type ProjectCardProps = {
    name: String,
    description: String,
    tags: String[],
    status: String
}

const ProjectCard = ({ name, description, tags, status }: ProjectCardProps) => {
    return (
        <div className="w-80 h-52 px-7 py-6 flex flex-col rounded-2xl bg-white border border-theme_dawn_pink">
            <div className="flex justify-between align-center mb-2">
                <div className="font-bold text-2xl">{name ?? "N/A"}</div>
                <div className={status === "active" ? "w-2 h-2 bg-green" : status === "inactive" ? "w-2 h-2 bg-red" : "w-2 h-2 bg-yellow"}>

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
    )
}

export default ProjectCard