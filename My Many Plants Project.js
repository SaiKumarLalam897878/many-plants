let loader = document.getElementById("loader");
let homePage = document.getElementById('homePage');
setTimeout(function() {
    loader.classList.add('d-none');
    homePage.classList.add('d-block');
}, 4000);

//getting the id's of cart total items and cart page
let cartItems = document.getElementById('cartItems');
let smallDevicesCart = document.getElementById('smallDevicesCart');
let addToCartPage = document.getElementById("addToCartPage");

// cart price id details
let cartEmptyImage = document.getElementById("cartEmptyImage");
let cartTotalItems = document.getElementById("cartTotalItems");
let cartPrice = document.getElementById("cartPrice");
let cartDiscountPrice = document.getElementById("cartDiscountPrice");
let cartTotalPrice = document.getElementById("cartTotalPrice");
let cartSavedPrice = document.getElementById("cartSavedPrice");
let placeOrderContainer = document.getElementById('placeOrder');
let savePriceMessage = document.getElementById('savingPriceMessage');

//creating scroll bar plant details dynamically
let morePlantsSection = document.getElementById('morePlantsSection');
let morePlants = [{
        imgSrc: "https://res.cloudinary.com/dsr3a6xhk/image/upload/v1672138448/Screenshot_20221227_042155_fqpqdi.png",
        uniqueNo: 1,
        name: 'Indore Rubber Plant',
        size: 'Size may vary',
        price: 999,
        dealPrice: 699,
        storingCartCount: 0
    },
    {
        imgSrc: "https://res.cloudinary.com/dsr3a6xhk/image/upload/v1672138448/Screenshot_20221227_042135_bcqzjn.png",
        uniqueNo: 6,
        name: 'Jade Succulent',
        size: 'Standard size',
        price: 299,
        dealPrice: 199,
        storingCartCount: 0
    },
    {
        imgSrc: "https://res.cloudinary.com/dsr3a6xhk/image/upload/v1672138448/Screenshot_20221227_042234_cnbd5m.png",
        uniqueNo: 3,
        name: 'Chinese evergreen',
        size: 'Comes with 1 feet height with the pot',
        price: 299,
        dealPrice: 199,
        storingCartCount: 0
    },
    {
        imgSrc: "https://res.cloudinary.com/dsr3a6xhk/image/upload/v1672138448/Screenshot_20221227_042217_xvi9gm.png",
        uniqueNo: 4,
        name: 'Zamioculcas zamiifolia',
        size: 'Up to 3 feet',
        price: 400,
        dealPrice: 350,
        storingCartCount: 0
    },
    {
        imgSrc: "https://res.cloudinary.com/dsr3a6xhk/image/upload/v1672125977/pexels-elle-hughes-1058963_ix5ibz.jpg",
        uniqueNo: 5,
        name: 'Peanut Cactus',
        size: 'Standard size',
        price: 199,
        dealPrice: 99,
        storingCartCount: 0
    },
    {
        imgSrc: "https://res.cloudinary.com/dsr3a6xhk/image/upload/v1672125933/pexels-scott-webb-82037267_cyssxh.jpg",
        uniqueNo: 2,
        name: 'Cactus Plant',
        size: 'Standard size',
        price: 199,
        dealPrice: 99,
        storingCartCount: 0
    },
    {
        imgSrc: "https://res.cloudinary.com/dsr3a6xhk/image/upload/v1672138448/Screenshot_20221227_042226_lhps9e.png",
        uniqueNo: 7,
        name: 'Echeveria',
        size: 'Standard size',
        price: 199,
        dealPrice: 99,
        storingCartCount: 0
    },
]

// calling function to get saved items from localstorage
function getItemsFromStorage() {
    let parsedItems = JSON.parse(localStorage.getItem('itemPlantDetails'));
    if (parsedItems === null) {
        return [];
    } else {
        return parsedItems;
    }
}

let itemPlantDetails = getItemsFromStorage();


// creating a variables for increasing and decreasing price details
let totalPlantsPrice = 0;
let dealPrice = 0;

// This is reusable code snippet for those functions who are increasing and decreasing price details of cart
function oneFunctionForAll() {

    cartPrice.textContent = totalPlantsPrice;

    cartDiscountPrice.textContent = totalPlantsPrice - dealPrice;

    cartTotalPrice.textContent = dealPrice;

    cartSavedPrice.textContent = totalPlantsPrice - dealPrice;
}

