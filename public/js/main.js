$(".frase");
function atualizaTamanhoFrase() {
var frase = $(".frase").text();
var numPalavras = frase.split(" ") .length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);
}
var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores(); 
    $("#botao-reiniciar").click(reiniciaJogo);
   });
   
function inicializaContadores() {
campo.on("input", function() {

var conteudo = campo.val();

var qtdPalavras = conteudo.split(/\S+/).length - 1;
$("#contador-palavras").text(qtdPalavras) .text(qtdCaracteres);
var conteudoSemEspaco = conteudo.replace(/\s+/g,'');

var qtdCaracteres = conteudoSemEspaco.length;
 $('#contador-caracteres').text(qtdCaracteres);
});
function reiniciaJogo() {
    
if (tempoRestante < 1) {
    campo.attr("disabled", true);
    clearInterval(cronometroID);
    campo.toggleClass("campo-desativado");
    }
   }
}

function inicializaCronometro() {
 var tempoRestante = $("#tempo-digitacao").text();
 campo.one("focus", function() {
    var cronometroID = setInterval(function() {
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if (tempoRestante < 1) {
            campo.attr("disabled", true);
            clearInterval(cronometroID);
            finalizaJogo();
            }

        }, 1000);
   });
}

   
$("#botao-reiniciar").click(reiniciaJogo);
$("#botao-reiniciar").click(function(){
});
 function reiniciaJogo(){

 campo.attr("disabled", false);
 campo.val("");
 $("#contador-palavras").text("0");
 $("#contador-caracteres").text("0");
 $("#tempo-digitacao").text(tempoInicial); 
 inicializaCronometro(); 
 campo.toggleClass("campo-desativado");
 
 campo.removeClass("borda-vermelha"); 
 campo.removeClass("borda-verde"); 
 }
 function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);
        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
           } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
           }
    });
   }   
       
   function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
   }