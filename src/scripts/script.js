//Видимость блока корзина и профиля в шапке
let istimeout = false;
function headerHiddenPanelProfileVisibility() {
    document.querySelector('.hidden-panel__basket').classList.remove('hidden-panel__basket_visible');
    document.querySelector('.hidden-panel__profile').classList.add('hidden-panel__profile_visible');
    if (document.querySelector('.header-main__pic_basket_menu_is-active')) {
        document.querySelector('.header-main__pic_basket_menu_is-active').classList.toggle('header-main__pic_basket_menu_is-active');
        document.querySelector('.header-main__pic_profile_menu').classList.toggle('header-main__pic_profile_menu_is-active');
    } else {
        document.querySelector('.header-main__hidden-panel').classList.toggle('header-main__hidden-panel_visible');
        document.querySelector('.header-main__pic_profile_menu').classList.toggle('header-main__pic_profile_menu_is-active');
    }

}

function headerHiddenPanelBasketVisibility() {
    document.querySelector('.hidden-panel__profile').classList.remove('hidden-panel__profile_visible');
    document.querySelector('.hidden-panel__basket').classList.add('hidden-panel__basket_visible');
    if (document.querySelector('.header-main__pic_profile_menu_is-active')) {
        document.querySelector('.header-main__pic_basket_menu').classList.toggle('header-main__pic_basket_menu_is-active');
        document.querySelector('.header-main__pic_profile_menu_is-active').classList.toggle('header-main__pic_profile_menu_is-active');
    } else {
        document.querySelector('.header-main__hidden-panel').classList.toggle('header-main__hidden-panel_visible');
        document.querySelector('.header-main__pic_basket_menu').classList.toggle('header-main__pic_basket_menu_is-active');
    }

}


//Функция видимости меню поиска в шапке
function headerMainSearchVisibility() {
    let pic = document.querySelector('.header-main__pic_search');
    document.querySelector('.header-main__search').classList.toggle('header-main__search_active');
    pic.classList.toggle('header-main__pic_search_is-hidden');
    pic.style.zIndex = pic.classList.contains('header-main__pic_search_is-hidden') ? '0' : '1';
}


//Выпадающее меню главного меню (пока с общим списком для всех пунктов)
function mainSubmenuVisibility(e) {
    e.preventDefault();
    if (e.currentTarget.className.split(' ')[e.currentTarget.className.split(' ').length-1] === ('main-menu__item_active')) {
        document.querySelector('.dropped-menu').classList.remove('dropped-menu_visible')
        e.currentTarget.classList.remove('main-menu__item_active');
    } else {
        if (document.querySelector('.main-menu__item_active')) {
            document.querySelector('.main-menu__item_active').classList.toggle('main-menu__item_active');
        }
        document.querySelector('.dropped-menu').classList.add('dropped-menu_visible');
        e.currentTarget.classList.toggle('main-menu__item_active');
    }

}

let createURL = (name,filter) => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.has(name) ? searchParams.get(name) === filter ? searchParams.delete(name) : searchParams.set(name,filter) : searchParams.append(name, filter);
    return '?' + searchParams.toString();
  }

let switchCaseColor = filter => {
    let color;
    switch(filter){
                  case 'Черный':
                    color = 'black';
                    break;
                  case 'Бежевый':
                    color = '#DEC4AB';
                    break;
                  case 'Серый':
                    color = 'grey';
                    break;
                  case 'Бардо':
                    color = '#7E070C';
                    break;
                  case 'Белый':
                    color = 'white';
                    break;
                  case 'Прозрачный':
                    color = 'transparent';
                    break;
                  case 'Синий':
                    color = 'blue';
                    break;
                  case 'Красный':
                    color = 'red';
                    break;
                  case 'Темно-салатовый':
                    color = '#01FF01';
                    break;
                  case 'Фиолетовый':
                    color = 'purple';
                    break;
                  case 'Беж':
                    color = '#DEC4AB';
                    break;
                  case 'Оранжевый':
                    color = 'orange';
                    break;  
                  case 'Металлик':
                    color = '#777B7E';
                    break;
                  case 'Разноцветные':
                    color = 'linear-gradient(red, yellow, blue, orange)';
                    break;   
                  case 'Коричневый':
                    color = 'brown';
                    break;
                  case 'Серебряный':
                    color = '#D6D6D6';
                    break;
                  case 'Черно-белый':
                    color = 'linear-gradient(to bottom left, black 50%, white 50%)';
                    break;
                  case 'Розовый':
                    color = 'pink';
                    break;
                  default:
                    color = 'white';                                     
      }
      return color;
}