//increasing count of cart item and corresponding price
function increaseCountOfCartItem(countText, item) {
    let text = document.getElementById(countText);

    if (parseInt(text.textContent) < 5) {
        text.textContent = parseInt(text.textContent) + 1;
        // saving count of cart item in localStorage
        item.storingCartCount += 1;
        localstorageItems();

        // increasing cart item price details
        totalPlantsPrice = parseInt(cartPrice.textContent) + item.price;
        dealPrice = parseInt(cartTotalPrice.textContent) + item.dealPrice;

        oneFunctionForAll();

    } else { // showing alert msg if item count grater than 5
        alert("Sorry you can't add more than five");
    }
}


//decreasing cart item count and corresponding price
function decreaseCountOfCartItem(countText, item) {
    let text = document.getElementById(countText);

    if (parseInt(text.textContent) > 1) {
        text.textContent = parseInt(text.textContent) - 1;
        // saving count of cart item in localStorage
        item.storingCartCount -= 1;
        localstorageItems();

        // decreasing cart price details and calling function to decrease
        totalPlantsPrice = parseInt(cartPrice.textContent) - item.price;
        dealPrice = parseInt(cartTotalPrice.textContent) - item.dealPrice;

        oneFunctionForAll();

    } else { // showing alert msg if item count less than 1
        alert("Minimum one item should be need");
    }
}


//updating price of the item and adding items to the cart
function addItemPriceToTheCart(item) {
    cartEmptyImage.classList.remove('cart-empty');
    cartEmptyImage.src = '';

    if (smallDevicesCart.textContent === '') { // updating number of items
        cartTotalItems.textContent = 1 + ' item';
        smallDevicesCart.textContent = 1;
        cartItems.textContent = 1;
    } else { // increasing count of cart item
        cartTotalItems.textContent = (parseInt(cartTotalItems.textContent) + 1) + ' items';
        smallDevicesCart.textContent = parseInt(smallDevicesCart.textContent) + 1;
        cartItems.textContent = parseInt(cartItems.textContent) + 1;
    }

    // increasing cart price details and calling function to increase
    totalPlantsPrice = parseInt(cartPrice.textContent) + item.price;
    dealPrice = parseInt(cartTotalPrice.textContent) + item.dealPrice;

    oneFunctionForAll();

}


// deleting cart items
function deleteCartItemAndPrice(countText, cartItem, item) {
    let itemCart = document.getElementById(cartItem);
    let countOfItem = document.getElementById(countText);
    let numOfItem = countOfItem.textContent;

    //deleting cart item price details and corresponding item price details from cart
    totalPlantsPrice = parseInt(cartPrice.textContent) - (parseInt(numOfItem) * item.price);
    dealPrice = parseInt(cartTotalPrice.textContent) - (parseInt(numOfItem) * item.dealPrice);

    oneFunctionForAll();

    // when user clicks on delete option deleting corresponding cart item on localStorage too
    let indexOfItem = itemPlantDetails.findIndex(function(index) {
        let eachItem = "cartPlant" + index.uniqueNo;
        if (eachItem === cartItem) {
            return true;
        }
    });
    itemPlantDetails.splice(indexOfItem, 1);
    localstorageItems();

    //deleting cart item form cart
    addToCartPage.removeChild(itemCart);

    //decreasing count of cart items
    cartItems.textContent = parseInt(cartItems.textContent) - 1;
    smallDevicesCart.textContent = parseInt(smallDevicesCart.textContent) - 1;
    if (parseInt(cartTotalItems.textContent) === 2) {
        cartTotalItems.textContent = (parseInt(cartTotalItems.textContent) - 1) + ' item';
    } else {
        cartTotalItems.textContent = (parseInt(cartTotalItems.textContent) - 1) + ' items';
    }

    //happy shopping msg elements
    let placeOrderButtonId = document.getElementById('placeOrderId');
    let happyShoppingId = document.getElementById("happyShopping");

    // updating textcontent and empty cart image when cart contains zero items
    if (parseInt(smallDevicesCart.textContent) === 0) {
        cartItems.textContent = " Cart";
        smallDevicesCart.textContent = "";
        savePriceMessage.classList.add('d-none');
        cartEmptyImage.classList.add('cart-empty');
        cartEmptyImage.src = "https://res.cloudinary.com/dsr3a6xhk/image/upload/v1678511734/empty_cart_c19abo.png";

        // removing place Order option when cart contains zero items
        placeOrderContainer.removeChild(placeOrderButtonId);
        placeOrderContainer.removeChild(happyShoppingId);
        placeOrderContainer.classList.remove("place-order-container");
    }

}

