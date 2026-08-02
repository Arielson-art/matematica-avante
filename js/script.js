// COMEÇAR AGORA

const botaoComecar = document.getElementById("comecarAgora");
const entradaNome = document.getElementById("entradaNome");
const salvarNome = document.getElementById("salvarNome");
const nomeUsuario = document.getElementById("nomeUsuario");


let nomeSalvo = localStorage.getItem("nomeUsuario");


if(nomeSalvo && botaoComecar){

    botaoComecar.innerHTML = "Continuar como " + nomeSalvo;

}



if(botaoComecar){

botaoComecar.addEventListener("click", function(){


    if(localStorage.getItem("nomeUsuario")){

        window.location.href = "materias.html";

    }else{

        entradaNome.style.display = "block";

        botaoComecar.style.display = "none";

    }


});

}



if(salvarNome){

salvarNome.addEventListener("click", function(){


    let nome = nomeUsuario.value;


    if(nome.trim() !== ""){

        localStorage.setItem("nomeUsuario", nome);

        window.location.href = "materias.html";

    }


});

}



// MODO ESCURO


const botaoModo = document.getElementById("modoEscuro");



if(localStorage.getItem("modoEscuro") === "ativado"){

    document.body.classList.add("modo-escuro");

}



if(botaoModo){

botaoModo.addEventListener("click", function(){


    document.body.classList.toggle("modo-escuro");



    if(document.body.classList.contains("modo-escuro")){

        localStorage.setItem("modoEscuro","ativado");

    }else{

        localStorage.setItem("modoEscuro","desativado");

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

// BOTÃO VOLTAR

const botaoVoltar = document.getElementById("voltarPagina");


if(botaoVoltar){

    botaoVoltar.addEventListener("click", function(){

        history.back();

    });

}
