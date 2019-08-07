import React from 'react'
import Item from './Item.js'
import Pagination from './Pagination.js'

class Favourite extends React.Component{
    constructor(props){
        super(props);
        this.arr = JSON.parse(localStorage.getItem('favourites')) ? JSON.parse(localStorage.getItem('favourites')) : [];
        this.state = {
            favouritesArr : this.arr,
            page : 1,
            count : this.arr.length,
            pages: Math.ceil(this.arr.length / 12) ? Math.ceil(this.arr.length / 12) : 1 
        }
    }

    componentDidUpdate(){
        console.log('lol')
    }

    componentDidMount(){
      this.getData(1);
    }

    reloadFavs = () => {
       this.getData(this.state.page);
    }

    sort = e => {
      let arr = [...JSON.parse(localStorage.getItem('favourites'))];
      arr.sort((a, b) => {
        if (a[e.currentTarget.value] < b[e.currentTarget.value]) {
          return 1;
        }
        if (a[e.currentTarget.value] > b[e.currentTarget.value]) {
          return -1;
        }
        return 0;
      })
      localStorage.setItem('favourites',JSON.stringify(arr));
      this.getData(this.state.page);
    }

    getData = (page) => {
      let forLength = JSON.parse(localStorage.getItem('favourites'));
      let to = page * 12,
      from = to - 12;
      this.arr = forLength.filter((item,index) => index >= from && index < to);
      this.setState({favouritesArr: this.arr,page: page,count: forLength.length,pages : Math.ceil(forLength.length / 12) ? Math.ceil(forLength.length / 12) : 1 });
      if(!this.arr.length && page) this.getData(page - 1);
    }

    render(){
        return (
        <div className="wrapper wrapper_favorite">
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">{this.state.count ? 'В вашем избранном' : 'В вашем избранном пока ничего нет'}</h2><span className="amount amount_favorite">{this.state.count ? `${this.state.count} товаров` : ''}</span>
            </div>
            <div className={`product-catalogue__sort-by ${this.state.count ? '' : 'hidden'}`}>
              <p className="sort-by">Сортировать</p>
              <select id="sorting" onChange={this.sort}>
                <option></option>
                <option value="popularity">по популярности</option>
                <option value="price">по цене</option>
              </select>
            </div>
          </section>
          <section className={`product-catalogue__item-list product-catalogue__item-list_favorite ${this.state.favouritesArr.length ? '' : 'hidden'}`}>
              {this.state.favouritesArr.map(data => <Item data={data} onFavPage reloadFavs={this.reloadFavs} key={data.id}></Item>)}
            </section>
            <Pagination pages={this.state.pages} page={this.state.page} fetchData={this.getData}/>
        </main>
        </div>)
    }
}

export default Favourite