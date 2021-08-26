import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

type NavigationItemProps = {
    icon: string,
    target: {
        pathname: string,
        query: any
    },
    text: string,
}

const NavigationItem = ({ icon, target, text }: NavigationItemProps) => {
    const router = useRouter();

    console.log(router.pathname === target.pathname)

    return(
        <Link href={target}>
            <a className={`flex px-12 py-4 ${router.pathname === target.pathname ? "bg-theme_dawn_pink rounded-lg" : "opacity-60"}`}>
                <Image 
                    src={icon} 
                    alt={text}
                    width={25}
                    height={25} />
                <div className="ml-4">
                    {text}
                </div>
            </a>
        </Link>
    )
}

export default NavigationItem