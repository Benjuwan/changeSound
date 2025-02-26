import { FC, ReactNode, useState } from "react";
import { SrcNumberingContext } from "./SrcNumberingContext";

type DefaultType = {
    children: ReactNode
}
export const SrcNumberingContextFlagment: FC<DefaultType> = (props) => {
    const [isSrcNumbering, setSrcNumbering] = useState<number>(1);

    return (
        <SrcNumberingContext.Provider value={{
            isSrcNumbering,
            setSrcNumbering,
        }}>
            {props.children}
        </SrcNumberingContext.Provider>
    );
}