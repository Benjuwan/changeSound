import { useContext, useMemo } from "react";
import { SrcNumberingContext } from "../providers/SrcNumberingContext";

export const useAdjustSrcNumberPath = () => {
    const { isSrcNumbering } = useContext(SrcNumberingContext);

    const adjustSrcNumberPath: string = useMemo(() => {
        if (isSrcNumbering >= 10 && isSrcNumbering < 100) {
            return `0${isSrcNumbering}`;
        }
        return `00${isSrcNumbering}`;
    }, [isSrcNumbering]);

    return { adjustSrcNumberPath }
}