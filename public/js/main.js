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
   
   function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Seu-nome";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.append(linha);
   }
   function novaLinha(usuario,palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("materialicons").text("delete");
    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha;
   }    
   function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
   }
   function removeLinha(event) {
    event.preventDefault();
    $(this).parent().parent().remove();
}