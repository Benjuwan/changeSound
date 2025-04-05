import { ChangeEvent, memo, useContext } from "react";
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
        <select className="w-full my-[1em] mx-auto leading-[2] text-[1.25rem] py-[1em] px-[.25em] border border-[#dadada] rounded bg-[#fff] lg:my-0 lg:mb-[1em]" onChange={changeSelect}>
            {isPlaySound &&
                <option disabled>ここから えらんでね</option>
            }
            <option value="english">えいご を きいてみよう</option>
            <option value="vehicles">いろいろな のりもの</option>
            <option value="animals-sea">うみ の どうぶつ</option>
            <option value="animals-field">りく の どうぶつ</option>
        </select>
    );
});