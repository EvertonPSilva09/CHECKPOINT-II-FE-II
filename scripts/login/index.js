let emailLogin = document.getElementById("inputEmail");
let passwordLogin = document.getElementById("inputPassword");

let botaoLogin = document.getElementById("botaoLogin");

//botaoLogin.style.backgroundColor = "#979292";
//botaoLogin.innerText = "Bloqueado";

let objetoUsuario = {
    email: "",
    password: ""
}

botaoLogin.addEventListener("click",function(evento) {

    evento.preventDefault();

    if (validaLogin(emailLogin.value, passwordLogin.value)) {
        evento.preventDefault();

        /* Normalização*/
        emailLogin = nomalizaTextoRetiraEspacos(emailLogin.value);
        passwordLogin = nomalizaTextoRetiraEspacos(passwordLogin.value);

        objetoUsuario.email = emailLogin;
        objetoUsuario.password = passwordLogin;

        let objetoUsuarioEmJson = JSON.stringify(objetoUsuario);

        console.log(objetoUsuarioEmJson);

        //Comunicando com API

        let configRequest = {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: objetoUsuarioEmJson
        }
        fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", configRequest)
        .then(
            resultado => {
                if (resultado.status == 201 || resultado.status == 200){
                    return resultado.json();
                } else{
                    throw resultado;
                }
                
            }

        ).then(
            resultado =>{
                loginSucesso(resultadoSucesso);
                console.log(resultado);
            }

        ).catch(
            erro => {

                if(erro.status == 400 || erro.status == 404){
                    loginErro("Email e/ou senha inválidos");
                }
                console.log(erro);
            }

        );

    } else {
        console.log("Login inválido");
    }

});

function loginSucesso(resultadoSucesso) {
    console.log(resultadoSucesso);

}

function loginErro(resultadoErro) {

    console.log(resultadoErro);
}

emailLogin.addEventListener("keyup", () => {

    let validacaoEmail = document.getElementById("validacaoEmail");

    if (emailLogin.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        validacaoEmail.innerText = ""
        emailLogin.style.border = "2px solid transparent"

    } else {

        validacaoEmail.innerText = "Campo obrigatorio"
        validacaoEmail.style.color = "#E9554EBB"
        emailLogin.style.border = "2px solid #E9554EBB"

    }

    validaLogin(emailLogin.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), passwordLogin.value);

});

passwordLogin.addEventListener("keyup", () => {
    let validacaoSenha = document.getElementById("validacaoSenha");


    if (passwordLogin.value) {

        validacaoSenha.innerText = ""
        passwordLogin.style.border = "2px solid transparent"

    } else {

        validacaoSenha.innerText = "Campo obrigatorio"
        validacaoSenha.style.color = "#E9554EBB"
        passwordLogin.style.border = "2px solid #E9554EBB"

    }
    validaLogin(emailLogin.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), passwordLogin.value);

});

function validaLogin(email, password) {
    if (email && password) {
        //True
        botaoLogin.removeAttribute("disabled");
        botaoLogin.style.backgroundColor = "#7898ff";
        botaoLogin.innerText = "Acessar";

        return true;

    } else {
        //False
        botaoLogin.removeAttribute("disabled", true);
        botaoLogin.style.backgroundColor = "#979797";
        botaoLogin.innerText = "Bloqueado";

        return false;

    }
}