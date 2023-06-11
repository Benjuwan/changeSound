import { useCallback, useContext } from "react"
import { TheContext } from "../libs/TheContext";
import { jsonType } from "../ts/jsonType";

export const useFetchApi = () => {
    const { isGetFetchDates, setGetFetchDates } = useContext(TheContext);

    const FetchApi = useCallback((
        url: string
    ) => {
        const getJsonDates = async () => {
            const response = await fetch(url, { cache: "no-store" });
            const resObj: Array<jsonType> = await response.json();
            const newAry = [...isGetFetchDates];
            resObj.forEach(resEl => {
                // console.log(resEl);
                newAry.push(resEl);
                setGetFetchDates(newAry);
            });
        }
        getJsonDates();
    }, []);

    return { FetchApi }
}