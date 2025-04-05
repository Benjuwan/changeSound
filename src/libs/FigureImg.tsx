import { memo, useContext, useEffect, useMemo, useRef } from "react";
import { isDeploy } from "../common/isDeploy";
import { GetDataTypeContext } from "../providers/GetDataContext";
import { GetFetchDatasContext } from "../providers/GetFetchDatasContext";
import { SrcNumberingContext } from "../providers/SrcNumberingContext";
import { useAdjustSrcNumberPath } from "../hooks/useAdjustSrcNumberPath";

export const FigureImg = memo(() => {
    const { isGetDataType } = useContext(GetDataTypeContext);
    const { isGetFetchDatas } = useContext(GetFetchDatasContext);
    const { isSrcNumbering } = useContext(SrcNumberingContext);

    const FigureImgRef = useRef<HTMLImageElement | null>(null);

    const { adjustSrcNumberPath } = useAdjustSrcNumberPath();

    /* 動画データ（本番環境は絶対パスで指定）*/
    const gifData: string = useMemo(() => {
        return isDeploy ? `https://changesound-app.vercel.app/img/${isGetDataType}/img-${adjustSrcNumberPath}-min.gif` : `${location.origin}/public/img/${isGetDataType}/img-${adjustSrcNumberPath}-min.gif`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetDataType, isSrcNumbering]);

    /* 静止画データ（本番環境は絶対パスで指定）*/
    const pngData: string = useMemo(() => {
        return isDeploy ? `https://changesound-app.vercel.app/img/${isGetDataType}/img-${adjustSrcNumberPath}-min.png` : `${location.origin}/public/img/${isGetDataType}/img-${adjustSrcNumberPath}-min.png`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetDataType, isSrcNumbering]);

    const charTxtIndex: number = useMemo(() => {
        /* 配列は[0]スタートなので[isSrcNumbering -1] */
        const targetNumValue: number = isSrcNumbering <= isGetFetchDatas.length ? isSrcNumbering - 1 : isSrcNumbering;

        if (targetNumValue <= 0) {
            return 0;
        }
        return targetNumValue;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetDataType, isSrcNumbering]);

    useEffect(() => {
        if (!(isGetDataType.match('english'))) {
            return; // 英語コンテンツでない場合は早期終了
        }

        /* 画像切り替えの度に charImgOn クラスを都度付与 */
        FigureImgRef.current?.classList.remove('charImgOn');
        const timeOutId = setTimeout(() => FigureImgRef.current?.classList.add('charImgOn')); // 疑似的遅延処理でクラスを最終処理として付与する

        return () => {
            clearTimeout(timeOutId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSrcNumbering]);

    return (
        <figure className="w-fill mx-auto mb-[2em] overflow-hidden md:m-0">
            <img
                id="charImg"
                className="block m-auto w-full"
                ref={FigureImgRef}
                src={isGetDataType.match('english') ? pngData : gifData}
                alt={`No.${isSrcNumbering}：${isGetFetchDatas[charTxtIndex].kanji}（${isGetFetchDatas[charTxtIndex].hiragana}）の画像またはデフォルメイラスト`}
            />
            <div id="charTxt" className="text-[1.125rem] tracking-[.25em] mt-[2.5em]">
                <p className="pl-[1em] border-b border-b-[#d2d2d2] pb-[1em]"><span className="indent-[-1em] block text-[0.875rem]">ひらがな：</span>{isGetFetchDatas[charTxtIndex].hiragana}</p>
                <p className="pl-[1em] border-b border-b-[#d2d2d2] pb-[1em]"><span className="indent-[-1em] block text-[0.875rem]">えいご：</span>{isGetFetchDatas[charTxtIndex].english}</p>
                <p className="pl-[1em]"><span className="indent-[-1em] block text-[0.875rem]">かんじ（漢字）：</span>{isGetFetchDatas[charTxtIndex].kanji}</p>
            </div>
        </figure>
    );
});