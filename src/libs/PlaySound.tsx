import { useContext } from "react";
import styled from "styled-components";
import { useFetchApi } from "../hooks/useFetchApi";
import { TheContext } from "./TheContext";

export const PlaySound = () => {
    const { isGetFetchDates, isPlaySound } = useContext(TheContext);
    const { FetchApi } = useFetchApi();
    FetchApi(`${location.origin}/public/json/imgAltTxt.json`);

    /* サウンド再生 */
    const playSounds = () => {
        const targetAudioEl = document.querySelector<HTMLAudioElement>('#soundsSec audio');
        if (targetAudioEl !== null) {
            targetAudioEl.volume = 1;
            targetAudioEl.currentTime = 0.05; // 音源の再生開始位置の指定（アクションボタン連打への対応）
            targetAudioEl.play();
        }
    }

    /* クリックした時の処理（サウンド再生及び画像ファイルの読込） */
    const actionClickEvent = () => {
        const charImg = document.querySelector('#charImg');
        const actionBtn = document.querySelector('#actionBtn');
        if (actionBtn !== null) {
            const soundSrc = actionBtn.getAttribute('src');
            if (soundSrc !== null) {
                actionBtn.setAttribute('src', soundSrc);
            }
            playSounds();
        }

        /* 画像ファイルの読込：画像を表示する場合の処理 */
        const targetAudioEl = document.querySelector<HTMLAudioElement>('#soundsSec audio')
        const targetAudioElNum = targetAudioEl?.getAttribute('src')?.split('-')[1].split('.')[0];
        if (targetAudioElNum !== undefined) {
            charImg?.setAttribute('src', `${location.origin}/public/img/img-${targetAudioElNum}.png`);
            isGetFetchDates.forEach((data, i) => {
                if (i === Number(targetAudioElNum)) {
                    charImg?.setAttribute('alt', `No.${data.signal}：${data.src}`);
                }
            });
        }

        /* ボタンクリックでスクロールトップ */
        window.scrollTo(0, 0);
    }

    return (
        <PlaySoundBtn type="button" id="actionBtn" disabled={isPlaySound}
            onClick={() => {
                actionClickEvent();
            }}>PlaySound</PlaySoundBtn>
    );
}

const PlaySoundBtn = styled.button`
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