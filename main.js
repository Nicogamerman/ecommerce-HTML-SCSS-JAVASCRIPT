// Cambio de cantidad de articulos ingresado por el usuario.

const minusBtn = document.querySelector('.input__minus'); //Decremento de cantidad desde icono.
const plusBtn = document.querySelector('.input__plus'); //Aumento cantidad desde icono.
let userInput = document.querySelector('.input__number'); //Cantidad de objetos comprados.

let userInputNumber = 0; //Valor por defecto del input.

plusBtn.addEventListener('click', ()=>{ //Agrego una escucha para ver el click.
    userInputNumber++; //Sumo uno.
    userInput.value = userInputNumber;  //.value equivale a lo que tenemos en value en el HTML
    console.log(userInputNumber); //Imprimo la variable indicada por el usuario para mostrarla.
});

minusBtn.addEventListener('click', ()=>{
    userInputNumber--; //Disminuyo de a una unidad.
    if(userInputNumber <= 0){ //Evito que vaya menos de cero.
        userInputNumber = 0; //Si va a menos de cero, se mantiene en cero.
    }
    userInput.value = userInputNumber;
    console.log(userInputNumber);
});

// Agregar el total de productos al carrito cuando se presiona el boton ADD TO CART
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', ()=>{ 
    lastValue = lastValue + userInputNumber;
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    drawProductInModal();
});

//Mostrar el modal con el detalle del carrito al hacer click en el icono carrito margen superior derecho.
const cartIconBtn = document.querySelector('.header__cart'); 
const cartModal = document.querySelector('.cart-modal');
// let priceModal = document.querySelector('.cart-modal__price');
const productContainer = document.querySelector('.cart-modal__checkout-container');

cartIconBtn.addEventListener('click', ()=>{
    cartModal.classList.toggle('show'); //Agrego la clase show creada en el main.css y cambia el display: block
    if(lastValue === 0){ //Si el valor es CERO, mostrar en pantalla "tu carrito esta vacio".
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>'; //InnerHTML para insertar etiqueta HTML.
    }else{
        drawProductInModal();
    }
});

//Borrar el contenido del carrito
function deleteProduct(){
    const deleteProductBtn = document.querySelector('.cart-modal__delete');
    deleteProductBtn.addEventListener('click', ()=>{
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
    });
}

// Cambiar imagenes cuando se presione los botones flecha.
const imageContainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previus');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', ()=>{
    changeNextImage(imageContainer);
});

previusGalleryBtn.addEventListener('click', ()=>{
    changePreviusImage(imageContainer);
});


//Mostrar el modal de imagenes cuando hago click en la imagen principal.
const imagesModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', ()=>{
    if(window.innerWidth >= 1115){
        imagesModal.style.display = 'grid';
    }
    
});

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
});

//Cambiar las imagenes principales desde los thumbnails
let thumbnails = document.querySelectorAll('.gallery__thumnail')
thumbnails = [...thumbnails]

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event=>{
        console.log(event.target.id)
        imageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id}.jpg')`
    });
});

//Cambiar las imagenes principales desde los thumbnails en el MODAL
let modalthumbnails = document.querySelectorAll('.modal-gallery__thumnail');
const modalImageContainer = document.querySelector('.modal-gallery__image-container')
modalthumbnails = [...modalthumbnails]

modalthumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener('click', event=>{
        console.log(event.target.id.slice(-1))
        modalImageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id.slice(-1)}.jpg')`
    });
});

// Cambiar imagen principal de modal desde flechas en el modal
const previusModalBtn = document.querySelector('.modal-gallery__previus');
const nextModalBtn = document.querySelector('.modal-gallery__next');

nextModalBtn.addEventListener('click', ()=>{
    changeNextImage(modalImageContainer);
});

previusModalBtn.addEventListener('click', ()=>{
    changePreviusImage(modalImageContainer);
});

// Mostrar el navbar cuando presiono el menu de hamburgesa
const hamburgerMenu = document.querySelector('.header__menu');
const modalNavbar = document.querySelector('.modal-navbar__background');
const closeModalNavbar = document.querySelector('.modal-navbar__close-icon');

modalNavbar.style.display = 'none'

hamburgerMenu.addEventListener('click', ()=>{
    console.log('abrir modal');
    modalNavbar.style.display = 'block';
});

closeModalNavbar.addEventListener('click', ()=>{
    modalNavbar.style.display = 'none';
});

// FUNCIONES

function drawProductInModal(){
    productContainer.innerHTML = `
        <div class="cart-modal__details-container">
            <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="">
            <div>
            <p class="cart-modal__product">Autumn Limited Edition...</p>
            <p class="cart-modal__price">$100 x3 <span>$300.00</span> </p>
            </div>
            <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
        </div>
        <button class="cart-modal__checkount" >Checkout</button>`
    deleteProduct()
    let priceModal = document.querySelector('.cart-modal__price');
    priceModal.innerHTML = `$100 x${lastValue} <span>$${lastValue*100}.00</span>`;
}

function changeNextImage(imgContainer){
    if(imgIndex === 4){
        imgIndex = 1;
    }else{
        imgIndex++;
    }
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`
}

function changePreviusImage(imgContainer){
    if(imgIndex === 1){
        imgIndex = 4;
    }else{
        imgIndex--;
    }
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`
}