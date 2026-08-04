// ================================
// ÍCONES LUCIDE
// ================================

function atualizarIcones(){

    if(window.lucide){

        lucide.createIcons();

    }

}




// ================================
// MODO ESCURO COM LOCALSTORAGE
// ================================

const botaoModo = document.getElementById("modoEscuro");



const temaSalvo = localStorage.getItem("tema");



if(temaSalvo === "escuro"){

    document.body.classList.add("modo-escuro");

}




if(botaoModo){

    botaoModo.addEventListener("click", function(){


        document.body.classList.toggle("modo-escuro");



        if(document.body.classList.contains("modo-escuro")){


            localStorage.setItem("tema","escuro");


        }else{


            localStorage.setItem("tema","claro");


        }



    });

}





// ================================
// BOTÃO VOLTAR
// ================================

const botaoVoltar = document.getElementById("voltarPagina");



if(botaoVoltar){


    botaoVoltar.addEventListener("click", function(){


        history.back();


    });


}       // ================================
// MENU LATERAL
// ================================


const botaoMenu = document.getElementById("botaoMenu");

const menuLateral = document.getElementById("menuLateral");

const fundoMenu = document.getElementById("fundoMenu");




function abrirMenu(){


    if(menuLateral && fundoMenu){


        menuLateral.classList.add("aberto");

        fundoMenu.classList.add("ativo");


    }


}



function fecharMenu(){


    if(menuLateral && fundoMenu){


        menuLateral.classList.remove("aberto");

        fundoMenu.classList.remove("ativo");


    }


}





if(botaoMenu){


    botaoMenu.addEventListener("click", function(){



        if(menuLateral.classList.contains("aberto")){


            fecharMenu();



        }else{


            abrirMenu();



        }



    });


}





if(fundoMenu){


    fundoMenu.addEventListener("click", function(){


        fecharMenu();


    });


}




// ================================
// TELA INICIAL + NOME
// ================================


const botaoComecar = document.getElementById("comecarAgora");

const entradaNome = document.getElementById("entradaNome");

const campoNome = document.getElementById("nomeUsuario");

const botaoSalvar = document.getElementById("salvarNome");





if(botaoComecar){


    botaoComecar.addEventListener("click", function(){


        const nomeSalvo = localStorage.getItem("nomeUsuario");



        if(nomeSalvo){


            window.location.href="inicio.html";


        }else{


            botaoComecar.style.display="none";

            entradaNome.style.display="block";


        }


    });


}





if(botaoSalvar){


    botaoSalvar.addEventListener("click", function(){


        const nome = campoNome.value.trim();



        if(nome === ""){


            alert("Digite um nome.");


            return;


        }



        localStorage.setItem("nomeUsuario", nome);



        window.location.href="inicio.html";



    });


} 
// ================================
// SISTEMA DE QUESTÕES
// ================================


let pontos = 0;


let questoesRespondidas = [];





function responderQuestao(numero, correta, botao){



    if(questoesRespondidas.includes(numero)){


        return;


    }





    questoesRespondidas.push(numero);





    const botoes = document.querySelectorAll(
        'button[onclick*="responderQuestao(' + numero + '"]'
    );





    botoes.forEach(function(item){


        item.disabled = true;


        item.classList.add("resposta-bloqueada");



    });





    if(correta){


        pontos++;


        botao.classList.add("resposta-correta");


        mostrarResultado("✅ Correto!");



    }else{


        botao.classList.add("resposta-errada");


        mostrarResultado("❌ Resposta errada.");



    }





    atualizarPontuacao();



}






function atualizarPontuacao(){



    const pontuacao = document.getElementById("pontuacao");



    if(pontuacao){



        if(pontos > 4){


            pontos = 4;


        }




        pontuacao.innerHTML =
        "Pontuação: " + pontos + "/4";



    }



}




function mostrarResultado(texto){



    const resultado =
    document.getElementById("resultado");



    if(resultado){


        resultado.innerHTML = texto;


    }



}      // ================================
// PRÓXIMA AULA
// ================================


function proximaAula(){


    window.location.href="atividades-basico.html";


}




// ================================
// ATUALIZAR ÍCONES AO CARREGAR
// ================================


atualizarIcones();
const botaoAluno = document.getElementById("botaoAluno");
const botaoProfessor = document.getElementById("botaoProfessor");

let tipoSelecionado = "";

if(botaoAluno && botaoProfessor){

    botaoAluno.addEventListener("click", function(){

        tipoSelecionado = "aluno";

        botaoAluno.classList.add("selecionado");
        botaoProfessor.classList.remove("selecionado");

    });


    botaoProfessor.addEventListener("click", function(){

        tipoSelecionado = "professor";

        botaoProfessor.classList.add("selecionado");
        botaoAluno.classList.remove("selecionado");

    });

}  
