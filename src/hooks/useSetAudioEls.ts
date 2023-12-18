import { useCallback, useContext } from "react"
import { TheContext } from "../libs/TheContext";

export const useSetAudioEls = () => {
    const { isGetDateType } = useContext(TheContext);

    /* 所定の要素(#soundsSec)内をクリーンにして audio タグ（サウンド）をセット */
    const SetContent: (targetEl: HTMLElement, setSrcNum: number) => void = useCallback((
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

        /* 開発環境 */
        targetEl.insertAdjacentHTML('beforeend', `<audio src="${location.origin}/public/sounds/${isGetDateType}/sounds-${adjustsetSrcNum}.mp3"}></audio>`);

        /* 本番環境（絶対パスで指定 & publicディレクトリは不要） */
        // targetEl.insertAdjacentHTML('beforeend', `<audio src="https://changesound-app.vercel.app/sounds/${isGetDateType}/sounds-${adjustsetSrcNum}.mp3"}></audio>`);
    }, [isGetDateType]);
    /* 依存配列に isGetDateType を指定して select の値が切り替わる度に当該jsonデータを読み込む */

    /* サウンド（音声データ）を用意するためのメイン機能 */
    const SetAudioEls: (
        baseElName: string,
        targetAudioName: string,
        contentLimitNum: number
    ) => void = useCallback((
        baseElName: string,
        targetAudioName: string,
        contentLimitNum: number
    ) => {
        let forSetNumber: number = 1; // 初期値

        /* サウンド（音声データ）の src 属性に指定しているデータナンバリング（sounds-00X）を取得 */
        const targetAudioEl: HTMLAudioElement | null = document.querySelector(targetAudioName);
        const targetAudioElNum: string | undefined = targetAudioEl?.getAttribute('src')?.split('.mp3')[0].split('sounds-')[1];

        if (typeof targetAudioElNum !== 'undefined') {
            /* 取得したデータナンバリング（sounds-00X）を数値化 */
            forSetNumber = parseInt(targetAudioElNum);
            if (forSetNumber >= contentLimitNum) forSetNumber = 1; // 最終コンテンツまたはそれ以上の数値の場合は最初に戻る
            else forSetNumber++; // 順繰り（上げ）表示
        }

        const baseEl: HTMLElement | null = document.querySelector(baseElName);
        if (baseEl !== null) SetContent(baseEl, forSetNumber);
    }, [isGetDateType]);
    /* 依存配列に isGetDateType を指定して select の値が切り替わる度に当該jsonデータを読み込む */

    return { SetAudioEls }
}