// =====================================================
// MATEMÁTICA AVANTE
// SISTEMA DE NÍVEIS E FASES
// =====================================================


// =====================================================
// CONFIGURAÇÃO
// =====================================================

const TOTAL_FASES = 10;
const TOTAL_QUESTOES = 10;

const CHAVE_PROGRESSO = "progressoNiveis";


// =====================================================
// CONFIGURAÇÃO DAS FASES DO NÍVEL 1
// =====================================================

const fasesNivel1 = {

    1: {
        nome: "Básico da Matemática",
        descricao: "As quatro operações fundamentais.",
        dificuldade: "Fácil"
    },

    2: {
        nome: "Geometria",
        descricao: "Formas, medidas e conceitos geométricos.",
        dificuldade: "Fácil"
    },

    3: {
        nome: "Funções",
        descricao: "Introdução ao conceito de funções.",
        dificuldade: "Fácil"
    },

    4: {
        nome: "Álgebra",
        descricao: "Expressões e cálculos algébricos básicos.",
        dificuldade: "Fácil"
    },

    5: {
        nome: "Básico da Matemática",
        descricao: "Praticando novamente as quatro operações.",
        dificuldade: "Médio"
    },

    6: {
        nome: "Geometria",
        descricao: "Novos exercícios de geometria.",
        dificuldade: "Médio"
    },

    7: {
        nome: "Funções",
        descricao: "Exercícios de funções em nível médio.",
        dificuldade: "Médio"
    },

    8: {
        nome: "Álgebra",
        descricao: "Exercícios de álgebra em nível médio.",
        dificuldade: "Médio"
    },

    9: {
        nome: "Revisão mista",
        descricao: "Questões envolvendo diferentes conteúdos.",
        dificuldade: "Média"
    },

    10: {
        nome: "Desafio final",
        descricao: "Questões mistas para concluir o nível.",
        dificuldade: "Média"
    }

};


// =====================================================
// BANCO DE QUESTÕES
// =====================================================
//
// Por enquanto deixamos a estrutura pronta.
// As questões serão adicionadas depois.
//
// Cada questão terá:
//
// {
//     pergunta: "...",
//     alternativas: [
//         { texto: "...", correta: false },
//         { texto: "...", correta: true },
//         { texto: "...", correta: false },
//         { texto: "...", correta: false }
//     ],
//     explicacao: "..."
// }
//
// A ordem das alternativas será embaralhada pelo sistema.
// =====================================================

const questoesNivel1 = {

    1: [],

    2: [],

    3: [],

    4: [],

    5: [],

    6: [],

    7: [],

    8: [],

    9: [],

    10: []

};


// =====================================================
// ESTADO ATUAL
// =====================================================

let nivelAtual = 1;

let faseAtual = 1;

let questaoAtual = 1;

let respostas = {};

let inicioFase = null;

let faseFinalizada = false;


// =====================================================
// LOCALSTORAGE
// =====================================================

function carregarProgresso() {

    const salvo = localStorage.getItem(CHAVE_PROGRESSO);

    if (!salvo) {

        return {
            niveis: {}
        };

    }

    try {

        return JSON.parse(salvo);

    } catch (erro) {

        console.error(
            "Não foi possível carregar o progresso:",
            erro
        );

        return {
            niveis: {}
        };

    }

}


function salvarProgresso(dados) {

    localStorage.setItem(
        CHAVE_PROGRESSO,
        JSON.stringify(dados)
    );

}


function obterDadosNivel(numeroNivel) {

    const progresso = carregarProgresso();

    if (!progresso.niveis[numeroNivel]) {

        progresso.niveis[numeroNivel] = {
            fases: {}
        };

        salvarProgresso(progresso);

    }

    return progresso.niveis[numeroNivel];

}


