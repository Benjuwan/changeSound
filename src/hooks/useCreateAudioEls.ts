import { useCallback, useContext } from "react"
import { TheContext } from "../libs/TheContext";

export const useCreateAudioEls = () => {
    const { isGetDateType } = useContext(TheContext);

    /* 所定の要素(#soundsSec)内をクリーンにして audio タグ（サウンド）をセット */
    const SetContent = useCallback((
        targetEl: HTMLElement,
        setSrcNum: number
    ) => {
        let adjustsetSrcNum: string = `0`;
        targetEl.innerHTML = '';
        /* 桁数に応じて頭に付く 0 の数を増減 */
        if (setSrcNum >= 10 && setSrcNum < 100) {
            adjustsetSrcNum = `0${setSrcNum}`;
        } else {
            adjustsetSrcNum = `00${setSrcNum}`;
        }
        targetEl.insertAdjacentHTML('beforeend', `<audio src="${location.origin}/public/sounds/${isGetDateType}/sounds-${adjustsetSrcNum}.mp3"}></audio>`);
    }, [isGetDateType]);
    /* 依存配列に isGetDateType を指定して select の値が切り替わる度に当該jsonデータを読み込む */

    /* サウンド（音声データ）を用意するためのメイン機能 */
    const CreateAudioEls = useCallback((
        baseElName: string,
        targetAudioName: string,
        countNum: number
    ) => {
        let randomNum: number = Math.floor(Math.random() * countNum);

        /* 0 だった場合 +1（ 0 のまま処理を進めない）*/
        if (randomNum === 0) {
            randomNum++;
        }

        /* サウンド（音声データ）の src 属性に指定しているデータナンバリング（sounds-00X）を取得 */
        const targetAudioEl = document.querySelector<HTMLAudioElement>(targetAudioName);
        const targetAudioElNum = targetAudioEl?.getAttribute('src')?.split('.')[0].split('sounds-')[1];

        const baseEl = document.querySelector<HTMLElement>(baseElName);
        if (baseEl !== null) {
            /* 同じ音声データの再生を回避するための条件分岐 */
            if (Number(targetAudioElNum) !== randomNum) {
                SetContent(baseEl, randomNum);
            } else {
                /* 音声データのデータナンバリング(targetAudioElNum)とランダム生成した数値(randomNum)が【同じ】場合は +1 して同一音声のダブりを回避 */
                randomNum++;
                SetContent(baseEl, randomNum);
            }
        }
    }, [isGetDateType]);
    /* 依存配列に isGetDateType を指定して select の値が切り替わる度に当該jsonデータを読み込む */

    return { CreateAudioEls }
}