//--DEFINICION DE COMPONENTE (como 2d,platformerControls)

//sirve para que el sprite salte. Primer argumento, nombre del componente, segundo, opciones de inicializacion
Q.component("saltarin",{
	
	added: function(){		
		//se ejecuta cuando este componente se agrega a un sprite
		//normalmente un componente modifica el gameloop y sus propiedades
		
		//se refiere al sprite sobre al que se le aplica el componente		
		this.entity.on("step",this,"saltar");	//step nos permite agregarle cosas al gameloop		
		
	},
	//saltar es la funcion que vamos a ejecutar adicionalmente al game loop
	saltar: function(){
		//verificamos si su velocidad en el eje y es == 0
		if (this.entity.p.vy === 0){
			//hacemos saltar al sprite
			this.entity.p.vy = -400;
		}	
	}
});


Q.animations("animacionesTortuga",{
	caminar: {
		frames:[0,1],
		rate: 1/2,
		loop: true
	},
	enconchar: {
		frames:[2,4],
		rate: 1/4,
		loop: false
	}	
});
Q.Sprite.extend("Tortuga",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesTortuga",
			sheet: "tortuga",				//nombre del json
			frame: 0,
			vx: 150,
			//DEFINIMOS NUESTRAS PROPIEDADES
			esConchita:false,
			enemigo:true			 
		});
		this.add("2d, aiBounce, animation, saltarin");
		this.play("caminar");
		this.on("bump.top", this, "aConcha");  //this va xq la function aConcha esta en el mismo objeto		
	},
	aConcha: function(colision){
				
		if (colision.obj.isA("Jugador")) {
			//quitamos el componente saltarin
			this.del("saltarin");		
			//mario salta	
			colision.obj.p.vy = -300;
			//sonido patada.mp3
			Q.audio.play("patada.mp3");
			if (! this.p.esConchita){
				//cambiar el sheet al de enemigosBajos
				this.sheet("enemigosBajos",true);
				this.play("enconchar");
				this.p.esConchita = true;				
			}	
			
			//Si la tortuga es concha y esta en movimiento y le caigo encima, se queda quieta
			if (this.p.vx != 0){
				this.p.vx = 0;	
			}		
			else{
				//hacer que la tortuga se mueva cuando esta quieta
				//if (this.p.vx === 0){				
					this.p.vx=350;
				//}
			}
			this.play("enconchar");			
		}		
	},
	step: function(){
		// si va hacia la izquierda y presiono derecha
			if ( (this.p.vx > 0)){
				this.p.flip = "x";		
			}			
	}	
});