function obterDadosFase(numeroNivel, numeroFase) {

    const dadosNivel = obterDadosNivel(numeroNivel);

    if (!dadosNivel.fases[numeroFase]) {

        dadosNivel.fases[numeroFase] = {

            concluida: false,

            melhorResultado: 0,

            questaoAtual: 1,

            respostas: {},

            acertos: 0,

            erros: 0,

            tempo: 0

        };

        const progresso = carregarProgresso();

        progresso.niveis[numeroNivel] = dadosNivel;

        salvarProgresso(progresso);

    }

    return dadosNivel.fases[numeroFase];

}


// =====================================================
// VERIFICAR SE A FASE ESTÁ DESBLOQUEADA
// =====================================================

function faseEstaDesbloqueada(numeroFase) {

    if (numeroFase === 1) {

        return true;

    }

    const faseAnterior =
        obterDadosFase(
            nivelAtual,
            numeroFase - 1
        );

    return faseAnterior.concluida;

}


// =====================================================
// VERIFICAR SE A FASE ESTÁ CONCLUÍDA
// =====================================================

function faseFoiConcluida(numeroFase) {

    const dados =
        obterDadosFase(
            nivelAtual,
            numeroFase
        );

    return dados.concluida;

}


// =====================================================
// OBTER QUESTÕES DA FASE
// =====================================================

function obterQuestoesDaFase(numeroFase) {

    return questoesNivel1[numeroFase] || [];

}


// =====================================================
// EMBARALHAR ALTERNATIVAS
// =====================================================
//
// Isso garante que a resposta correta não fique sempre
// no mesmo botão.
// =====================================================

function embaralhar(array) {

    const copia = [...array];

    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            copia[i],
            copia[j]
        ] = [
            copia[j],
            copia[i]
        ];

    }

    return copia;

}


// =====================================================
// ATUALIZAR INFORMAÇÕES DA FASE
// =====================================================

function atualizarInformacoesFase() {

    const dadosFase =
        fasesNivel1[faseAtual];

    const nome =
        document.getElementById("nomeFase");

    const descricao =
        document.getElementById("descricaoFase");

    if (nome) {

        nome.textContent =
            dadosFase.nome;

    }

    if (descricao) {

        descricao.textContent =
            dadosFase.descricao;

    }

}


// =====================================================
// ATUALIZAR PROGRESSO VISUAL
// =====================================================

function atualizarProgressoVisual() {

    const texto =
        document.getElementById(
            "progressoQuestao"
        );

    const barra =
        document.getElementById(
            "barraProgresso"
        );

    if (!texto || !barra) {

        return;

    }

    texto.textContent =
        questaoAtual +
        "/" +
        TOTAL_QUESTOES;


    const porcentagem =
        (
            questaoAtual /
            TOTAL_QUESTOES
        ) * 100;


    barra.style.width =
        porcentagem + "%";

}


// =====================================================
// ATUALIZAR NÚMERO DA QUESTÃO
// =====================================================

function atualizarNumeroQuestao() {

    const numero =
        document.getElementById(
            "numeroQuestao"
        );

    if (numero) {

        numero.textContent =
            questaoAtual;

    }

}


// =====================================================
// MOSTRAR QUESTÃO
// =====================================================

function mostrarQuestao() {

    const questoes =
        obterQuestoesDaFase(
            faseAtual
        );


    const textoQuestao =
        document.getElementById(
            "textoQuestao"
        );

    const alternativas =
        document.getElementById(
            "alternativas"
        );


    if (!textoQuestao || !alternativas) {

        return;

    }


    atualizarNumeroQuestao();

    atualizarProgressoVisual();


    const questao =
        questoes[questaoAtual - 1];


    // Caso as questões ainda não tenham
    // sido cadastradas.

    if (!questao) {

        textoQuestao.textContent =
            "As questões desta fase serão adicionadas em breve.";

        alternativas.innerHTML = "";

        atualizarBotoesNavegacao();

        return;

    }


    textoQuestao.textContent =
        questao.pergunta;


    alternativas.innerHTML = "";


    const alternativasEmbaralhadas =
        embaralhar(
            questao.alternativas
        );


    alternativasEmbaralhadas.forEach(
        function(alternativa) {

            const botao =
                document.createElement(
                    "button"
                );

            botao.type = "button";

            botao.textContent =
                alternativa.texto;


            botao.addEventListener(
                "click",
                function() {

                    responderAlternativa(
                        alternativa,
                        botao
                    );

                }
            );


            alternativas.appendChild(
                botao
            );

        }
    );


    atualizarBotoesNavegacao();

}


