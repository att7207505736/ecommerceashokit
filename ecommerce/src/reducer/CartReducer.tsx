import Cart from "../model/Cart";
import { ADD_ITEM, CartActionTypes, DELETE_ITEM } from "../types/CartActionTypes";

interface IState{
    finalArray:Cart[];
};

const initialState:IState={
    finalArray:window.localStorage.getItem("cart") ? (JSON.parse(window.localStorage.getItem("cart") || '{}')) : []
};


const CartReducer = (state=initialState,action:CartActionTypes):IState=>{
    switch(action.type){
        case ADD_ITEM:
            const item=action.selectadItem;
            
            if(item._id==="" || item.qty===0){
                return {...state}
            }           

            
            
            const existedItem=state.finalArray.find((obj)=>{return obj._id===item._id});
            if(existedItem){
                return{
                    ...state,
                    finalArray : state.finalArray.map((obj)=>{ return obj._id === item._id ? item : obj})
                }

            }else{
                return{
                    ...state,
                    finalArray:[...state.finalArray,item]
                }
            }
            break;
        case DELETE_ITEM:
            const id=action.id;
            return{
                ...state,
                finalArray:state.finalArray.filter((element)=>{return element._id != id})
            }
            break;

            
            default:
                return state;

    }

}

export default CartReducer;