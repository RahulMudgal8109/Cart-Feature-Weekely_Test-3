if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}
function ready() {
    var removeBtn = document.getElementsByClassName("btn-danger");

    for (var i = 0; i < removeBtn.length; i++) {
        var btn = removeBtn[i];
        btn.addEventListener('click', removeCartItems)

    }
    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCart = document.getElementsByClassName("shop-item-button");

    for (var i = 0; i < addToCart.length; i++) {
        var addBtn = addToCart[i];
        addBtn.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchase);

}

function purchase()
{
    alert("Thanks for purchase");
    var cartItems=document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }
}
function addToCartClicked(e) {

    var button = e.target;
    var shopItem = button.parentElement.parentElement;

    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;

    addToCartMain(title, price, imageSrc);
    updateCart();
    console.log(imageSrc)

}
function addToCartMain(title, price, imageSrc) {
    //console.log('click');
    var cartRow = document.createElement('div');
    var cartItems=document.getElementsByClassName('cart-items')[0];
    cartRow.classList.add('cart-row');

    var cartContent = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>
`
cartRow.innerHTML=cartContent;
cartItems.append(cartRow);
cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItems);
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
}
function removeCartItems(e) {
    var btnClicked = e.target;
    btnClicked.parentElement.parentElement.remove();
    updateCart();

}
function quantityChanged(e) {
    var input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCart()
}


function updateCart() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    //console.log(cartRows);
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];

        var price = parseFloat(priceElement.innerText.replace('$', ''));

        total += price * quantityElement.value;


    }
    total = Math.round(total * 100) / 100;
    var finalTotal = document.getElementsByClassName("cart-total-price")[0];
    finalTotal.innerText = total;


}