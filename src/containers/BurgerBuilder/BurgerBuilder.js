import React, {Component} from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger"; 
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const PRICE_LIST = {
    salad:0.5,
    cheese:1.2,
    bacon:0.8,
    meat:2.1
}


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     //this.state={};
    // }
    
    min_price = 5;

    state = {
        ingredients: null,
        amount: 1,
        price: this.min_price,
        order:true,     //order action is enabled (ingredients exist)
        orderButtonClicked: false,
        loading:false,
    }; 

    componentDidMount(){
        axios.get("https://burgerland-bd38b.firebaseio.com/Ingredients.json")
             .then(response=> { console.log(response.data); this.setState({ingredients:response.data}) })
             .catch(error=> console.log(error) );
    };

    purchaseHandler = () => {
        this.setState({orderButtonClicked: true});
    }

    purchaseCancelHandler = () => {
        this.setState({orderButtonClicked: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: "Sofia Peirounaki",
                address: {
                    road: "High Street 15",
                    zipCode: "29753",
                    country: "UK"},
                emailAddress: "sofiapeir@hotmail.com"  
            },
            delieveryMode: "fastest"  
        }
        axios.post("./orders.json", order)
            .then(response=> { this.setState({loading:false, orderButtonClicked:false}); console.log(response)})
            .catch(error=> { this.setState({loading:false, orderButtonClicked:false}); console.log(error)});
    }

    orderStatus = (newstate) => {
        let order;
        if( Object.values(newstate.ingredients).reduce((acc,curr)=> acc+=curr, 0) === 0) order=false;
        else order=true  //if ingredients>=1 then order is enabled
        this.setState({order:order});
    }

    addIngredient = (type)=>{
        let count = this.state.ingredients[type];
        count+=1;
        let newstate = this.state;
        newstate.ingredients[type]=count;

        //the default burger has only 1 ingredient and therefore when no ingredients
        //exist and just 1 is added => price is the default minimum
        const numIngr = Object.values(newstate.ingredients).reduce((acc,curr)=> acc+=curr, 0);
        if (numIngr===1) newstate.price = this.min_price; 
        else newstate.price = newstate.price + PRICE_LIST[type];

        this.setState({newstate});
        this.orderStatus(newstate);
    }

    removeIngredient=(type)=>{
        let count = this.state.ingredients[type]

        if (count>0){   //Do nothing when asked to remove absent ingredients, otherwise:
            count-=1;
            let newstate = this.state;
            newstate.ingredients[type]=count;
            newstate.price = newstate.price - PRICE_LIST[type];
           
            //Min price is 5, (either 1 or 0 ingredients) 
            if (newstate.price < this.min_price) newstate.price = this.min_price;            

            this.setState({newstate});
            this.orderStatus(newstate);
        }
    }


    render(){
        
        let disabledTable = {...this.state.ingredients};
        for (let i in disabledTable) disabledTable[i] = disabledTable[i]<=0;

        //burger and ordersummary depend on ingredients which we fetch from 
        //firebase and so they will receive values when ingredients are fetched.
        let burger = <Spinner/>
        let orderSummary = null;

        if (this.state.ingredients){
            burger = (<Aux>
                        <Burger ingredients={this.state.ingredients} amount={this.state.amount} />
                
                        <BurgerControls controlsAdd={this.addIngredient} 
                                controlsRemove={this.removeIngredient}
                                disabled={disabledTable} 
                                price={this.state.price} 
                                order={this.state.order}
                                orderButtonClicked={this.purchaseHandler}/>
                      </Aux> );
                     
            orderSummary = (<OrderSummary ingredients={this.state.ingredients} 
                                         price={this.state.price} 
                                         purchaseContinue={this.purchaseContinueHandler} 
                                         purchaseCancel={this.purchaseCancelHandler}/> );
        };

        return(
            <Aux>
                
                <Modal show={this.state.orderButtonClicked} modalClosed={this.purchaseCancelHandler}>
                    {this.state.loading? <Spinner/> : orderSummary}
                </Modal>
                {burger}

            </Aux>
        );
    }

}

export default withErrorHandler(BurgerBuilder, axios);