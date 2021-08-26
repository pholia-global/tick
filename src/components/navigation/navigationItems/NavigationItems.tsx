import NavigationItem from "./navigationItem/NavigationItem"

const NavigationItems = () => {
    const projectName = "pholia_proj"
    return (
        <div>
            <NavigationItem 
                icon="/images/icons/home.png" 
                target={{
                    pathname: '/project/[project]',
                    query: { project: projectName }
                }}
                text="Home" />
            <NavigationItem 
                icon="/images/icons/features.png" 
                target={{
                    pathname: '/project/[project]/features',
                    query: { project: projectName }
                }}
                text="Features" />
        </div>
    )
}

export default NavigationItems