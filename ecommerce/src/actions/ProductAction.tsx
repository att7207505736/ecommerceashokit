import axios from "axios";
import { Dispatch } from "redux";
import { ProductsActionTypes, PRODUCTS_LOADING, PRODUCTS_LOADING_FAIL, PRODUCTS_LOADING_SUCCESS } from "../types/ProductActionTypes"

const getProducts=()=>{
    return async(dispatch:Dispatch<ProductsActionTypes>)=>{
        dispatch({
            type:PRODUCTS_LOADING,
            loading:false,
            products:[],
            error:""

        })
        try{
            const res= await axios.get("http://localhost:8080/api/products");
            const {data}=res;
            dispatch({
                loading:true,
                type:PRODUCTS_LOADING_SUCCESS,
                error:"",
                products:data
            })
        }
        catch(err){
            dispatch({
            loading:true,
            type:PRODUCTS_LOADING_FAIL,
            error:err.message,
            products:[]
             })
        }
    }
};
export default getProducts;