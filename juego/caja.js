Q.animations("animacionesCaja",{
	brillar: {
		frames: [2,3,4],		
		rate: 1/3,
		loop:true
	},
	abrir:{
		frames:[5],
		rate: 1/2,
		loop:false
	}	
});


Q.Sprite.extend("HongoVida",{
	init: function(p){
		this._super(p,{	
			sheet: "objetos",			//nombre del json que define la imagen "jugador.json"
			frame: 1,
			vx: 150,
			//deshabilitamos temporalmente las colisiones
			sensor: true																								
		});	
		this.add(" animation,tween, aiBounce"); //tween nos permite movernos mas alla de la capa de animaciones- aiBounce: inteligencia artificial
		//hit es para escuchar cualquier colision		
		this.on("hit",function(colision){
			
			if (colision.obj.isA("Jugador")){				
				this.destroy();
			}
		});
	}
		
});


Q.Sprite.extend("Caja",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesCaja",	
			sheet: "objetos",			//nombre del json que define la imagen "jugador.json"
			frame: 3,
			//deshabilitamos la gravedad
			gravity:0,
			//AGREGAMOS PROPIEDAD
			estaAbierta: false
																		
		});	
		this.add("2d, animation");
		this.play("brillar");
		this.on("bump.bottom",function(colision){
			if (colision.obj.isA("Jugador") && !this.p.estaAbierta ){
				this.play("abrir");
				this.p.estaAbierta = true;
				//Cuando se habre la caja de regalo sale el hongo
				var hongo = new Q.HongoVida({
					x: this.p.x,
					// y: this.p.y - 32 //si quiero que aparezca sobre la caja
					y: this.p.y	//lo inserto en la misma posicion que la caja y realizo la animacion para que suba, para esto hay q deshabilitar las colisiones
				});
				
				//hongo.p.x = this.p.x;
				//hongo.p.y = this.p.y - 32;
				
				this.stage.insert(hongo);	
				
				//UNA VEZ QUE INSERTAMOS AL HONGO HACEMOS UNA ANIMACION TWEEN
				hongo.animate({
					//anima este hongo en la cordenada Y de la caja
					y: this.p.y -35									
				},0.5,//tiempo de la animacion
					{
						//esta funcion se ejecuta cuando se completa la animacion anterior
						callback: function(){
							//regresamos al hongo el modulo 2d para colisiones
							//desabilitamos la propiedad sensor, para que el objeto no choque con la capa de colisiones. Una vez que el hongo sale de la caja puede chocar con la caja de animaciones
							this.p.sensor = false;
							this.add("2d");
						}
					}
				);
							
			}
		});
	}
		
});
