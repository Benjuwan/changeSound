import { createContext } from "react";

type SrcNumberingContextType = {
    isSrcNumbering: number;
    setSrcNumbering: React.Dispatch<React.SetStateAction<number>>;
}
export const SrcNumberingContext = createContext({} as SrcNumberingContextType);