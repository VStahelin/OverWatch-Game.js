$(document).ready(function() {
    $("#tiro").hide();
	$("#explosao1").hide();
	$("#explosao2").hide();
	$("#fim").hide();
	$("#inimigo1").hide();
	$("#inimigo2").hide();
	$("#jogador").hide();
	$("#energia").hide();

});
function start(){
$("#inicio").hide();
$("#inimigo1").show();
$("#inimigo2").show();
$("#jogador").show();
$("#energia").show();
var score=0;
var jogadorEnergia=3;
var podeAtirar=true;
var velocidade=5;
var posicaoY1 = parseInt(Math.random() * 410);
var posicaoY2 = parseInt(Math.random() * 410);
var TECLA = {
	W: 87,
	S: 83,
	D: 68
}
var jogo = {};
jogo.pressionou = [];
$(function(){
	jogo.timer = setInterval(loop,30);
	var somTiro=document.getElementById('somTiro');
	var somExplosao=document.getElementById('somExplosao');
	var gameover = document.getElementById("gameover");
	var revive = document.getElementById("revive");
	var musica = document.getElementById("musica");
	musica.addEventListener("ended", function(){ musica.currentTime = 10; musica.play(); }, false);
	musica.play();
	$(musica).prop("volume", 0.1);
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
    });
    $(document).keyup(function(e){
    	jogo.pressionou[e.which] = false;
	});
});
function loop()
{
moveJogador();
moveFundo();
moveInimigo1();
moveInimigo2();
colisao();
energia();
pontos();
vida();
}
function moveJogador() {
if (jogo.pressionou[TECLA.W])
	{
	var topo = parseInt($("#jogador").css("top"));
	$("#jogador").css("top",topo-10);
if (topo<=0) {
	$("#jogador").css("top",topo+10);
		}
	}
if (jogo.pressionou[TECLA.S])
	{
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+10);
if (topo>=500) {
		$("#jogador").css("top",topo-10);
	}		
	}
