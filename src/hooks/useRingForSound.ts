import { useCallback } from "react"

/* サウンド（音声データ）再生 */
export const useRingForSound = () => {
    const RingForSound = useCallback((
        targetAudioName: string,
        stateFunc: (value: boolean) => void
    ) => {
        const targetAudioEl = document.querySelector<HTMLAudioElement>(targetAudioName);
        if (targetAudioEl !== null) {
            targetAudioEl.volume = 1;
            targetAudioEl.currentTime = 0.05; // 音源の再生開始位置の指定

            const actionBtnEl: HTMLButtonElement | null = document.querySelector('#actionBtn');
            if (targetAudioEl.paused) {
                targetAudioEl.play();

                stateFunc(true);
                actionBtnEl?.classList.add('OnPlay');
            } else {
                targetAudioEl.pause();

                stateFunc(false);
                actionBtnEl?.classList.remove('OnPlay');
            }
        }
    }, []);

    return { RingForSound }
}