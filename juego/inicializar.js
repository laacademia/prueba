
var Q = Quintus({
	audioSupport: ["mp3", "ogg"]
});
																//juego es el id del canvas del index. //le pasamos un objeto de configuracion JSON a la funcion setup
Q.setup("juego", {
	maximize: true
	//maximize: "touch" //maximiza solo en dispositivos moviles 	
});
																//Agregamos los modulos que necesitamos usar
Q.include("Sprites, Scenes, 2D, Input, TMX, Touch, Anim, Audio, UI");
//Activamos los controles del teclado y el touch
Q.controls();
Q.touch();												//o los podria activar a los 2 en una sola linea:   Q.controls().touch;
//acivamos los sonidos
Q.enableSound();

//le agregamos una bandera propia al objeto que representa todo el juego
Q.pausado = false;
//funcionalidad del boton pausa
$("#boton-pausa").click(function(){
	Q.audio.play("pausa.mp3");
	//REANUDAMOS EL JUEGO
	if (Q.pausado === true){
		//reanudamos la escena
		Q.stage(0).unpause();
		//reanudamos el sonido
		Q.audio.play("tema_superficie.mp3");
		Q.pausado = false;
		$(this).html("Pausar");
	}
	//PONEMOS PAUSA
	else{
		//Detenmos la escena
		Q.stage(0).pause();
		//Detenemos el audio: detener todo el audio : Q.audio.stop();
		Q.audio.stop("tema_superficie.mp3");				
		Q.pausado = true;
		$(this).html("Reanudar");
	}
	
});																










/* 
Agregamos los mogulos que necesitamos usar: (usar mayusculas)
	-Sprite: 
	-Scenes: para las escenas
	-2D: para las colisiones (Quintus es solo para 2d)
	-Input: para teclado.
	-Touch: para los dispositivos moviles. Si se accede desde movil automaticamente Quintus los agrega.
	-TMX: ya que usamos archivos tmx para cargar los mapas (se puede hacer de otras formas)
*/
