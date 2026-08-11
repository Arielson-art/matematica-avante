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



        if(tipoSelecionado === ""){


            alert("Escolha se você é aluno ou professor.");


            return;


        }



        if(nome === ""){


            alert("Digite um nome.");


            return;


        }



        localStorage.setItem("nomeUsuario", nome);


        localStorage.setItem("tipoUsuario", tipoSelecionado);



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


    window.location.href="aprender-basico.html";


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
// ================================
// NOTIFICAÇÃO PREMIUM
// ================================

const niveisPremium =
document.querySelectorAll(".nivel-premium");

const notificacaoPremium =
document.getElementById("notificacaoPremium");

const fecharNotificacaoPremium =
document.getElementById("fecharNotificacaoPremium");


function abrirNotificacaoPremium(){

    if(!notificacaoPremium){

        return;

    }


    notificacaoPremium.hidden = false;


    atualizarIcones();

}


function fecharNotificacao(){

    if(!notificacaoPremium){

        return;

    }


    notificacaoPremium.hidden = true;

}


niveisPremium.forEach(function(nivel){

    nivel.addEventListener("click", function(event){

        event.preventDefault();

        abrirNotificacaoPremium();

    });

});


if(fecharNotificacaoPremium){

    fecharNotificacaoPremium.addEventListener(
        "click",
        function(){

            fecharNotificacao();

        }
    );

} 
// ================================
// SEQUÊNCIA DE ESTUDOS (STREAK)
// ================================

const CHAVE_STREAK = "diasEstudados";


// =====================================================
// OBTER DATA LOCAL NO FORMATO YYYY-MM-DD
// =====================================================

function obterDataHoje() {

    const data = new Date();

    const ano = data.getFullYear();

    const mes = String(
        data.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        data.getDate()
    ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;

}


// =====================================================
// CONVERTER DATA YYYY-MM-DD EM OBJETO DATE
// =====================================================

function converterData(dataString) {

    const partes =
        dataString.split("-");

    return new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );

}


// =====================================================
// OBTER DIAS DE ESTUDO
// =====================================================

function obterDiasEstudados() {

    const salvo =
        localStorage.getItem(
            CHAVE_STREAK
        );

    if (!salvo) {

        return [];

    }

    try {

        const dados =
            JSON.parse(salvo);

        if (!Array.isArray(dados)) {

            return [];

        }

        return [
            ...new Set(dados)
        ].sort();

    } catch (erro) {

        console.error(
            "Não foi possível carregar a sequência:",
            erro
        );

        return [];

    }

}


// =====================================================
// SALVAR DIAS DE ESTUDO
// =====================================================

function salvarDiasEstudados(
    dias
) {

    localStorage.setItem(
        CHAVE_STREAK,
        JSON.stringify(dias)
    );

}


// =====================================================
// REGISTRAR ESTUDO DO DIA
// =====================================================
//
// Responder uma ou várias questões no mesmo dia
// continua representando apenas um dia estudado.
// =====================================================

function registrarEstudoHoje() {

    const hoje =
        obterDataHoje();

    const dias =
        obterDiasEstudados();

    if (
        dias.includes(hoje)
    ) {

        return;

    }

    dias.push(hoje);

    dias.sort();

    salvarDiasEstudados(
        dias
    );

    atualizarSequenciaInicio();

}


// =====================================================
// CALCULAR SEQUÊNCIA ATUAL
// =====================================================

function calcularSequenciaAtual() {

    const dias =
        obterDiasEstudados();

    if (!dias.length) {

        return 0;

    }


    const hoje =
        converterData(
            obterDataHoje()
        );


    const ontem =
        new Date(hoje);

    ontem.setDate(
        ontem.getDate() - 1
    );


    const ultimoDia =
        converterData(
            dias[dias.length - 1]
        );


    // Se o último estudo não foi hoje nem ontem,
    // a sequência atual já foi quebrada.

    if (
        ultimoDia.getTime() <
        ontem.getTime()
    ) {

        return 0;

    }


    let sequencia = 1;

    let dataAtual =
        ultimoDia;


    for (
        let i = dias.length - 2;
        i >= 0;
        i--
    ) {

        const dataAnterior =
            converterData(
                dias[i]
            );


        const esperado =
            new Date(
                dataAtual
            );

        esperado.setDate(
            esperado.getDate() - 1
        );


        if (
            dataAnterior.getTime() !==
            esperado.getTime()
        ) {

            break;

        }


        sequencia++;

        dataAtual =
            dataAnterior;

    }


    // Caso o último dia estudado tenha sido ontem,
    // a sequência continua válida.
    //
    // Caso tenha sido hoje, também continua válida.

    return sequencia;

}