// =====================================================
// RESPONDER ALTERNATIVA
// =====================================================

function responderAlternativa(
    alternativa,
    botao
) {

    if (
        respostas[questaoAtual] !== undefined
    ) {

        return;

    }


    respostas[questaoAtual] =
        alternativa.correta;


    botao.disabled = true;


    const botoes =
        document.querySelectorAll(
            "#alternativas button"
        );


    botoes.forEach(
        function(item) {

            item.disabled = true;

        }
    );


    if (alternativa.correta) {

        botao.classList.add(
            "resposta-correta"
        );

    } else {

        botao.classList.add(
            "resposta-errada"
        );


        mostrarExplicacao(
            alternativa
        );

    }


    salvarEstadoAtual();

    atualizarBotoesNavegacao();

}


// =====================================================
// EXPLICAÇÃO DA QUESTÃO
// =====================================================

function mostrarExplicacao(
    alternativa
) {

    const area =
        document.getElementById(
            "explicacaoErro"
        );


    if (!area) {

        return;

    }


    const questoes =
        obterQuestoesDaFase(
            faseAtual
        );


    const questao =
        questoes[questaoAtual - 1];


    if (
        questao &&
        questao.explicacao
    ) {

        area.textContent =
            questao.explicacao;

        area.hidden = false;

    }

}


// =====================================================
// NAVEGAÇÃO
// =====================================================

function atualizarBotoesNavegacao() {

    const anterior =
        document.getElementById(
            "questaoAnterior"
        );

    const proxima =
        document.getElementById(
            "proximaQuestao"
        );


    if (!anterior || !proxima) {

        return;

    }


    // Questão 1 não possui botão anterior.

    anterior.hidden =
        questaoAtual === 1;


    // Só permite avançar depois de responder.

    proxima.disabled =
        respostas[questaoAtual] === undefined;


    // Questão 10 vira FINALIZAR.

    const texto =
        proxima.querySelector("span");


    if (questaoAtual === TOTAL_QUESTOES) {

        if (texto) {

            texto.textContent =
                "Finalizar";

        }

        const icone =
            proxima.querySelector("svg");

        if (icone) {

            icone.setAttribute(
                "data-lucide",
                "check"
            );

        }

    } else {

        if (texto) {

            texto.textContent =
                "Próxima questão";

        }

    }


    atualizarIcones();

}


// =====================================================
// QUESTÃO ANTERIOR
// =====================================================

function voltarQuestao() {

    if (questaoAtual <= 1) {

        return;

    }


    questaoAtual--;

    salvarEstadoAtual();

    mostrarQuestao();

}


// =====================================================
// PRÓXIMA QUESTÃO
// =====================================================

function avancarQuestao() {

    if (
        respostas[questaoAtual] === undefined
    ) {

        return;

    }


    if (
        questaoAtual === TOTAL_QUESTOES
    ) {

        finalizarFase();

        return;

    }


    questaoAtual++;

    salvarEstadoAtual();

    mostrarQuestao();

}


// =====================================================
// SALVAR ESTADO ATUAL
// =====================================================

