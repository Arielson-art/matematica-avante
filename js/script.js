// ==========================
// MODO ESCURO
// ==========================

const botaoModo = document.getElementById("modoEscuro");

if (botaoModo) {

    botaoModo.addEventListener("click", function () {

        document.body.classList.toggle("modo-escuro");

    });

}


// ==========================
// BOTÃO VOLTAR
// ==========================

const botaoVoltar = document.getElementById("voltarPagina");

if (botaoVoltar) {

    botaoVoltar.addEventListener("click", function () {

        history.back();

    });

}


// ==========================
// COMEÇAR AGORA + NOME
// ==========================

const botaoComecar = document.getElementById("comecarAgora");
const entradaNome = document.getElementById("entradaNome");
const campoNome = document.getElementById("nomeUsuario");
const botaoSalvar = document.getElementById("salvarNome");

if (botaoComecar) {

    botaoComecar.addEventListener("click", function () {

        const nomeSalvo = localStorage.getItem("nomeUsuario");

        if (nomeSalvo) {

            window.location.href = "materias.html";

        } else {

            botaoComecar.style.display = "none";
            entradaNome.style.display = "block";

        }

    });

}


if (botaoSalvar) {

    botaoSalvar.addEventListener("click", function () {

        const nome = campoNome.value.trim();

        if (nome === "") {

            alert("Digite um nome.");

            return;

        }

        localStorage.setItem("nomeUsuario", nome);

        window.location.href = "materias.html";

    });

}


// ==========================
// EXERCÍCIOS
// ==========================

let pontos = 0;

function acertou() {

    pontos++;

    const pontuacao = document.getElementById("pontuacao");
    const resultado = document.getElementById("resultado");

    if (pontuacao) {

        pontuacao.innerHTML = "Pontuação: " + pontos + "/4";

    }

    if (resultado) {

        resultado.innerHTML = "✅ Correto!";

    }

}


function errou() {

    const resultado = document.getElementById("resultado");

    if (resultado) {

        resultado.innerHTML = "❌ Resposta errada.";

    }

}


function proximaAula() {

    alert("🚧 A próxima aula ainda está em desenvolvimento.");

}
