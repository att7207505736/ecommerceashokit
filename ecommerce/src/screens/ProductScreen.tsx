import React, { Component } from "react";
import { match as Match, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux"
import getDetails from "../actions/DetailsAction";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Rating from "../components/Rating";
import { History,LocationState } from "history";



interface IState {
    qty: number;
};

interface IProps {
    match: Match<paramRoutes>;
    getDetailsById: any;
    res: any;
    history:History<LocationState>;

};

interface paramRoutes {
    id: any;
}

class ProductScreen extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            qty: 1
        }
    }
    setQty = (num: any) => {
        this.setState({
            qty: num
        })
    };
    componentDidMount() {
        this.props.getDetailsById(this.props.match.params.id);
    }
    addtoCart=(id: any)=>{
        this.props.history.push(`/cart/${id}?qty=${this.state.qty}`);
        
        
    }
    render() {
        const { loading, product, error } = this.props.res;
        return (
            <React.Fragment>

                {
                    !loading ? (<LoadingBox></LoadingBox>) : error === "Network Error" ? (<MessageBox variant="danger">{error}</MessageBox>) : (<div>
                        <NavLink to="/" className="back_screen"><FontAwesomeIcon icon={faHome} /></NavLink>
                        <div className="row top">
                            <div className="col-2">
                                <img src={product.image} alt={product.name}></img>
                            </div>

                            <div className="col-1">
                                <ul>
                                    <li><h2>{product.name}</h2></li>
                                    <li>
                                        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                                    </li>
                                    <li>
                                        $ {product.price}
                                    </li>
                                    <li>
                                        {product.description}
                                    </li>
                                </ul>
                            </div>

                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div>${product.price}</div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="row">
                                                <div>Avilability</div>
                                                <div>
                                                    {product.countInstock>0?(<span className="success">Stock Available</span>):(<span className="error">Out Of Stock</span>)}
                                                </div>
                                            </div>
                                        </li>

                                        {product.countInstock>0 && (
                                            <>
                                                <li>
                                                    <div className="row">
                                                        <div>Qty</div>
                                                        {/** dropdown */}
                                                        <div>
                                                            <select value={this.state.qty}
                                                                onChange={(e: any) => this.setQty(e.target.value)}>

                                                                {
                                                                    [...Array(product.countInstock).keys()].map((x: any) => (
                                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>

                                                    </div>
                                                </li>
                                                <li>
                                                    <button className="primary block" onClick={()=>{this.addtoCart(product._id)}}>Add to Cart</button>

                                                </li>
                                            </>
                                        )}


                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>)
                }
            </React.Fragment>
        )
    }
};
const receive = (state: any) => {
    return {
        res: state.details
    }
};
const send = (dispatch: any) => {
    return {
        getDetailsById: (id: any) => { dispatch(getDetails(id)) }
    }
};
export default connect(receive, send)(ProductScreen);