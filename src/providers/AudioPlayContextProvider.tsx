import { FC, ReactNode, useState } from "react";
import { AudioPlayContext } from "./AudioPlayContext";

type DefaultType = {
    children: ReactNode
};
export const AudioPlayContextFlagment: FC<DefaultType> = (props) => {
    const [isAudioPlay, setAudioPlay] = useState<boolean>(false);

    return (
        <AudioPlayContext.Provider value={{
            isAudioPlay,
            setAudioPlay,
        }}>
            {props.children}
        </AudioPlayContext.Provider>
    );
}