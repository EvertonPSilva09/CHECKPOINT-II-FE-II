
//Capturando os elementos
let registrationName = document.getElementById('name');
let registrationLastName = document.getElementById('lastName');
let registrationEmail = document.getElementById('email');
let registrationPassword = document.getElementById('password');
let registrationPassword2 = document.getElementById('password2')

let registerButton = document.getElementById('register');

//Alterando o comportamento do botão
registerButton.style.backgroundColor = "#979292A1"
registerButton.innerText = "Bloqueado";

//Criando o objeto que vamos enviar para a API
let registerUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

//Se comunicando com a api a partir do click no botão "registrar"
registerButton.addEventListener("click", function (evento) {

    if (validRegistration(registrationEmail.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/), registrationPassword.value, registrationPassword2.value)) {
        evento.preventDefault();

        /* Normalização*/
        registrationName = nomalizaTextoRetiraEspacos(registrationName.value);
        registrationLastName = nomalizaTextoRetiraEspacos(registrationLastName.value);
        registrationEmail = nomalizaTextoRetiraEspacos(registrationEmail.value);
        registrationPassword = nomalizaTextoRetiraEspacos(registrationPassword.value);

        registerUser.firstName = registrationName;
        registerUser.lastName = registrationLastName;
        registerUser.email = registrationEmail;
        registerUser.password = registrationPassword;

        //registraUsuario()

        //Comunicando com API

        let registerUserEmJson = JSON.stringify(registerUser);
        console.log(registerUserEmJson);

        let configRequest = {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: registerUserEmJson
        }
        fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/users/", configRequest)
            .then(
                resultado => {
                    if (resultado.status == 201 || resultado.status == 200) {
                        return resultado.json();
                    } else {
                        throw resultado;
                    }
                }
            ).then(
                resultado => {
                    registrationSucess(resultado);
                }
            ).catch(
                erro => {

                    if (erro.status == 400 || erro.status == 500) {
                        alert("Usuário já cadastrado/Algum dado está incompleto");
                    }
                    console.log(erro);
                }

            )
    } else {
        alert("Senha divergente")
    }
});

//Se o usuário conseguir se registrar, armazenando o token, exibindo a mensagem de sucesso e redirecionando para a página de tarefas
function registrationSucess(resultSucess) {

    sessionStorage.setItem("jwt", resultSucess.jwt);

    location.href = "tarefas.html";
    alert("Usuário cadastrado com sucesso!")
}

//
function registrationErro(resultErro) {
alert("Usuário não cadastrado")
    console.log(resultErro);
}

//Lógica para analisar se o e-mail é valido

registrationEmail.addEventListener("keyup", () => {

    let emailValidation = document.getElementById("emailValidation");

    if (registrationEmail.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
        emailValidation.innerText = ""
        registrationEmail.style.border = "2px solid transparent"

    } else {

        emailValidation.innerText = "Campo obrigatorio"
        emailValidation.style.color = "#E9554EBB"
        registrationEmail.style.border = "2px solid #E9554EBB"

    }

    //validRegistration(registrationEmail.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/), registrationPassword.value == registrationPassword2.value);

});

//Lógica para analisar a senha
registrationPassword.addEventListener("keyup", () => {
    let passwordValidation = document.getElementById("passwordValidation");

    if (registrationPassword.value) {

        passwordValidation.innerText = ""
        registrationPassword.style.border = "2px solid transparent"

    } else {

        passwordValidation.innerText = "Campo obrigatorio"
        passwordValidation.style.color = "#E9554EBB"
        registrationPassword.style.border = "2px solid #E9554EBB"

    }

});

registrationPassword2.addEventListener("keyup", () => {
    let passwordValidation2 = document.getElementById("passwordValidation2");

    if (registrationPassword2.value == registrationPassword.value) {

        passwordValidation2.innerText = ""
        registrationPassword2.style.border = "2px solid transparent"

    } else if (registrationPassword2.value != registrationPassword.value) {

        passwordValidation2.innerText = "Senha divergente"
        passwordValidation2.style.color = "#E9554EBB"
        registrationPassword2.style.border = "2px solid #E9554EBB"

    } else if (registrationPassword2.value && registrationPassword.value == null) {
        passwordValidation2.innerText = "Campo obrigatorio"
        passwordValidation2.style.color = "#E9554EBB"
        registrationPassword2.style.border = "2px solid #E9554EBB"
    } else {
        passwordValidation2.innerText = "Campo obrigatorio"
        passwordValidation2.style.color = "#E9554EBB"
        registrationPassword2.style.border = "2px solid #E9554EBB"
    }
    validRegistration(registrationEmail.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/), registrationPassword.value, registrationPassword2.value);
});

//Função para analisar se o registro (analisando o email e os campos de senha) é valido
function validRegistration(emailReg, passwordReg, passwordReg2) {

    if (emailReg && passwordReg == passwordReg2) {
        //True
        registerButton.style.backgroundColor = "#7898ff";
        registerButton.innerText = "Cadastrar";
        registerButton.removeAttribute("disabled");

        return true;

    } else {
        //False
        registerButton.style.backgroundColor = "#979797";
        registerButton.innerText = "Bloqueado";
        registerButton.removeAttribute("disabled", true);

        return false;

    }
}