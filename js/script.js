const botao = document.querySelector("button");

botao.addEventListener("click", function(){
    window.location.href = "materias.html";
});
const botaoModo = document.getElementById("modoEscuro");

botaoModo.addEventListener("click", function(){

    document.body.classList.toggle("modo-escuro");

});
