import React from 'react'
import {Link} from 'react-router-dom'

class NavFetcher extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        filters : null,
        isLoading : true,
        activeSection : ''
      }
    }
  
    componentDidMount(){
      fetch('https://api-neto.herokuapp.com/bosa-noga/filters')
      .then(res => res.json())
      .then(data => {
        if(data.status === 'ok'){
          this.setState({filters: data.data,isLoading: false});
        }else throw new Error (data.message);
      });
    }
  
    componentWillReceiveProps(props){
      this.setState({categoryId:props.categoryId});
    }
  
    render(){
      const {filters,isLoading} = this.state;
      if(isLoading){
        return null;
      }
  
      return(
          <div className="dropped-menu">
            <div className="wrapper" ref={element => this.submenuWrapper = element} style ={{overflowX:'auto',overflowY:'hidden',paddingBottom:'30px'}}>
              <div className="dropped-menu__lists dropped-menu__lists_women">
                <h3 className="dropped-menu__list-title">повод:</h3>
                <ul className="dropped-menu__list">
                  {filters.reason.map((filter,index) => <li className="dropped-menu__item" key={index}><Link to={`/catalogue?categoryId=${this.state.categoryId}&reason=${filter}`}>{filter}</Link></li>)}
                </ul>
              </div>
              <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
                <h3 className="dropped-menu__list-title">категории:</h3>
                <ul className="dropped-menu__list">
                  {filters.type.map((filter,index) => <li className="dropped-menu__item" key={index}><Link to={`/catalogue?categoryId=${this.state.categoryId}&type=${filter}`}>{filter}</Link></li>)}
                </ul>
              </div>
              <div className="dropped-menu__lists">
                <h3 className="dropped-menu__list-title">сезон:</h3>
                <ul className="dropped-menu__list">
                  {filters.season.map((filter,index) => <li className="dropped-menu__item" key={index}><Link to={`/catalogue?categoryId=${this.state.categoryId}&season=${filter}`}>{filter}</Link></li>)}
                </ul>
              </div>
              <div className="dropped-menu__lists">
                <h3 className="dropped-menu__list-title">бренды:</h3>
                <ul className="dropped-menu__list">
                  {filters.brand.map((filter,index) => <li className="dropped-menu__item" key={index}><Link to={`/catalogue?categoryId=${this.state.categoryId}&brand=${filter}`}>{filter}</Link></li>)}
                </ul>
              </div>
            </div>
          </div>)
    }
  }

  export default NavFetcher;