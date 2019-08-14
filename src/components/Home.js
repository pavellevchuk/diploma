import React from 'react'
import NewDeals from './NewDeals.js'
import sliderPic from '../layout/img/slider.jpg'
import sliderPic180 from '../layout/img/slider180deg.jpeg'
import {Link} from 'react-router-dom'


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount(){
        fetch('https://api-neto.herokuapp.com/bosa-noga/featured')
        .then(res => res.json())
        .then(data => this.setState({data:data}));
        let sliderScript = document.querySelector('.sliderScript');
        if(sliderScript) document.body.removeChild(sliderScript); 

        let script = document.createElement('script');
        script.src = './slider.js';
        script.classList.add('sliderScript');
        document.body.appendChild(script);
    }

    render(){
        return(
   <div>
    <section className="slider">
      <div className="wrapper">
        <div className="slider__pictures" ref={element => this.f = element}>
          <Link className="slider__image" to="/" style={{zIndex:'2',opacity:'1'}}>
            <img src={sliderPic} alt="slide pic"/>
          </Link>
          <Link className="slider__image" to="/" style={{zIndex:'0',opacity:'1'}}>
            <img src={sliderPic180} alt="slide pic"/>
          </Link>
          <Link className="slider__image" to="/" style={{zIndex:'0',opacity:'1'}}>
            <img src={sliderPic} alt="slide pic"/>
          </Link>
          <Link className="slider__image" to="/" style={{zIndex:'1',opacity:'1'}}>
            <img src={sliderPic180} alt="slide pic"/>
          </Link>
          <div className="arrow slider__arrow slider__arrow_left"></div>
          <div className="arrow slider__arrow slider__arrow_right" ></div>
          <div className="slider__circles">
            <button className="slider__circle" value="0"></button>
            <button className="slider__circle" value="1"></button>
            <button className="slider__circle" value="2"></button>
            <button className="slider__circle" value="3"></button>
          </div>
          <h2 className="h2">К весне готовы!</h2>
        </div>
      </div>
    </section>

    <NewDeals data={this.state.data}/>

    <section className="sales-and-news wave-bottom">
      <h2 className="h2">акции и новости</h2>
      <div className="sales-and-news__items">
        <div className="sales-and-news__item sales-and-news__item_1">
          <a href="/">
            <h3 className="h3">обувь к свадьбе</h3>
          </a>
        </div>
        <div className="sales-and-news__item sales-and-news__item_2">
          <a href="/">
            <h3 className="h3">20% скидка
              <br/>
              <span>На летнюю обувь</span>
            </h3>
          </a>
        </div>
        <div className="sales-and-news__item sales-and-news__item_3">
          <a href="/">
            <h3 className="h3">готовимся к лету!</h3>
          </a>
        </div>
        <div className="sales-and-news__item sales-and-news__item_4">
          <a href="/">
            <h3 className="h3">Больше покупок –
              <br/>больше скидка!</h3>
          </a>
        </div>
        <div className="sales-and-news__news">
          <div className="sales-and-news__arrow sales-and-news__arrow_up arrow"></div>
          <div className="sales-and-news__new">
            <time dateTime="2017-01-18 00:00">18 января 2017</time>
            <a href="/">Американские резиновые сапоги Bogs идеально подходят для русской зимы!</a>
          </div>
          <div className="sales-and-news__new">
            <time dateTime="2017-05-18 00:00">18 мая 2017</time>
            <a href="/">Магазины Bosa Noga</a>
          </div>
          <div className="sales-and-news__new">
            <time dateTime="2017-03-10 00:00">10 марта 2017</time>
            <a href="/">Тенденция весны 2018: розовый и фуксия. 10 пар обуви для яркого образа</a>
          </div>
          <div className="sales-and-news__arrow sales-and-news__arrow_down arrow"></div>
        </div>
      </div>
    </section>

    <section className="about-us">
      <h2 className="about-us__title">Клиенты делают заказ
        <br/> в интернет-магазине BosaNoga!</h2>
      <p className="about-us__text">
        В Интернете можно встретить немало магазинов, предлагающих аксессуары. Но именно к нам хочется возвращаться снова и снова.
      </p>
      <h3 className="about-us__text_header">Мы предлагаем вам особые условия:</h3>
      <ol className="about-us__text">
        <li>Индивидуальный подход специалиста. Когда поступает новая коллекция обуви весна-лето или же коллекция обуви осень-зима
          – покупателям бывает трудно сориентироваться во всем многообразии новинок. Наш менеджер по телефону поможет вам
          определиться с товарами, подходящими именно вам.</li>
        <li>Мы периодически проводим распродажи как женских и мужских, так и детских моделей. Вы будете приятно удивлены ценами
          на аксессуары в мага- зине BosaNoga.</li>
        <li>У нас всегда есть из чего выбрать. Неважно, какую категорию вы прос- матриваете: осень-зима, или же весна-лето –
          вы всегда сможете найти ва- рианты, подходящие вам по внешнему виду и цене.</li>
        <li>Мы несем ответственность за все товары.</li>
        <li>Молодые мамы будут рады обширному ассортименту детских моделей.</li>
      </ol>
      <p className="about-us__text">
        Если вы ищете место, где представлены обувные новинки от самых известных брендов, то вы зашли по верному адресу.
      </p>
      <p className="about-us__text">
      У нас представлены модели для мужчин, женщин, а также детские сапоги, босоножки, ботинки и туфли. Сделав заказ в нашем интернет-магазине,
      вы сможете быть модным и стильным как осенью-зимой, так и весной-летом. Просто наберите номер нашего телефона, и мы
      поможем вам определиться с покупкой.</p>
      <span className="about-us__text_overlay"></span>
      <button className="about-us__text_button">читать</button>
    </section>
  </div>
  );
    }
}

export default Home