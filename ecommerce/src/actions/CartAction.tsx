import axios from "axios";
import { Dispatch } from "redux";
import { ADD_ITEM, CartActionTypes, DELETE_ITEM } from "../types/CartActionTypes";

export const deleteCartItem=(id:any)=>{ 
    return (dispatch:Dispatch<CartActionTypes>,getState:()=>any)=>{
        dispatch({
            type:DELETE_ITEM,
            id:id,
            selectadItem:{
                _id:"",
                brand:"",
                countInstock:0,
                description:"",
                image:"",
                name:"",
                numReviews:0,
                price:0,
                qty:0,
                rating:0

            }
        });
        window.localStorage.setItem("cart",JSON.stringify(getState().cart.finalArray));
    }
}

const addCartItem =(id:string,qty:number)=>{
    return async (dispatch:Dispatch<CartActionTypes>, getState:()=>any)=>{
        try{
           const res=await axios.get(`http://localhost:8080/api/products/${id}`);
           const {data}=res;
           data["qty"]=qty;
           dispatch({
               type:ADD_ITEM,
               selectadItem:data,
               id:""
           })
           
           window.localStorage.setItem("cart",JSON.stringify(getState().cart.finalArray)); 

        }catch(err){
            dispatch({
                type:ADD_ITEM,
                id: "",
                selectadItem:{
                    _id:"",
                    brand:"",
                    countInstock:0,
                    description:"",
                    image:"",
                    name:"",
                    numReviews:0,
                    price:0,
                    qty:0,
                    rating:0

                }
            })

        }
    }

};
export default addCartItem;