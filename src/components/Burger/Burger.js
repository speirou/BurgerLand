import React from "react";
//import Aux from "../../hoc/Auxiliary";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import styles from "./Burger.css";

const burger = (props) => {
    
    let ingrNames = Object.keys(props.ingredients); //the names of each ingredient listed in state object
    let ingrAmounts = Object.values(props.ingredients); //the amounts of each ingredient listed in state object
    let ingredients = ingrNames.map( (el,index) => [el, ingrAmounts[index]] ); //[[salad,1],[cheese,2],[bacon,0],[meat,1]]
    

    ingredients = ingredients.map( (element, index)=> //[[salad,1],[cheese,2],[bacon,0],[meat,1]]
        [...Array(element[1])]   //[[a],[a,a],[a],[a]]
       .map((el,id)=><BurgerIngredient key = {`${element[0]+id+index}`} type={element[0]} amount={element[1]} />) //array of arrays of elements
    ).reduce((prev, curr)=>prev.concat(curr), []); //creates a single array of the JSX elements

    
    if (ingredients==0) ingredients=<p>Please Insert Ingredients</p>
    

    return(

    <div className={styles.Burger}>
        <BurgerIngredient type="bread-top" />
        {ingredients}
        <BurgerIngredient type="bread-bottom"/>
    </div>
)
}


export default burger;