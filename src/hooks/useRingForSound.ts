import { useCallback, useContext } from "react"
import { AudioPlayContext } from "../providers/AudioPlayContext";

/* サウンド（音声データ）再生 */
export const useRingForSound = () => {
    const { setAudioPlay } = useContext(AudioPlayContext);

    const RingForSound: (targetAudioName: string) => void = useCallback((
        targetAudioName: string
    ) => {
        const targetAudioEl: HTMLAudioElement | null = document.querySelector<HTMLAudioElement>(targetAudioName);

        if (targetAudioEl?.paused) {
            targetAudioEl.volume = 1;
            targetAudioEl?.play();
            setAudioPlay(true);
        } else {
            targetAudioEl?.pause();
            setAudioPlay(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { RingForSound }
}