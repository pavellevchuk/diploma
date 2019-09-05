import React, { Component } from 'react'
import {BrowserRouter, Switch , Route} from 'react-router-dom'
import Nav from './Nav.js'
import Home from './Home.js'
import Footer from './Footer.js';
import CatalogueWithFetcher from './Catalogue.js'
import ProductCart from './ProductCard.js'
import Order from './Order.js'
import Favourite from './Favourite.js'
import '../layout/css/style.css'
import '../layout/css/font-awesome.min.css'
import '../layout/css/style-catalogue.css'
import '../layout/css/normalize.css'
import '../layout/css/style-favorite.css'
import '../layout/css/style-order.css'
import '../layout/css/style-product-card.css'



export class App extends Component {
    constructor(props){
        super(props);
        this.i = 0;
        this.state ={
            productsInCart: [],
            visitedProducts : [],
            cartId : null,
        }
    }

    addToCart = (id,size,data) => {
        let arr = [...this.state.productsInCart],newArr = [],
        newData = {...data};
        newData.size = parseInt(size,10);
        let sameIndex = arr.findIndex(item => item.id === newData.id && item.size === newData.size);
        if(sameIndex !== -1){}else arr.push(newData);
        this.setState({cartId: id,productsInCart:arr});
    }

    deleteItem = event => {
        const  cartWrapper = document.querySelector('.hidden-panel__basket'),
                cart = cartWrapper.querySelector('.basket-dropped__product-list'),
                item  = event.currentTarget.parentElement.parentElement,
                temp = [...this.state.productsInCart];
        for(let index in cart.children){
            if(cart.children[index] === item){
                temp.splice(index,1);
            }
        }
        this.setState({productsInCart:temp});
    }

    addToVisited = data => {
        let temp = [...this.state.visitedProducts],
        newData = Object.assign({},data);
        if(!temp.find(item => item.id === data.id)){
            temp.push(newData);
        }
        if(temp.length > 10) temp.splice(0,1);
        this.setState({visitedProducts:temp});
    }

    clearCart = () => {
        this.setState({productsInCart:[]});
    }

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="App">
                    <Nav cart ={this.state.productsInCart} deleteItem={this.deleteItem} cartId={this.state.cartId}/>
                    <Switch>
                        <Route path ='/' component={Home} exact/> 
                        <Route path ='/catalogue' render = {() => <CatalogueWithFetcher visitedProducts={this.state.visitedProducts}/>}/>
                        <Route path ='/product-card-desktop' render ={() => <ProductCart addToCart = {this.addToCart} addToVisited = {this.addToVisited} visitedProducts={this.state.visitedProducts} cartId={this.state.cartId} productsInCart={this.state.productsInCart}/> }/>
                        <Route path ='/order' render = {() => <Order cartId ={this.state.cartId} productsInCart={this.state.productsInCart} clearCart={this.clearCart}/>}/>
                        <Route path ='/favourite' component={Favourite}/>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
