function AB(x, y) { // c'est un mélange entre un bout et un ensemble.
	this.x = x;
	this.y = y;
	this.nb_ts_inacheves = 9;
	this.presence_ps = false;
	this.id_ps = false;
	this.faction = false;
	this.termine = false;
	
	this.calculer_nb_ts_inacheves = function() {
		for (var x = this.x-1, y, l = this.x+2, l1; x < l; x++)
			if (gt.dt[x])
				for (y = this.y-1, l1 = this.y+2; y < l1; y++)
					if (gt.dt[x][y])
						this.nb_ts_inacheves--;
	};
	
	this.diminuer_nb_ts_inacheves = function() {
		this.nb_ts_inacheves--;
	};
	
	this.ajouter_ps = function(id, faction) {
		this.faction = faction;
		this.id_ps = id;
		this.presence_ps = true;
	};
	
	this.compter_pts = function() {
		if (this.presence_ps) {
			// suppression des partisans
			ap.supprimer([this.id_ps]);
			// joueurX // calcul des points
			var pts = 9-this.nb_ts_inacheves;
			pa.jos[this.faction].recevoir_pts(pts, this.faction);
			set_log(pa.jos[this.faction].nom+" reçoit "+pts+" points. (moine)");
			pa.jos[this.faction].recuperer_ps(1, this.faction);
		}
		this.termine = true;
	};
}