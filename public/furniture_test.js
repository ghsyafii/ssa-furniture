//Fetch JSON to HTML page
//Insert JSON items to paragraph with #cards id

function addProductPage() {
    fetch('../assets/furniture.json')
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            const cards = json;
            let output = "";
            const products = JSON.stringify(json);
            var itemsInLocal = localStorage.setItem('products', products);
            var itemsInStore = localStorage.getItem('products');
            var productInStore = JSON.parse(itemsInStore); //resonate products
            for (let i = 0; i < json.length; i++) {
                output +=
                    `<div class="col-sm-3"><div class="card p-1">
        <img class="card-img-top animate__animated animate__fadeIn" src="${json[i].image}" alt="">
        <div class="card-body">
            <h5 class="card-title">${json[i].name}</h5>
            <p class="card-text">$${json[i].price}</p>
            <button id="addToCart" type="button" class="btn btn-warning">Add to cart</button>
        </div>
    </div></div>`
                document.getElementById("cards").innerHTML = output;
            }

            var carts = document.querySelectorAll('#addToCart');
            for (let i = 0; i < carts.length; i++) {
                carts[i].addEventListener('click', () => {
                    cartNumbers(productInStore[i]);
                })

            }

            //cartNmber starts
            function cartNumbers(productInStore) {
                let productNumbers = localStorage.getItem('cartNumbers');
                productNumbers = parseInt(productNumbers);
                if (productNumbers) {
                    localStorage.setItem('cartNumbers', productNumbers + 1)
                } else {
                    localStorage.setItem('cartNumbers', 1);
                }
                setItems(productInStore);

            }

            //cartNumber ends

            //setitem start
            function setItems(productInStore) {
                var cartItems = localStorage.getItem('itemsInCart');
                cartItems = JSON.parse(cartItems);
                if (cartItems != null) {
                    if (cartItems[productInStore.name] == undefined) {
                        cartItems = {
                            ...cartItems,
                            [productInStore.name]: productInStore
                        }
                    }
                    cartItems[productInStore.name].inCart += 1
                } else {
                    productInStore.inCart = 1;
                    cartItems = {
                        [productInStore.name]: productInStore
                    }
                }

                localStorage.setItem('itemsInCart', JSON.stringify(cartItems));
                calCost(productInStore);

            }

            //setitem end

            //price starts
            function calCost(productInStore) {
                let cartCost = localStorage.getItem("totalCost");

                if (cartCost != null) {
                    cartCost = parseInt(cartCost); //conversion required for math
                    localStorage.setItem("totalCost", cartCost += productInStore.price);
                } else {
                    localStorage.setItem("totalCost", productInStore.price);
                }
            }

            //price ends


        })


}

addProductPage();
displayItems();

//for printing cart items to cart page
function displayItems() {
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);
    cartItems = Object.values(cartItems);
    let totalPrice = localStorage.getItem('totalCost');
    totalPrice = JSON.parse(totalPrice);
    var itemContainer = document.getElementById("items-container");
    // var itemDisplay = document.querySelector('.item-image');
    // var itemName = document.querySelector('.item-name');
    if (cartItems && itemContainer) {
        for (let i = 0; i < cartItems.length; i++) {
            itemContainer.innerHTML +=
                `<div class="card card-cart">
        <div class ="card-horizontal">
        <div class="resize-cart-image">
        <img class="img-fluid" src="${cartItems[i].image}" alt="Card image cap">
        </div>
        <div class ="card-body">
            <h4 class="card-title">${cartItems[i].name}</h4>
             <p class="card-text">$${cartItems[i].price}</p>
        </div>
        </div>
        <div class="card-footer">
        <small class="text-muted">Quantity: ${cartItems[i].inCart} </small><br>
        <small class="text-muted">Total Amount: ${cartItems[i].inCart * cartItems[i].price} </small>
    </div>
        </div>`
        }
        var totalPricePage = document.querySelector('.totalPrice');
        totalPricePage.innerHTML += `$${totalPrice}`;
    }

}

//to clear page and local storage
//to confirm whether to clear
function ClearStorage() {
    var itemContainer = document.getElementById("items-container");
    var totalPricePage = document.querySelector('.totalPrice');
    var confirmClear = document.getElementById("confirmclear");
    if (totalPricePage.innerHTML != "") {
        confirmClear.innerHTML =
            `<div class="my-modal-content">
        <h5>Clearing the cart will remove <strong>ALL</strong> items. Proceed?</h5>
  <div class = "buttons-align">
  <label for = "confirm"><button id="confirmed">Yes</button></label>
  <label for = "not-confirmed"><button id="not-confirmed">No</button></label>
      </div>
    
    </div>`
        var confirmedClear = document.getElementById('confirmed');
        var notConfirmed = document.getElementById('not-confirmed');

        confirmedClear.addEventListener('click', () => {
            var itemContainer = document.getElementById("items-container");
            var totalPricePage = document.querySelector('.totalPrice');
            var confirmClear = document.getElementById("confirmclear");
            confirmClear.innerHTML = "";
            totalPricePage.innerHTML = "";
            itemContainer.innerHTML = "";
            localStorage.removeItem("itemsInCart");
            localStorage.removeItem("cartNumbers");
            localStorage.removeItem("totalCost");
        })

        notConfirmed.addEventListener('click', () => {
            var confirmClear = document.getElementById("confirmclear");
            confirmClear.innerHTML = "";
        })
    } else {
        confirmClear.innerHTML =
            `<div class="my-modal-content">
        <h5>Cart is empty.</h5>
        <label for = "not-confirmed"><button id="not-confirmed">Close</button></label>
      </div>
    
    </div>`
        var notConfirmed = document.getElementById('not-confirmed');

        notConfirmed.addEventListener('click', () => {
            confirmClear.innerHTML = "";
        })

    }


}


