import { memo, useContext, useLayoutEffect } from "react";
import styled from "styled-components";
import { TheContext } from "./TheContext";
import { useSetAudioEls } from "../hooks/useSetAudioEls";
import { useBackToDefault } from "../hooks/useBackToDefault";

import changeSound from '../../src/assets/changesound.mp3';

export const ChangeSound = memo(() => {
    const {
        isGetFetchDates,
        isPlaySound, setPlaySound,
    } = useContext(TheContext);

    /**
     * useEffect で設定した副作用は必ずコンポーネントの描画の【後】に実行されますが、useLayoutEffect は、コンポーネントの描画の【前】に行われます。
     *（なお useEffect でも同処理は可能）
    */
    useLayoutEffect(() => {
        const actionBtnEl: HTMLButtonElement | null = document.querySelector('#actionBtn');
        if (isPlaySound) {
            actionBtnEl?.classList.add('startMode');
        } else {
            actionBtnEl?.classList.remove('startMode');
        }
    }, [isPlaySound]);
    /* 依存配列に isPlaySound を指定して isPlaySound が更新される度に上記処理を実行する */

    /* 音声データの準備 */
    const { SetAudioEls } = useSetAudioEls();

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

    const { BackToDefault } = useBackToDefault();

    return (
        <ChangeSoundBtn type="button" id="actionBtn" onClick={(e) => {
            SetAudioEls(
                '#soundsSec',
                '#soundsSec audio',
                isGetFetchDates.length
            );
            clickSound(e.currentTarget);
            addClassMethod(e.currentTarget);
            BackToDefault();
            setPlaySound(false);
        }}>
            {isPlaySound ? 'StartSound' : 'ChangeSound'}
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
line-height: 8rem;
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
    margin-bottom: 80px;

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
    line-height: 80px;
    
    &.OnClicked {
        margin-bottom: 160px;
    }
}
`;