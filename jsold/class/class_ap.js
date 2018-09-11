function AP() { // AffichagePartisan
	this.liste_ps = [];
	
	this.initialiser = function(span) {
		for (var i = 0, img, c = this.liste_ps.length; i < c; i++) {
			img = document.createElement('img');
			img.id = this.liste_ps[i].id_img;
			img.src = 'icone/partisan_f'+(this.liste_ps[i].faction)+'.png';
			img.style.display = 'block';
			img.style.left = this.liste_ps[i].x+'px';
			img.style.top = this.liste_ps[i].y+'px';
			span.appendChild(img);
		}
	};
	
	this.ajouter = function(faction, x, y) {
		var id = false;
		for (var i = 0, c = this.liste_ps.length; i < c; i++)
			if (this.liste_ps[i] === false) {
				id = i;
				break;
			}
		if (id === false)
			id = c;
		
		var ps = new PS();
		ps.x = x;
		ps.y = y;
		ps.faction = faction;
		
		var img = document.createElement('img');
		img.id = ps.id_img = 'partisan'+id;
		img.src = 'icone/partisan_f'+(faction+1)+'.png';
		img.style.display = 'block';
		img.style.position = 'absolute';
		
		img.style.left = ps.x+'px';
		img.style.top = ps.y+'px';
		document.getElementById('le_span_du_plateau').appendChild(img);
		
		this.liste_ps[id] = ps;
		return id;
	};
	
	this.decaler = function(X, Y) {
		for (var i = 0, c = this.liste_ps.length; i < c; i++)
			if (this.liste_ps[i]) {
				this.liste_ps[i].x += 70*X;
				document.getElementById(this.liste_ps[i].id_img).style.left = this.liste_ps[i].x+'px';
				this.liste_ps[i].y += 70*Y;
				document.getElementById(this.liste_ps[i].id_img).style.top = this.liste_ps[i].y+'px';
			}
	};
	
	this.supprimer = function(ids) {
		for (var i = 0, c = ids.length; i < c; i++)
			if (this.liste_ps[ids[i]]) {
				document.getElementById('le_span_du_plateau').removeChild(document.getElementById(this.liste_ps[ids[i]].id_img));
				this.liste_ps[ids[i]] = false;
			}
	};
}