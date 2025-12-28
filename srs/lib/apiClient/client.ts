import { assetTypesApi } from "@/srs/lib/api/asset-types.api";
import {institutionsApi} from "@/srs/lib/api/institutions.api";
import {assetCategoriesApi} from "@/srs/lib/api/asset-categories.api";
import {branchesApi} from "@/srs/lib/api/branches.api";
import {usersApi} from "@/srs/lib/api/users.api";
import {vendorsApi} from "@/srs/lib/api/vendors.api";
import {userRolesApi} from "@/srs/lib/api/user-roles.api";
import {assetsApi} from "@/srs/lib/api/assets.api";
import {addressesApi} from "@/srs/lib/api/addresses.api";


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
