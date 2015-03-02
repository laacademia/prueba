Q.animations("animacionesGoomba",{
	caminar:{
		frames: [0,1],
		rate: 1/2,
		loop: true	
	},
	aplastar:{
		frames:[3],
		ratio: 1/2,
		loop: false,
		trigger : "destruir"		
	}	
});

Q.Sprite.extend("Goomba",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesGoomba",	
			sheet: "enemigosBajos",								//nombre del json que define la imagen
			frame: 0,										//frames que tomamos por default en Tiled			
			vx:170,											//igual que speed. Lo hacemos un poco mas rapido que mario
			//DEFINIMOS NUESTRAS PROPIEDADES
			enemigo: true								
		});
		//Le decimos que este jugador usa el modulo 2d para que use las colisiones, y los controles
		//agregamos el modulo aiBounce que es para que el goomba se mueva solo. ai (artificial inteligent)
		this.add("2d, aiBounce, animation");
		this.play("caminar");
		
		//escuchar las colisiones por arriba
		this.on("bump.top",this,"aplasta");
		//trigger	
		this.on("destruir",function(){		
			this.destroy();								
		});		
	},
	aplasta: function(colision){
		if (colision.obj.isA("Jugador") ){
			//sonido
			Q.audio.play("bump.mp3");
			this.play("aplastar");
			colision.obj.p.vy = -300;
			Q.state.inc("goombasMuertos",10); //nombre de la variable, incremento			
		}
	}
	
});

/*
 
 Q.Sprite.extend("Goomba",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesGoomba",	
			sheet: "goomba",	
			frame: 0,						
			vx:170												
		});

		this.add("2d, aiBounce, animation");
		this.play("caminar");
		this.on("bump.top",this,"aplastar");		
	},
	aplastar:
		function(colision){		
			if (colision.obj.isA("Jugador")){				
				this.play("aplastar");				
				this.destroy();
			}
		});
	}		
	
});

 * */


																	/*
																											this.on("bump.top", function(colision){
																												//revisar si colisione con mario
																												if (colision.obj.isA("Jugador")){
																													//Ejecutamos la animacion de aplastar
																													this.play("aplastar");
																													//para llamar a la funcion destroy hay que esperar hasta que se ejecute la animacion por que sino no se ve.
																													//Goomba muere
																													//	this.destroy();
																												}
																											});
																											*/