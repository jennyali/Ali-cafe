$(document).ready(function(){


/*===========================

            MODEL

=============================*/



/*===========================

            VIEW

=============================*/

// SELECTORS

var windowWidth = window.innerWidth;

var $burgerMenuBtn = $('.btn--base');
var $dropdownMenu = $('.dropdown-menu--base');
var $bottomNavbar = $('.nav__list--inline');
var $bottomNavbarLi =$('.nav__list--item--inline');
var $siteLogo = $('.site-logo');
var $headerInline =$('#header-inline');

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

/*===========================

        CONTROLLER

=============================*/

// FUNCTIONS

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

});