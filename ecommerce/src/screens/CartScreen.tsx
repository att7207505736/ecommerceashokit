import React from "react";
import { Component } from "react";
import {match as Match, NavLink} from "react-router-dom";
import { AiFillHome } from 'react-icons/ai';
import {Location} from "history";
import addCartItem,{deleteCartItem} from "../actions/CartAction";
import { connect } from "react-redux"



interface IState{};
interface IProps{
    match: Match<routeParams>;
    location:Location;
    res: any;
    getAddItemResult: any;
    removeCartItem: any;
};
interface routeParams{
    id:any;
}

class CartScreen extends Component<IProps,IState>{
    constructor(props:IProps){
        super(props);
    };
    componentDidMount(){

        

        this.props.getAddItemResult(this.props.match.params.id,
                                     this.props.location.search?(Number(this.props.location.search.split("=")[1])):1);
    }
    deleteItem=(id: any)=>{
        this.props.removeCartItem(id);
        

    }

    render(){
        const {finalArray}=this.props.res;
        return(
            <React.Fragment>
                 <NavLink to="/" className="back_screen"><AiFillHome  size="5rem"/></NavLink><br></br>
                 <br></br>
                 <div className="row top">
                    {finalArray.map((element:any,index:number)=>(
                         <div key={index}>
                             <img src={element.image} className="small_image"></img>
                            <button onClick={()=>this.deleteItem(element._id)}>Delete</button>
                         
                         </div>
                         
                    ))}
                    
                 </div>
              {/* {JSON.stringify(finalArray)} */}
             
              
              
            </React.Fragment>
        )
    };
};
const receive = (state: any)=> {
    return{
        res: state.cart
    }
};
const send = (dispatch: any)=> {
    return{
        getAddItemResult:(id:string,qty:number)=>{dispatch(addCartItem(id,qty))},
        removeCartItem:(id:any)=>{dispatch(deleteCartItem(id))}
    }
};
export default connect (receive, send) (CartScreen);