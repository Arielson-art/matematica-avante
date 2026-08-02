// BOTÃO COMEÇAR AGORA

const botaoComecar = document.getElementById("comecarAgora");

if(botaoComecar){

    botaoComecar.addEventListener("click", function(){

        window.location.href = "materias.html";

    });

}



// BOTÃO MODO ESCURO

const botaoModo = document.getElementById("modoEscuro");

if(botaoModo){

    botaoModo.addEventListener("click", function(){

        document.body.classList.toggle("modo-escuro");

    });

}



// BOTÃO VOLTAR

const botaoVoltar = document.getElementById("voltarPagina");

if(botaoVoltar){

    botaoVoltar.addEventListener("click", function(){

        history.back();

    });

}



// SISTEMA DE NOME COM LOCALSTORAGE

const entradaNome = document.getElementById("entradaNome");
const botaoSalvarNome = document.getElementById("salvarNome");
const campoNome = document.getElementById("nomeUsuario");
const botaoComecarNome = document.getElementById("comecarAgora");



let nomeSalvo = localStorage.getItem("nomeUsuario");



if(nomeSalvo){

    if(entradaNome){

        entradaNome.style.display = "none";

    }

}



if(botaoComecarNome){

    botaoComecarNome.addEventListener("click", function(){

        if(nomeSalvo){

            window.location.href = "materias.html";

        }else{

            entradaNome.style.display = "block";

        }

    });

}



if(botaoSalvarNome){

    botaoSalvarNome.addEventListener("click", function(){

        let nome = campoNome.value;


        if(nome.trim() !== ""){

            localStorage.setItem("nomeUsuario", nome);

            window.location.href = "materias.html";

        }

    });

}



// EXERCÍCIOS

let pontos = 0;



function acertou(){

    pontos++;


    document.getElementById("pontuacao").innerHTML =
    "Pontuação: " + pontos + "/4";


    document.getElementById("resultado").innerHTML =
    "✅ Correto!";

}



function errou(){


    document.getElementById("resultado").innerHTML =
    "❌ Resposta errada.";

}



function proximaAula(){

    window.location.href = "operacoes.html";

}
