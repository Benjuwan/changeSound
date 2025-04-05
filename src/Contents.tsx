import { memo, useContext } from "react";
import { PlaySoundContext } from "./providers/PlaySoundContext";
import { FigureImg } from "./libs/FigureImg";
import { SelectDate } from "./libs/SelectDate";
import { ChangeSound } from "./libs/ChangeSound";
import { PlaySound } from "./libs/PlaySound";
import { ContentSound } from "./libs/ContentSound";

export const Contents = memo(() => {
    const { isPlaySound } = useContext(PlaySoundContext);

    return (
        <main id="contentsWrapper" className="ContentsWrapper px-[2.5em] pb-[calc(100vw/3)] md:max-w-[640px] md:m-auto md:px-[2.5em] md:pb-[160px]">
            <div className={isPlaySound ? 'Container' : 'Container addFlexBox'}>
                {isPlaySound ?
                    <>
                        <h2 className="text-[1.5rem]">聞いて見て：幼児・低学年の子供向け知育ゲーム</h2>
                        <p className="text-[0.875rem] leading-[2]">『聞いて見て』は、幼児・低学年の子供向け知育ゲームです。「色々な乗り物」や「動物たち」などカテゴリーを選択してゲーム開始ボタンをクリックすると当該対象物の音声が流れるとともに画像が表示されます。聴覚・視覚的に対象物（モノ・コト）を学ぶことができるでしょう。</p>
                    </> :
                    <FigureImg />
                }
                <div className="btnCtrlEls">
                    <SelectDate />
                    <ChangeSound />
                    <PlaySound />
                </div>
            </div>
            <ContentSound />
        </main>
    );
});