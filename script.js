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

let j = -1; // tarefa selecionada
frm.btSelecionar.addEventListener("click", () => {
    if (j == -1) {
        j = 0;
    }

    const tarefas = document.querySelectorAll("h5");

    if (tarefas.length == 0) {
        alert("Não há tarefas para selecionar.");
        return;
    }

    // percorrer a lista de elementos h5 inseridos na página
    for (let i = 0; i < tarefas.length; i++) {
        const x = tarefas[i];
        x.setAttribute("class", "tarefaNormal");
    }

    tarefas[j].setAttribute("class", "tarefaSelecionada");
    if (j >= tarefas.length - 1) {
        j = 0;
    } else {
        j++;
    }
});

frm.btRetirar.addEventListener("click", () => {
    const tarefas = document.querySelectorAll("h5");

    if (tarefas.length == 0 || j == -1) {
        alert("A lista de tarefas está vazia.");
        return;
    }

    // remover a tarefa selecionada
    tarefas.forEach((element) => {
        if (element.getAttribute("class") == "tarefaSelecionada") {
            if (confirm(`Confirma a exclusão de "${element.innerText}?"`)) {
                divQuadro.removeChild(element);
            }
        }
    });

    // resetar o contador da tarefa selecionada
    tarefas.forEach(element => {
        element.setAttribute("class", "tarefaNormal");
    });

    // selecionar a primeira
    tarefas[0].setAttribute("class", "tarefaSelecionada");
});

frm.btGravar.addEventListener("click", () => {
    const fs = require("fs");

    const file = fs.createWriteStream("./tarefas.txt");

    file.on("error", (err) => {
        alert("Ocorreu um erro ao gravar a lista, tente novamente.");
    });

    tarefas.forEach((v) => {
        file.write(`${v} \n`);
    });

    file.end();
});
