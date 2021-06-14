import Cart from "../model/Cart";

export const ADD_ITEM:string="ADD_ITEM";
export const DELETE_ITEM:string="DELETE_ITEM";

export interface CartAsync{
    selectadItem:Cart;
    id: any;
};

export interface CartAddItem extends CartAsync{
    type : typeof ADD_ITEM;
};
export interface CartDeleteItem extends CartAsync{
    type : typeof DELETE_ITEM;
}

export type CartActionTypes = CartAddItem | CartDeleteItem;