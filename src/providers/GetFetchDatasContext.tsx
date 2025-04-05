import { createContext } from "react";
import { jsonType } from "../ts/jsonType";

type GetFetchDatasContextType = {
    isGetFetchDatas: Array<jsonType>;
    setGetFetchDatas: React.Dispatch<React.SetStateAction<jsonType[]>>;
};
export const GetFetchDatasContext = createContext({} as GetFetchDatasContextType);