import { useCallback, useContext } from "react";
import { TheContext } from "../libs/TheContext";

/* 音声データに準拠した画像と説明文をセット */
export const useSetImgAndTxt = () => {
    const { isGetDateType, isPlaySound, isGetFetchDates } = useContext(TheContext);

    const SetImgAndTxt = useCallback((
        targetAudioName: string,
        targetImgName: string,
        targetDescriptionName: string
    ) => {
        /* 音声データ */
        const targetAudioEl = document.querySelector<HTMLAudioElement>(targetAudioName);

        /* 画像データ */
        const targetImg = document.querySelector<HTMLImageElement>(targetImgName);

        /* テキストデータ */
        const targetDescription = document.querySelector<HTMLDivElement>(targetDescriptionName);
        if (targetDescription !== null) {
            targetDescription.innerHTML = "";
        }

        const targetAudioElNum = targetAudioEl?.getAttribute('src')?.split('.')[0].split('sounds-')[1];
        if (targetAudioElNum !== undefined) {
            /* 読み込む画像ファイルのパスとタイプ（拡張子）の設定 */
            targetImg?.setAttribute('src', `${location.origin}/public/img/${isGetDateType}/img-${targetAudioElNum}.png`);

            isGetFetchDates.forEach((data, i) => {
                // 配列は 0 スタートなので +1 して Number(targetAudioElNum) とリンクさせる
                if (i + 1 === Number(targetAudioElNum)) {
                    /* 画像ファイルの読込：画像を表示する場合の処理 */
                    targetImg?.setAttribute('alt', `No.${data.signal}：${data.hiragana}`);

                    /* テキストデータの読込：テキストを表示する場合の処理 */
                    targetDescription?.insertAdjacentHTML('afterbegin', `
                    <p><span>ひらがな：</span>${data.hiragana}</p>
                    <p><span>えいご：</span>${data.english}</p>
                    <p><span>かんじ（漢字）：</span>${data.kanji}</p>
                    `);
                }
            });
        }
    }, [isPlaySound]);
    /* 依存配列（isPlaySound）を指定（ChangeSoundボタンをクリックする度に更新） */

    return { SetImgAndTxt }
}