function salvarEstadoAtual() {

    const progresso =
        carregarProgresso();


    if (
        !progresso.niveis[nivelAtual]
    ) {

        progresso.niveis[nivelAtual] = {
            fases: {}
        };

    }


    if (
        !progresso.niveis[nivelAtual]
            .fases[faseAtual]
    ) {

        progresso.niveis[nivelAtual]
            .fases[faseAtual] = {};

    }


    const dadosFase =
        progresso.niveis[nivelAtual]
            .fases[faseAtual];


    dadosFase.questaoAtual =
        questaoAtual;


    dadosFase.respostas =
        respostas;


    dadosFase.acertos =
        Object.values(respostas)
            .filter(
                resposta =>
                    resposta === true
            ).length;


    dadosFase.erros =
        Object.values(respostas)
            .filter(
                resposta =>
                    resposta === false
            ).length;


    salvarProgresso(
        progresso
    );

}


// =====================================================
// INICIAR FASE
// =====================================================

function iniciarFase(numeroFase) {

    if (
        numeroFase < 1 ||
        numeroFase > TOTAL_FASES
    ) {

        return;

    }


    if (
        !faseEstaDesbloqueada(numeroFase)
    ) {

        return;

    }


    faseAtual =
        numeroFase;


    const dadosFase =
        obterDadosFase(
            nivelAtual,
            faseAtual
        );


    questaoAtual =
        dadosFase.questaoAtual || 1;


    respostas =
        dadosFase.respostas || {};


    inicioFase =
        Date.now();


    faseFinalizada = false;


    atualizarInformacoesFase();

    mostrarQuestao();

}


// =====================================================
// FINALIZAR FASE
// =====================================================

function finalizarFase() {

    if (faseFinalizada) {

        return;

    }


    faseFinalizada = true;


    const acertos =
        Object.values(respostas)
            .filter(
                resposta =>
                    resposta === true
            ).length;


    const erros =
        TOTAL_QUESTOES -
        acertos;


    const porcentagem =
        (acertos /
            TOTAL_QUESTOES) *
        100;


    let tempo = 0;


    if (inicioFase) {

        tempo =
            Math.floor(
                (
                    Date.now() -
                    inicioFase
                ) / 1000
            );

    }


    const progresso =
        carregarProgresso();


    const dadosFase =
        obterDadosFase(
            nivelAtual,
            faseAtual
        );


    dadosFase.concluida =
        true;


    dadosFase.questaoAtual =
        TOTAL_QUESTOES;


    dadosFase.respostas =
        respostas;


    dadosFase.acertos =
        acertos;


    dadosFase.erros =
        erros;


    dadosFase.tempo =
        tempo;


    if (
        acertos >
        (dadosFase.melhorResultado || 0)
    ) {

        dadosFase.melhorResultado =
            acertos;

    }


    progresso.niveis[nivelAtual]
        .fases[faseAtual] =
        dadosFase;


    salvarProgresso(
        progresso
    );


    mostrarResultado(
        acertos,
        erros,
        porcentagem,
        tempo,
        dadosFase.melhorResultado
    );

}


// =====================================================
// MOSTRAR RESULTADO
// =====================================================

function mostrarResultado(
    acertos,
    erros,
    porcentagem,
    tempo,
    melhorResultado
) {

    const areaQuestao =
        document.getElementById(
            "areaQuestao"
        );


    const resultado =
        document.getElementById(
            "resultadoFase"
        );


    if (!resultado) {

        return;

    }


    if (areaQuestao) {

        areaQuestao.hidden = true;

    }


    resultado.hidden = false;


    const elementoAcertos =
        document.getElementById(
            "resultadoAcertos"
        );


    const elementoErros =
        document.getElementById(
            "resultadoErros"
        );


    const elementoPorcentagem =
        document.getElementById(
            "resultadoPorcentagem"
        );


    const elementoTempo =
        document.getElementById(
            "resultadoTempo"
        );


    const elementoMelhor =
        document.getElementById(
            "melhorResultado"
        );


    if (elementoAcertos) {

        elementoAcertos.textContent =
            acertos;

    }


    if (elementoErros) {

        elementoErros.textContent =
            erros;

    }


    if (elementoPorcentagem) {

        elementoPorcentagem.textContent =
            porcentagem + "%";

    }


    if (elementoTempo) {

        elementoTempo.textContent =
            formatarTempo(tempo);

    }


    if (elementoMelhor) {

        elementoMelhor.textContent =
            melhorResultado +
            "/" +
            TOTAL_QUESTOES;

    }


    const mensagem =
        document.getElementById(
            "resultadoMensagem"
        );


    if (mensagem) {

        if (acertos === 10) {

            mensagem.textContent =
                "Perfeito! Você acertou tudo!";

        } else if (acertos >= 8) {

            mensagem.textContent =
                "Excelente resultado!";

        } else if (acertos >= 6) {

            mensagem.textContent =
                "Muito bem! Continue praticando.";

        } else {

            mensagem.textContent =
                "Continue estudando e tente novamente.";

        }

    }


    const proximaFase =
        document.getElementById(
            "proximaFase"
        );


    if (proximaFase) {

        proximaFase.style.display =
            faseAtual < TOTAL_FASES
                ? "flex"
                : "none";

    }


    atualizarIcones();

}


