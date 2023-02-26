import { memo } from "react";
import styled from "styled-components";
import { ChangeSound } from "./libs/ChangeSound";
import { PlaySound } from "./libs/PlaySound";

export const Contents = memo(() => {
    return (
        <ContentsWrapper>
            <figure><img id="charImg" src="" alt="" /></figure>
            <ChangeSound />
            <PlaySound />
            <section id="soundsSec"></section>
        </ContentsWrapper>
    );
});

const ContentsWrapper = styled.main`
padding: 5em 2.5em calc(100vw/3);

    & figure{
        width: clamp(160px, calc(100vw/2), 560px);
        margin: 0 auto 2em;
    }

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

    & #soundsSec{
        & audio{
            display: none;
        }
    }

@media screen and (min-width: 700px){
    padding: 80px 2.5em 160px;

    & button,
    & figure {
        width: 100%;
        max-width: 640px;
    }
    
    & button {
        font-size: 24px;
    }
}
`;