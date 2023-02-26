import { useCallback } from "react"

export const useCreateAudioEls = () => {
    const CreateAudioEls = useCallback((
        baseEl: string,
        countNum: number
    ) => {
        const randomNum: number = Math.floor(Math.random() * countNum);
        // console.log(randomNum);

        const targetEl = document.querySelector(baseEl);
        if (targetEl !== null && randomNum !== 0) {
            targetEl.innerHTML = '';
            targetEl.insertAdjacentHTML('beforeend', `<audio src="${location.origin}/public/sounds/sounds-00${randomNum}.mp3"}></audio>`);
        }
    }, []);

    return { CreateAudioEls }
}