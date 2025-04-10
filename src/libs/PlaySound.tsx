import { memo, useContext, useEffect } from "react";
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
        <button type="button"
            id="playBtn"
            className={`text-[clamp(0.875rem,calc(100vw/56),1.125rem)] w-full rounded not-disabled:hover:brightness-[1.5] not-disabled:hover:border-transparent not-disabled:hover:transform-[translateY(3px)] not-disabled:hover:transition not-disabled:hover:duration-[.25s] active:transition active:duration-[0.25s] active:border-transparent active:transform-[translateY(.25em)] m-auto block appearance-none border-none border-b border-b-[5px] border-b-[#909106] rounded-2 tracking-[.25em] text-[#fff] bg-[#e3e40f] leading-[5.5rem] not-disabled:cursor-pointer disabled:bg-[#dadada] disabled:border-b-transparent disabled:text-[#a7a7a7] ${isAudioPlay ? 'OnPlay bg-[#0f28e4] border-b-[#0a1a91]' : ''}`}
            disabled={isPlaySound}
            onClick={playClickEvent}>
            {isAudioPlay ? 'Stop' : 'Play'}
        </button>
    );
});