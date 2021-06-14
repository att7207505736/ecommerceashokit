

import Product from "../model/Product";
import { DetailsLoadingAction, DETAILS_LOADING, DETAILS_LOADING_FAIL, DETAILS_LOADING_SUCCES } from "../types/DetailActionTypes";


interface IState{
    loading:boolean;
    product:Product;
    error:string;
}

const initialState:IState={
    loading:false,
    product:{
        "_id":"",
        "brand":"",
        "countInstock":0,
        "description":"",
        "image":"",
        "name":"",
        "price":0,
        "qty":0,
        "rating":0,
        "numReviews":0
    },
        error:""
    }



const detailReducer=(state=initialState,action:DetailsLoadingAction):IState=>{
    switch(action.type){
        case DETAILS_LOADING:
        case DETAILS_LOADING_SUCCES:    
        case DETAILS_LOADING_FAIL:
            return{
                ...state,
                loading:action.loading,
                product:action.product,
                error:action.error
            }    
            default:
                return state;
    }

};
export default detailReducer;