//Crear un texto que corresponde al numero de goombas muertos
//esta clase extendera de la clase UI.Text
//El objeto texto puede escuchar eventos

Q.UI.Text.extend("PuntosGoomba",{
	init: function(p){
		this._super(p,{
			label: "0",
			color: "green",
			y: 20,
			x: Q.width - 60,
			size: 30,
			family: 'Share Tech Mono'
		});
		//escuchar el evento change.goombasMuertos. La variable goombasMuertos fue creada abajo en la escena score: 	Q.state.set("goombasMuertos",0);
		//cada vez que cambie esta variable (con Q.state.inc) se llama a la funcion actualizarPuntaje
		//el incremento se hace en goombas.js
		Q.state.on("change.goombasMuertos", this, "actualizarPuntaje");
	},
	actualizarPuntaje: function(puntajeGoombas){
		//actualiza label
		this.p.label = ""+ puntajeGoombas;
		//alert("cambia variable goombasMuertos");
	}
});

//definir la escena score
Q.scene("score",function(stage){
	//creamos una varible del Game State
	Q.state.set("goombasMuertos",0);
	//Declaramos otra variable de estado (global). Las variables de estado estan asociadas con el juego. El juego esta representado con el objeto Q
	//Utilizamos este metodo xq con las variables globales de js corremos peligro de sobreescribirla cuando agreguemos por ej otra libreria.
	Q.state.set("tiempo",10);
		
	//creamos un objeto de tipo PuntosGoomba y lo insertamos en la escena
	var valorPuntaje = new Q.PuntosGoomba();
	
	//creando un elemento texto que diga "Goombas"
	var textoPuntaje = new Q.UI.Text({
		label: "Goombas",
		color: "brown",
		y: 20,
		x: Q.width -160,
		size: 30,
		family: 'Share Tech Mono'
	});
	//insertar el texto y el valor del puntaje en el stage
	stage.insert(textoPuntaje);
	stage.insert(valorPuntaje);
		
	
	//creamos una instancia de ContadorTiempo 
	var contadorTiempo = new Q.ContadorTiempo();
	
	//insertamos el contador del tiempo en la escena
	stage.insert(contadorTiempo);
	
	//decrementamos la variable de estado tiempo cada segundo 	
	setInterval(function(){ 
		var tiempo = Q.state.get("tiempo");
		//actualizamos el tiempo del timer en este label. Q.pausado lo definimos en inicializar.js
		//si el tiempo es mayor que 0 y el jeugo no esta pausado
			if (tiempo > 0 && Q.pausado === false){
				Q.state.dec("tiempo",1);			
			}		
		 
		}, 1000);
});


// ------------------------ LOGICA DEL TIMER DEL JUEGO ------------------

Q.UI.Text.extend("ContadorTiempo",{
	init: function(p){
		this._super(p,{
			label: "10",
			color: "green",
			y: 20,
			x: Q.width / 2,
			size: 30,
			family: 'Share Tech Mono'
		});
		//EN GENERAL EN QUINTUS, EL METODO ON NOS PERMITE ESCUCHAR EVENTOS
		//el evento change.timepo se produce cuando se produce Q.state.inc o Q.state.dec
		//como no es este objeto el que cambia "tiempo" tenemos que usar el siguiente metodo 
		Q.state.on("change.tiempo",this,"actualizarTiempo");		
	},
	//el argumento de la funcion quintus le pasa como argumento el valor nuevo de esa variable de estado
	actualizarTiempo: function(tiempo){
		this.p.label = "" + tiempo;
	}
});

