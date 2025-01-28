import { FC, ReactNode, useState } from "react";
import { jsonType } from "../ts/jsonType";
import { GetFetchDatasContext } from "./GetFetchDatasContext";

type DefaultType = {
    children: ReactNode
}
export const GetFetchDatasContextFlagment: FC<DefaultType> = (props) => {
    const [isGetFetchDatas, setGetFetchDatas] = useState<Array<jsonType>>([]);


    return (
        <GetFetchDatasContext.Provider value={{
            isGetFetchDatas,
            setGetFetchDatas
        }}>
            {props.children}
        </GetFetchDatasContext.Provider>
    );
}