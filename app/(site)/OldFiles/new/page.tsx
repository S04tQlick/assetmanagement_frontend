import {AssetTypeForm} from "@/srs/components/Forms/DataForms/AssetTypeForm";
import {GenerateSlug} from "@/srs/utils/slug";

const pageTitle:string = "Asset Type"
const slug =  GenerateSlug(pageTitle);
export default function NewAssetTypePage() {
    return (
        <div>
            <h1>Create {pageTitle} </h1>
            <AssetTypeForm pageTitle={pageTitle} slug={slug}/>
        </div>
    )
}
