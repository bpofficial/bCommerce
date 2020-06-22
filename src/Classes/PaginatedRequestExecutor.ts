import fetch, { RequestInit, Response } from "node-fetch";

export default class PaginatedRequestExecutor {

    /**
     * This method will iterate through an array of provided url's
     * and return an array of responses from each url.
     * 
     * @param urls An array of urls to iterate through.
     * @param opts The request initialisation to pass to the request method.
     * @param maxDepth The maximum depth to iterate.
     */
    public static async exec(urls: string[], opts?: RequestInit, maxDepth?: number): Promise<Response[]> {
        const values = [];
        await urls.slice(1, !!maxDepth ? maxDepth - 1 : urls.length).reduce(async (prev, curr) => {
            return prev.then(() => {
                values.push(prev);
                return fetch(curr, opts);
            })
        }, fetch(urls[0], opts));
        return values;
    }

}