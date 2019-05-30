"use strict";
var productPics = {
    fruit: {
        apples: "/images/products/fruits/apple-product.jpeg",
        pears: "/images/products/fruits/pear-product.png",
        oranges: "/images/products/fruits/orange-product.png",
        bananas: "/images/products/fruits/banana-product.jpg",
        mangos: "/images/products/fruits/mango-product.jpeg",
        strawberries: "/images/products/fruits/straw-product.png",
        kiwis: "/images/products/fruits/kiwi-product.jpg",
        lemon: "/images/products/fruits/lemon-product.png",
        lime: "/images/products/fruits/lime-product.png",
        cherries: "/images/products/fruits/cherry-product.png"
    },
    vegetables: {
        potatoes: "/images/products/vegetables/potato.png",
        brocoli: "/images/products/vegetables/broccoli.png",
        cabbage: "/images/products/vegetables/cabbage.png",
        onions: "/images/products/vegetables/onion.png",
        tomatoes: "/images/products/vegetables/tomatoe.png",
        pumpkin: "/images/products/vegetables/pumpkin.png",
        lettuce: "/images/products/vegetables/lettuce.jpg"
    }
};

var fruitInfo = "lLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

var title = document.getElementById('title');
var veg = document.querySelector('.product-slider.veg');
var fruit = document.querySelector('.product-slider.fruit');
var headerImage = document.querySelector('.header-image');
var tabButtons = document.querySelectorAll('button.flag');
var calendarTabButtons = document.querySelectorAll('button.flag.calendar');
var productView = document.querySelector('.product-view');
var products = document.getElementById('products');
var path = location.pathname;
var calendar = document.querySelector('.product-calendar');
var fruitCalendar = document.querySelector('.product-seasons.fruit');
var vegCalendar = document.querySelector('.product-seasons.veg');
var monthsList = ["December", "November", "October", "September", "August", "July", "June", "May", "April", "March", "February", "January"];
var productIndividual = document.getElementById('product-individual');

var calItem = document.querySelector('.cal-item');
var highlight = document.querySelector('.highlight');
var whatsInSeason = document.getElementById('whatsInSeason');
var loaderImg = document.querySelector('.loader-img');
var productInfoText = document.getElementById('productInfoText');
var loadHiddenElems = document.querySelectorAll('.load-hidden');
var list;
var lebProducts;
var ausProducts;
var safProducts;




function toggleSliderSize(elem) {
    elem.previousElementSibling.classList.toggle('enlarge')
}

var enlargeButtons = document.querySelectorAll('button.enlarge');
for (var i = 0; i < enlargeButtons.length; i++) {
    var but = enlargeButtons[i];
    but.addEventListener('click', function () {
        toggleSliderSize(this);
        this.previousElementSibling.classList.contains('enlarge') ? (this.innerHTML = "&#8722") : (this.innerHTML = "&#43");

    })
}


function tabButtonsWrap(fun) {
    for (var i = 0; i < tabButtons.length; i++) {
        var but = tabButtons[i];
        fun(but)
    }
}

function calendarTabsWrap(fun) {
    for (var i = 0; i < calendarTabButtons.length; i++) {
        var but = calendarTabButtons[i];
        fun(but)
    }
}

function addClickEventsView(elem) {
    elem.addEventListener('click', function () {
        setActive(this)
    })
}

function addClickEventsCalendar(elem) {
    elem.addEventListener('click', function () {
        toggleCalendar(this)
    })
}

function removeActive(elem) {
    elem.classList.remove('active');
}

function setActive(choice) {

    productViewList.changeCountry(choice.dataset.country);
}

function toggleCalendar(choice) {
    console.log(choice);
    calendarTabsWrap(removeActive);
    choice.classList.add('active');
    calendar.dataset.active = choice.dataset.country;
    calendarView.changeCountry(choice.dataset.country);
}

tabButtonsWrap(addClickEventsView);
calendarTabsWrap(addClickEventsCalendar);

