import { memo, useContext, useEffect, useMemo, useRef } from "react";
import { isDeploy } from "../common/isDeploy";
import { GetDataTypeContext } from "../providers/GetDataContext";
import { AudioPlayContext } from "../providers/AudioPlayContext";
import { useAdjustSrcNumberPath } from "../hooks/useAdjustSrcNumberPath";
import { SrcNumberingContext } from "../providers/SrcNumberingContext";

export const ContentSound = memo(() => {
    const { isGetDataType } = useContext(GetDataTypeContext);
    const { isAudioPlay } = useContext(AudioPlayContext);
    const { isSrcNumbering } = useContext(SrcNumberingContext);

    const { adjustSrcNumberPath } = useAdjustSrcNumberPath();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        if (!isAudioPlay) {
            audioRef.current?.pause();
        }
    }, [isGetDataType, isAudioPlay]);

    const audioSrcPath: string = useMemo(() => {
        return isDeploy ? `https://changesound-app.vercel.app/sounds/${isGetDataType}/sounds-${adjustSrcNumberPath}.mp3` : `${location.origin}/public/sounds/${isGetDataType}/sounds-${adjustSrcNumberPath}.mp3`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetDataType, isSrcNumbering]);

    return (
        <section id="soundsSec">
            <audio src={audioSrcPath} ref={audioRef} hidden>&nbsp;</audio>
        </section>
    );
});