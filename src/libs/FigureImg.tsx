import { memo, useEffect, useContext } from "react";
import { TheContext } from "./TheContext";

export const FigureImg = memo(() => {
    const { isAudioPlay } = useContext(TheContext);

    /**
     * useEffect で設定した副作用は必ずコンポーネントの描画の【後】に実行されますが、useLayoutEffect は、コンポーネントの描画の【前】に行われます。
     *（なお useLayoutEffect でも同処理は可能）
    */
    useEffect(() => {
        const charImg: HTMLImageElement | null = document.querySelector('#charImg');
        /* 読込 img が静止画（png）の場合はアニメーション用のスタイルを付与 */
        if (charImg?.getAttribute('src')?.split('min.')[1] === 'png') {
            if (isAudioPlay) {
                charImg?.classList.add('charImgOn');
            } else {
                charImg?.classList.remove('charImgOn');
            }
        }
    }, [isAudioPlay]);
    /* 依存配列に isAudioPlay を指定して isAudioPlay が更新される度に上記処理を実行する */

    return (
        <figure>
            <img id="charImg" src="" alt="" />
            <div id="charTxt"></div>
        </figure>
    );
});