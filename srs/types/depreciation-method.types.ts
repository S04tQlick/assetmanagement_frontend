import {ApiResponse} from "@/srs/utils/api-response";

export type DepreciationMethod_Types = {
    id?:string,
    depreciationMethod:string,
}


export type DepreciationMethodsApiResponse =  ApiResponse<DepreciationMethod_Types> 



export const depreciationSelectMethods: DepreciationMethod_Types[] = [
    { id: "StraightLine", depreciationMethod: "Straight Line" },
    { id: "DecliningBalance", depreciationMethod: "Declining Balance" },
    { id: "SumOfYearsDigits", depreciationMethod: "Sum Of Years Digits" },
]