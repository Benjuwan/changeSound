import { ChangeEvent, memo, useContext } from "react";
import styled from "styled-components";
import { PlaySoundContext } from "../providers/PlaySoundContext";
import { GetDataTypeContext } from "../providers/GetDataContext";
import { useBackToDefault } from "../hooks/useBackToDefault";

export const SelectDate = memo(() => {
    const { isPlaySound, setPlaySound } = useContext(PlaySoundContext);
    const { setGetDataType } = useContext(GetDataTypeContext);

    const changeSelect: (selectEl: ChangeEvent<HTMLSelectElement>) => void = (selectEl: ChangeEvent<HTMLSelectElement>) => {
        /* isPlaySound を一旦リセット（true）して PlaySound を使用不可にして読み込むjsonデータを切り替えて処理（ChangeSoundクリックで再生処理）させる */
        setPlaySound(true);
        const selectedValue = selectEl.currentTarget.value;
        setGetDataType(selectedValue);
    }

    const { BackToDefault } = useBackToDefault();

    return (
        <SelectDateEl onChange={(el) => {
            changeSelect(el);
            BackToDefault();
        }}>
            {isPlaySound &&
                <option disabled>ここから えらんでね</option>
            }
            <option value="english">えいご を きいてみよう</option>
            <option value="vehicles">いろいろな のりもの</option>
            <option value="animals-sea">うみ の どうぶつ</option>
            <option value="animals-field">りく の どうぶつ</option>
        </SelectDateEl>
    );
});

const SelectDateEl = styled.select`
width: 100%;
margin: 1em auto;
line-height: 2;
font-size: 1.8rem;
padding: 1em .25em;
border: 1px solid #dadada;
border-radius: 4px;
background-color: #fff;

@media screen and (min-width: 700px) {
    font-size: 18px;
}
`;