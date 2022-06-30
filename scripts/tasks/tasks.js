let tokenJwt;

onload = function () {
    tokenJwt = sessionStorage.getItem("jwt");

    if (!tokenJwt) {
        this.alert("Para acessar essa pagina, é preciso estar logado")
        this.location.href = "index.html"
    } else {
        buscaDadosUsuario()
        buscaTarefasUsuario()
    }
}

async function buscaDadosUsuario() {

    let configRequest = {
        headers: {
            "Authorization": tokenJwt
        },
    }

    try {

        let resposta = await fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", configRequest);

        if (resposta.status == 200) {
            let respostaConvertida = await resposta.json();
            exibeNomeUsuario(respostaConvertida)

        } else {
            throw "Problema ao buscar o usuário na API";
        }
    } catch (erro) {
        console.log(erro);
    }
}

function exibeNomeUsuario(objetoUsuario) {
    let p = document.getElementById("nomeUsuario");
    p.innerText = `${objetoUsuario.firstName} ${objetoUsuario.lastName}`
}

async function buscaTarefasUsuario() {
    let configRequest = {
        headers: {
            "Authorization": tokenJwt
        },
    }

    try {

        let resposta = await fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", configRequest);

        let respostaConvertida = await resposta.json();
        console.log(respostaConvertida);

    } catch (erro) {
        console.log(erro);
    }
}

let inputTask = document.querySelector("#novaTarefa");
let taskButton = document.getElementById('taskButton');

let newTask = {
    nTask: ""
}

taskButton.addEventListener("click", function (evento) {
    evento.preventDefault();
    if (inputTask.value) {
        evento.preventDefault();

        inputTask = nomalizaTextoRetiraEspacos(inputTask.value);
        newTask.nTask = inputTask

        let registerTaskEmJson = JSON.stringify(newTask);
        console.log(registerTaskEmJson);
    }else{
        console.log("erro")
    }
})