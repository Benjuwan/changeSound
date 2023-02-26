import { useContext } from "react";
import styled from "styled-components";
import { useCreateAudioEls } from "../hooks/useCreateAudioEls";

import changeSound from '../../src/assets/changesound.mp3';
import { TheContext } from "./TheContext";

export const ChangeSound = () => {
    const { setPlaySound } = useContext(TheContext);

    const { CreateAudioEls } = useCreateAudioEls();
    CreateAudioEls('#soundsSec', 8);

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
            CreateAudioEls('#soundsSec', 8);
            clickSound(e.currentTarget);
            addClassMethod(e.currentTarget);
            setPlaySound(false);
        }}>
            ChangeSound
            <audio src={changeSound}></audio>
        </ChangeSoundBtn>
    );
}

const ChangeSoundBtn = styled.button`
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