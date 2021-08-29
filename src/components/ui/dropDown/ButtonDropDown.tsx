import { useState } from "react"

type OptionType = {
    value: string | number,
    label: string
}

type ButtonDropDownType = {
    buttonLabel: string,
    options: OptionType[],
    callback: (selection: string) => void
    buttonClassName?: string,
    optionsContainerClassName?: string,
    optionsClassName?: string,
}

const ButtonDropDown = ({ 
    buttonLabel,
    options, 
    buttonClassName, 
    optionsClassName,
    optionsContainerClassName,
    callback 
}: ButtonDropDownType) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={buttonClassName ?? ""}>
                {buttonLabel}
            </button>
            <div className={`${(!isOpen) ? "hidden" : "flex"} absolute ${optionsContainerClassName ?? "mt-1 flex-col rounded bg-white shadow-md"}`}>
                {
                    options.map((option, index) => {
                        return(
                            <button
                                key={index}
                                className={optionsClassName ?? "p-2"}
                                onClick={() => {
                                    callback(option.value as string)
                                    setIsOpen(false)
                                }}        
                            >
                                {option.label}
                            </button>
                        )
                    })
                }
                {/* <select 
                    name={name} 
                    id={name} 
                    onChange={(event) => callback(event.target.value as string)}
                    className={optionsContainerClassName ?? ""}>
                    {
                        options.map((option, index) => {
                            return(
                                <option 
                                    key={index} 
                                    value={option.value}
                                    className={optionsClassName ?? ""}>
                                        {option.label}
                                </option>
                            )
                        })
                    }
                </select> */}
            </div>
        </div>
    )
}

export default ButtonDropDown