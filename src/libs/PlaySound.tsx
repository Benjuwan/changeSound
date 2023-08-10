import { memo, useContext, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { TheContext } from "./TheContext";
import { useRingForSound } from "../hooks/useRingForSound";
import { useSetImgAndTxt } from "../hooks/useSetImgAndTxt";
import { useFetchApi } from "../hooks/useFetchApi";
import { useBackToDefault } from "../hooks/useBackToDefault";

export const PlaySound = memo(() => {
    const {
        isGetDateType,
        isPlaySound,
        isAudioPlay, setAudioPlay,
    } = useContext(TheContext);

    const { RingForSound } = useRingForSound();
    const { SetImgAndTxt } = useSetImgAndTxt();
    const { BackToDefault } = useBackToDefault();

    /* 700px以上（タブレット・PC）では flexitem にする class を付与 */
    const targetViewPortWidth = window.matchMedia("(min-width: 700px)");
    /* 初期読み込み時に 700px以上（タブレット・PC）の場合の処理 */
    if (targetViewPortWidth.matches) {
        const contentsWrapper = document.querySelector<HTMLElement>('#contentsWrapper');
        contentsWrapper?.classList.add('appStart');
    }
    /* ブラウザ幅のリサイズ時に 700px以上時の処理を行うイベントリスナー */
    targetViewPortWidth.addEventListener('change', (elWidth) => {
        if (elWidth.matches) {
            const contentsWrapper = document.querySelector<HTMLElement>('#contentsWrapper');
            contentsWrapper?.classList.add('appStart');
        }
    });

    /* 再生ボタンクリックで（jsonデータに記述された内容に合致する）音声及び画像が反映されるので、データ読込機能と直接的な関わりを持つ PlaySound.tsx コンポーネントに jsonデータ取得のカスタムフック（useFetchApi）を記述して実行させる */
    const { FetchApi } = useFetchApi();
    useEffect(() => {
        /* 開発環境 */
        FetchApi(`${location.origin}/public/json/${isGetDateType}/${isGetDateType}.json`);

        /* 本番環境（絶対パスで指定 & publicディレクトリは不要）*/
        /**
         *【開発環境から本番環境への設定変更が必要な他の修正箇所（Hooks）】
         * useSetAudioEls.ts
         * useSetImgAndTxt.ts
        */
        // FetchApi(`https://changesound-app.vercel.app/json/${isGetDateType}/${isGetDateType}.json`);

    }, [isGetDateType]);

    /**
     * useEffect で設定した副作用は必ずコンポーネントの描画の【後】に実行されますが、useLayoutEffect は、コンポーネントの描画の【前】に行われます。
     *（なお useEffect でも同処理は可能）
    */
    useLayoutEffect(() => {
        const playBtnEl: HTMLButtonElement | null = document.querySelector('#playBtn');
        if (isAudioPlay) {
            playBtnEl?.classList.add('OnPlay');
        } else {
            playBtnEl?.classList.remove('OnPlay');
        }
    }, [isAudioPlay]);
    /* 依存配列に isAudioPlay を指定して isAudioPlay が更新される度に上記処理を実行する */

    /* サウンド再生後（addEventListener('ended')）は初期状態に戻す（setAudioPlay(false)）*/
    const audioEl: HTMLAudioElement | null = document.querySelector('#soundsSec audio');
    audioEl?.addEventListener('ended', () => {
        setAudioPlay(false);
        BackToDefault();
    });

    const playClickEvent = () => {
        /* サウンド（音声データ）再生 */
        RingForSound('#soundsSec audio');

        /* 画像データを用意 */
        SetImgAndTxt('#soundsSec audio', '#charImg', '#charTxt');

        /* ボタンクリックでスクロールトップ */
        window.scrollTo(0, 0);
    }


    return (
        <PlaySoundBtn type="button" id="playBtn" disabled={isPlaySound}
            onClick={() => {
                playClickEvent();
            }}>
            {isAudioPlay ? 'Stop' : 'Play'}
        </PlaySoundBtn>
    );
});

const PlaySoundBtn = styled.button`
margin: auto;
display: block;
appearance: none;
outline: none;
border: none;
border-radius: 8px;
letter-spacing: .25em;
color: #fff;
background-color: #e3e40f;
border-bottom: 5px solid #909106;
line-height: 16rem;
cursor: pointer;

&[disabled]{
    cursor: default;
    background-color: #dadada;
    border-bottom: 4px solid transparent;
    color: #a7a7a7;
}

&.OnPlay{
    background-color: #0f28e4;
    border-bottom: 5px solid #0a1a91;

    &[disabled]{
        cursor: default;
        background-color: #dadada;
        border-bottom: 4px solid transparent;
        color: #a7a7a7;
    }
}

@media screen and (min-width: 700px) {
    line-height: 160px;
}
`;