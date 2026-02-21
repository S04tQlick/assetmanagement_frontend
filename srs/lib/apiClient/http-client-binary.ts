export async function httpClientBinary(url: string): Promise<Response> {
    return fetch(`${process.env.API_BASE_URL}${url}`,{
        method: 'GET',
        cache: 'no-cache',
    })
}