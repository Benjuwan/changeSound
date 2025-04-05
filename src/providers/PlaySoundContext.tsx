import { createContext } from "react";

type PlaySoundContextType = {
    isPlaySound: boolean;
    setPlaySound: React.Dispatch<React.SetStateAction<boolean>>;
};
export const PlaySoundContext = createContext({} as PlaySoundContextType);