// =====================================================
// ATUALIZAR VISUAL DA SEQUÊNCIA
// =====================================================

function atualizarSequenciaInicio() {

    const diasSequencia =
        document.getElementById(
            "diasSequencia"
        );

    const numeroSequencia =
        document.getElementById(
            "numeroSequencia"
        );

    const textoSequencia =
        document.getElementById(
            "textoSequencia"
        );

    const areaSequencia =
        document.querySelector(
            ".sequencia"
        );

    if (
        !diasSequencia ||
        !areaSequencia
    ) {

        return;

    }


    const dias =
        calcularSequenciaAtual();


    const pontos =
        diasSequencia.querySelectorAll(
            ".dia-sequencia"
        );


    // =================================================
    // LIMPAR ESTADOS VISUAIS
    // =================================================

    areaSequencia.classList.remove(
        "streak-ativo",
        "streak-ciano"
    );


    pontos.forEach(
        function(ponto) {

            ponto.classList.remove(
                "ativo"
            );

        }
    );


    // =================================================
    // SE NÃO HOUVER SEQUÊNCIA
    // =================================================

    if (dias === 0) {

        diasSequencia.style.setProperty(
            "--progresso-sequencia",
            "0px"
        );


        if (numeroSequencia) {

            numeroSequencia.hidden =
                true;

            numeroSequencia.textContent =
                "";

        }


        if (textoSequencia) {

            textoSequencia.textContent =
                "0 dias seguidos";

        }


        return;

    }


    // =================================================
    // DEFINIR QUANTOS PONTOS FICAM ATIVOS
    // =================================================

    const quantidadeAtiva =
        Math.min(
            dias,
            7
        );


    for (
        let i = 0;
        i < quantidadeAtiva;
        i++
    ) {

        if (pontos[i]) {

            pontos[i].classList.add(
                "ativo"
            );

        }

    }


    // =================================================
    // COR DA SEQUÊNCIA
    // =================================================

    if (dias >= 8) {

        areaSequencia.classList.add(
            "streak-ciano"
        );

    } else {

        areaSequencia.classList.add(
            "streak-ativo"
        );

    }


    // =================================================
    // CALCULAR COMPRIMENTO DA BARRA
    // =================================================

    if (
        pontos.length >= 2 &&
        quantidadeAtiva >= 2
    ) {

        const primeiro =
            pontos[0]
                .getBoundingClientRect();

        const ultimo =
            pontos[
                quantidadeAtiva - 1
            ]
                .getBoundingClientRect();


        const distancia =
            ultimo.left +
            (
                ultimo.width / 2
            ) -
            (
                primeiro.left +
                (
                    primeiro.width / 2
                )
            );


        diasSequencia.style.setProperty(
            "--progresso-sequencia",
            Math.max(
                0,
                distancia
            ) + "px"
        );

    } else {

        diasSequencia.style.setProperty(
            "--progresso-sequencia",
            "0px"
        );

    }


    // =================================================
    // TEXTO
    // =================================================

    if (textoSequencia) {

        textoSequencia.textContent =
            dias === 1
                ? "1 dia seguido"
                : `${dias} dias seguidos`;

    }


    // =================================================
    // NÚMERO A PARTIR DO 8º DIA
    // =================================================

    if (numeroSequencia) {

        if (dias >= 8) {

            numeroSequencia.hidden =
                false;

            numeroSequencia.textContent =
                dias;

        } else {

            numeroSequencia.hidden =
                true;

            numeroSequencia.textContent =
                "";

        }

    }

}


// =====================================================
// ATUALIZAR SEQUÊNCIA AO REDIMENSIONAR
// =====================================================

window.addEventListener(
    "resize",
    function() {

        atualizarSequenciaInicio();

    }
);


// =====================================================
// ATUALIZAR SEQUÊNCIA AO CARREGAR A PÁGINA
// =====================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        atualizarSequenciaInicio
    );

} else {

    atualizarSequenciaInicio();

}  
