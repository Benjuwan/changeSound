import { createContext, FC, ReactNode, useState } from "react";
import { jsonType } from "../ts/jsonType";

type ContextType = {
    isPlaySound: boolean,
    setPlaySound: React.Dispatch<React.SetStateAction<boolean>>,
    isGetFetchDates: Array<jsonType>,
    setGetFetchDates: React.Dispatch<React.SetStateAction<jsonType[]>>
}
export const TheContext = createContext({} as ContextType);

type DefaultType = {
    children: ReactNode
}
export const ContextFlagment: FC<DefaultType> = (props) => {
    const [isPlaySound, setPlaySound] = useState<boolean>(true);
    const [isGetFetchDates, setGetFetchDates] = useState<Array<jsonType>>([]);

    return (
        <TheContext.Provider value={{
            isPlaySound,
            setPlaySound,
            isGetFetchDates,
            setGetFetchDates
        }}>
            {props.children}
        </TheContext.Provider>
    );
}