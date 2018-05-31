import React, {Component} from "react";
import Aux from "../Auxiliary/Auxiliary";
import styles from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    
    state = {
        showSideDrawer: false,
    }

    SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    SideDrawerToggleHandler=()=>{
        this.setState( (prevState) => {return {showSideDrawer:!prevState.showSideDrawer}} );
    }


    render (){
        return(
            <Aux>    
                <Toolbar menuClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>  
        )
    } 
};


export default Layout;