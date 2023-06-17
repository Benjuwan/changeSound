import { memo, useContext } from "react";
import styled from "styled-components";
import { TheContext } from "./libs/TheContext";
import { SelectDate } from "./libs/SelectDate";
import { ChangeSound } from "./libs/ChangeSound";
import { PlaySound } from "./libs/PlaySound";

export const Contents = memo(() => {
    const { isPlaySound } = useContext(TheContext);

    return (
        <ContentsWrapper id="contentsWrapper">
            {isPlaySound ||
                <figure>
                    <img id="charImg" src="" alt="" />
                    <div id="charTxt"></div>
                </figure>
            }
            <div className="btnContainer">
                {isPlaySound &&
                    <>
                        <h2>聞いて見て：幼児・低学年の子供向け知育ゲーム</h2>
                        <p>『聞いて見て』は、幼児・低学年の子供向け知育ゲームです。「色々な乗り物」や「動物たち」などカテゴリーを選択してゲーム開始ボタンをクリックすると当該対象物の音声が流れるとともに画像が表示されます。聴覚・視覚的に対象物（モノ・コト）を学ぶことができるでしょう。</p>
                    </>
                }
                <SelectDate />
                <ChangeSound />
                <PlaySound />
            </div>
            <section id="soundsSec"></section>
        </ContentsWrapper>
    );
});

const ContentsWrapper = styled.main`
padding: 0 2.5em calc(100vw/3);

    & figure{
        width: clamp(16rem, calc(100vw/2), 56rem);
        margin: 0 auto 2em;

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

    & .btnContainer{
        & button{
            font-size: clamp(16px, calc(100vw/56), 24px);
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
        display: flex;
        justify-content: space-between;
        gap: 5%;
        padding-top: 2em;
    }

    & .btnContainer {
        & button,
        & figure {
            width: 100%;
            max-width: 640px;
            font-size: 24px;
        }
    
        & h2 {
            font-size: 24px;
        }
    
        & p {
            font-size: 14px;
        }
    }

    & figure{
        & #charTxt{
            font-size: 20px;

            & p{
                & span{
                    font-size: 14px;
                }
            }
        }
    }
}

@media screen and (min-width: 1025px) {
    max-width: 960px;

    & .btnContainer button,
    & figure {
        max-width: 960px;
    }
}
`;