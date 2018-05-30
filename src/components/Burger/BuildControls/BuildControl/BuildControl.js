import React from "react";
import styles from "./BuildControl.css";

const buildControl = (props) => {
    return(
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.ingredientName}</div> 
            <button onClick={()=>props.controlsAdd(props.type)}  className={styles.More}>+</button>
            <button onClick={()=>props.controlsRemove(props.type)} disabled={props.disabled} className={styles.Less}>-</button>
        </div>
    )
}

export default buildControl;