$(document).ready(function(){


/*===========================

            MODEL

=============================*/

var backgroundImgs = [
    'url(images/cafe-img.jpeg)', 
    'url(images/filter-coffee.jpg)',
    'url(images/latte-img.jpg)'
];

/*===========================

            VIEW

=============================*/

// SELECTORS

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

//EVENTS

$(window).on('resize', function(event){         
    windowWidth = window.innerWidth;
    moveHeaderInline();
});

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



// FUNCTIONS

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


// FUNCTION CALLS

$('.carousel').carousel();
moveHeaderInline();

setJumbotronBg($ourShopJumbo, backgroundImgs[0]);
setJumbotronBg($menusJumbo, backgroundImgs[1]);
setJumbotronBg($buyCoffeeJumbo, backgroundImgs[2]);
});