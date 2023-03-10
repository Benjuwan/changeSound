import { useCallback } from "react"

/* サウンド（音声データ）再生 */
export const useRingForSound = () => {
    const RingForSound = useCallback((
        targetAudioName: string
    ) => {
        const targetAudioEl = document.querySelector<HTMLAudioElement>(targetAudioName);
        if (targetAudioEl !== null) {
            targetAudioEl.volume = 1;
            targetAudioEl.currentTime = 0.05; // 音源の再生開始位置の指定（アクションボタン連打への対応）
            targetAudioEl.play();
        }
    }, []);

    return { RingForSound }
}