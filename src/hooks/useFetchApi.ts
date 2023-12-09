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
            if (response.status === 200) {
                const resObj: Array<jsonType> = await response.json();
                setGetFetchDates([...isGetFetchDates, ...resObj]);
            } else {
                console.log(response.status);
            }
        }
        getJsonDates();
    }, []);

    return { FetchApi }
}