// adding place Order option when cart contains atleast one item
function placeOrder() {
    if (smallDevicesCart.textContent === '') {
        placeOrderContainer.classList.add("place-order-container");

        let happyShopping = document.createElement('span');
        happyShopping.id = 'happyShopping';
        happyShopping.classList.add("happy-shopping");
        happyShopping.textContent = 'Have a Good Day....';
        placeOrderContainer.appendChild(happyShopping);

        let happySmile = document.createElement('i');
        happySmile.classList.add("fa-solid", "fa-face-smile", "happy-smile");
        happyShopping.appendChild(happySmile);

        let placeOrderButton = document.createElement('button');
        placeOrderButton.id = 'placeOrderId';
        placeOrderButton.classList.add("place-order");
        placeOrderButton.textContent = "PLACE ORDER";
        placeOrderContainer.appendChild(placeOrderButton);

    }
}

//adding items to the cart
function addItemToTheCart(item) {
    // calling function to show happy shopping msg when cart contains atleast one item
    placeOrder();
    savePriceMessage.classList.remove('d-none');

    // when user refresh the website if the item quantity contains more than 1 it will increase the price and update the total bill
    if (item.storingCartCount > 0) {
        totalPlantsPrice = parseInt(cartPrice.textContent) + (item.price * item.storingCartCount);
        dealPrice = parseInt(cartTotalPrice.textContent) + (item.dealPrice * item.storingCartCount);

        oneFunctionForAll();
    }

    //creating cart item container
    let listElId = 'cartPlant' + item.uniqueNo;

    let listElement = document.createElement('div');
    listElement.id = listElId;
    listElement.classList.add('cart-list-style', 'shadow');
    addToCartPage.appendChild(listElement);

    // top section
    let cartDiv = document.createElement('div');
    cartDiv.classList.add('d-flex', 'flex-row');
    listElement.appendChild(cartDiv);

    let cartImageElement = document.createElement('img');
    cartImageElement.src = item.imgSrc;
    cartImageElement.classList.add("add-cart-image-size");
    cartDiv.appendChild(cartImageElement);

    let msgDiv = document.createElement('div');
    cartDiv.appendChild(msgDiv);

    let msgElement = document.createElement('p');
    msgElement.classList.add("add-cart-msg");
    msgElement.textContent = item.name;
    msgDiv.appendChild(msgElement);

    let plantSize = document.createElement('p');
    plantSize.textContent = 'Size: ' + item.size;
    plantSize.classList.add("plant-size-name");
    msgDiv.appendChild(plantSize);

    let priceDetails = document.createElement('p');
    priceDetails.classList.add("deal-price-details");
    priceDetails.textContent = "₹" + item.dealPrice;
    msgDiv.appendChild(priceDetails);

    let dealPriceDetails = document.createElement('span');
    dealPriceDetails.classList.add('price-details');
    dealPriceDetails.textContent = item.price;
    priceDetails.appendChild(dealPriceDetails);

    //bottom section
    let incrementDiv = document.createElement('div');
    incrementDiv.classList.add('d-flex', 'flex-row');
    listElement.appendChild(incrementDiv);

    let cartCountDiv = document.createElement('div');
    cartCountDiv.classList.add("d-flex", "flex-row", "increment-cart-button-div");
    incrementDiv.appendChild(cartCountDiv);

    let minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.classList.add("increment-button");
    cartCountDiv.appendChild(minusButton);

    let hrLine = document.createElement('hr');
    hrLine.classList.add("hr-line");
    cartCountDiv.appendChild(hrLine);

    let countText = document.createElement('span');
    countText.textContent = 1 + item.storingCartCount;
    countText.id = 'Count' + item.uniqueNo;
    countText.classList.add("cart-count-style");
    cartCountDiv.appendChild(countText);

    let hrLine2 = document.createElement('hr');
    hrLine2.classList.add("hr-line");
    cartCountDiv.appendChild(hrLine2);

    let plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.classList.add("increment-button");
    cartCountDiv.appendChild(plusButton);

    let offerDetails = document.createElement("p");
    offerDetails.textContent = '1 offer applied';
    offerDetails.classList.add("cart-offer-details");
    incrementDiv.appendChild(offerDetails);

    let deleteIconDiv = document.createElement('div');
    deleteIconDiv.classList.add("delete-cart-item");
    incrementDiv.appendChild(deleteIconDiv);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add("far", "fa-trash-alt");
    deleteIcon.onclick = function() {
        // when onclick calling function to delete corresponding cart item
        deleteCartItemAndPrice(countText.id, listElId, item);
    };
    deleteIconDiv.appendChild(deleteIcon);

    //calling function to add priceDetails
    addItemPriceToTheCart(item);

    //when onclick calling function to increase and decrease of count of cart item quantity
    plusButton.onclick = function() {
        increaseCountOfCartItem(countText.id, item);
    };

    minusButton.onclick = function() {
        decreaseCountOfCartItem(countText.id, item);
    };

}


