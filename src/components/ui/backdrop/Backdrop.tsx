// Types
type BackdropType = {
    onClick: any
}

const Backdrop = ({ onClick }: BackdropType) => {
    return(
        <button 
            onClick={onClick}
            className="top-0 left-0 fixed min-w-full min-h-screen bg-theme_blur border-0">
                
        </button>
    )
}

export default Backdrop