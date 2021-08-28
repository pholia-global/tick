import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
// Components
import NavigationItems from "@/components/navigation/navigationItems/NavigationItems"
import Avatar from "../../ui/avatar/Avatar"

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false as boolean)

    return(
        <div className="z-10">
            <div className={`${isSidebarOpen ? "hidden" : "flex"} flex items-center justify-between p-4 mb-2 bg-theme_blue md:hidden`}>
                <button 
                    className="flex flex-col justify-between h-7"
                    onClick={() => setIsSidebarOpen(true)}>
                    <div className="h-1 w-8 bg-white rounded"></div>
                    <div className="h-1 w-8 bg-white rounded"></div>
                    <div className="h-1 w-8 bg-white rounded"></div>
                </button>
                <div className="font-heading text-3xl text-theme_dawn_pink">
                    tick
                </div> 
            </div>
            <div className={`${isSidebarOpen ? "flex flex-col justify-between" : "hidden md:flex"} absolute w-full min-h-screen flex flex-col px-4 py-5 bg-white items-center md:relative md:w-60`}>
                <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className={`${isSidebarOpen ? "flex md:hidden" : "hidden"} absolute top-4 right-4`}>
                    <Image src="/images/icons/close.png" height={24} width={24} alt="close menu icon"/>
                </button>
                <div>
                    <Avatar />
                    <NavigationItems />
                </div>
                <div className="md:mt-auto">
                    <Link href="/api/auth/logout">
                        <a className="flex px-12 py-4 font-bold text-md opacity-60">
                            <Image
                                src={"/images/icons/logout3.png" as any}
                                layout="fixed"
                                height={25} 
                                width={25}
                                alt="logout" />
                            <div className={`ml-4 font-extrabold`}>
                                {"Logout"}
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar