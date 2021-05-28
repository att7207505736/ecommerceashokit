import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import getProducts from "../actions/ProductAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Products from "../components/Products";

interface IState{

};
interface IProps{
  my_fun:any;
  response:any;

};
class HomeScreen extends Component<IProps,IState>{
  constructor(props:IProps){
    
    super(props);
  }
  componentDidMount(){
    this.props.my_fun();

  };
  render(){
    const {loading,products,error}=this.props.response;
    
    return(
    <React.Fragment>
      
      {
        !loading?(<LoadingBox></LoadingBox>):
        error==="Network Error"?(<MessageBox variant="danger">{error}</MessageBox>):
        (<Products arr={products}></Products>)
      }

    </React.Fragment>
    )
  }
};
//subscription
const receive=(state:any)=>{
  
  
  return{
    response : state.products


  }
}
//dispatch
const send=(dispatch:any)=>{
  return{
    my_fun:()=>{dispatch(getProducts())}
  }
}
export default connect(receive,send)(HomeScreen);