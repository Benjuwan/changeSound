import { useCallback, useContext } from "react"
import { TheContext } from "../libs/TheContext";
import { jsonType } from "../ts/jsonType";

export const useFetchApi = () => {
    const { isGetFetchDates, setGetFetchDates } = useContext(TheContext);

    const FetchApi: (url: string) => void = useCallback((
        url: string
    ) => {
        const getJsonDates: () => Promise<void> = async () => {
            const response = await fetch(url, { cache: "no-store" });
            if (response.status === 200) {
                const resObj: Array<jsonType> = await response.json();
                setGetFetchDates([...isGetFetchDates, ...resObj]);
            } else {
                console.error(response.status);
            }
        }
        getJsonDates();
    }, []);

    return { FetchApi }
}