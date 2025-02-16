import { useCallback, useContext } from "react";
import { GetDataTypeContext } from "../providers/GetDataContext";
import { PlaySoundContext } from "../providers/PlaySoundContext";
import { GetFetchDatasContext } from "../providers/GetFetchDatasContext";

/* 音声データに準拠した画像と説明文をセット */
export const useSetImgAndTxt = () => {
    const { isGetDataType } = useContext(GetDataTypeContext);
    const { isPlaySound } = useContext(PlaySoundContext);
    const { isGetFetchDatas } = useContext(GetFetchDatasContext);

    const SetImgAndTxt: (
        targetAudioName: string,
        targetImgName: string,
        targetDescriptionName: string
    ) => void = useCallback((
        targetAudioName: string,
        targetImgName: string,
        targetDescriptionName: string
    ) => {
        /* テキストデータ */
        const targetDescription = document.querySelector<HTMLDivElement>(targetDescriptionName);
        if (targetDescription !== null) {
            targetDescription.innerHTML = "";
        }

        const targetImg = document.querySelector<HTMLImageElement>(targetImgName);

        /* 音声データの拡張子（.mp3）で split して対象文字列（001 ~ 0XX）を取得する */
        const targetAudioElNum = document.querySelector<HTMLAudioElement>(targetAudioName)?.getAttribute('src')?.split('.mp3')[0].split('sounds-')[1];

        /**
         * 読み込む画像ファイルのパスとタイプの設定
         *（'english'）英語カテゴリー以外は拡張子を gif に指定
        */
        /* 開発環境 */
        if (!(isGetDataType.match('english'))) {
            targetImg?.setAttribute('src', `${location.origin}/public/img/${isGetDataType}/img-${targetAudioElNum}-min.gif`);
        } else {
            targetImg?.setAttribute('src', `${location.origin}/public/img/${isGetDataType}/img-${targetAudioElNum}-min.png`);
        }

        /* 本番環境（絶対パスで指定 & publicディレクトリは不要） */
        // if (!(isGetDataType.match('english'))) {
        //     targetImg?.setAttribute('src', `https://changesound-app.vercel.app/img/${isGetDataType}/img-${targetAudioElNum}-min.gif`);
        // } else {
        //     targetImg?.setAttribute('src', `https://changesound-app.vercel.app/img/${isGetDataType}/img-${targetAudioElNum}-min.png`);
        // }

        isGetFetchDatas.forEach((data, i) => {
            // 配列は 0 スタートなので +1 して Number(targetAudioElNum) とリンクさせる
            if (i + 1 === Number(targetAudioElNum)) {
                /* 画像ファイルの読込：画像を表示する場合の処理 */
                targetImg?.setAttribute('alt', `No.${data.signal}：${data.hiragana}`);

                /* テキストデータの読込：テキストを表示する場合の処理 */
                targetDescription?.insertAdjacentHTML('afterbegin', `<p><span>ひらがな：</span>${data.hiragana}</p><p><span>えいご：</span>${data.english}</p><p><span>かんじ（漢字）：</span>${data.kanji}</p>`);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaySound]);
    /* 依存配列（isPlaySound）を指定（ChangeSoundボタンをクリックする度に更新） */

    return { SetImgAndTxt }
}