// creating scroll-bar images with add to cart option
function createAndAppendPlant(item) {

    let morePlantId = "morePlant" + item.uniqueNo;
    let morePlantCartButtonId = "morePlantCartButton" + item.uniqueNo;
    let morePlantImageId = "morePlantImageId" + item.uniqueNo;


    let morePlantDiv = document.createElement('div');
    morePlantDiv.id = morePlantId;
    morePlantDiv.classList.add("scroll-items")
    morePlantsSection.appendChild(morePlantDiv);

    let morePlantImageTag = document.createElement('img');
    morePlantImageTag.src = item.imgSrc;
    morePlantImageTag.id = morePlantImageId;
    morePlantImageTag.classList.add("scroll-images");
    morePlantDiv.appendChild(morePlantImageTag);

    let morePlantButton = document.createElement('button');
    morePlantButton.textContent = 'Add To Cart';
    morePlantButton.classList.add("btn", "btn-outline-success", "cart-now-button");
    morePlantButton.id = morePlantCartButtonId;

    //adding items to the cart and localStorage
    morePlantButton.onclick = function() {
        // showing alert msg if count of cart items grater than 11
        if (parseInt(smallDevicesCart.textContent) > 10) {
            alert("Sorry.. You can't add More than eleven Items");
            return;
        } else {
            //calling functions for adding items to the cart and localstorage
            addItemToTheCart(item);
            itemPlantDetails.push(item); // updating itemPlantDetails array when a new item add to the cart
            localstorageItems();
        }
    };
    morePlantDiv.appendChild(morePlantButton);
}


//saving cart details in localStorage
function localstorageItems() {
    localStorage.setItem("itemPlantDetails", JSON.stringify(itemPlantDetails))
}

//calling items form local storage and displaying
for (let cartPlant of itemPlantDetails) {
    addItemToTheCart(cartPlant);
}

// calling function to create scroll-bar images
for (let item of morePlants) {
    createAndAppendPlant(item);
}




// account section
let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let passwordEl = document.getElementById('password');
let passErrMsgEl = document.getElementById('passErrMsg');

let myFormEl = document.getElementById("myForm");

let formData = {
    name: "",
    email: "",
    password: "",
    gender: 'Male',
    status: 'Active'
};

nameEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }

    formData.name = event.target.value;
});

emailEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }

    formData.email = event.target.value;
});


passwordEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        passErrMsgEl.textContent = "Required*";
    } else {
        passErrMsgEl.textContent = "";
    }

    formData.password = event.target.value;
});

function validateFormData(formData) {
    let {
        name,
        email,
        password
    } = formData;
    if (name === "") {
        nameErrMsgEl.textContent = "Required*";
    }
    if (email === "") {
        emailErrMsgEl.textContent = "Required*";
    }
    if (password === "") {
        emailErrMsgEl.textContent = "Required*";
    }
}

function submitFormData(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f",
        },
        body: JSON.stringify(formData)
    };

    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsgEl.textContent = "Email Already Exists";
                }
            }
        });
}

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateFormData(formData);
    submitFormData(formData);
});




// this bellow code is not in use
let uploadImage = document.getElementById('uploadId');
let userImage = document.getElementById("userImage");
const deleteUserImage = document.getElementById('deleteUserImage');

uploadImage.addEventListener('change', function(event) {
    userImage.src = event.target.value;
})

deleteUserImage.addEventListener('click', function() {
    userImage.src = 'https://res.cloudinary.com/dsr3a6xhk/image/upload/v1687753569/png-clipart-user-icon-foreigners-avatar-child-face_guuyl5.png'
})
// till this point