//..........................Bloqueio de acesso a pagina de Tarefas sem estar logado................................... 

let tokenJwt;

onload = function () {
    tokenJwt = sessionStorage.getItem("jwt");

    if (!tokenJwt) {
        this.alert("Para acessar essa pagina, é preciso estar logado")
        this.location.href = "index.html"
    } else {
        buscaDadosUsuario()
        buscaTarefasUsuario()
        renderizarSkeletons(3, ".tarefas-pendentes");
    }
}
//..........................Ação de buscar o usuário na API para confirmar o login....................................
async function buscaDadosUsuario() {

    let configRequest = {
        headers: {
            "Authorization": tokenJwt
        },
    }

    try {

        let resposta = await fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe", configRequest);

        if (resposta.status == 200) {
            let respostaConvertida = await resposta.json();
            exibeNomeUsuario(respostaConvertida)
            removerSkeleton(".tarefas-pendentes")
        } else {
            throw "Problema ao buscar o usuário na API";
        }
    } catch (erro) {
        console.log(erro);
    }
}
//.........................Exibir o nome do Usuario................................................
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

        let resposta = await fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks", configRequest);

        let respostaConvertida = await resposta.json();
        exibeTarefasUsuario(respostaConvertida);

        console.log(respostaConvertida);

    } catch (erro) {
        console.log(erro);
    }
}

//..............................Ação do botão de adicionar tarefa..........................................

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
//.................................Ação de registro da tarefa na API..................................
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
        let resposta = await fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks", configRequest)
        if (resposta.status == 201) {
            alert("Tarefa adicionada com sucesso!");
            document.location.reload(true);

        } else {
            throw resposta;
        }
    } catch (erro) {
        if (erro.status == 400 || erro.status == 401 || erro.status == 500) {
            alert("Tarefa não adicionada!");
        }
    }


}

//.......................Exibe a tarefa do usuario.....................................................//
function exibeTarefasUsuario(objetoTarefa) {
    let capturaDivTarefas = document.getElementById("lista");
    let capturaDivTarefasTerminadas = document.querySelector(".tarefas-terminadas");


    for (i of objetoTarefa) {

        let status = i.completed
        let descricaoTarefa = i.description

        //console.log(descricaoTarefa);

        if (status == true) {
            //
            let listaUsuario = `
            <li class="tarefa">
                <div class="done"></div>
                <div class="descricao">
                    <p id="editTask-${i.id}" class="nome">${descricaoTarefa}</p>
                    <div>
                        <button onclick="statusTask(${i.id})"><i id="${i.id}" class="fas fa-undo-alt change"></i></button>
                        <button class="delete-${i.d}" onclick="deleteTarefa(${i.id})"><i id="${i.id}" class="far fa-trash-alt"></i></button>
                        <button onclick="editTask(${i.id})"><i id="${i.id}" class="fas fa-edit"></i></button>

                    </div>
              </div>
          </li>`

            capturaDivTarefasTerminadas.innerHTML += listaUsuario

        } else {
            let data = new Date(i.createdAt)
            let dataConvertida = data.toLocaleDateString()
            let listaUsuario = `
            <li class="tarefa">
                <div class="not-done" onclick="alterarStatus(${i.id})"></div>
                <div class="descricao">
                    <p id="descricaoTarefa-${i.id}" class="nome">${descricaoTarefa}</p>
                    <p class="timestamp">Criada em: ${dataConvertida}</p>
                    <button onclick="editTask(${i.id})"><i id="${i.id}" class="fas fa-edit"></i></button>
                </div>
          </li>`

            capturaDivTarefas.innerHTML += listaUsuario

        }
    }
}
//................................Alteração do status de tarefas pendentes na API ...................................................
async function alterarStatus(tarefaId) {
    //1 pega o pendente e joga para o completo
    //let capturaDescricaoTarefa = document.getElementById(`descricaoTarefa-${tarefaId}`);
    //console.log(capturaDescricaoTarefa.innerText);

    console.log(tarefaId);

    let updateTarefa = {
        //description:capturaDescricaoTarefa.innerText,
        completed: true
    }

    console.log(updateTarefa);


    let converteStatusEmJson = JSON.stringify(updateTarefa);


    let configRequest = {
        method: "PUT",
        headers: {
            "Authorization": tokenJwt,
            "Content-type": "Application/json"
        },
        body: converteStatusEmJson
    }

    try {
        let resposta = await fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${tarefaId}`, configRequest);

        if (resposta.status == 200) {
            alert("Status alterado com Sucesso! Pendente");
            document.location.reload();
        } else {
            throw resposta;
        }

    } catch (erro) {
        if (erro.status == 400 || erro.status == 401 || erro.status == 404 || erro.status == 500) {
            alert("Status não alterado!");
            document.location.reload();
        }
    }

}
//...........................Edição do status da tarefa completa na API..........................................................
async function statusTask(tarefaId2) {
    //2 pega o completo e joga para o predente
    //let editeDescriptionTarefa = document.getElementById(`editTask-${tarefaId2}`)
    //console.log(editeDescriptionTarefa.innerText);

    console.log(tarefaId2);


    let updateTarefa = {
        //description: editeDescriptionTarefa.innerText,
        completed: false
    }

    console.log(updateTarefa);


    let converteStatusEmJson = JSON.stringify(updateTarefa);


    let configRequest = {
        method: "PUT",
        headers: {
            "Authorization": tokenJwt,
            "Content-type": "Application/json"
        },
        body: converteStatusEmJson
    }

    try {
        let resposta = await fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${tarefaId2}`, configRequest);

        if (resposta.status == 200) {
            alert("Status alterado com Sucesso!")
            document.location.reload();
        } else {
            throw resposta;
        };
        //let respostaConvertida = await resposta.json();
        //exibeTarefasUsuario(respostaConvertida);

    } catch (erro) {
        if (erro.status == 400 || erro.status == 401 || erro.status == 404 || erro.status == 500) {
            alert("Status não alterado!");
            document.location.reload();
        }
    }

}

