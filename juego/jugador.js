//Definicion de animacion: caminar, saltar, quieto , (nadando)
Q.animations("animacionesMario",{
	//caminar: 
	caminar:{
		frames: [4,5,8], 	//usamos los frames 2,4,8
		rate: 1/6,			//La velocidad va en fracciones. Por ej 1/6 : 6 frames x seg
		loop: false			//No queremos que la animacion se repita indefinidamente, sino se queda caminando quieto en el lugar
	},
	saltar:{
		frames:[2],
		rate: 1/2, 			// 2 frames x seg
		loop: false
	},
	quieto:{
		frames:[1],
		rate:1/2,
		loop:false
	},
	muere:{
		frames:[12],
		rate:1/2,
		loop:false,
		trigger: "casiMuerto"
	}
});

/*
 Un Srite puede tener una hoja de estilo, velocidad, ..
*/
//como segundo paramtro le pasamos un objeto JSON que va a configurar al jugador
//init: inicializa el objeto (recordar que esta dentro de un json)
//todos los parametro que le enviemos a init se almacenan en p (parametros por convencion de Quintus)
//Usamos el constructor de Sprite, al que le pasamos los parametros de inicializacion y ademas otro objeto json con el valor de los atributos de nuestro jugador.

/*
 sheet: hoja de estilo que esta configurada mediante el archivo json jugador.json
 jumpSpeed: velocidad de salto.
 speed: velocidad en x. Tambien podemos poner vx: en lugar de speed: .
 frame: elejimos cual de los mosaicos (12) de mario elegimos como default. (Empiezan en 0). Es el que pusimos en Tile.  
 * */
Q.Sprite.extend("Jugador",{
	init: function(p){
		this._super(p,{	
			sprite: "animacionesMario",
			sheet: "jugador",			//nombre del json que define la imagen "jugador.json"
			frame: 1,
			jumpSpeed: -580,
			speed:130,						
			//DEFINIMOS NUESTRAS VARIABLES
			estaVivo:true		
		});
		//Le decimos que este jugador usa el modulo 2d para que use las colisiones, y los controles
		//el modulo tween nos permite hacer animaciones a traves del flujo de colisiones
		this.add("2d, platformerControls, animation,tween");
		
		//COLISION CON LA TUBERIA DE ENTRADA POR ABAJO
		this.on("bump.bottom",function(colision){
			//si mario colisiono con un objeto TuberiaEntrada y presiono hacia abajo
			if (colision.obj.isA("TuberiaEntrada") && Q.inputs["down"]){
				//cargamos la escena subterranea
				Q.stageScene("mundo1Subterraneo",2);//Para que no nos borre la escena anterior le tenemos que poner que esta escena es la 2
				
			}
		});
		
		//COLISION CON LA TUBERIA DE SALIDA POR LA DERECHA
		this.on("bump.right",function(colision){
			if (colision.obj.isA("TuberiaSalida") && Q.inputs["right"]){
				//REGRESAR A LA ESCENA PREVIA
				
				//accedo a la escena actual de mario con el metodo de quintus stage
				this.stage.stop();
				
				//activar la escena previa
				this.p.escena_previa.start();
				
				//debemos poner el atributo stage de mario en mundo1
				this.p.y = 100;
				this.stage = this.p.escena_previa;
			}
		});
		
		//ESCUCHAMOS EL EVENTO CASI MUERTO QUE DISPARA EL TRIGGER DE LA ANIMACION MUERE CUANDO TERMINA
		this.on("casiMuerto", function(){
			//deshabilitamos la gravedad para este sprite por que sino cuando en la animacion llega a la altura que le indicamos vuelve a caer
			this.del("2d"); //por que el modulo 2d tiene gravedad y colision
			
			//EJECUTAMOS ANIMACION TWEEN (anidamos las funciones de animacion)
			this.animate({
				//mueve el sprite a la posicion y indicada. A la posicion 100 lo sube 100 unidades animandolo
				y: this.p.y - 200
				
			},
			0.5, //con un segundo parametro le indicamos el tiempo que tarda la animacion
			{
				//como tercer parametro le pasamos un objeto de js que es una 
				//funcion que se ejecutara cuando termine la animacion tween que lleva al mario arriba				
				callback: function(){
					//EJECUTAMOS OTRA ANIMACION TWEEN
					this.animate({
						//obtenemos la altura del juego(escenario) y animamos a mario para que se valla hasta el fondo
						y: Q("TileLayer").first().p.h
					},0.5, //con un segundo parametro le indicamos el tiempo que tarda la animacion
					{
						callback:function(){
							//se ejecuta cuado ya terminamos de sacar al mario del escenario
							this.destroy();
						}
					});
				}
			});
		});
		
		//escuchamos si al mario le pegan por los costado o arriba	
		this.on("bump.left,bump.right,bump.top",function(colision){
			//esta funcion se ejecuta cuando se produce la colision
			
			//si el objeto con el que choca mario es enemigo entoces mario muere
			if(colision.obj.p.enemigo === true && this.p.estaVivo){
				
				//deshabilitamos los controles del mario
				this.p.ignoreControls = true; // ó this.del(platformerControls);
				
				//indicamos que mario ya esta muerto
				this.p.estaVivo = false;
				
				//DETENEMOS A TODOS LOS ENEMIGOS
				
				//Q(NOMBRE) regresa un arreglo de js con todos los sprites que son de esa clase. 
				Q("Goomba").items.forEach(function(enemigo){					//nos devueve todos los goomba
					//recorremos el arreglo de goombas y ponemos su velocidad en 0 para que no se muevan
					enemigo.p.vx = 0;
					//deshabilita las animaciones del enemigo
					enemigo.p.animation = null;															
				});
				Q("Tortuga").items.forEach(function(enemigo){					//nos devueve todos los goomba
					//recorremos el arreglo de goombas (con el metodo foreach del arreglo) y ponemos su velocidad en 0 para que no se muevan
					enemigo.p.vx = 0;
					//deshabilita las animaciones del enemigo
					enemigo.p.animation = null;															
				});
				//ejecutamos la animacion muere
				this.play("muere");
				
				//detenemos todos los audios del juego		
				Q.audio.stop();				
				
				Q.audio.play("mario_muere.mp3");										
			}
		});
	},
	//creamos el 2do atributo del objeto json. Step se ejecuta cada vez que se ejecuta el gameLoop
	step: function(){
		//giramos a mario segun la direccion. 2 formas: viendo la tecla que presiona o viendo la velocidad en x (si es + ó -)
		if (this.p.estaVivo){
			//Si el jugador va a la izquierda y tecleo derecha
				if (this.p.direction === "left" && Q.inputs["right"]) {
					this.p.flip = false;
				}
				//si el jugador va a la derecha y tecleo izquierda
				if (this.p.direction == "right" && Q.inputs["left"]) {
					this.p.flip = "x";
				}
				//Ejecutar animacion de caminar
				if (this.p.vx !=0 && this.p.vy===0){
					this.play("caminar");
				}
				//Ejecutar animacion de saltar
				if (this.p.vy < 0){
					this.play("saltar");
					Q.audio.play("salto_enano.mp3",{
						debounce: 1000
					});
					
				}
				if(this.p.vx==0 && this.p.vy==0){
					this.play("quieto");
				}							
			}
	} 
});