// =====================================================
// FORMATAR TEMPO
// =====================================================

function formatarTempo(segundos) {

    const minutos =
        Math.floor(
            segundos / 60
        );


    const segundosRestantes =
        segundos % 60;


    return (
        String(minutos).padStart(2, "0") +
        ":" +
        String(segundosRestantes).padStart(2, "0")
    );

}


// =====================================================
// REFAZER FASE
// =====================================================

function refazerFase() {

    respostas = {};

    questaoAtual = 1;

    inicioFase =
        Date.now();

    faseFinalizada = false;


    const progresso =
        carregarProgresso();


    if (
        progresso.niveis[nivelAtual] &&
        progresso.niveis[nivelAtual]
            .fases[faseAtual]
    ) {

        const dados =
            progresso.niveis[nivelAtual]
                .fases[faseAtual];


        dados.questaoAtual = 1;

        dados.respostas = {};

        dados.acertos = 0;

        dados.erros = 0;

        dados.tempo = 0;

        // IMPORTANTE:
        // melhorResultado não é apagado.

    }


    salvarProgresso(
        progresso
    );


    const resultado =
        document.getElementById(
            "resultadoFase"
        );


    const areaQuestao =
        document.getElementById(
            "areaQuestao"
        );


    if (resultado) {

        resultado.hidden = true;

    }


    if (areaQuestao) {

        areaQuestao.hidden = false;

    }


    mostrarQuestao();

}


// =====================================================
// PRÓXIMA FASE
// =====================================================

function irParaProximaFase() {

    if (
        faseAtual >= TOTAL_FASES
    ) {

        return;

    }


    const proxima =
        faseAtual + 1;


    if (
        !faseEstaDesbloqueada(proxima)
    ) {

        return;

    }


    iniciarFase(proxima);

}


// =====================================================
// MENU DE FASES
// =====================================================

function abrirMenuFases() {

    const menu =
        document.getElementById(
            "menuFases"
        );

    const fundo =
        document.getElementById(
            "fundoMenuFases"
        );


    if (!menu || !fundo) {

        return;

    }


    menu.classList.add("aberto");

    fundo.classList.add("ativo");


    renderizarFasesMenu();

}


function fecharMenuFases() {

    const menu =
        document.getElementById(
            "menuFases"
        );

    const fundo =
        document.getElementById(
            "fundoMenuFases"
        );


    if (!menu || !fundo) {

        return;

    }


    menu.classList.remove("aberto");

    fundo.classList.remove("ativo");

}


// =====================================================
// RENDERIZAR FASES NO MENU
// =====================================================

