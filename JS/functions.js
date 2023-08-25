

// Seleccion de nodos
const contenedor = document.querySelector("#container-productos");
const buttonFilter = document.querySelectorAll(".buttonFilter");
const cantidadSpan = document.querySelectorAll(".cantidad-span")
const carritoContainer = document.getElementById("carrito-container");
const buttonPagar = document.querySelector('.buttonPagar');
const ordenContainer = document.getElementById("orden-container");

/// Function Add Event buttonCompra
const addEventbuttonCompra = (productosDisponibles)  => {
    const buttonCompra = document.querySelectorAll(".buttonCompra");
    buttonCompra.forEach((button) => {
        button.addEventListener("click", (event) => {
            //Toastify
            Toastify({
                text: "Producto agregado!",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} 
            }).showToast();
            const productId = parseInt(event.target.getAttribute("id"));
            const productFind = productosDisponibles.find((producto) => producto.id === productId);
            if (productFind) {
                if (!localStorage.carrito) {
                    localStorage.setItem("carrito", JSON.stringify([{ ...productFind, cantidad: 1 }]));
                } else {
                    const carrito = JSON.parse(localStorage.carrito)
                    const existeEnCarrito = carrito.find(element => element.id === productFind.id);
                    if (existeEnCarrito) {
                        carrito.map(element => {
                            if (element.id === existeEnCarrito.id) {
                                existeEnCarrito.cantidad++
                            } return element
                        })
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                    } else {
                        carrito.push({ ...productFind, cantidad: 1 });
                        localStorage.setItem("carrito", JSON.stringify(carrito))
                    }
                }
            }
        });
    });
}


/// Function productFilter 
const productFilter = (productosDisponibles) => {
    buttonFilter.forEach((button) => {
        button.addEventListener("click", (event) => {
            const catProduct = event.target.getAttribute("id");
            let catFind;
            if (catProduct === "verTodo") {
                catFind = productosDisponibles;
            } else {
                catFind = productosDisponibles.filter((producto) => producto.categoria === catProduct);
            }

            ///Limpiar contenedor
            const carritoContainer = document.getElementById("carrito-container");
            carritoContainer.innerHTML = "";
            contenedor.innerHTML = ``;

            catFind.forEach((producto) => {
                const div = document.createElement("div");
                div.classList.add("card", "m-3")
                div.style.width = "18rem"
                div.innerHTML =
                    `
                    <img src=${producto.imagen} class="card-img-top">
                    <div class="card-body" id = ${producto.id}>
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: ${producto.precio}.</p>
                        <a href="#" class="btn btn-primary buttonCompra" id = ${producto.id}>Agregar al carrito</a>
                    </div>
                    `
                contenedor.appendChild(div)
            });
            addEventbuttonCompra(productosDisponibles)
        })
    })
}

