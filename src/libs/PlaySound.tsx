import { memo, useContext } from "react";
import styled from "styled-components";
import { TheContext } from "./TheContext";
import { useFetchApi } from "../hooks/useFetchApi";
import { useRingForSound } from "../hooks/useRingForSound";
import { useSetImgAndTxt } from "../hooks/useSetImgAndTxt";

export const PlaySound = memo(() => {
    const { isPlaySound } = useContext(TheContext);
    const { FetchApi } = useFetchApi();
    FetchApi(`${location.origin}/public/json/imgAltTxt.json`);
    const { RingForSound } = useRingForSound();
    const { SetImgAndTxt } = useSetImgAndTxt();

    const actionClickEvent = () => {
        /* サウンド（音声データ）再生 */
        RingForSound('#soundsSec audio');

        /* 音声データに準拠した画像と説明文をセット */
        SetImgAndTxt('#soundsSec audio', '#charImg', '#charTxt');

        /* ボタンクリックでスクロールトップ */
        window.scrollTo(0, 0);

        /* 640px以上（タブレット・PC）では flexitem にする class を付与 */
        if (window.matchMedia("(min-width: 640px)").matches) {
            const contentsWrapper = document.querySelector<HTMLElement>('#contentsWrapper');
            contentsWrapper?.classList.add('appStart');
        }
    }

    return (
        <PlaySoundBtn type="button" id="actionBtn" disabled={isPlaySound}
            onClick={() => {
                actionClickEvent();
            }}>PlaySound</PlaySoundBtn>
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
color: #333;
background-color: #ffbfe7;
border-bottom: 5px solid #99748b;
line-height: 160px;

&[disabled]{
    background-color: #dadada;
    border-bottom: 4px solid transparent;
    color: #a7a7a7;
}

&:not([disabled]){
    cursor: pointer;
}
`;