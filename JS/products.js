
import { productFilter,renderCarrito, buttonResta, buttonSuma, addEventbuttonCompra, addEventbuttonPagar,  logOut } from './functions.js';
import fetchProducts from './fetchProducts.js';



document.addEventListener("DOMContentLoaded", async () => {
    const productosDisponibles = await fetchProducts();
    //Seleccion de Nodos
    const contenedor = document.querySelector("#container-productos");
    const logOutButton = document.querySelector("#logOut");
    // MOSTRAR TODOS LOS PRODUCTOS
    productosDisponibles.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card", "m-3")
        div.style.width = "18rem"
        div.innerHTML =
            `
            <img src=${producto.imagen} class="card-img-top" alt="...">
            <div class="card-body" id = ${producto.id}>
                <h5 class="card-title"> ${producto.nombre}</h5>
                <p class="card-text">Precio: $${producto.precio}.</p>
                <a href="#" class="btn btn-primary buttonCompra" id = ${producto.id}>Agregar al carrito</a>
            </div>
            `
        contenedor.appendChild(div)
    });
    addEventbuttonCompra(productosDisponibles)
    productFilter(productosDisponibles)
    document.addEventListener("click",(event) => {
        const buttonId = event.target.getAttribute("id");
        if (buttonId == "verCarrito"){
            contenedor.innerHTML = "";
            renderCarrito();
            buttonResta();
            buttonSuma();
            addEventbuttonPagar();
        }
    })
    logOutButton.addEventListener("click",() =>{
        logOut();
    })
})





