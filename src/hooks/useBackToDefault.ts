import { useCallback, useContext } from "react"
import { TheContext } from "../libs/TheContext";

export const useBackToDefault = () => {
    const { setAudioPlay } = useContext(TheContext);

    const BackToDefault = useCallback(() => {
        /* 再生ボタンの初期化 */
        const actionBtnEl: HTMLButtonElement | null = document.querySelector('#actionBtn');
        if (actionBtnEl?.classList.contains('OnPlay')) {
            actionBtnEl.classList.remove('OnPlay');
        }
        setAudioPlay(false);

        /* サウンド停止 */
        const audioEl: HTMLAudioElement | null = document.querySelector('#soundsSec audio');
        audioEl?.pause();
    }, []);

    return { BackToDefault }
}