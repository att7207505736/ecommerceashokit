import React from "react";
import { Component } from "react";
import { match as Match, NavLink } from "react-router-dom";
import { Location } from "history";
import addCartItem, { deleteCartItem } from "../actions/CartAction";
import { connect } from "react-redux"
import MessageBox from "../components/MessageBox";
import { FaTrashAlt , FaDollarSign } from "react-icons/fa";



interface IState { };
interface IProps {
    match: Match<routeParams>;
    location: Location;
    res: any;
    getAddItemResult: any;
    removeCartItem: any;
};
interface routeParams {
    id: any;
}

class CartScreen extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
    };
    componentDidMount() {



        this.props.getAddItemResult(this.props.match.params.id,
            this.props.location.search ? (Number(this.props.location.search.split("=")[1])) : 1);
    }
    deleteItem = (id: any) => {
        this.props.removeCartItem(id);


    };
    myFun = (id: any, qty: any) => {
        this.props.getAddItemResult(id, Number(qty));
    };


    render() {
        const { finalArray } = this.props.res;
        return (
            <React.Fragment>
                <div className="row top">

                    <div className="col-2">
                        <h1> Shopping Cart </h1>
                        {
                            finalArray.length === 0 ?
                                (<MessageBox variant="danger">Cart is Empty. <NavLink to="/" exact={true} strict>Start Shopping</NavLink></MessageBox>) :
                                (<div>
                                    <ul>
                                        {finalArray.map((item: any, index: number) => (
                                            <li key={index}>
                                                <div className="row">

                                                    <div>
                                                        <img src={item.image} alt={alert.name} className="small"></img>
                                                    </div>

                                                    <div>
                                                        <NavLink to={`/product/${item._id}`} exact={true} strict><span style={{ color: 'blue' }}>{item.name}</span></NavLink>
                                                    </div>
                                                    <div>
                                                        <select value={item.qty}
                                                            onChange={(e: any) => this.myFun(item._id, e.target.value)}>
                                                            {
                                                                [...Array(item.countInstock).keys()].map((x: any) => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                ))
                                                            }
                                                     </select>
                                                    </div>




                                                    <div>
                                                        <FaDollarSign /> {item.price}
                                                    </div>


                                                    <div>
                                                        <button onClick={() => { this.deleteItem(item._id) }}><FaTrashAlt size="2rem" /></button>

                                                    </div>

                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                </div>)
                        }
                    </div>

                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <h2>Total Number of ( {finalArray.reduce((totalItem: any, arg2: any) => totalItem + arg2.qty, 0)} ) Items and Grand Total {finalArray.reduce((totalprice: any, arg2: any) => totalprice + (arg2.qty * arg2.price), 0)} </h2>
                                </li>
                                <li>
                                    <button className="primary block" >Proceed to pay</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>





                {/* <NavLink to="/" className="back_screen"><AiFillHome  size="5rem"/></NavLink><br></br>
                 <br></br>
                 <div className="row top">
                    {finalArray.map((element:any,index:number)=>(
                         <div key={index}>
                             <img src={element.image} className="small_image"></img>
                            <button onClick={()=>this.deleteItem(element._id)}>Delete</button>
                         
                         </div>
                         
                    ))}
                    
                 </div>
              {JSON.stringify(finalArray)} */}



            </React.Fragment>
        )
    };
};
const receive = (state: any) => {
    return {
        res: state.cart
    }
};
const send = (dispatch: any) => {
    return {
        getAddItemResult: (id: string, qty: number) => { dispatch(addCartItem(id, qty)) },
        removeCartItem: (id: any) => { dispatch(deleteCartItem(id)) }
    }
};
export default connect(receive, send)(CartScreen);