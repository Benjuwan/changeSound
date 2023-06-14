import { useCallback, useContext } from "react"
import { TheContext } from "../libs/TheContext";

/* サウンド（音声データ）再生 */
export const useRingForSound = () => {
    const { setAudioPlay } = useContext(TheContext);

    const RingForSound = useCallback((
        targetAudioName: string
    ) => {
        const targetAudioEl = document.querySelector<HTMLAudioElement>(targetAudioName);
        if (targetAudioEl !== null) {
            targetAudioEl.volume = 1;
            targetAudioEl.currentTime = 0.05; // 音源の再生開始位置の指定

            if (targetAudioEl.paused) {
                targetAudioEl.play();
                setAudioPlay(true);
            } else {
                targetAudioEl.pause();
                setAudioPlay(false);
            }
        }
    }, []);

    return { RingForSound }
}