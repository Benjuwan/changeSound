import { memo, useContext, useEffect } from "react";
import styled from "styled-components";
import { isDeploy } from "../common/isDeploy";
import { GetDataTypeContext } from "../providers/GetDataContext";
import { PlaySoundContext } from "../providers/PlaySoundContext";
import { AudioPlayContext } from "../providers/AudioPlayContext";
import { useRingForSound } from "../hooks/useRingForSound";
import { useFetchApi } from "../hooks/useFetchApi";

export const PlaySound = memo(() => {
    const { isGetDataType } = useContext(GetDataTypeContext);
    const { isPlaySound } = useContext(PlaySoundContext);
    const { isAudioPlay, setAudioPlay } = useContext(AudioPlayContext);

    const { RingForSound } = useRingForSound();

    /* 700px以上（タブレット・PC）では flexitem にする class を付与 */
    const targetViewPortWidth = window.matchMedia("(min-width: 700px)");
    /* 初期読み込み時に 700px以上（タブレット・PC）の場合の処理 */
    if (targetViewPortWidth.matches) {
        const contentsWrapper = document.querySelector<HTMLElement>('#contentsWrapper');
        contentsWrapper?.classList.add('appStart');
    }
    /* ブラウザ幅のリサイズ時に 700px以上時の処理を行うイベントリスナー */
    targetViewPortWidth.addEventListener('change', (elWidth) => {
        const contentsWrapper = document.querySelector<HTMLElement>('#contentsWrapper');
        if (elWidth.matches) contentsWrapper?.classList.add('appStart');
        else contentsWrapper?.classList.remove('appStart');
    });

    /* 再生ボタンクリックで（jsonデータに記述された内容に合致する）音声及び画像が反映されるので、データ読込機能と直接的な関わりを持つ PlaySound.tsx コンポーネントに jsonデータ取得のカスタムフック（useFetchApi）を記述して実行させる */
    const { FetchApi } = useFetchApi();
    useEffect(() => {
        /* 本番環境は絶対パスで指定 */
        const fetchUrlPath: string = isDeploy ? `https://changesound-app.vercel.app/json/${isGetDataType}/${isGetDataType}.json` : `${location.origin}/public/json/${isGetDataType}/${isGetDataType}.json`;
        FetchApi(fetchUrlPath);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetDataType]);

    useEffect(() => {
        /* サウンド再生後（addEventListener('ended')）は初期状態に戻す（setAudioPlay(false)）*/
        const audioEl: HTMLAudioElement | null = document.querySelector('#soundsSec audio');
        audioEl?.addEventListener('ended', () => {
            setAudioPlay(false);
        });

        return () => {
            audioEl?.removeEventListener('ended', () => {
                setAudioPlay(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const playClickEvent: () => void = () => {
        /* サウンド（音声データ）再生 */
        RingForSound('#soundsSec audio');

        /* ボタンクリックでスクロールトップ */
        window.scrollTo(0, 0);
    }

    return (
        <PlaySoundBtn type="button"
            id="playBtn"
            className={isAudioPlay ? 'OnPlay' : ''}
            disabled={isPlaySound}
            onClick={playClickEvent}>
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
line-height: 8.8rem;
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
    line-height: 88px;
}
`;