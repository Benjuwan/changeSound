import { createContext } from "react";

type GetDataTypeContextType = {
    isGetDataType: string;
    setGetDataType: React.Dispatch<React.SetStateAction<string>>;
};
export const GetDataTypeContext = createContext({} as GetDataTypeContextType);