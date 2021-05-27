import React from "react";
import { Component} from "react";

interface IState{};
interface IProps{};
class LoadingBox extends Component<IProps,IState>{
    constructor(props:IProps){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <i className="fas fa-sync fa-spin"></i>
            </React.Fragment>
        )
    }
};
export default LoadingBox;