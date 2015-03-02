/*
Indicar el nombre de la escena y el callback
Se carga el mapa primer atributo nombre de la escena(sin espacios)
Quintus luego de crear la escena ejecuta la funcion que le pasamos como 2do parametro, y coloca la escena en una variable que por convencion la llamamos stage
 En nuestro tmx estan configurados todos los elementos de nuestra escena, capas y jugador, por lo tanto lo cargamos.
 * */

Q.scene("mundo1", function(stage){
																				//configuracion de la escena (stage). Cargamos el TMX en la escena, variable stage
	Q.stageTMX("mimapa2.tmx",stage);												//metodo que usa quintus para configurar la escena mediante un tmx. Guarda miMapa en stage

	//obtener la capa de background (o el tamaño del canvas para establecer el limite en x del viewport
	var capaFondo = Q("TileLayer").first();	 
			
																				//la camara siga a mario. "Juegador" es el nombre de la clase de mario
	stage.add("viewport").follow(Q("Jugador").first(),{
		x: true,
		y:true
	},{
		minX: 32,			//para que no se vea la pared de la izquierda
		//ancho de la capa background que es el mismo del canvas
		maxX: capaFondo.p.w - 32,											//las capas son obetos de quintus. Para acceder a los atributos usamos p. w es de width
		minY: 0,
		maxY: capaFondo.p.h
			
	});
	Q.audio.play("tema_superficie.mp3",{
		loop:true
	});																				
					
});

