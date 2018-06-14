import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";


const withErrorHandler = (WrappedComponents, axios) => {
    return  class extends Component {

        state={
            error:null
        }

        componentWillMount(){
            axios.interceptors.request.use(null, request=>{
                this.setState({error:null});
                return request;
            });
            axios.interceptors.response.use(null, error=>{
                this.setState({error:error});
                return error;
            });
        }
        
        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>

                     { this.state.error? this.state.error.message : null }

                    </Modal>
                    <WrappedComponents {...this.props}/>
                </Aux>
        );
        }
}
}

export default withErrorHandler;