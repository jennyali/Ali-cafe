$(document).ready(function(){


/*===========================

            MODEL

=============================*/

//------- ARRAYS ----------//

var backgroundImgs = [
    'url(images/cafe-img.jpeg)', 
    'url(images/filter-coffee.jpg)',
    'url(images/latte-img.jpg)'
];

var coffeeMenuCategories = [
    {name: "drink", description: "This is a section of your menu. Give your section a brief description", category: "drink"},
    {name: "eat", description: "This is a section of your menu. Give your section a brief description", category: "food"},
    {name: "house blends", description: "This is a section of your menu. Give your section a brief description", category: "house blend"},
    {name: "global blends", description: "This is a section of your menu. Give your section a brief description", category: "global blend"}
];

var menuList = [
    {name: "espresso", price: 9, category: "drink"},
    {name: "americano", price: 9, category: "drink"},
    {name: "macchiato", price: 9, category: "drink"},
    {name: "cortado", price: 9, category: "drink"},
    {name: "cappuccino", price: 9, category: "drink"},
    {name: "latte", price: 9, category: "drink"},
    {name: "motca", price: 9, category: "drink"},
    {name: "cold brew coffee", price: 9, category: "drink"},
    {name: "iced coffee", price: 9, category: "drink"},
    {name: "classic croissant", price: 9, category: "food"},
    {name: "almond croissant", price: 9, category: "food"},
    {name: "chocolate cake", price: 9, category: "food"},
    {name: "quinoa banana bread", price: 9, category: "food"},
    {name: "blueberry soy muffin", price: 9, category: "food"},
    {name: "assorted cookies", price: 9, category: "food"},
    {name: "barista's blend", price: 9, category: "house blend"},
    {name: "morning blend", price: 9, category: "house blend"},
    {name: "after dark blend", price: 9, category: "house blend"},
    {name: "espresso blend", price: 9, category: "house blend"},
    {name: "cold brew blend", price: 9, category: "house blend"},
    {name: "the secret blend", price: 9, category: "house blend"},
    {name: "ethiopia", price: 9, category: "global blend"},
    {name: "rwanda", price: 9, category: "global blend"},
    {name: "costa rica", price: 9, category: "global blend"},
    {name: "guatemala", price: 9, category: "global blend"},
    {name: "colombia", price: 9, category: "global blend"},
    {name: "brazil", price: 9, category: "global blend"}
];



//------- FUNCTION CONSTRUCTORS ----------//

function menuCategory(name, description, category){
    this.id = Math.ceil(Math.random() * 10000);
    this.name = name;
    this.description = description;
    this.category = category;
};

function menuItem(name, price, category){
    this.id = Math.ceil(Math.random() * 10000);
    this.name = name;
    this.price = price;
    this.category = category;
};


//------- ARRAY UPDATERS VIA FUNCTION CONSTRUCTORS -----//

coffeeMenuCategories = _.map(coffeeMenuCategories, function(item){
    return new menuCategory(item.name, item.description, item.category);
});

menuList = _.map(menuList, function(item){
    return new menuItem(item.name, item.price, item.category);
});


console.log(coffeeMenuCategories, "category database");
console.log(menuList, "menu items database");
/*===========================

            VIEW

=============================*/

//------- SELECTORS/VARIABLES ----------//

var windowWidth = window.innerWidth;

// -- HEADERS
var $burgerMenuBtn = $('.btn--base');
var $dropdownMenu = $('.dropdown-menu--base');
var $bottomNavbar = $('.nav__list--inline');
var $bottomNavbarLi =$('.nav__list--item--inline');
var $siteLogo = $('.site-logo');
var $headerInline =$('#header-inline');
var $scrollTop = $('.parallax__scroll-btn');

// -- PAGES
var $indexPage = $('#index');

//-- jumbotron
var $ourShopJumbo = $('#ourShops').find('.jumbotron--base');
var $menusJumbo = $('#menus').find('.jumbotron--base');
var $buyCoffeeJumbo = $('#buyCoffee').find('.jumbotron--base');

//-- Our shops
var $shopMap = $('.location-img__wrapper');

//------- EVENTS ----------//

$(window).on('resize', function(event){         
    windowWidth = window.innerWidth;
    moveHeaderInline();
});

$shopMap.on({
    'mouseenter': function(){
        mapZoomIn(this);
    },

    'mouseleave': function(){
        mapZoomOut(this);
    }
})

$burgerMenuBtn.on({
    'click': function(event){
        event.preventDefault();
        burgerOnClick(this);
    },
});

$dropdownMenu.on('focus', 'li', function(event){
    dropdownEvent(this);
});

$dropdownMenu.on('blur', function(){
    dropdownClose();
});

$bottomNavbar.on('click', 'li', function(){
    navbarListItemOnClick(this);
});

$siteLogo.on({
    'click' : function(){
        navbarListItemOnClick();
        dropdownClose();
    }
});

$scrollTop.on({
    'click' : function(){
        clickScroll($('body'));
    }
})

/*===========================

        CONTROLLER

=============================*/



//------- FUNCTIONS ----------//

function mapZoomIn(selector){
    $(selector).find('.shop-map').removeClass('map--zoomOut');
    $(selector).find('.shop-map').removeClass('map--zoomIn');
    $(selector).find('.shop-map').addClass('map--zoomIn');
}

function mapZoomOut(selector){
    $(selector).find('.shop-map').removeClass('map--zoomOut');
    $(selector).find('.shop-map').addClass('map--zoomOut');
}

function setJumbotronBg(selector, backgroundImg){
    selector.css({'background-image' : backgroundImg});
}

function clickScroll(selector){             // scroll up effect
    $('body').animate({
        scrollTop: selector.offset().top -145
    }, 1000);
};

function burgerOnClick(that){
    $(that).find('span').toggleClass('icon-delete-1');
    $(that).next($dropdownMenu).slideToggle('fast');
}

function dropdownEvent(that){
    $dropdownMenu.find('li').removeClass('active');
    $(that).toggleClass('active');
    //$(that).find('span').toggleClass('icon-delete-1');
    //$(that).closest($dropdownMenu).slideToggle('fast');
}

function dropdownClose(){
    $dropdownMenu.slideUp('fast');
}

function navbarListItemOnClick(that){
    $bottomNavbar.find('li').removeClass('active');
}

function moveHeaderInline(){
    if(windowWidth >= 992){
        $headerInline.addClass('navbar-fixed-bottom');
    } else {
        $headerInline.removeClass('navbar-fixed-bottom');
    }
}


//------- FUNCTION CALLS ----------//

$('.carousel').carousel();
moveHeaderInline();
 $('[data-toggle="tooltip"]').tooltip(); 

setJumbotronBg($ourShopJumbo, backgroundImgs[0]);
setJumbotronBg($menusJumbo, backgroundImgs[1]);
setJumbotronBg($buyCoffeeJumbo, backgroundImgs[2]);
});