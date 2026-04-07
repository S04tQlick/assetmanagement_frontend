"use client";

import React from "react";
import { AssetTypeForm } from "@/srs/components/Forms/DataForms/asset-type-form";
import { AssetType_Types } from "@/srs/types/asset-type.types"; 
import {List} from "@/srs/components/ui-components/form-component/list"; 
import {CrudPageLayout} from "@/srs/components/ui-components/modal-component/crud-page-layout";
import {Detail} from "@/srs/components/ui-components/form-component/detail"; 

interface ClientProps {
    assetTypes: AssetType_Types[];
    pageTitle: string;
    baseUrl: string;
    slug: string;
}

export default function AssetTypesClientPage(props: ClientProps) {

    return (
        <CrudPageLayout<AssetType_Types>
            slug={props.slug}
            pageTitle={props.pageTitle}
            initialItems={props.assetTypes}
            getTitle={(item) => item.assetTypeName}

            ListComponent={({items, onView}) => (
                <List<AssetType_Types>
                    items={items}
                    onView={onView}
                    getName={(item) => item.assetTypeName}/>
            )}

            DetailComponent={({item}) => (
                <Detail<AssetType_Types>
                    item={item}
                    fields={["assetTypeName", "description"]}
                    fieldLabels={{
                        assetTypeName: "Asset Type",
                        description: "Description"
                    }}/>
            )}

            FormComponent={({initialData, onSuccess, registerSubmit}) => (
                <AssetTypeForm
                    pageTitle={props.pageTitle}
                    slug={props.slug}
                    initialData={initialData}
                    onSuccessAction={onSuccess}
                    registerSubmitAction={registerSubmit}/>
            )}
        />
    );
}