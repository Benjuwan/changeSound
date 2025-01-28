import { useCallback, useContext } from "react"
import { jsonType } from "../ts/jsonType";
import { GetFetchDatasContext } from "../providers/GetFetchDatasContext";

export const useFetchApi = () => {
    const { isGetFetchDatas, setGetFetchDatas } = useContext(GetFetchDatasContext);

    const FetchApi: (url: string) => void = useCallback((
        url: string
    ) => {
        const getJsonDates: () => Promise<void> = async () => {
            const response = await fetch(url, { cache: "no-store" });
            if (response.status === 200) {
                const resObj: Array<jsonType> = await response.json();
                setGetFetchDatas([...isGetFetchDatas, ...resObj]);
            } else {
                console.error(response.status);
            }
        }
        getJsonDates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { FetchApi }
}