let total = 0;
//Renderizar carrito
const renderCarrito = () => {
    carritoContainer.innerHTML = "";
    ordenContainer.innerHTML = "";
    const table = document.createElement("table");
    table.className = "table";

    const thead = document.createElement("thead");
    const trHeader = document.createElement("tr");
    trHeader.innerHTML = `
        <th scope="col">ID</th>
        <th scope="col">Producto</th>
        <th scope="col">Precio</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Sub Total</th>
    `;
    thead.appendChild(trHeader);

    const tbody = document.createElement("tbody");
    tbody.id = "carritoRow";
    total = 0
    

    JSON.parse(localStorage.carrito).forEach(producto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                        <th id=${producto.id} scope="row">${producto.id}</th>
                        <td>${producto.nombre}</td>
                        <td>$ ${producto.precio}</td>
                        <td>
                        <button type="button" class="btn btn-primary btn-sm buttonResta" id=${producto.id}> - </button>
                        <span id=${producto.id} class='cantidad-span'>${producto.cantidad}</span>
                        <button type="button" class="btn btn-primary btn-sm buttonSuma" id=${producto.id}> + </button>
                        </td>
                        <td>$ ${producto.cantidad * producto.precio}</td>
                    `
        tbody.appendChild(tr);
        total += producto.cantidad * producto.precio;
    });

    const trTotal = document.createElement("tr");
    trTotal.innerHTML = `<td colspan="4">Total</td><td>$ ${total}</td>`;

    tbody.appendChild(trTotal);
    table.appendChild(thead);
    table.appendChild(tbody);
    carritoContainer.appendChild(table);

    buttonResta();
    buttonSuma();
}



/// Prueba const buttonResta
const buttonResta = () => {
    const buttonsResta = document.querySelectorAll('.buttonResta');
    buttonsResta.forEach((button) => {
        button.addEventListener("click", (event) => {
            //Toastify
            Toastify({
                text: "Producto eliminado",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #Ec0a0a, #Ea4a4a)",
                },
                onClick: function(){} 
            }).showToast();
            const buttonId = parseInt(event.target.getAttribute("id"));
            let carrito = JSON.parse(localStorage.carrito)
            carrito = carrito.filter(element => {
                if (element.id === buttonId) {
                    element.cantidad--
                    cantidadSpan.forEach(span => {
                        const spanId = parseInt(span.getAttribute("id"));
                        if (spanId == buttonId) {
                            span.innerText = element.cantidad
                        }
                    })
                    return element.cantidad > 0;
                } else {
                    return true;
                }
            })
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();
        });
    })
}


/// Function buttonSuma
const buttonSuma = () => {
    const buttonSuma = document.querySelectorAll('.buttonSuma');
    buttonSuma.forEach((button) => {
        button.addEventListener("click", (event) => {
            //Toastify
            Toastify({
                text: "Producto agregado!",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} 
            }).showToast();
            const buttonId = parseInt(event.target.getAttribute("id"));
            const carrito = JSON.parse(localStorage.carrito)
            carrito.map(element => {
                if (element.id === buttonId) {
                    element.cantidad++
                    cantidadSpan.forEach(span => {
                        const spanId = parseInt(span.getAttribute("id"));
                        if (spanId == buttonId) {
                            span.innerText = element.cantidad
                        }
                    })
                } return element
            })
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();
        });
    })
}


const logOut = () => {
    localStorage.removeItem("usuario")
    localStorage.removeItem("carrito")
    window.location = '../index.html'
}


//Function Pagar
const addEventbuttonPagar = () => {
    buttonPagar.addEventListener('click',() => {
    carritoContainer.innerHTML = "";
    ordenContainer.innerHTML = "";
    const table = document.createElement("table");
    table.className = "table";

    const thead = document.createElement("thead");
    const trHeader = document.createElement("tr");
    trHeader.innerHTML = `
        <th scope="col">ID</th>
        <th scope="col">Producto</th>
        <th scope="col">Precio</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Sub Total</th>
    `;
    thead.appendChild(trHeader);

    const tbody = document.createElement("tbody");
    tbody.id = "ordenRow";
    total = 0
    

    JSON.parse(localStorage.carrito).forEach(producto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                        <th id=${producto.id} scope="row">${producto.id}</th>
                        <td>${producto.nombre}</td>
                        <td>$ ${producto.precio}</td>
                        <td>
                        <span id=${producto.id} class='cantidad-span'>${producto.cantidad}</span>
                        </td>
                        <td>$ ${producto.cantidad * producto.precio}</td>
                    `
        tbody.appendChild(tr);
        total += producto.cantidad * producto.precio;
    });

    const trTotal = document.createElement("tr");
    trTotal.innerHTML = `<td colspan="4">Total</td><td>$ ${total}</td>`;
    tbody.appendChild(trTotal);

    const confirmButton = document.createElement("button");
    confirmButton.classList = "btn btn-primary success "
    confirmButton.innerHTML = "Confirmar Pedido";
    confirmButton.addEventListener("click", () =>{
        confirmButton.innerHTML = "Gracias por su compra"
        confirmButton.disabled = true
    })

    const trPedido = document.createElement("tr");
    const tdPedido = document.createElement("td");
    trPedido.colSpan = "5";
    tdPedido.appendChild(confirmButton);
    trPedido.appendChild(tdPedido);
    tbody.appendChild(trPedido);


    table.appendChild(thead);
    table.appendChild(tbody);
    ordenContainer.appendChild(table);
    });
}



export { addEventbuttonCompra, renderCarrito, productFilter, buttonResta, buttonSuma, addEventbuttonPagar ,logOut }