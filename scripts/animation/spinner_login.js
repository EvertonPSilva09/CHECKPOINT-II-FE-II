function exibeSpinner(){
    let div = document.createElement("div");
    div.classList.add("loader");

    let botaoLogin = document.getElementById("botaoLogin")

    botaoLogin.innerText="";

    botaoLogin.appendChild(div);
}

function ocultaSpinner(){
    let botaoLogin = document.getElementById("botaoLogin")
    let div = document.querySelector(".loader")


    botaoLogin.removeChild(div);
}