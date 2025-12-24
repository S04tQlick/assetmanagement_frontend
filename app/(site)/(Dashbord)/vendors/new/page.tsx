import {GenerateSlug} from "@/srs/utils/slug";
import {VendorForm} from "@/srs/components/Forms/DataForms/VendorForm";

const pageTitle:string = "Vendor"
const slug =  GenerateSlug(pageTitle);
export default function NewVendorPage() {
    return (
        <div>
            <h1>Create {pageTitle} </h1>
            <VendorForm pageTitle={pageTitle} slug={slug} />
        </div>
    )
}
