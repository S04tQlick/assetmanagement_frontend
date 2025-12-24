import { assetTypesApi } from "@/srs/lib/api/assetTypes";
import {institutionsApi} from "@/srs/lib/api/institutions";
import {assetCategoriesApi} from "@/srs/lib/api/assetCategories";
import {branchesApi} from "@/srs/lib/api/branches";
import {usersApi} from "@/srs/lib/api/users";
import {vendorsApi} from "@/srs/lib/api/vendors";
import {userRolesApi} from "@/srs/lib/api/userRoles";
import {assetsApi} from "@/srs/lib/api/assets";
import {addressesApi} from "@/srs/lib/api/addresses";


export const clientApi = {
    assetTypes: assetTypesApi,
    institutions: institutionsApi,
    assetCategories: assetCategoriesApi,
    branches: branchesApi,
    users: usersApi,
    assets: assetsApi,
    vendors: vendorsApi,
    userRoles: userRolesApi,
    addresses: addressesApi,
}
