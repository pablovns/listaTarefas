// obter os elementos da página HTML
const frm = document.querySelector("form");
const divQuadro = document.getElementById("divQuadro");

frm.addEventListener("submit", (e) => {
    e.preventDefault(); // evita o envio do formulário vazio
    const tarefa = frm.inTarefa.value; // obtém o conteúdo digitado

    const h5 = document.createElement("h5");
    const texto = document.createTextNode(tarefa);
    h5.appendChild(texto); // define que o texto será filho de h5
    divQuadro.appendChild(h5); // define que h5 será filho da divQuadro

    frm.inTarefa.vlaue = "";
    frm.inTarefa.focus();
});

let j = 0; // tarefa selecionada
frm.btSelecionar.addEventListener("click", () => {
    const tarefas = document.querySelectorAll("h5");

    if (tarefas.length == 0) {
        alert("Não há tarefas para selecionar.");
        return;
    };

    // percorrer a lista de elementos h5 inseridos na página
    for (let i = 0; i < tarefas.length; i++) {
        const x = tarefas[i];

        console.log(i);

        x.setAttribute("class", "tarefaNormal")
    };

    tarefas[j].setAttribute("class", "tarefaSelecionada");
    if (j >= tarefas.length - 1) {
        j = 0;
    } else {
        j++;
    }
});