function renderizarFasesMenu() {

    const lista =
        document.getElementById(
            "listaFases"
        );


    if (!lista) {

        return;

    }


    lista.innerHTML = "";


    for (
        let numero = 1;
        numero <= TOTAL_FASES;
        numero++
    ) {

        const dados =
            fasesNivel1[numero];


        const concluida =
            faseFoiConcluida(
                numero
            );


        const desbloqueada =
            faseEstaDesbloqueada(
                numero
            );


        const botao =
            document.createElement(
                "button"
            );


        botao.type = "button";


        botao.className =
            "fase-menu-item";


        if (concluida) {

            botao.classList.add(
                "concluida"
            );

        }


        if (
            numero === faseAtual
        ) {

            botao.classList.add(
                "atual"
            );

        }


        if (!desbloqueada) {

            botao.classList.add(
                "bloqueada"
            );

            botao.disabled = true;

        }


        const icone =
            concluida
                ? "circle-check"
                : desbloqueada
                    ? "play-circle"
                    : "lock";


        botao.innerHTML = `

            <div class="icone-fase">

                <i data-lucide="${icone}"></i>

            </div>


            <div class="informacao-fase-menu">

                <strong>
                    Fase ${numero}
                </strong>

                <span>
                    ${dados.nome}
                </span>

            </div>


            <div class="estado-fase">

                ${
                    concluida
                        ? '<i data-lucide="check"></i>'
                        : !desbloqueada
                            ? '<i data-lucide="lock"></i>'
                            : '<i data-lucide="chevron-right"></i>'
                }

            </div>

        `;


        if (desbloqueada) {

            botao.addEventListener(
                "click",
                function() {

                    iniciarFase(
                        numero
                    );

                    fecharMenuFases();

                }
            );

        }


        lista.appendChild(
            botao
        );

    }


    atualizarIcones();

}


// =====================================================
// CONTINUAR ESTUDANDO
// =====================================================

function continuarEstudando() {

    const progresso =
        carregarProgresso();


    const nivel =
        progresso.niveis[nivelAtual];


    if (!nivel) {

        iniciarFase(1);

        return;

    }


    for (
        let numero = 1;
        numero <= TOTAL_FASES;
        numero++
    ) {

        const fase =
            nivel.fases[numero];


        if (
            fase &&
            !fase.concluida &&
            fase.respostas &&
            Object.keys(
                fase.respostas
            ).length > 0
        ) {

            iniciarFase(
                numero
            );

            return;

        }

    }


    for (
        let numero = 1;
        numero <= TOTAL_FASES;
        numero++
    ) {

        if (
            faseEstaDesbloqueada(
                numero
            ) &&
            !faseFoiConcluida(
                numero
            )
        ) {

            iniciarFase(
                numero
            );

            return;

        }

    }


    iniciarFase(
        TOTAL_FASES
    );

}


// =====================================================
// EVENTOS
// =====================================================

const botaoAnterior =
    document.getElementById(
        "questaoAnterior"
    );


const botaoProxima =
    document.getElementById(
        "proximaQuestao"
    );


const botaoRefazer =
    document.getElementById(
        "refazerFase"
    );


const botaoProximaFase =
    document.getElementById(
        "proximaFase"
    );


const botaoMenuFases =
    document.getElementById(
        "botaoMenuFases"
    );


const fecharMenu =
    document.getElementById(
        "fecharMenuFases"
    );


const fundoMenu =
    document.getElementById(
        "fundoMenuFases"
    );


if (botaoAnterior) {

    botaoAnterior.addEventListener(
        "click",
        voltarQuestao
    );

}


if (botaoProxima) {

    botaoProxima.addEventListener(
        "click",
        avancarQuestao
    );

}


if (botaoRefazer) {

    botaoRefazer.addEventListener(
        "click",
        refazerFase
    );

}


if (botaoProximaFase) {

    botaoProximaFase.addEventListener(
        "click",
        irParaProximaFase
    );

}


if (botaoMenuFases) {

    botaoMenuFases.addEventListener(
        "click",
        abrirMenuFases
    );

}


if (fecharMenu) {

    fecharMenu.addEventListener(
        "click",
        fecharMenuFases
    );

}


if (fundoMenu) {

    fundoMenu.addEventListener(
        "click",
        fecharMenuFases
    );

}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

if (
    document.body.contains(
        document.getElementById(
            "areaQuestao"
        )
    )
) {

    iniciarFase(1);

}  
