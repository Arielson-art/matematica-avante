// ================================
// ATIVIDADES - NÍVEL 1
// ================================


// ================================
// QUESTÕES
// ================================

const questoesNivel1 = [

    {
        pergunta: "Quanto é 2 + 3?",
        alternativas: ["5", "4", "6", "7"],
        correta: 0
    },

    {
        pergunta: "Quanto é 7 - 4?",
        alternativas: ["2", "3", "4", "5"],
        correta: 1
    },

    {
        pergunta: "Quanto é 3 × 2?",
        alternativas: ["5", "6", "7", "8"],
        correta: 1
    },

    {
        pergunta: "Quanto é 8 ÷ 2?",
        alternativas: ["2", "3", "4", "5"],
        correta: 2
    },

    {
        pergunta: "Quanto é 5 + 6?",
        alternativas: ["10", "11", "12", "13"],
        correta: 1
    },

    {
        pergunta: "Quanto é 10 - 3?",
        alternativas: ["6", "7", "8", "9"],
        correta: 1
    },

    {
        pergunta: "Quanto é 4 × 3?",
        alternativas: ["10", "11", "12", "13"],
        correta: 2
    },

    {
        pergunta: "Quanto é 12 ÷ 3?",
        alternativas: ["3", "4", "5", "6"],
        correta: 1
    },

    {
        pergunta: "Quanto é 9 + 5?",
        alternativas: ["13", "14", "15", "16"],
        correta: 1
    },

    {
        pergunta: "Quanto é 15 - 7?",
        alternativas: ["6", "7", "8", "9"],
        correta: 2
    }

];


// ================================
// VARIÁVEIS
// ================================

const chaveProgressoNivel1 =
    "nivel1Progresso";


let questaoAtualNivel1 = 0;

let pontuacaoNivel1 = 0;

let respostasNivel1 = {};

let respondeuQuestaoNivel1 = false;


// ================================
// VERIFICAR SE O NÍVEL FOI CONCLUÍDO
// ================================

function nivel1FoiConcluido(){

    return Object.keys(respostasNivel1).length
        >= questoesNivel1.length;

}
// ================================
// SALVAR PROGRESSO
// ================================

function salvarProgressoNivel1(){

    const progresso = {

        questaoAtual: questaoAtualNivel1,

        pontuacao: pontuacaoNivel1,

        respostas: respostasNivel1

    };


    localStorage.setItem(

        chaveProgressoNivel1,

        JSON.stringify(progresso)

    );

}


// ================================
// CARREGAR PROGRESSO
// ================================

function carregarProgressoNivel1(){

    const progressoSalvo =
        localStorage.getItem(
            chaveProgressoNivel1
        );


    if(!progressoSalvo){

        return;

    }


    try{

        const progresso =
            JSON.parse(progressoSalvo);


        if(
            typeof progresso.questaoAtual === "number"
        ){

            questaoAtualNivel1 =
                progresso.questaoAtual;

        }


        if(
            typeof progresso.pontuacao === "number"
        ){

            pontuacaoNivel1 =
                progresso.pontuacao;

        }


        if(
            progresso.respostas &&
            typeof progresso.respostas === "object"
        ){

            respostasNivel1 =
                progresso.respostas;

        }


    }catch(erro){

        console.error(
            "Erro ao carregar progresso do Nível 1:",
            erro
        );

    }

}   
// ================================
// MOSTRAR QUESTÃO
// ================================