function hideButtons() {
    for (var i = 0; i < enlargeButtons.length; i++) {
        var but = enlargeButtons[i];
        but.style.display = "none";
    }
}

function showLoadHiddenElems(){
    for(var i = 0;i < loadHiddenElems.length;i++){
        var elem = loadHiddenElems[i];
        elem.classList.remove('load-hidden');
    }
}

function hideLoader() {
    loaderImg.classList.add('start-hide-animation');
    document.body.classList.remove('fixed-height');
    showLoadHiddenElems();
}


//Calendar Route -- Add a seasonal calendar for each fruit depending on country
var calendarView = {
    init: function () {
        calendarView.buildItems("lebanese");
    },
    changeCountry: function (choice) {
        calendarTabsWrap(removeActive);
        var button = calendar.querySelector('[data-country="'+choice+'"]');
        calendar.dataset.active = button.dataset.country;
        console.log(button);
        button.classList.add('active');
        if (choice == "leb") {
            calendarView.buildItems("lebanese");
        } else if (choice == "saf") {
            calendarView.buildItems('southAfrican');
        } else if (choice == "aus") {
            calendarView.buildItems('australian');
        }
    },
    clearList: function () {
        fruitCalendar.innerHTML = "";
        vegCalendar.innerHTML = "";
    },
    addMonthsTop: function (type, dest, months) {
        var tileTitle = document.createElement('p');
        tileTitle.classList.add('season-table-tile');
        tileTitle.innerText = type;
        dest.appendChild(tileTitle);

        for (var i = 0; i < monthsList.length; i++) {
            var elem = document.createElement('p');
            elem.classList.add('month');
            elem.innerText = monthsList[i]
            dest.appendChild(elem);
        }

    },
    addMonthsAvailability: function (arr, dest, item) {
        for (var i = 0; i < arr.length; i++) {
            var av = arr[i];
            if (av == "in-season") {
                var elem = document.createElement('div');
                var name = item + "-av";
                elem.classList.add(name, "availability");
                dest.appendChild(elem)
            } else {
                var elem = document.createElement('div');
                var name = "not-av";
                elem.classList.add(name, "availability");
                dest.appendChild(elem)
            }
        }
    },
    addFruitElement: function (name, country) {
        var elem = document.createElement('a');
        elem.classList.add('item-calender');
        elem.href = "/products/" + country + "/fruit/" + name;
        var img = new Image();
        img.src = productPics["fruit"][name];
        elem.appendChild(img);
        fruitCalendar.appendChild(elem)
    },
    addFruits: function (country) {
        console.log(list);
        calendarView.addMonthsTop("Fruits", fruitCalendar);
        var fruitList = list.fruit[country];
        var fruitNames = Object.keys(fruitList).reverse()
        for (var i = 0; i < fruitNames.length; i++) {
            var fru = fruitNames[i];
            var availability = list.fruit[country][fru];
            calendarView.addFruitElement(fru, country);
            calendarView.addMonthsAvailability(availability, fruitCalendar, fru);

        }
    },
    addVegElement: function (name, country) {
        var elem = document.createElement('a');
        elem.classList.add('item-calender');
        elem.href = "/products/" + country + "/vegetables/" + name;
        var img = new Image();
        img.src = productPics["vegetables"][name];
        elem.appendChild(img);
        vegCalendar.appendChild(elem)
    },
    addItemElement: function (name, country, type, dest) {
        var elem = document.createElement('div');
        elem.classList.add('item-calender');
        var img = new Image();
        img.src = productPics[type][name];
        elem.appendChild(img);
        dest.appendChild(elem)
    },
    addCalendarElement: function (name, country, type) {
        var elem = document.createElement('a');
        elem.classList.add('item-calender');
        elem.href = "/products/" + country + "/vegetables/" + name;
        var img = new Image();
        img.src = productPics["vegetables"][name];
        elem.appendChild(img);
        vegCalendar.appendChild(elem)
    },
    addVegetables: function (country) {
        console.log(list);
        calendarView.addMonthsTop("Vegetables", vegCalendar);
        var vegList = list.vegetables[country];
        var vegNames = Object.keys(vegList).reverse();
        for (var i = 0; i < vegNames.length; i++) {
            var v = vegNames[i];
            var availability = list.vegetables[country][v];
            calendarView.addVegElement(v, country);
            calendarView.addMonthsAvailability(availability, vegCalendar, v);

        }
    },
    addItem: function (country, dest, item, type) {
        console.log(list);
        calendarView.addMonthsTop(type, dest);
        var availability = list[type][country][item];
        calendarView.addCalendarElement(item, country, type);
        calendarView.addItemElement(item, country, type, dest);
        calendarView.addMonthsAvailability(availability, dest, item);

    },
    buildItems: function (country) {
        console.log('start build');
        calendarView.clearList();
        calendarView.addFruits(country)
        calendarView.addVegetables(country);
    }

}