if (jogo.pressionou[TECLA.D])
	{	
	tiro();
	}
}
function moveFundo() {
	posicao = parseInt($("#background").css("background-position"));
	$("#background").css("background-position",posicao-1);
}
function moveInimigo1() {
    posicaoX = parseInt($("#inimigo1").css("left"));
	$("#inimigo1").css("left",posicaoX-velocidade);
	$("#inimigo1").css("top",posicaoY1);
	if (posicaoX<=87) {	
	posicaoY1 = parseInt(Math.random() * 500);
	$("#inimigo1").css("left",1500);
	$("#inimigo1").css("top",posicaoY1);
	}
}
function moveInimigo2() {
    posicaoX = parseInt($("#inimigo2").css("left"));
$("#inimigo2").css("left",posicaoX-velocidade);
$("#inimigo2").css("top",posicaoY2);
if (posicaoX<=87) {
	posicaoY2 = parseInt(Math.random() * 500);
	$("#inimigo2").css("left",1500);
	$("#inimigo2").css("top",posicaoY2);	
	}	
}
function vida() {
    var tpo = parseInt($("#jogador").css("top"));
	var y=tpo-35;
	$("#energia").css("top",y);
}
function tiro() {
	if (podeAtirar==true) {
	podeAtirar=false;
	somTiro.play();
	topo = parseInt($("#jogador").css("top"))
	posicaoX= parseInt($("#jogador").css("left"))
	tiroX = posicaoX + 190;
	topoTiro=topo+95;
	$("#tiro").show();
	$("#tiro").css("top",topoTiro);
	$("#tiro").css("left",tiroX);
	var tempoTiro=window.setInterval(executaTiro, 10);
	}
function executaTiro() {
	posicaoX = parseInt($("#tiro").css("left"));
    $("#tiro").css("left",posicaoX+25); 
    if (posicaoX>1500) {
		window.clearInterval(tempoTiro);
		tempoTiro=null;
		$("#tiro").hide();
		podeAtirar=true;
    }
}
}
function colisao() {
var jogadorX = parseInt($("#jogador").css("left"))+parseInt($("#jogador").css("width"));
var jogadorBaixo = parseInt($("#jogador").css("top"))+parseInt($("#jogador").css("height"))+2;
var jogadorTopo = parseInt($("#jogador").css("top"));
var inimigo1X = parseInt($("#inimigo1").css("left"));
var inimigo1Baixo = parseInt($("#inimigo1").css("top"))+parseInt($("#inimigo1").css("height"));
var inimigo1Topo = parseInt($("#inimigo1").css("top"));
var inimigo2X = parseInt($("#inimigo2").css("left"))
var inimigo2Baixo = parseInt($("#inimigo2").css("top"))+parseInt($("#inimigo2").css("height"));
var inimigo2Topo = parseInt($("#inimigo2").css("top"));	
var tiroX = parseInt($("#tiro").css("left"))+parseInt($("#tiro").css("width"));
var tiroBaixo = parseInt($("#tiro").css("top"))+parseInt($("#tiro").css("height"));
var tiroTopo = parseInt($("#tiro").css("top"));
if (inimigo1X <= jogadorX) {
	if (inimigo1Baixo <= jogadorBaixo && inimigo1Baixo >= jogadorTopo)
		{
	$("#inimigo1").css("left",600);
	posicaoY1 = parseInt(Math.random() * 1500);
	$("#inimigo1").css("top",posicaoY1);
	explosao1(inimigo1X,inimigo1Topo);
	jogadorEnergia--;
	} 
}
if (inimigo2X <= jogadorX) {
	if (inimigo2Baixo <= jogadorBaixo && inimigo2Baixo >= jogadorTopo)
		{
	$("#inimigo2").css("left",600);
	posicaoY2 = parseInt(Math.random() * 1500);
	$("#inimigo2").css("top",posicaoY2);
	explosao2(inimigo2X,inimigo2Topo);
	jogadorEnergia--;
	} 
}
if (tiroX >= inimigo1X) {
	if (tiroBaixo <= inimigo1Baixo && tiroBaixo >= inimigo1Topo)
	   {
	$("#inimigo1").css("left",1500);
	posicaoY1 = parseInt(Math.random() * 410);
	$("#inimigo1").css("top",posicaoY1);
	score=score+0.31*8.52;
	velocidade=velocidade+0.5;
	}
}
if (tiroX >= inimigo2X) {
	if (tiroBaixo <= inimigo2Baixo && tiroBaixo >= inimigo2Topo)
	   {
	$("#inimigo2").css("left",1500);
	posicaoY2 = parseInt(Math.random() * 410);
	$("#inimigo2").css("top",posicaoY1);
	score=score+0.37*6.79;
	velocidade=velocidade+0.5;
	}
}
}
function explosao1(inimigo1X,inimigo1Topo) {
	somExplosao.play();
	var div=$("#explosao1");
	div.css("top", inimigo1Topo);
	div.css("left", inimigo1X);
	div.show();
	div.animate({width:312, height:345, opacity:0}, "slow");
	var tempoExplosao=window.setInterval(resetaExplosao, 1000);
function resetaExplosao() {
	div.css("width", 100);
	div.css("height",100);
	div.css("opacity", 100);
	div.hide();
	window.clearInterval(tempoExplosao);
	tempoExplosao=null;
}
}
function explosao2(inimigo2X,inimigo2Topo) {
	somExplosao.play();
	var div=$("#explosao2");
	div.css("top", inimigo2Topo);
	div.css("left", inimigo2X);
	div.show();
	div.animate({width:312, height:345, opacity:0}, "slow");
var tempoExplosao=window.setInterval(resetaExplosao, 1000);
function resetaExplosao() {
	div.css("width", 100);
	div.css("height",100);
	div.css("opacity", 100);
	div.hide();
	window.clearInterval(tempoExplosao);
	tempoExplosao=null;
	}
}
function energia() {
if (jogadorEnergia==3) {
	$("#energia").css("background-image", "url(img/vida_3.jpg)");
}
if (jogadorEnergia==2) {
	$("#energia").css("background-image", "url(img/vida_2.jpg)");
}
if (jogadorEnergia==1) {
	$("#energia").css("background-image", "url(img/vida_1.jpg)");
}
if (jogadorEnergia==0) {
	$("#energia").css("background-image", "url(img/vida_0.jpg)");
gameOver();
	}
}
function pontos() {
	$("#placar").html("<h1> <font color='#99ff33'>Score: " + score + "</font></h1>");
}
function gameOver(){
	window.clearInterval(jogo.timer);
	jogo.timer=null;
	$("#inimigo1").hide();
	$("#inimigo2").hide();
	$("#jogador").hide();
	$("#energia").hide();
	$(musica).prop("volume", 0.0);
	gameover.play()
	saida="<h1><font color='#99ff33'>Game Over</h1> <h1>Sua pontuação foi:" + score + "</h1><p>Clique aqui para jogar novamente</font></p>"
	document.getElementById('fim').innerHTML = saida;
	$("#fim").show();
}
}
function reinicia(){
	$("#inimigo1").show();
	$("#inimigo2").show();
	$("#jogador").show();
	revive.play();
	$("#fim").hide();
	setInterval(start(), 15000);
}