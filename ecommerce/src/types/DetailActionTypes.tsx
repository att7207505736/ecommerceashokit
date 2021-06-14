import Product from "../model/Product";

export const DETAILS_LOADING:string="DETAILS_LOADING";
export const DETAILS_LOADING_SUCCES:string="DETAILS_LOADING_SUCCES";
export const DETAILS_LOADING_FAIL:string="DETAILS_LOADING_FAIL";

interface DetailsAsync{
    loading:boolean;
    product:Product;
    error:string;

}

interface DetailsLoading extends DetailsAsync{
    type: typeof DETAILS_LOADING;
}
interface DetailsLoadingSucces extends DetailsAsync{
    type : typeof DETAILS_LOADING_SUCCES;
}
interface DetailsLoadingFail extends DetailsAsync{
    type : typeof DETAILS_LOADING_FAIL;
}
export type DetailsLoadingAction = DetailsLoading | DetailsLoadingSucces | DetailsLoadingFail;