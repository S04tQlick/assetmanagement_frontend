"use server";

import { headers } from "next/headers";


export const getSiteOrigin = async (): Promise<string> => {
    const headersList = await  headers();
    const host = headersList.get("host") ?? "localhost:3000";

    const isDev = process.env.NODE_ENV === "development";
    const protocol = isDev ? "http" : "https";

    return `${protocol}://${host}`;
};





