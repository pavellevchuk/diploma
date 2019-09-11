import React from 'react'
import Sidebar from './Sidebar.js'
import Item from './Item.js'
import Pagination from './Pagination.js'
import Catalogue from './CatalogueFetcher.js'
import{headerTitle} from '../scripts/script.js'
import VisitedProducts from './VisitedProducts.js';
import Preloader from './Preloader.js'
import Breadcrumps from './Breadcrumps.js';

class CatalogueWithFetcher extends React.Component{
  constructor(props){
    super(props);
    this.url = 'https://api-neto.herokuapp.com/bosa-noga/products';
    this.counter = 0;
    this.state = {
      products: null,
      page : 1,
      isLoading: true,
      maxPrice: null
    }
  }

  componentDidMount(){
    this.fetchData(this.state.page);
  }

  componentDidUpdate(){
    console.log(this.state.maxPrice);
  }

  fetchData = page => {
    this.setState({isLoading:true});
    fetch(`${this.url}?page=${page}&${window.location.search.replace('?','&')}`)
    .then(res => res.json())
    .then(data => {
      if(data.status === 'ok'){
        this.setState({products:data,isLoading:false,pages:data.pages,maxPrice:data.data.length ? data.data[0].price : 50000});
      }else throw new Error(data.message);
    });
  }

  render(){
    const {isLoading} = this.state;
    if(isLoading){
      return null;
    }

    let id = new URLSearchParams(window.location.search).get('categoryId');

    return(
  <div>
    <Preloader/>  
    <Breadcrumps paths={[{path:'/',name:'Главная'},{path:`/catalogue${id === null ?  '' : `?categoryId=${id}`}`,name:headerTitle()}]}/>
    <main className="product-catalogue"> {/* added clearfix in style-catalogue.css */}
    <Sidebar/>
      <section className="product-catalogue-content">
        <Catalogue page={this.state.page} changeCrump = {this.changeCrump}/>
      </section>
    </main>
    <section className="product-catalogue__overlooked-slider">
      <VisitedProducts products={this.props.visitedProducts}/>
    </section>
    </div>
    );
  }
}



export default CatalogueWithFetcher