function mostrarQuestaoNivel1(){
if(nivel1FoiConcluido()){

    finalizarNivel1();

    return;

} 
    const questao =
        questoesNivel1[questaoAtualNivel1];


    if(!questao){

        return;

    }


    const enunciado =
        document.getElementById(
            "enunciadoQuestao"
        );


    const numero =
        document.getElementById(
            "numeroQuestao"
        );


    const questaoAtual =
        document.getElementById(
            "questaoAtual"
        );


    const totalQuestoes =
        document.getElementById(
            "totalQuestoes"
        );


    const alternativas =
        document.getElementById(
            "alternativasQuestao"
        );


    const resultado =
        document.getElementById(
            "resultadoQuestao"
        );


    const progresso =
        document.getElementById(
            "progressoQuestoes"
        );


    const pontuacao =
        document.getElementById(
            "pontuacaoNivel"
        );


    enunciado.textContent =
        questao.pergunta;


    numero.textContent =
        questaoAtualNivel1 + 1;


    questaoAtual.textContent =
        questaoAtualNivel1 + 1;


    totalQuestoes.textContent =
        questoesNivel1.length;


    alternativas.innerHTML = "";


    resultado.textContent = "";


    resultado.style.color = "";


    respondeuQuestaoNivel1 =
        Object.prototype.hasOwnProperty.call(
            respostasNivel1,
            questaoAtualNivel1
        );


    questao.alternativas.forEach(
        function(alternativa, indice){

            const botao =
                document.createElement("button");


            botao.type = "button";


            botao.textContent =
                alternativa;


            botao.addEventListener(
                "click",
                function(){

                    responderNivel(indice);

                }
            );


            alternativas.appendChild(botao);


        }
    );


    // ================================
    // RECUPERAR RESPOSTA SALVA
    // ================================

    if(respondeuQuestaoNivel1){

        const respostaSalva =
            respostasNivel1[
                questaoAtualNivel1
            ];


        const botoes =
            alternativas.querySelectorAll(
                "button"
            );


        botoes.forEach(
            function(botao){

                botao.disabled = true;

            }
        );


        if(
            respostaSalva.correta
        ){

            botoes[
                respostaSalva.indice
            ].style.background =
                "#22c55e";

            botoes[
                respostaSalva.indice
            ].style.borderColor =
                "#22c55e";

            botoes[
                respostaSalva.indice
            ].style.color =
                "white";


            resultado.textContent =
                "✅ Correto!";

            resultado.style.color =
                "#16a34a";


        }else{

            botoes[
                respostaSalva.indice
            ].style.background =
                "#ef4444";

            botoes[
                respostaSalva.indice
            ].style.borderColor =
                "#ef4444";

            botoes[
                respostaSalva.indice
            ].style.color =
                "white";


            botoes[
                questao.correta
            ].style.background =
                "#22c55e";

            botoes[
                questao.correta
            ].style.borderColor =
                "#22c55e";

            botoes[
                questao.correta
            ].style.color =
                "white";


            resultado.textContent =
                "❌ Resposta errada.";

            resultado.style.color =
                "#dc2626";

        }

    }


    // ================================
    // BARRA DE PROGRESSO
    // ================================

    const porcentagem =
        (
            (questaoAtualNivel1 + 1) /
            questoesNivel1.length
        ) * 100;


    progresso.style.width =
        porcentagem + "%";


    pontuacao.textContent =
        pontuacaoNivel1;


    // ================================
    // BOTÃO ANTERIOR
    // ================================

    const botaoAnterior =
        document.getElementById(
            "questaoAnterior"
        );


   if(botaoAnterior){

    if(questaoAtualNivel1 === 0){

        botaoAnterior.style.display = "none";

    }else{

        botaoAnterior.style.display = "flex";

    }

} 



// ================================
// RESPONDER QUESTÃO
// ================================

function responderNivel(indice){

    if(respondeuQuestaoNivel1){

        return;

    }


    const questao =
        questoesNivel1[
            questaoAtualNivel1
        ];


    const correta =
        indice === questao.correta;


    respondeuQuestaoNivel1 =
        true;


    // ================================
    // SALVAR RESPOSTA
    // ================================

    respostasNivel1[
        questaoAtualNivel1
    ] = {

        indice: indice,

        correta: correta

    };


    // ================================
    // ATUALIZAR PONTUAÇÃO
    // ================================

    if(correta){

        pontuacaoNivel1++;

    }


    salvarProgressoNivel1();


    // ================================
    // MOSTRAR RESULTADO
    // ================================

    const botoes =
        document.querySelectorAll(
            "#alternativasQuestao button"
        );


    const resultado =
        document.getElementById(
            "resultadoQuestao"
        );


    botoes.forEach(
        function(botao){

            botao.disabled = true;

        }
    );


    if(correta){

        botoes[indice].style.background =
            "#22c55e";

        botoes[indice].style.borderColor =
            "#22c55e";

        botoes[indice].style.color =
            "white";


        resultado.textContent =
            "✅ Correto!";

        resultado.style.color =
            "#16a34a";


    }else{

        botoes[indice].style.background =
            "#ef4444";

        botoes[indice].style.borderColor =
            "#ef4444";

        botoes[indice].style.color =
            "white";


        botoes[questao.correta].style.background =
            "#22c55e";

        botoes[questao.correta].style.borderColor =
            "#22c55e";

        botoes[questao.correta].style.color =
            "white";


        resultado.textContent =
            "❌ Resposta errada.";

        resultado.style.color =
            "#dc2626";

    }


    document.getElementById(
        "pontuacaoNivel"
    ).textContent =
        pontuacaoNivel1;

} 
// ================================
// QUESTÃO ANTERIOR
// ================================

const botaoAnterior =
    document.getElementById(
        "questaoAnterior"
    );


if(botaoAnterior){

    botaoAnterior.addEventListener(
        "click",
        function(){

            if(questaoAtualNivel1 === 0){

                return;

            }


            questaoAtualNivel1--;


            salvarProgressoNivel1();


            mostrarQuestaoNivel1();

        }
    );

}


// ================================
// PRÓXIMA QUESTÃO
// ================================

const botaoProxima =
    document.getElementById(
        "proximaQuestao"
    );


if(botaoProxima){

    botaoProxima.addEventListener(
        "click",
        function(){

            if(!respondeuQuestaoNivel1){

                const resultado =
                    document.getElementById(
                        "resultadoQuestao"
                    );


                resultado.textContent =
                    "⚠️ Responda a questão antes de continuar.";


                resultado.style.color =
                    "#d97706";


                return;

            }


            if(
                questaoAtualNivel1 <
                questoesNivel1.length - 1
            ){

                questaoAtualNivel1++;


                salvarProgressoNivel1();


                mostrarQuestaoNivel1();


                return;

            }


            finalizarNivel1();

        }
    );

}


// ================================
// FINALIZAR NÍVEL
// ================================

function finalizarNivel1(){

    const areaQuestoes =
        document.querySelector(
            ".area-questoes"
        );


    const porcentagem =
        (
            pontuacaoNivel1 /
            questoesNivel1.length
        ) * 100;


    let mensagem;


    if(porcentagem === 100){

        mensagem =
            "🏆 Perfeito! Você acertou todas as questões.";

    }else if(porcentagem >= 70){

        mensagem =
            "🎉 Muito bom! Você foi muito bem.";

    }else if(porcentagem >= 50){

        mensagem =
            "👍 Bom trabalho! Continue praticando.";

    }else{

        mensagem =
            "📚 Continue estudando e tente novamente.";

    }


    areaQuestoes.innerHTML = `

        <div class="resultado-final">

            <div class="resultado-final-icone">

                <i data-lucide="trophy"></i>

            </div>


            <h2>
                Nível 1 concluído!
            </h2>


            <p>
                ${mensagem}
            </p>


            <div class="resultado-final-pontos">

                <span>
                    Sua pontuação
                </span>


                <strong>
                    ${pontuacaoNivel1}/${questoesNivel1.length}
                </strong>

            </div>


            <button
                type="button"
                onclick="window.location.href='atividades.html'"
            >

                Voltar para atividades

                <i data-lucide="arrow-left"></i>

            </button>

        </div>

    `;


    if(window.lucide){

        lucide.createIcons();

    }

}


// ================================
// CARREGAR PROGRESSO
// ================================

carregarProgressoNivel1();


// ================================
// INICIAR PÁGINA
// ================================

mostrarQuestaoNivel1(); 