//Products Route  -- Add a list of all countries products.
var productViewList = {
    init: function () {
        productViewList.buildItems("lebanese");
    },
    changeCountry: function (choice) {
        tabButtonsWrap(removeActive);
        var button = productView.querySelector('[data-country="'+choice+'"]');
        productView.dataset.active = button.dataset.country;
        console.log(button);
        button.classList.add('active');
        if (choice == "leb") {
            productViewList.buildItems("lebanese");
        } else if (choice == "saf") {
            productViewList.buildItems('southAfrican');
        } else if (choice == "aus") {
            productViewList.buildItems('australian');
        }
    },
    clearList: function () {
        fruit.innerHTML = "";
        veg.innerHTML = "";
    },
    addFruitElement: function (name, country) {
        var elem = document.createElement('a');
        elem.classList.add('item');
        elem.href = "/products/" + country + "/fruit/" + name;
        var img = new Image();
        img.src = productPics["fruit"][name];
        elem.appendChild(img);
        fruit.appendChild(elem)
    },
    addFruits: function (country) {
        console.log(list)
        var fruitList = list.fruit[country];
        var fruitNames = Object.keys(fruitList).reverse()
        for (var i = 0; i < fruitNames.length; i++) {
            var fru = fruitNames[i];
            productViewList.addFruitElement(fru, country);
        }
    },
    addVegElement: function (name, country) {
        var elem = document.createElement('a');
        elem.classList.add('item');
        elem.href = "/products/" + country + "/vegetables/" + name;
        var img = new Image();
        img.src = productPics["vegetables"][name];
        elem.appendChild(img);
        veg.appendChild(elem)
    },
    addVegetables: function (country) {
        console.log(list)
        var vegList = list.vegetables[country];
        var vegNames = Object.keys(vegList).reverse();
        for (var i = 0; i < vegNames.length; i++) {
            var v = vegNames[i];
            productViewList.addVegElement(v, country);
        }
    },
    buildItems: function (country) {
        console.log('start build')
        productViewList.clearList()
        productViewList.addFruits(country)
        productViewList.addVegetables(country);
    }

};

