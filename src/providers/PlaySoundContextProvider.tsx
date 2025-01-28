import { FC, ReactNode, useState } from "react";
import { PlaySoundContext } from "./PlaySoundContext";

type DefaultType = {
    children: ReactNode
}
export const PlaySoundContextFlagment: FC<DefaultType> = (props) => {
    const [isPlaySound, setPlaySound] = useState<boolean>(true);

    return (
        <PlaySoundContext.Provider value={{
            isPlaySound,
            setPlaySound,
        }}>
            {props.children}
        </PlaySoundContext.Provider>
    );
}