import { useState } from "react"

enum Status { LOADING, SUCCESS, ERROR }

type ToastProps = {
    type: Status,
    message: String,
}



export const Toast = ({ type, message }: ToastProps) => {
    const [isToastOpen, setIsToastOpen] = useState(false)


    return (
        <div className={`${isToastOpen? `block` : `hidden`}`}>
            <div className={`p-4 fixed right-4 bottom-4 rounded-lg font-light ${type===Status.LOADING ? `bg-white` : type===Status.SUCCESS ? `bg-green text-white` : `bg-red text-white`}`}>
                {message}
            </div>
        </div>
    )
}

export default Toast