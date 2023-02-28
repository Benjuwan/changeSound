import { memo } from "react";
import styled from "styled-components";
import { ChangeSound } from "./libs/ChangeSound";
import { PlaySound } from "./libs/PlaySound";

export const Contents = memo(() => {
    return (
        <ContentsWrapper id="contentsWrapper">
            <figure>
                <img id="charImg" src="" alt="" />
                <div id="charTxt"></div>
            </figure>
            <div className="btnContainer">
                <ChangeSound />
                <PlaySound />
            </div>
            <section id="soundsSec"></section>
        </ContentsWrapper>
    );
});

const ContentsWrapper = styled.main`
padding: 5em 2.5em calc(100vw/3);
    & figure{
        width: clamp(160px, calc(100vw/2), 560px);
        margin: 0 auto 2em;

        & #charTxt{
            font-size: 20px;
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
                    font-size: 14px;
                }
            }
        }
    }

    & .btnContainer{
        & button{
            font-size: clamp(16px, calc(100vw/56), 24px);
            width: clamp(80px, calc(100vw/2), 560px);
            margin: auto;
    
            &:first-of-type{
                margin-bottom: 80px;
            }
    
            &:not([disabled]){
                &:hover{
                    transition: filter .25s;
                    filter: sepia(1);
                }
        
                &:active{
                    transition: transform .25s;
                    border-bottom-color: transparent;
                    transform: translateY(.25em);
                }
            }
        }
    }

    & #soundsSec{
        & audio{
            display: none;
        }
    }

@media screen and (min-width: 700px){
    max-width: 640px;
    margin: auto;
    padding: 80px 2.5em 160px;

    &.appStart {
        display: flex;
        justify-content: space-between;
        gap: 5%;
    }

    & .btnContainer button,
    & figure {
        width: 100%;
        max-width: 640px;
        font-size: 24px;
    }

    & .btnContainer{
        & button{
            &:first-of-type{
                margin-bottom: 160px;
            }
        }
    }
}
`;