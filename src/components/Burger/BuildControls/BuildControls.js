import React from "react";
import styles from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = (props) => {


        let ingrList = [{label:"Salad", type:"salad"}, {label:"Cheese", type:"cheese"}, {label:"Bacon", type:"bacon"}, {label:"Meat", type:"meat"}];
        ingrList = ingrList.map(el => <BuildControl key={el.label} 
                                                    ingredientName={el.label} 
                                                    type={el.type} 
                                                    disabled={props.disabled[el.type]}
                                                    controlsAdd={props.controlsAdd}
                                                    controlsRemove={props.controlsRemove}
                                        />)
        return(
            <div className={styles.BuildControls}> 
                <p><b>Current Price: {props.price.toFixed(2)}</b></p>
                
                {ingrList}
                <br/>

                <button 
                    className={styles.OrderButton} 
                    disabled={!props.order}
                    onClick={props.orderButtonClicked}>
                    ORDER NOW!
                </button>
            </div>
        )
}

export default buildControls;