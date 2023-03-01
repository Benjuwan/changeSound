import { memo, useContext } from "react";
import styled from "styled-components";
import { useCreateAudioEls } from "../hooks/useCreateAudioEls";

import changeSound from '../../src/assets/changesound.mp3';
import { TheContext } from "./TheContext";

export const ChangeSound = memo(() => {
    const { isGetFetchDates, setPlaySound } = useContext(TheContext);
    const { CreateAudioEls } = useCreateAudioEls();

    const clickSound = (
        btnEl: HTMLButtonElement
    ) => {
        const targetAudioEl = btnEl.querySelector<HTMLAudioElement>('audio');
        if (targetAudioEl !== null) {
            targetAudioEl.volume = 1;
            targetAudioEl.currentTime = 0.05; // 音源の再生開始位置の指定（アクションボタン連打への対応）
            targetAudioEl.play();
        }
    }

    const addClassMethod = (
        btnEl: HTMLButtonElement
    ) => {
        btnEl.classList.add('OnClicked');
        setTimeout(() => {
            btnEl.classList.remove('OnClicked');
        }, 3000);
    }

    return (
        <ChangeSoundBtn type="button" onClick={(e) => {
            /* Math.random()は、0 以上 1 未満 (0 は含むが、 1 は含まない) なので jsonのデータ数（isGetFetchDates.length）+1 で指定 */
            CreateAudioEls(
                '#soundsSec',
                '#soundsSec audio',
                isGetFetchDates.length + 1
            );
            clickSound(e.currentTarget);
            addClassMethod(e.currentTarget);
            setPlaySound(false);
        }}>
            ChangeSound
            <audio src={changeSound}></audio>
        </ChangeSoundBtn>
    );
});

const ChangeSoundBtn = styled.button`
margin: 0 auto 1em;
cursor: pointer;
display: block;
appearance: none;
outline: none;
border: none;
border-radius: 8px;
letter-spacing: .25em;
background-color: #00ff00;
border-bottom: 5px solid #008100;
line-height: 80px;
position: relative;

&::after{
    content: "おと が きりかわった よ";
    display: block;
    padding: .25em;
    width: 100%;
    border-radius: 8px;
    line-height: 2;
    background-color: #fff;
    text-align: center;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
}

&.OnClicked{
    margin-bottom: 80px;

    @media screen and (min-width: 700px){
        margin-bottom: 160px;
    }

    &::after{
        transition: opacity .25s, visibility .25s, transform .5s;
        transform: translate(-50%, 16%);
        opacity: 1;
        visibility: visible;
    }
}

& audio{
    display: none;
}
`;