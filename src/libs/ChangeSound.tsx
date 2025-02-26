import { memo, SyntheticEvent, useContext } from "react";
import styled from "styled-components";
import { PlaySoundContext } from "../providers/PlaySoundContext";
import { AudioPlayContext } from "../providers/AudioPlayContext";
import { GetFetchDatasContext } from "../providers/GetFetchDatasContext";
import { SrcNumberingContext } from "../providers/SrcNumberingContext";

import changeSound from '../../src/assets/changesound.mp3';

export const ChangeSound = memo(() => {
    const { isPlaySound, setPlaySound } = useContext(PlaySoundContext);
    const { setAudioPlay } = useContext(AudioPlayContext);
    const { isGetFetchDatas } = useContext(GetFetchDatasContext);
    const { isSrcNumbering, setSrcNumbering } = useContext(SrcNumberingContext);

    const clickSound: (btnEl: HTMLButtonElement) => void = (btnEl: HTMLButtonElement) => {
        const targetAudioEl: HTMLAudioElement | null = btnEl.querySelector('audio');
        targetAudioEl?.play();
        if (targetAudioEl !== null) {
            targetAudioEl.volume = 1;
        }
    }

    const addClassMethod: (btnEl: HTMLButtonElement) => () => void = (btnEl: HTMLButtonElement) => {
        btnEl.classList.add('OnClicked');
        const timeOutId = setTimeout(() => {
            btnEl.classList.remove('OnClicked');
        }, 3000);

        return () => {
            clearTimeout(timeOutId);
        }
    }

    /* 最後のコンテンツでは先頭ファイルナンバーである「1」を指定し、それ以外は順次繰り上げていく */
    const ctrlSrcNumbering: () => void = () => {
        if (isSrcNumbering === isGetFetchDatas.length) {
            setSrcNumbering(1);
        } else {
            setSrcNumbering((prev) => prev + 1);
        }
    }

    const handleClick: (e: SyntheticEvent<HTMLButtonElement>) => void = (e: SyntheticEvent<HTMLButtonElement>) => {
        clickSound(e.currentTarget);
        addClassMethod(e.currentTarget);
        ctrlSrcNumbering();
        setAudioPlay(false);
        setPlaySound(false);
    }

    return (
        <ChangeSoundBtn type="button"
            id="actionBtn"
            className={isPlaySound ? 'startMode' : ''}
            onClick={handleClick}>
            {isPlaySound ? 'Game Start' : 'Change Sound'}
            <audio src={changeSound}>&nbsp;</audio>
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
line-height: 8.8rem;
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

&.startMode {
    background-color: #ff9800;
    border-bottom: 5px solid #935802;
}

&.OnClicked{
    margin-bottom: 3em;

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

@media screen and (min-width: 700px) {
    line-height: 88px;
}
`;