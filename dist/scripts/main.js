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

// ---------- OBJECTS -----------------//

var modalObj = {};

var shoppingCartObj = {
    shoppingCartArr: [],
    shoppingCart_quanitity: function(){
        var totalAmount = 0;

        _.each(this.shoppingCartArr, function(cartItem){
            totalAmount += cartItem.quantity;
        })

        return totalAmount;
    },
    shoppingCart_subtotal: function(){
        var totalValue = 0;

        _.each(this.shoppingCartArr, function(cartItem){
            totalValue += cartItem.totalPrice();
        })

        return totalValue;
    },
}



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

//-- menu page
var $tabSectionFoodTab = $('.tab__section--food-tab');
var $tabSectionCoffeeTab =$('.tab__section--coffee-tab');

//-- buyCoffee page
var $iconArrow44 = $('.icon-arrow-40');
var $wrapperNavTitle =$('.wrapper__nav__title');
var $globalBlendsTab = $('.global-blends-tab');
var $globalBlendsTabWrapper = $('#globalBlendsTab');
var $houseBlendsTabWrapper = $('#houseBlendsTab');
var $shopSection_content = $('.shop-section__content');
var $modalDialog = $('.modal-dialog');
var $modalDialogBtn = $modalDialog.find('button');
var $mainShoppingCart = $('.wrapper__shopping-cart');
var $cartItemAddbtn = $mainShoppingCart.find('button.cartItem__btn');

//------ TEMPLATES ---------//

function tabTitleTemplate(object){
    return `
            <div class="col-md-12 tab__title" data-id="${object["id"]}" data-category="${object["category"]}">
                <h3 class="page-header tab__title__header">${object["name"]}</h3>
                <p class="tab__title__small-text"><em>${object["description"]}</em></p>
            </div>`
};

function menuSegmentTemplate(object){
    return `
            <div class="col-md-4 menu-segment" data-id="${object["id"]}" data-category="${object["category"]}">
                <h4 class="menu-segment__title">${object["name"]}</h4>
                <p class="menu-segment__price">$${object["price"]}</p>
            </div>`
};

// buyCoffee middle div content
function tabShopMenuTemplate(category){
    return `
        <h3 class="tab__title text-center">${category['name']}</h3>
        <p class="tab__description text-center">${category['description']}</p>
        <ul id="${category['id']}" class="tab__list list-unstyled list-group ">

        </ul>
    `
}

function tabShopMenuInnerElTemplate(menuItem){
    return `
        <li data-id="${menuItem['id']}">
            <a href="#" data-toggle="modal" data-target="#modalShoppingCart" class="tab__list-item__name list-group-item">${menuItem['name']}<span class="badge">$${menuItem['price']}</span></a>
        </li>
    `
}

