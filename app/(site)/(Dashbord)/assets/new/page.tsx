import {AssetForm} from "@/srs/components/Forms/DataForms/AssetForm";
import {GenerateSlug} from "@/srs/utils/slug";

const pageTitle:string = "Asset"
const slug =  GenerateSlug(pageTitle);
export default function NewAssetPage() {
    return (
        <div>
            <h1>Create {pageTitle} </h1>
            <AssetForm pageTitle={pageTitle} slug={slug} />
        </div>
    )
}
