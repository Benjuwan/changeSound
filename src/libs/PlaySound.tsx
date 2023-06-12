import { memo, useContext, useEffect } from "react";
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

    const { FetchApi } = useFetchApi();
    useEffect(() => {
        /* 開発環境 */
        FetchApi(`${location.origin}/public/json/${isGetDateType}/${isGetDateType}.json`);

        /* 本番環境（絶対パスで指定）*/
        // FetchApi(`--- domain ---/public/json/${isGetDateType}/${isGetDateType}.json`);
    }, [isGetDateType]);

    /* サウンド再生後（addEventListener('ended')）は初期状態に戻す（setAudioPlay(false)）*/
    const audioEl: HTMLAudioElement | null = document.querySelector('#soundsSec audio');
    audioEl?.addEventListener('ended', () => {
        setAudioPlay(false);
        BackToDefault();
    });

    const actionClickEvent = () => {
        /* サウンド（音声データ）再生 */
        RingForSound('#soundsSec audio');

        /* 音声データに準拠した画像と説明文をセット */
        SetImgAndTxt('#soundsSec audio', '#charImg', '#charTxt');

        /* ボタンクリックでスクロールトップ */
        window.scrollTo(0, 0);

        /* 700px以上（タブレット・PC）では flexitem にする class を付与 */
        if (window.matchMedia("(min-width: 700px)").matches) {
            const contentsWrapper = document.querySelector<HTMLElement>('#contentsWrapper');
            contentsWrapper?.classList.add('appStart');
        }
    }

    return (
        <PlaySoundBtn type="button" id="actionBtn" disabled={isPlaySound}
            onClick={() => {
                actionClickEvent();
            }}>
            {isAudioPlay ? 'PauseSound' : 'PlaySound'}
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
}

@media screen and (min-width: 700px) {
    line-height: 160px;
}
`;