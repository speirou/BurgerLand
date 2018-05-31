import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    
    let listIngr = props.ingredients;
    listIngr = Object.keys(listIngr).map((el,i) => 
        <li key={i}> <span style={{textTransform:"capitalize"}}> {el} </span> :{listIngr[el]} </li>);

    return(
        <Aux>
            <h3>Your Order</h3>
            <br/>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {listIngr}
            </ul>
            <p><b>The total price is: {props.price.toFixed(2)} $</b></p>
            <p> Continue to Checkout?</p>
            <Button btnType="Success" clicked={props.purchaseContinue}> CONTINUE </Button>
            <Button btnType="Danger" clicked={props.purchaseCancel}> CANCEL </Button>
            
        </Aux>
    )
}

export default orderSummary;