import Image from 'next/image'

type StackType = {
    name: string,
    image_svg_url: string,
    type: string
}

type TechStackProps = {
    frontendStack: StackType[],
    backendStack: StackType[]
}


const TechStack = ({frontendStack, backendStack}: TechStackProps) => {
    return (
        <div className="bg-white rounded-xl p-7">
            <div className="font-black text-2xl mb-4">Technology Stack</div> 
            <div className="flex flex-col">
                <div className="text-lg mb-2">Frontend</div>
                <div className="mb-2 flex flex-wrap">
                    {
                        frontendStack.map((fStack, index) => {
                            return(
                                <div 
                                    className="flex flex-col items-center mr-2"
                                    key={index}>
                                    <div className="flex items-center mb-1 p-4 rounded-full border border-theme_eagle">
                                        <Image 
                                            src={fStack.image_svg_url}
                                            alt={`${fStack.name} icon`}
                                            height={24}
                                            width={24}
                                             />
                                    </div>
                                    <div className="font-light">{fStack.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div className="text-lg mb-2">Backend</div>
                <div className="mb-2 flex flex-wrap">
                    {
                        backendStack.map((bStack, index) => {
                            return(
                                <div 
                                    className="flex flex-col items-center mr-2"
                                    key={index}>
                                    <div className="flex items-center p-4 rounded-full border border-theme_eagle">
                                        <Image 
                                            src={bStack.image_svg_url}
                                            alt={`${bStack.name} icon`}
                                            height={24}
                                            width={24}
                                             />
                                    </div>
                                    <div className="font-light">{bStack.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TechStack