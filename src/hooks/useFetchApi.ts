import { useCallback, useContext, useEffect } from "react"
import { TheContext } from "../libs/TheContext";
import { jsonType } from "../ts/jsonType";

export const useFetchApi = () => {
    const { isGetFetchDates, setGetFetchDates } = useContext(TheContext);

    const FetchApi = useCallback((
        url: string
    ) => {
        useEffect(() => {
            const getJsonDates = async () => {
                const response = await fetch(url);
                const resObj: Array<jsonType> = await response.json();
                // console.log(resObj);

                const newAry = [...isGetFetchDates];
                resObj.forEach(resEl => {
                    // console.log(resEl);
                    newAry.push(resEl);
                    setGetFetchDates(newAry);
                });
            }
            getJsonDates();
        }, []);
    }, []);

    return { FetchApi }
}