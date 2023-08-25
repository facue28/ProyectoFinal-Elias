import bbdd from '../data/db-users.js';
let user = {
    usuario: '',
    contraseña:'',
}

const buttonLogin = document.getElementById("login-button");
const form = document.querySelector("form")
const inputs = document.querySelectorAll("input"); 


buttonLogin.addEventListener("click",(event)=>{
event.preventDefault();
const userFind = bbdd.find((registro) => user.usuario === registro.usuario && user.contraseña === registro.contraseña)
    if(!userFind){ 
        alert("Contraseña o usuario incorrecto");
        form.reset();
        return;
    }
    localStorage.setItem("usuario",JSON.stringify(userFind));
    window.location.href = '/pages/products.html';
});


inputs.forEach( (elemento) => {
    elemento.addEventListener("input",({ target })=>{
        const { value, name } = target;
        user = {
            ...user,
            [name]: value
        }
    })
})