import React from 'react'


class Pagination extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pages: props.pages,
      page:1 
    }
  }

  componentDidMount(){
    for (let item of this.paginationList.children){
      item.classList.remove('active');
    }
    this.paginationList.children[this.props.page - 1].classList.add('active');
    this.props.page === 1 ? this.angleBack.classList.add('hidden') : this.angleBack.classList.remove('hidden');
    this.props.page === this.state.pages ? this.angleForward.classList.add('hidden') : this.angleForward.classList.remove('hidden');
  }

  componentWillReceiveProps(props){
    this.paginationList.children[props.page - 1].classList.add('active');
    this.setState({pages:props.pages,page:props.page});
  }

  fillPagination = () => {
    let newArr = [];
    for(let i = 0; i < this.props.pages; i++){
      newArr.push(<li className={i === 0 ? 'active':''} onClick={this.changePage} key={i + 1}><a href='/'>{i + 1}</a></li>)
    }
    return newArr;
  }

  changePage = event => {
    event.preventDefault();
    event.stopPropagation();
    let page;
    if (event.currentTarget === this.angleForward || event.currentTarget === this.angleBack) {
      page = event.currentTarget === this.angleForward ? this.props.page + 1 : this.props.page - 1;
    }else{
      page = Array.from(this.paginationList.children).indexOf(event.currentTarget) + 1;
    }
    for (let item of this.paginationList.children){
      item.classList.remove('active');
    }
    this.paginationList.children[page - 1].classList.add('active');
    page === 1 ? this.angleBack.classList.add('hidden') : this.angleBack.classList.remove('hidden');
    page === this.state.pages ? this.angleForward.classList.add('hidden') : this.angleForward.classList.remove('hidden');
    this.setState({page:page});
    this.props.fetchData(page);
  }

  render(){
    return(       
       <div className="product-catalogue__pagination">
          <div className="page-nav-wrapper">
            <div className="angle-back hidden" ref={element => this.angleBack = element} onClick ={this.changePage}><a href="/"></a></div>
            <ul ref ={element => this.paginationList = element} className={this.props.pages === 1 ? 'hidden' : ''}>
              {this.fillPagination()}
            </ul>
            <div className={`angle-forward ${this.props.pages === 1 ? 'hidden' : ''}`} ref={element => this.angleForward = element} onClick ={this.changePage}><a href="/"></a></div>
          </div>
        </div>);
  }
}

export default Pagination