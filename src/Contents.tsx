import { memo, useContext } from "react";
import styled from "styled-components";
import { TheContext } from "./libs/TheContext";
import { FigureImg } from "./libs/FigureImg";
import { SelectDate } from "./libs/SelectDate";
import { ChangeSound } from "./libs/ChangeSound";
import { PlaySound } from "./libs/PlaySound";

export const Contents = memo(() => {
    const { isPlaySound } = useContext(TheContext);

    return (
        <ContentsWrapper id="contentsWrapper">
            <div className={isPlaySound ? 'Container' : 'Container addFlexBox'}>
                {isPlaySound ?
                    <>
                        <h2>聞いて見て：幼児・低学年の子供向け知育ゲーム</h2>
                        <p>『聞いて見て』は、幼児・低学年の子供向け知育ゲームです。「色々な乗り物」や「動物たち」などカテゴリーを選択してゲーム開始ボタンをクリックすると当該対象物の音声が流れるとともに画像が表示されます。聴覚・視覚的に対象物（モノ・コト）を学ぶことができるでしょう。</p>
                    </> :
                    <FigureImg />
                }
                <div className="btnCtrlEls">
                    <SelectDate />
                    <ChangeSound />
                    <PlaySound />
                </div>
            </div>
            <section id="soundsSec"></section>
        </ContentsWrapper>
    );
});

const ContentsWrapper = styled.main`
padding: 0 2.5em calc(100vw/3);

    & .Container {
        & figure {
            width: clamp(16rem, 100%, 64rem);
            margin: 0 auto 2em;
            overflow: hidden;

            & #charImg {
                &.charImgOn {
                    display: inline-block;
                    animation: imgAction .5s linear forwards;
                    animation-delay: .5s;

                    @keyframes imgAction {
                        0%, 100%{transform:translateY(0px) scaleY(1)}
                        25%{transform:translateY(6px) scaleY(1.05)}
                        50%{transform:translateY(12px) scaleY(1.25)}
                    }
                }
            }

            & #charTxt{
                font-size: 2rem;
                letter-spacing: .25em;
                margin-bottom: 2.5em;

                & p{
                    padding-left: 1em;

                    &:not(:last-of-type){
                        border-bottom: 1px solid #d2d2d2;
                        padding-bottom: 1em;
                    }

                    & span{
                        text-indent: -1em;
                        display: block;
                        font-size: 1.4rem;
                    }
                }
            }
        }

        & .btnCtrlEls {
            & button{
                font-size: clamp(1.4rem, calc(100vw/56), 1.8rem);
                width: 100%;
        
                &:not([disabled]){
                    &:hover{
                        transition: opacity .25s;
                        opacity: .5;
                    }
            
                    &:active{
                        transition: transform .25s;
                        border-bottom-color: transparent;
                        transform: translateY(.25em);
                    }
                }
            }
        }

        & h2 {
            font-size: 2.4rem;
        }

        & p {
            font-size: 1.4rem;
            line-height: 2;
        }
    }

    & #soundsSec{
        & audio{
            display: none;
        }
    }

@media screen and (min-width: 700px) {
    max-width: 640px;
    margin: auto;
    padding: 0 2.5em 160px;

    &.appStart {
        & .Container {
            padding-top: 2em;

            &.addFlexBox {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                gap: 8%;

                & .btnCtrlEls,
                & figure {
                    width: 46%;
                }
            }

            & .btnCtrlEls {
                width: 100%;
                & button {
                    font-size: 18px;
                }
            }

            & figure {
                width: 100%;
                margin: 0;
                font-size: 18px;

                & #charTxt{
                    font-size: 20px;

                    & p{
                        & span{
                            font-size: 14px;
                        }
                    }
                }
            }
        
            & h2 {
                font-size: 24px;
            }
        
            & p {
                font-size: 14px;
            }
        }
    }
}

@media screen and (min-width: 1025px) {
    max-width: 960px;

    &.appStart {
        & .Container {
            &.addFlexBox {
                gap: 4%;
            }
        }
    }
}
`;