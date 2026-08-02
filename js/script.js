// BOTÃO COMEÇAR AGORA

const botaoComecar = document.getElementById("comecarAgora");
const entradaNome = document.getElementById("entradaNome");
const salvarNome = document.getElementById("salvarNome");
const nomeUsuario = document.getElementById("nomeUsuario");


// Verifica se já existe nome salvo

let nomeSalvo = localStorage.getItem("nomeUsuario");


if(nomeSalvo){

    if(botaoComecar){

        botaoComecar.innerHTML = "Continuar como " + nomeSalvo;

    }

}



// Quando clicar em começar

if(botaoComecar){

botaoComecar.addEventListener("click", function(){

    nomeSalvo = localStorage.getItem("nomeUsuario");


    if(nomeSalvo){

        window.location.href = "materias.html";

    }else{

        entradaNome.style.display = "block";

        botaoComecar.style.display = "none";

    }

});

}



// Salvar nome

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


// Carregar modo salvo

if(localStorage.getItem("modoEscuro") === "ativado"){

    document.body.classList.add("modo-escuro");

}



if(botaoModo){

botaoModo.addEventListener("click", function(){

    document.body.classList.toggle("modo-escuro");


    if(document.body.classList.contains("modo-escuro")){

        localStorage.setItem("modoEscuro", "ativado");

    }else{

        localStorage.setItem("modoEscuro", "desativado");

    }

});

}
