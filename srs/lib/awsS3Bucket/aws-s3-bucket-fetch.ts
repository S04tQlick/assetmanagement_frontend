// export async function AwsS3BucketFetch(url: string) {
//     const res = await fetch(url);
//
//     if (!res.ok) {
//         throw new Error(`File fetch failed: ${res.status}`);
//     }
//    
//     if (typeof window === "undefined") {
//         return Buffer.from(await res.arrayBuffer());
//     }
//    
//     const blob = await res.blob();
//     return URL.createObjectURL(blob);
// }
