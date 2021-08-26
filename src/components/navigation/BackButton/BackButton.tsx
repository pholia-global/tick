import { useRouter } from 'next/router'
import Image from 'next/image'

type BackButtonProps = {
    pageName: String
}

const BackButton = ({ pageName }: BackButtonProps) => {
    const router = useRouter()
    return (
        <button type="button" onClick={() => router.back()}>
            <div className="flex items-center font-bold text-lg text-black-sixty_op">
                <div className="flex items-center mr-2">
                    <Image
                        src={"/images/icons/left-arrow.png" as any}
                        layout="fixed"
                        height={18} 
                        width={18}
                        alt="logout" />
                </ div>
                {pageName ?? ""}
            </div>
        </button>
    )
}

export default BackButton