
Q.Sprite.extend("TuberiaEntrada",{
	init: function(p){
		this._super(p,{	
			sheet: "tuberias",			//nombre del json que define la imagen "jugador.json"
			frame: 2															
		});	
		this.add("2d");			
	}	
});
