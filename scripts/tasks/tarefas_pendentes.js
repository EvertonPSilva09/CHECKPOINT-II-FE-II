
let listaUL = document.querySelector(".tarefas-pendentes");


function renderizaTarefasPendentes(tarefaRecebida) {

    let li = document.createElement("li");
    

    li.innerHTML =
        `<div class="not-done" id="${tarefa.id}"></div>
            <div class="descricao">
                <p class="nome">${tarefa.description}</p>
                <p class="timestamp"><i class="far fa-calendar-alt"></i> ${tarefa.createdAt}</p>
            </div>`

    listaUL.appendChild(li);
}

/*`
        <li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${i.description}</p>
          <p class="timestamp">Criada em: ${dataConvertida}</p>
        </div>
      </li>`*/