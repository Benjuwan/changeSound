import { useCallback, useContext } from "react"
import { TheContext } from "../libs/TheContext";

export const useBackToDefault = () => {
    const { setAudioPlay } = useContext(TheContext);

    const BackToDefault: () => void = useCallback(() => {
        /* 再生ボタンの初期化 */
        const playBtnEl: HTMLButtonElement | null = document.querySelector('#playBtn');
        if (playBtnEl?.classList.contains('OnPlay')) {
            playBtnEl.classList.remove('OnPlay');
        }
        setAudioPlay(false);

        /* サウンド停止 */
        const audioEl: HTMLAudioElement | null = document.querySelector('#soundsSec audio');
        audioEl?.pause();
    }, []);

    return { BackToDefault }
}