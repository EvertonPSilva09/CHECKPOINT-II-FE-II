//.......................Alterar a Tarefa.....................................................//
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
                    <p class="nome">${descricaoTarefa}</p>
                    <div>
                        <button onclick="alterarStatus(${i.id}, ${false}><i id="${i.id}" class="fas fa-undo-alt change"></i></button>
                        <button><i id="${i.id}" class="far fa-trash-alt"></i></button>
                    </div>
              </div>
          </li>`

            capturaDivTarefasTerminadas.innerHTML += listaUsuario

        } else {
            let data = new Date(i.createdAt)
            let dataConvertida = data.toLocaleDateString()
            let listaUsuario = `
            <li class="tarefa">
                <div class="not-done" onclick="alterarStatus(${i.id}, ${true})"></div>
                <div class="descricao">
                    <p id="descricaoTarefa-${i.id}" class="nome">${descricaoTarefa}</p>
                    <p class="timestamp">Criada em: ${dataConvertida}</p>
                </div>
          </li>`

            capturaDivTarefas.innerHTML += listaUsuario

        }
    }
}
//Alteração do status da tarefa junto API
async function alterarStatus(tarefaId, statusTarefas){

    let capturaDescricaoTarefa = document.getElementById(`descricaoTarefa-${tarefaId}`);
    console.log(capturaDescricaoTarefa.innerText);


    console.log(tarefaId);

    let updateTarefa = {
        description:capturaDescricaoTarefa.innerText,
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
        let resposta = await fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${i.id}`, configRequest);

        if (resposta.status == 200) {
            alert("Tarefas Alterada");
            document.location.reload();
        } else {
            throw resposta;
        }
        //let respostaConvertida = await resposta.json();
        //exibeTarefasUsuario(respostaConvertida);

    } catch (erro) {
        if (erro.status == 400 || erro.status == 401 || erro.status == 404 || erro.status == 500) {
            alert("Tarefa não adicionada");
            document.location.reload();
        }
    }

}

