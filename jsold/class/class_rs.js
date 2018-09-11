function RS() { // tour de jeu
	this.X = 0;
	this.Y = 0;
	
	this.initialiser = function(span) {
		var img = document.createElement('img');
		img.id = 'rectangleSelection';
		img.style.display = 'none';
		img.style.position = 'absolute';
		span.appendChild(img);
	};
	
	this.activer = function(couleur) {
		var img = document.getElementById('rectangleSelection');
		if (couleur != "t")
			img.src = "tuiles/tuile_selectionnee_"+couleur+".png";
		img.style.display = 'block';
		img.style.left = (6+(this.X+pl.x_decal-pl.x_min)*70)+'px';
		img.style.top = (68+(this.Y+pl.y_decal-pl.y_min)*70)+'px';
	};
	
	this.desactiver = function() {
		document.getElementById('rectangleSelection').style.display = 'none';
	};
	
	this.test_pss_xy = function test_pss_xy() {
		for (var i = 0, c = tj.pss.length; i < c; i++)
			if (this.X == tj.pss[i][0] && this.Y == tj.pss[i][1])
				return i;
		return -1;
	};
}