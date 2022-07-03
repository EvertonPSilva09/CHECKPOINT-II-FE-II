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
        exibeTarefasUsuario(respostaConvertida);

    } catch (erro) {
        console.log(erro);
    }
}


function exibeTarefasUsuario(objetoTarefa) {
    let capturaDivTarefas = document.getElementById("lista");
    for (i of objetoTarefa) {
        let data = new Date(i.createdAt)
        let dataConvertida = data.toLocaleDateString()
        let listaUsuario = `
        <li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${i.description}</p>
          <p class="timestamp">Criada em: ${dataConvertida}</p>
        </div>
      </li>`

        capturaDivTarefas.innerHTML += listaUsuario
    }
}

let inputTask = document.querySelector("#novaTarefa");
let taskButton = document.getElementById('taskButton');

let newTask = {
    description: "",
    completed: false
}

taskButton.addEventListener("click", function (evento) {
    evento.preventDefault();
    if (inputTask.value) {
        evento.preventDefault();
        RegistraTask();


    } else {
        console.log("erro");
    }
})

inputTask.addEventListener("keyup", () => {
    let validaTarefa = document.getElementById("validaTarefa");
    let taskButton = document.querySelector("#taskButton");

    if (inputTask.value.length > 5) {
        validaTarefa.innerText = ""
        taskButton.removeAttribute("disabled");

        return true

    } else {
        validaTarefa.innerText = "Caracteres insuficiente"
        validaTarefa.style.color = "#E9554EBB";

        return false
    }


})

async function RegistraTask() {

    newTask.description = nomalizaTextoRetiraEspacos(inputTask.value);
    let ConverteTaskEmJson = JSON.stringify(newTask);

    let configRequest = {
        method: "POST",
        headers: {
            "Authorization": tokenJwt,
            "Content-type": "Application/json"
        },
        body: ConverteTaskEmJson
    }

    try {
        let resposta = await fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", configRequest)
        if (resposta.status == 201) {
            alert("Tarefa adicionada com sucesso");
            document.location.reload(true);

        } else {
            throw resposta;
        }
    } catch (erro) {
        if (erro.status == 400 || erro.status == 401 || erro.status == 500) {
            alert("Tarefa não adicionada");
        }
    }


}








