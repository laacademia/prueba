//caragar todo lo que esta en audio images y data
//Indicar en una cadena los recursos que estamos usando (imagenes,json, audio, y mapas tmx)
//Luego callback para configurar los sprites para configurar los sprites

//solo con poner bump.mp3 ya toma ogg
var recursos = "mosaicos_objetos.png, subterraneo.mp3,mundo1_subway.tmx ,jugador.json, mimapa2.tmx, mosaicos_escenario_32x32.png, mosaicos_mario_enano_30x30.png, mosaicos_enemigos_32x32.png, enemigosBajos.json,tortuga.json,mosaicos_enemigos_32x46.png, bump.mp3, patada.mp3,salto_enano.mp3,tema_superficie.mp3,pausa.mp3,mario_muere.mp3, tuberias.json, mosaicos_subway.png, tuberias.png"; 
//Q.loadTMX(recursos, function(){ // la barra solo nos mostraba los archivos con extension tmx, entonces usamos un metodo mas general llamado load que nos va a decir la cantidad de recursos totales sin importar la extension.
	Q.load(recursos, function(){
																										//esta funcion se ejecuta luego de que se cargan los recursos que le pasamos como primer parametro.
																										//compilar el sprite sheet del jugador
	Q.compileSheets("mosaicos_mario_enano_30x30.png","jugador.json");									//Le decimos a quintus que el json "jugador.json" esta configurando la imagen "mosaicos_mario_enano_30x30.png"
	Q.compileSheets("mosaicos_enemigos_32x32.png","enemigosBajos.json");																									//ejecutamos la escena pasandole como parametro el nombre(ver el nombre en escena.js)
	Q.compileSheets("mosaicos_enemigos_32x46.png","tortuga.json");
	//compilar sprite para las tuberias
	Q.compileSheets("tuberias.png","tuberias.json");
	
	
	//OTRA FORMA DE CARGAR EL SPRITE SHEET SIN UN JSON
	//objetos esta definido en caja.js en sheet
	Q.sheet("objetos","mosaicos_objetos.png",{
		tileh:32,
		tilew:32				
	});
	
	Q.stageScene("mundo1");
	Q.stageScene("score",1);	 
},{
	progressCallback: function(leidos,totales){
		//calculo el porcentaje de la barra
		var porcentaje = Math.floor(leidos/totales)*100;
		//aumento el ancho de la barra de porcentaje		
		$("#barra").css("width",porcentaje+"%");
		if (leidos == totales){
			$("#contenedor-barra").remove();
		}
		$("#contenedor-boton").css("display","block");  // o puedo usar $("#contenedor-boton").show();
		
	}	
});


//Q.loaadTMX(jugador.json, miMapa.tmx, mosaicos_escenarios_32x32.png, mosaicos_mario_enano_30x30.png",);