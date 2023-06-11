import { createContext, FC, ReactNode, useState } from "react";
import { jsonType } from "../ts/jsonType";

type ContextType = {
    isGetDateType: string;
    setGetDateType: React.Dispatch<React.SetStateAction<string>>;
    isPlaySound: boolean;
    setPlaySound: React.Dispatch<React.SetStateAction<boolean>>;
    isGetFetchDates: Array<jsonType>;
    setGetFetchDates: React.Dispatch<React.SetStateAction<jsonType[]>>;
}
export const TheContext = createContext({} as ContextType);

type DefaultType = {
    children: ReactNode
}
export const ContextFlagment: FC<DefaultType> = (props) => {
    /* デフォルト値（people）を指定 */
    const [isGetDateType, setGetDateType] = useState<string>('people');

    const [isPlaySound, setPlaySound] = useState<boolean>(true);

    const [isGetFetchDates, setGetFetchDates] = useState<Array<jsonType>>([]);

    return (
        <TheContext.Provider value={{
            isGetDateType,
            setGetDateType,
            isPlaySound,
            setPlaySound,
            isGetFetchDates,
            setGetFetchDates
        }}>
            {props.children}
        </TheContext.Provider>
    );
}