




export type DepreciationMethod_Types = {
    id:string,
    depreciationMethod:string,
}

export type DepreciationMethod_TypesInput = {
    depreciationMethod: string, 
}

export type DepreciationMethodsApiResponse = {
    success: boolean;
    message: string;
    data: DepreciationMethod_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}



export const depreciationSelectMethods: DepreciationMethod_Types[] = [
    { id: "StraightLine", depreciationMethod: "Straight Line" },
    { id: "DecliningBalance", depreciationMethod: "Declining Balance" },
    { id: "SumOfYearsDigits", depreciationMethod: "Sum Of Years Digits" },
]