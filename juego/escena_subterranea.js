
Q.scene("mundo1Subterraneo", function(stage){
	
	//PAUSAR Y OCULTAR LAS ESCENAS DE MUNDO1 Y ESCORE
	//los sprites tienen un atributo que nos indica en que escena vive. llamado stage
	//el parametro 0 es para lo que lo busque en la escena 0 (mundo1), sino por default lo busca en esta escena
	var mario = Q("Jugador",0).first();
	
	//obtener la escena previa
	var escenaPrevia = mario.stage;
	
	//Le agregamos a mario un nuevo atributo que haga referncia a la escena previa, 
	//esta la usamos para volver de la escena subterraneo a la anterior
	mario.p.escena_previa = escenaPrevia; 
	
	//pausar y ocultar escena previa
	escenaPrevia.stop();	
	Q.audio.stop();																				//configuracion de la escena (stage). Cargamos el TMX en la escena, variable stage
	Q.stageTMX("mundo1_subway.tmx",stage);												//metodo que usa quintus para configurar la escena mediante un tmx. Guarda miMapa en stage

	//INSERTAR A MARIO EN LA ESCENA	
	//coordenadas donde queremos que inserte a mario en esta escena
	mario.p.x = 80;	
	mario.p.y = 40;	
	//inseta a mario en esta escena
	stage.insert(mario);

	/*	
	//obtener la capa de background (o el tamaño del canvas para establecer el limite en x del viewport
	var capaFondo = Q("TileLayer").first();	 
			
																			//la camara siga a mario. "Juegador" es el nombre de la clase de mario
	stage.add("viewport").follow(Q("Jugador").first(),{
		x: true,
		y:true
	},{
		minX: 0,			//para que no se vea la pared de la izquierda
		//ancho de la capa background que es el mismo del canvas
		maxX: capaFondo.p.w,											//las capas son obetos de quintus. Para acceder a los atributos usamos p. w es de width
		minY: 0,
		maxY: capaFondo.p.h
			
	});
	
	*/
	Q.audio.play("subterraneo.mp3",{
		loop:true
	});																				
					
});