function modalTemplate(modalObj){
    return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close icon-delete-2" data-dismiss="modal"></button>
                    <h3>${modalObj['name']}</h3>
                    <p>$<span>${modalObj['price']}</span></p>
                </div>
                <div class="modal-body">
                    <p class="page-header">Special requests?</p>
                    <a class="modal__input-link" href="#modalInput" data-toggle="collapse"><span class="icon-add-2"></span>Add them here. We’ll do our best to make it happen</a>
                    <input id="modalInput" class="form-control collapse" type="text" id="comment"></input>
                </div>
                <div class="modal-footer">
                    <button data-id="${modalObj['id']}" class="btn btn-default btn-primary modal__btn" data-dismiss="modal"><span class="icon-add-2"></span>add to my order</button>
                </div>
            </div>
    `
}

function addOrderTemplate(){
    return `
            <div class="div__place-order">
                <div>
                    <p class="place-order__specialReq"><span class="icon-add-2"></span>Special requests</p>
                </div>
                    <p><em>pickup only</em></p>
                    <p>for: ASAP <small>(in 15 minutes)</small></p>
                    <a href="#" data-toggle="tooltip" data-placement="left" title="Cart is empty. Add items to kick off your order."><button class="btn__order-now btn-primary">order now<span class="icon-arrow-68"></span></button></a>
            </div>
    `
}

function shoppingCartTemplate(object){
    return `
            <div class="div__my-order">
                <li class="list-group-item my-order__title">My Order<span class="badge"><span class="my-order__quanitity">${object.shoppingCart_quanitity()}</span> items</span></li>
            </div>
            <div class="div__subtotal">
                    
                <div class="subtotal__inner-el">
                    <span class="icon-bag"></span>
                    <p class="subtotal__inner-el__text">Browse our menu and start adding items to your order</p>
                </div>
                <li class="list-group-item subtotal__title">Subtotal<span class="badge">$<span class="subtotal__quanitity">${object.shoppingCart_subtotal()}</span></span></li>
            </div>
    `
}

function cartItemTemplate(object){
    return `
            <div class="cartItem" data-id="${object.id}">
                <span class="badge cartItem__quantity">${object.quantity}</span>
                <p class="cartItem__name">${object.name}</p>
                <span class="badge cartItem__price">$${object.totalPrice()}</span>
                <div class="cartItem__btns">
                    <button class="icon-add-2 cartItem__btn cartItem__btn--add" data-id="${object.id}"></button>
                    <button class="icon-delete-2 cartItem__btn cartItem__btn--minus" data-id="${object.id}"></button>
                </div>
            </div>
    `
}

//------- EVENTS ----------//

$(window).on('resize', function(event){         
    windowWidth = window.innerWidth;
    moveHeaderInline();
});

$mainShoppingCart.on('mouseenter', '.cartItem', function(){
    if(windowWidth >= 992){
        $(this).find('.cartItem__btns').addClass('cartItem__btns--move');
        $(this).find('.cartItem__price').addClass('cartItem__price--move');
    }
})

$mainShoppingCart.on('mouseleave', '.cartItem', function(){
    $(this).find('.cartItem__btns').removeClass('cartItem__btns--move');
    $(this).find('.cartItem__price').removeClass('cartItem__price--move');
})

$mainShoppingCart.on('click', '.cartItem__btn--minus', function(event){
    var thisId = $(this).data('id');
    event.preventDefault();
    shoppingCartMinusUpdate(thisId);
    shoppingCartRender();
})

$mainShoppingCart.on('click', '.cartItem__btn--add', function(event){
    var thisId = $(this).data('id');
    event.preventDefault();
    shoppingCartAddUpdate(thisId);
    shoppingCartRender();
})


$modalDialog.on('click', '.btn', function(){
    var thisId = $(this).data('id');
    shoppingCartAddUpdate(thisId);
    shoppingCartRender();
})

$shopSection_content.on('click', 'li', function(){
    var thisId = $(this).data('id');
    modalUpdate(thisId);
    modalRender();
})

$wrapperNavTitle.on({
    'click': function(){
        $(this).find('.icon-arrow-40').toggleClass('icon-arrow-40--rotate');
    }
})

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

/*$dropdownMenu.on('focus', 'li', function(event){
    dropdownEvent(this);
});*/

$dropdownMenu.on('click', 'li', function(event){
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

function shoppingCartMinusUpdate(thisId){
        var compareItem = _.find(shoppingCartObj['shoppingCartArr'], ['id', thisId]);

        compareItem.quantity--;

        if(compareItem.quantity === 0){
            shoppingCartObj.shoppingCartArr.pop(compareItem);
        }

}

function shoppingCartAddUpdate(thisId){
    var foundItem = _.filter(menuList, ['id', thisId]);

    var compareItem = _.find(shoppingCartObj['shoppingCartArr'], ['id', thisId]);

    if (!compareItem){

        var cartItem = {
            price: 0,
            quantity: 1,
            totalPrice: function (){return this.quantity * this.price}
        }

        cartItem = _.assign({}, cartItem, foundItem[0]);
        shoppingCartObj['shoppingCartArr'] = _.concat(shoppingCartObj['shoppingCartArr'], cartItem);
        shoppingCartObj = _.assign({}, shoppingCartObj, shoppingCartObj['shoppingCartArr']);
        
    } else {
        compareItem.quantity++;
    }
    
    //console.log(shoppingCartObj.shoppingCartArr, 'whats in the shopping cart');
    //console.log(shoppingCartObj.shoppingCartArr[0].totalPrice(), 'total price of 1st item');
    //console.log(shoppingCartObj.shoppingCart_subtotal(), 'whole cart subtotal');
    //console.log(shoppingCartObj.shoppingCart_quanitity(), 'whole cart total items');
}

function shoppingCartRender(){
    var template = "";
    var order_template = "";
    
    template += shoppingCartTemplate(shoppingCartObj);
    order_template += addOrderTemplate();

    $mainShoppingCart.empty();

    $(template).appendTo($mainShoppingCart);
    $(order_template).appendTo($mainShoppingCart);
    subtotalInner_elRender();
    //console.log($mainShoppingCart.find('div.subtotal__inner-el'));
}

function subtotalInner_elRender(){
    var cartItem_template = "";

    _.each(shoppingCartObj.shoppingCartArr, function(cartItem){
        cartItem_template += cartItemTemplate(cartItem);
    });

    $(cartItem_template).appendTo($mainShoppingCart.find('div.subtotal__inner-el'));

}

function modalUpdate(elementId){
    var foundItem = _.filter(menuList, ['id', elementId]);
    modalObj = _.assign({}, foundItem[0]);
}

function modalRender(){
    var template = "";

    template += modalTemplate(modalObj);

    $modalDialog.empty();
    $(template).appendTo($modalDialog);
}

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

function tabSectionBuilder(){
    var template = "";
    _.each(coffeeMenuCategories, function(menuCategory){
        template += tabTitleTemplate(menuCategory);
        var menuFiltered = _.filter(menuList, ['category', menuCategory['category']]);
        _.each(menuFiltered, function(menuItem){
            template += menuSegmentTemplate(menuItem);
        });
    });
    $(template).appendTo($tabSectionFoodTab);
}

function tabSectionBuilderTwo(array, selector){     //chosen menu tab builder
    var menuFiltered = _.filter(menuList, ['category', array['category']]);
    var template = "";

    template += tabTitleTemplate(array);

    _.each(menuFiltered, function(menuItem){
        template += menuSegmentTemplate(menuItem);
    });

    $(template).appendTo(selector);
}

function tabShopMenuBuilder(selector, array, word){      // NOT FINISHED //
    var template_header = "";
    var template_innerEl = "";
    var selectorUl = "";
    var category = _.filter(array, ['category', word]);
    var categoryItems = _.filter(menuList, ['category', word]);

    template_header += tabShopMenuTemplate(category[0]);
    $(template_header).appendTo(selector);


    selectorUl = $(selector).children('ul');

    _.each(categoryItems, function(menuItem){
        template_innerEl += tabShopMenuInnerElTemplate(menuItem);
    });

    $(template_innerEl).appendTo(selectorUl);
}

//------- FUNCTION CALLS ----------//

$('.carousel').carousel();
moveHeaderInline();
 $('[data-toggle="tooltip"]').tooltip(); 

setJumbotronBg($ourShopJumbo, backgroundImgs[0]);
setJumbotronBg($menusJumbo, backgroundImgs[1]);
setJumbotronBg($buyCoffeeJumbo, backgroundImgs[2]);

tabSectionBuilderTwo(coffeeMenuCategories[0], $tabSectionFoodTab);
tabSectionBuilderTwo(coffeeMenuCategories[1], $tabSectionFoodTab);
tabSectionBuilderTwo(coffeeMenuCategories[2], $tabSectionCoffeeTab);
tabSectionBuilderTwo(coffeeMenuCategories[3], $tabSectionCoffeeTab);

tabShopMenuBuilder($globalBlendsTabWrapper, coffeeMenuCategories, 'global blend');
tabShopMenuBuilder($houseBlendsTabWrapper, coffeeMenuCategories, 'house blend');

shoppingCartRender(shoppingCartObj);


});