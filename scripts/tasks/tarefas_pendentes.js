/*let listaUL = document.querySelector(".tarefas-pendentes");
console.log(listaUL);


listaUL.onclick = function(){
  console.log(listaUL);

}


function renderizaTarefasPendentes(tarefaRecebida) {
  
    let li = document.createElement("li");

    li.innerHTML =
        `<div class="not-done" onclick ="alterarStatus(${tarefa.id})"></div>
              <div class="descricao">
                <p class="nome">${tarefa.description}</p>
                <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dataConvertida}</p>
              </div>`

listaUL.appendChild(li);

}


`
        <li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${i.description}</p>
          <p class="timestamp">Criada em: ${dataConvertida}</p>
        </div>
      </li>`

    

      
async function alterarStatus(tarefaRecebida){

  console.log(tarefaRecebida);

          /*let configRequest = {
            method: "PUT",
            headers: {
                "Content-type": "Application/json"
            },
            body: alterarEmJson
            
          }
      }*/