var routeMethods = {
    buildFruitProdList: function (country) {
        var vegLi = list.fruit[country];
        var vegNa = Object.keys(vegLi);
        return vegNa;
    },

    buildVegProdList: function (country) {
        var fruitLi = list.vegetables[country];
        var fruitNa = Object.keys(fruitLi);
        return fruitNa;
    },

    loadProductCalendar: function (country, type, item) {
        console.log('load prod page', country, item);
        calendar.classList.add('hidden');
        productView.classList.add('hidden');
        highlight.src = "/images/products/main/" + item + "-main.png";
        productInfoText.innerText = fruitInfo;
        calItem.innerText = country + " | " + type + " | " + item;
        var dest = document.getElementById('itemProductAvail')
        calendarView.addItem(country, dest, item, type);
    },

    checkLebaneseFruitProducts: function () {
        var country = "lebanese";
        var type = "fruit";
        lebProducts = routeMethods.buildFruitProdList(country);
        for (var i = 0; i < lebProducts.length; i++) {
            var item = lebProducts[i];
            var route = country + "/" + type + "/" + item;
            if (path.endsWith(route)) {
                routeMethods.loadProductCalendar(country, type, item);
            }
        }
    },

    checkLebaneseVegProducts: function () {
        var country = "lebanese";
        var type = "vegetables";
        lebProducts = routeMethods.buildVegProdList(country);
        for (var i = 0; i < lebProducts.length; i++) {
            var item = lebProducts[i];
            var route = country + "/" + type + "/" + item;
            if (path.endsWith(route)) {
                routeMethods.loadProductCalendar(country, type, item);
            }
        }
    },

    checkSouthAfricanFruitProducts: function () {
        var country = "southAfrican";
        var type = "fruit";
        safProducts = routeMethods.buildFruitProdList(country);
        for (var i = 0; i < safProducts.length; i++) {
            var item = safProducts[i];
            var route = country + "/" + type + "/" + item;
            if (path.endsWith(route)) {
                routeMethods.loadProductCalendar(country, type, item);
            }
        }
    },
    checkSouthAfricanVegProducts: function () {

        var country = "southAfrican";
        var type = "vegetables";
        safProducts = routeMethods.buildVegProdList(country);
        for (var i = 0; i < safProducts.length; i++) {
            var item = safProducts[i];
            var route = country + "/" + type + "/" + item;
            if (path.endsWith(route)) {
                routeMethods.loadProductCalendar(country, type, item);
            }
        }
    },

    checkAustralianFruitProducts: function () {
        // products/australian/fruit/strawberries
        var country = "australian";
        var type = "fruit";
        ausProducts = routeMethods.buildFruitProdList(country);
        for (var i = 0; i < ausProducts.length; i++) {
            var item = ausProducts[i];
            var route = country + "/" + type + "/" + item;
            if (path.endsWith(route)) {
                routeMethods.loadProductCalendar(country, type, item);
            }
        }
    },

    checkAustralianVegProducts: function () {
        var country = "australian";
        var type = "vegetables";
        ausProducts = routeMethods.buildVegProdList(country);
        for (var i = 0; i < ausProducts.length; i++) {
            var item = ausProducts[i];
            var route = country + "/" + type + "/" + item;
            if (path.endsWith(route)) {
                routeMethods.loadProductCalendar(country, type, item);
            }
        }
    }
}

function changeWhatsInSeasonElem(title, href, linktext) {
    whatsInSeason.firstElementChild.innerText = title;
    whatsInSeason.firstElementChild.nextElementSibling.href = href;
    whatsInSeason.firstElementChild.nextElementSibling.innerHTML = linktext;
}


