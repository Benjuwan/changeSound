import { createContext } from "react";

type AudioPlayContextType = {
    isAudioPlay: boolean;
    setAudioPlay: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AudioPlayContext = createContext({} as AudioPlayContextType);