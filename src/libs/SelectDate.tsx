import { ChangeEvent, memo, useContext } from "react";
import styled from "styled-components";
import { PlaySoundContext } from "../providers/PlaySoundContext";
import { AudioPlayContext } from "../providers/AudioPlayContext";
import { GetDataTypeContext } from "../providers/GetDataContext";
import { SrcNumberingContext } from "../providers/SrcNumberingContext";

export const SelectDate = memo(() => {
    const { isPlaySound } = useContext(PlaySoundContext);
    const { setAudioPlay } = useContext(AudioPlayContext);
    const { setGetDataType } = useContext(GetDataTypeContext);
    const { setSrcNumbering } = useContext(SrcNumberingContext);

    const changeSelect: (selectEl: ChangeEvent<HTMLSelectElement>) => void = (selectEl: ChangeEvent<HTMLSelectElement>) => {
        setAudioPlay(false);
        setSrcNumbering(1); // 先頭ファイルナンバーである「1」を指定
        const selectedValue = selectEl.currentTarget.value;
        setGetDataType(selectedValue);
    }

    return (
        <SelectDateEl onChange={changeSelect}>
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