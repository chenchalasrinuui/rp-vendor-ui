import { createContext, useContext } from 'react'

const defaultValues = {};

const appCtx = createContext(defaultValues)

export const useAppContext = () => {
    return useContext(appCtx)
}

export const AppCtxProvider = ({ children, data }) => {

    return <appCtx.Provider value={data}>
        {children}
    </appCtx.Provider>

}