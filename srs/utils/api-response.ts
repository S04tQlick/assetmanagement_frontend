export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T | T[] | null;
    rowCount: number;
};


// userCount: number;
// branchCount: number;
// assetCount: number;