function checkProductRoutes() {
    if (path.startsWith('/products/lebanese/vegetables/')) {
        return routeMethods.checkLebaneseVegProducts();
    }

    if (path.startsWith('/products/lebanese/fruit/')) {
        return routeMethods.checkLebaneseFruitProducts();
    }

    if (path.startsWith('/products/southAfrican/fruit/')) {
        return routeMethods.checkSouthAfricanFruitProducts();
    }

    if (path.startsWith('/products/southAfrican/vegetables/')) {
        return routeMethods.checkSouthAfricanVegProducts();
    }

    if (path.startsWith('/products/australian/fruit/')) {
        return routeMethods.checkAustralianFruitProducts();
    }

    if (path.startsWith('/products/australian/vegetables/')) {
        return routeMethods.checkAustralianVegProducts();
    }

    if (path.endsWith('products/calendar')) {
        calendarView.init();
        productView.classList.add('hidden');
        productIndividual.classList.add('hidden');
        title.innerText = "Season Calendar";
        headerImage.classList.add('seasonal');
        productIndividual.classList.add('hidden');
        var titleh1 = "Lets start talking";
        var href = "/contact";
        var linktext = "Contact Us"
        changeWhatsInSeasonElem(titleh1, href, linktext);
        return;
    }

    if (path.endsWith('products/australian/fruit')) {
        productViewList.changeCountry("aus");
        veg.style.display = "none";
        fruit.classList.add('enlarge');
        title.innerText = "Fruit Products";
        headerImage.classList.add('fruits');
        hideButtons();
        calendar.classList.add('hidden');
        productIndividual.classList.add('hidden');
        return;
    }

    if (path.endsWith('products/southAfrican/fruit')) {
        productViewList.changeCountry("saf");
        veg.style.display = "none";
        fruit.classList.add('enlarge');
        title.innerText = "Fruit Products";
        headerImage.classList.add('fruits');
        hideButtons();
        calendar.classList.add('hidden');
        productIndividual.classList.add('hidden');
        return;
    }

    if (path.endsWith('products/lebanese/fruit')) {
        productViewList.changeCountry("leb");
        veg.style.display = "none";
        fruit.classList.add('enlarge');
        title.innerText = "Fruit Products";
        headerImage.classList.add('fruits');
        hideButtons();
        calendar.classList.add('hidden');
        productIndividual.classList.add('hidden');
        return;
    }

    if (path.endsWith('products/fruit')) {
        productViewList.init();
        veg.style.display = "none";
        fruit.classList.add('enlarge');
        title.innerText = "Fruit Products";
        headerImage.classList.add('fruits');
        hideButtons();
        calendar.classList.add('hidden');
        productIndividual.classList.add('hidden');
        return;
    }
    if (path.endsWith('products/australian/vegetables')) {
        productViewList.changeCountry("aus");
        fruit.style.display = "none";
        veg.classList.add('enlarge');
        title.innerText = "Vegetable Products";
        headerImage.classList.add('veg');
        hideButtons();
        calendar.classList.add('hidden');
        productIndividual.classList.add('hidden');
        return;
    }

    if (path.endsWith('products/southAfrican/vegetables')) {
        productViewList.changeCountry("saf");
        fruit.style.display = "none";
        veg.classList.add('enlarge');
        title.innerText = "Vegetable Products";
        headerImage.classList.add('veg');
        hideButtons();
        calendar.classList.add('hidden');
        productIndividual.classList.add('hidden');
        return;
    }

    if (path.endsWith('products/lebanese/vegetables')) {
        productViewList.changeCountry("leb");
        fruit.style.display = "none";
        veg.classList.add('enlarge');
        title.innerText = "Vegetable Products";
        headerImage.classList.add('veg');
        hideButtons();
        calendar.classList.add('hidden');
        productIndividual.classList.add('hidden');
        return;
    }
    if (path.endsWith('products/vegetables')) {
        productViewList.init();
        fruit.style.display = "none";
        veg.classList.add('enlarge');
        title.innerText = "Vegetable Products";
        headerImage.classList.add('veg');
        hideButtons();
        calendar.classList.add('hidden');
        productIndividual.classList.add('hidden');
        return;
    }
    if (path.endsWith('products')) {
        productViewList.init();
        calendar.classList.add('hidden');
        productIndividual.classList.add('hidden');
        return;
    }
}

function initDB() {
    var localDB = localStorage.getItem('productList');
    var someTimeLimit = true;
    if (localDB && someTimeLimit) {
        list = JSON.parse(localDB);
        checkProductRoutes();
        hideLoader();
        console.log('using local storage');
    } else {
        var ref = firebase.database().ref('products');
        console.log(ref)
        ref.on("value", function (snapshot) {
            console.log(snapshot.val());
            var prodList = snapshot.val();
            console.log(prodList);
            document.getElementById("products").innerHTML = JSON.stringify(prodList, null, 2);
            list = prodList;
            localStorage.setItem('productList', JSON.stringify(prodList));
            checkProductRoutes();
            hideLoader()
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }
}
initDB();
// document.addEventListener("DOMContentLoaded", function(event) {
//     console.log("DOM fully loaded and parsed");
//
//
// });
