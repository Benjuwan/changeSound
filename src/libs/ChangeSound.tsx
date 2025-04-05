import { memo, SyntheticEvent, useContext } from "react";
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
        <button type="button"
            id="actionBtn"
            className={`ChangeSoundBtn text-[clamp(0.875rem,calc(100vw/56),1.125rem)] w-full rounded not-disabled:hover:brightness-[1.5] not-disabled:hover:border-transparent not-disabled:hover:transform-[translateY(3px)] not-disabled:hover:transition not-disabled:hover:duration-[.25s] active:transition active:duration-[.25s] active:border-transparent active:transform-[translateY(.25em)] block cursor-pointer mx-auto mb-[1em] appearance-none rounded-2 tracking-[.25em] bg-[#00ff00] border-b border-b-[5px] border-b-[#008100] relative leading-[5.5rem] after:content-["おと_が_きりかわった_よ"] after:block after:p-[.25em] after:w-full after:rounded-[0.5rem] after:leading-[2] after:bg-[#fff] after:border after:border-[#919191] after:text-center after:absolute after:top-[100%] after:left-[50%] after:transform-[translate(-50%,-50%)] ${isPlaySound ? 'startMode bg-[#ff9800] border-b-[#935802]' : undefined}`}
            onClick={handleClick}>
            {isPlaySound ? 'Game Start' : 'Change Sound'}
            <audio src={changeSound} hidden>&nbsp;</audio>
        </button>
    );
});