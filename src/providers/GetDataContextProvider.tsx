import { FC, ReactNode, useState } from "react";
import { GetDataTypeContext } from "./GetDataContext";

type DefaultType = {
    children: ReactNode
};
export const GetDataTypeContextFlagment: FC<DefaultType> = (props) => {
    /* デフォルト値（english：英単語の発声）を指定 */
    const [isGetDataType, setGetDataType] = useState<string>('english');

    return (
        <GetDataTypeContext.Provider value={{
            isGetDataType,
            setGetDataType
        }}>
            {props.children}
        </GetDataTypeContext.Provider>
    );
}