let manageItemToLocalStorage = data => {
    if(!localStorage.getItem('favourites')){
        localStorage.setItem('favourites', JSON.stringify([]));
    }
    let isPresent = false;
    for (let item of JSON.parse(localStorage.getItem('favourites'))){
        if(item.id === data.id){
            isPresent = true;
            break;
        }
    }
    if(isPresent){
        localStorage.setItem('favourites', JSON.stringify(JSON.parse(localStorage.getItem('favourites')).filter(item => item.id !== data.id)));
    }else{
        let newArr = JSON.parse(localStorage.getItem('favourites'));
        newArr.push(data);
        localStorage.setItem('favourites',JSON.stringify(newArr));
    }
    console.log(JSON.parse(localStorage.getItem('favourites')));
}

let headerTitle = () => {
  let searchParams = new URLSearchParams(window.location.search),
  title;
  switch (searchParams.get('categoryId')){
    case('12'):
      title =  'Мужская обувь';
      break;
    case('13'):
      title =  'Женская обувь';
      break;
    case('15'):
      title =  'Детская обувь';
      break;
    default:
      title =  'Все товары';
  }
  return title;
}

let withDebouncer = debounce(goToNewURL,100);

function debounce(callback, delay) {
  let timeout;
  return (e,history,slide1,slide2) => {
  clearTimeout(timeout);
  timeout = setTimeout(function() {
  timeout = null;
  callback(e,history,slide1,slide2);
  }, delay);
  };
  };
  


function getVals(e,history){
  // Get slider values
  newStripCoords(e.currentTarget);
  var parent = e.currentTarget.parentNode;
  var slides = parent.getElementsByTagName("input");
  var slide1 = parseFloat( slides[0].value );
  var slide2 = parseFloat( slides[1].value );
  // Neither slider will clip the other, so make sure we determine which is larger
  if(slide1 > slide2)return;

  var displayElement = parent.parentElement.getElementsByClassName("counter")[0];
  displayElement.querySelector('.input-1').value = slide1;
  displayElement.querySelector('.input-2').value = slide2;
  withDebouncer(e,history,slide1,slide2);
}

function newStripCoords(range){
  const ratio = (range.value - range.min) / (range.max - range.min),strip = document.querySelector('.price-slider-strip')
  if(range.classList.contains('first-thumb')){
    strip.style.left = `${range.getBoundingClientRect().width * ratio}px`;
  }else{
    strip.style.right = `${range.getBoundingClientRect().width - range.getBoundingClientRect().width * ratio}px`;
  }
}

function goToNewURL(event,history,slide1,slide2){
  let searchParams = new URLSearchParams(window.location.search), url = '/catalogue',index = 0,paramName,slider = document.querySelector('.price-slider');
  for(let pair of searchParams.entries()){
    if(pair[0] !== 'minPrice' && pair[0] !== 'maxPrice'){
      url += `${index ? `&${pair[0]}=${pair[1]}`: `?${pair[0]}=${pair[1]}`}`;
      index++;
    }
  }
  let str = index ? `&minPrice=${slide1}&maxPrice=${slide2}` : `?minPrice=${slide1}&maxPrice=${slide2}`;
  history.push(url + str);
}


let changeSliderVal = (event,history) => {
  let bigger = event.currentTarget.classList.contains('input-2');
  let element = bigger ? document.querySelector('.price-slider').children[2] : document.querySelector('.price-slider').children[0];
  element.value = event.currentTarget.value;
  let searchParams = new URLSearchParams(window.location.search), url = '/catalogue',index = 0;
  let paramName = bigger ? 'maxPrice' : 'minPrice';
  for(let pair of searchParams.entries()){
    if(pair[0] !== paramName){
      url += `${index ? `&${pair[0]}=${pair[1]}`: `?${pair[0]}=${pair[1]}`}`;
      index++;
    }
  }
  let str = index ? `&${paramName}=${event.currentTarget.value}` : `?${paramName}=${event.currentTarget.value}`;
  history.push(url + str);
  newStripCoords(document.querySelector(bigger ? '.second-thumb': '.first-thumb'));
}

export {headerHiddenPanelProfileVisibility}
export {headerHiddenPanelBasketVisibility}
export {headerMainSearchVisibility}
export {mainSubmenuVisibility}
export {createURL}
export{switchCaseColor}
export {manageItemToLocalStorage}
export {headerTitle}
export {getVals}
export {changeSliderVal}