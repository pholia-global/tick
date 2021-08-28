import { createContext, useContext, useState } from 'react';

const AppContext = createContext({
    activeProject: "",
    setActiveProject: (projectId: string) => {}
});

export function AppWrapper({ children }: any) {
    const [activeProject, setActiveProj] = useState("" as string)
    
    const setActiveProject = (projectId: string) => {
        setActiveProj(projectId)
    }

    let sharedState = {
        activeProject: activeProject,
        setActiveProject: setActiveProject
    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
  return useContext(AppContext);
}