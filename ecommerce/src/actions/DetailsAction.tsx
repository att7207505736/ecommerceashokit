import axios from "axios";
import { Dispatch } from "redux"
import { DetailsLoadingAction, DETAILS_LOADING, DETAILS_LOADING_FAIL, DETAILS_LOADING_SUCCES } from "../types/DetailActionTypes"

const getDetails = (id:any)=>{
    return async(dispatch:Dispatch<DetailsLoadingAction>)=>{

    dispatch({
        type:DETAILS_LOADING,
        loading:false,
        error:"",
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
        }

    });
    try{
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);
        const {data}=res;
        dispatch({
            type:DETAILS_LOADING_SUCCES,
            loading:true,
            error:"",
            product:data
        })
    }catch(err){
        dispatch({
            type:DETAILS_LOADING_FAIL,
            loading:true,
            error:err.message,
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
            }
        });
    }
}
};
export default getDetails;