//..............................Alterar descrição da Tarefa.......................................
async function editTask(tarefaId, statusTarefas) {

    let editDescricaoTarefa = prompt("Edite a descrição da sua tarefa.")
    if (editDescricaoTarefa != null) {
        document.getElementById(`editTask-${tarefaId}`)//.innerHTML
    }
    console.log(editDescricaoTarefa);

    console.log(tarefaId);


    let updateTarefa = {
        description: editDescricaoTarefa,
        completed: statusTarefas
    }

    console.log(updateTarefa);


    let converteStatusEmJson = JSON.stringify(updateTarefa);


    let configRequest = {
        method: "PUT",
        headers: {
            "Authorization": tokenJwt,
            "Content-type": "Application/json"
        },
        body: converteStatusEmJson
    }

    try {
        let resposta = await fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${tarefaId}`, configRequest);

        if (resposta.status == 200) {
            alert("Descrição alterada com sucesso!")
            document.location.reload();
        } else {
            throw resposta;
        };
        //let respostaConvertida = await resposta.json();
        //exibeTarefasUsuario(respostaConvertida);

    } catch (erro) {
        if (erro.status == 400 || erro.status == 401 || erro.status == 404 || erro.status == 500) {
            alert("Descrição não alterada!");
            document.location.reload();
        }
    }

}


// .............................Deletar tarefa...................................................
async function deleteTarefa(tarefaId4) {
    //4 deleta a tarefa
    let delDescriptionTarefa = document.getElementsByClassName(`delete-${tarefaId4}`)
    console.log(delDescriptionTarefa.innerText);

    console.log(tarefaId4);


    let configRequest = {
        method: "DELETE",
        headers: {
            "Content-type": 'Application/Json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": `${tokenJwt}`
        }
    };

    try {
        let resposta = await fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${tarefaId4}`, configRequest);

        if (resposta.status == 200) {
            alert("Tarefa deletada com Sucesso!")
            document.location.reload();
        } else {
            throw resposta;
        };
        //let respostaConvertida = await resposta.json();
        //exibeTarefasUsuario(respostaConvertida);

    } catch (erro) {
        if (erro.status == 400 || erro.status == 401 || erro.status == 404 || erro.status == 500) {
            alert("Tarefa não deletada!");
            document.location.reload();
        }
    }

}



//.............................Ação de Logout.....................................................
let logout = document.getElementById('closeApp')
logout.addEventListener('click', () => {
    localStorage.removeItem('jwt')
    alert('Sessão finalizada com sucesso!')
    setTimeout(() => {
        window.location.href = 'index.html'
    })

})