function EV() {
	this.id_bv = []; // id bout de ville
	this.nb_cs_inacheves = 0;
	this.nb_blasons = 0;
	this.presence_cathedrale = false;
	this.ps = [0,0,0,0]; // répartition partisans
	this.id_ps = []; // id partisan
	this.presence_ps = false;
	this.termine = false;
	
	this.ajouter_bv = function(i) {
		this.id_bv[this.id_bv.length] = i;
		if (gt.bv[i].blason)
			this.nb_blasons++;
		if (gt.bv[i].cathedrale)
			this.presence_cathedrale = true;
		for (var j = 0, l = gt.bv[i].ts.length; j < l; j++)
			if (gt.bv[i].ts[j] === false)
				this.nb_cs_inacheves++;
	};
	
	this.diminuer_nb_cs_inacheves = function() {
		this.nb_cs_inacheves--;
	};
	
	this.fusioner = function(propre_id, id_ev) {
		var ev = gt.ev[id_ev];
		// recuperation des bouts de ville
		for (var i = 0, c = ev.id_bv.length; i < c; i++) {
			gt.bv[ev.id_bv[i]].id_ev = propre_id;
			this.id_bv.push(ev.id_bv[i]);
		}
		// recuperation des blasons et des cathedrales
		this.nb_cs_inacheves += ev.nb_cs_inacheves;
		this.nb_blasons += ev.nb_blasons;
		if (ev.presence_cathedrale)
			this.presence_cathedrale = true;
		// recuperation des partisans
		if (ev.presence_ps)
			this.presence_ps = true;
		for (i = 0; i < 4; i++)
			this.ps[i] = this.ps[i]+ev.ps[i];
		for (i = 0, k = this.id_ps.length, l = ev.id_ps.length; i < l; i++)
			this.id_ps[i+k] = ev.id_ps[i];
		// suppression de l'ensemble
		gt.ev[id_ev] = false;
	};
	
	this.ajouter_ps = function(id, faction) {
		this.ps[faction]++;
		this.id_ps[this.id_ps.length] = id;
		this.presence_ps = true;
	};
	
	this.compter_pts = function() {
		if (this.presence_ps) {
			// calcul des points
			for (var i = 0, c = this.id_bv.length, t = [], j, ct, b; i < c; i++) {
				for (j = 0, ct = t.length, b = false; j < ct; j++)
					if (b = (gt.bv[this.id_bv[i]].x == t[j][0] && gt.bv[this.id_bv[i]].y == t[j][1]))
						break;
				//
				if (!b)
					t[ct] = [gt.bv[this.id_bv[i]].x, gt.bv[this.id_bv[i]].y];
			}
			var pts = (this.presence_cathedrale ? (this.nb_cs_inacheves == 0 ? 3 : 0) : (this.nb_cs_inacheves == 0 ? 2 : 1))*(t.length+this.nb_blasons);
			// suppression des partisans
			ap.supprimer(this.id_ps);
			// joueur1
			if (this.ps[0] != 0) {
				if (this.ps[0] >= this.ps[1] && this.ps[0] >= this.ps[2] && this.ps[0] >= this.ps[3]) {
					pa.jos[0].recevoir_pts(pts, 0);
					set_log(pa.jos[0].nom+" reçoit "+pts+" points. (chevalier)");
				}
				pa.jos[0].recuperer_ps(this.ps[0], 0);
			}
			// joueur2
			if (this.ps[1] != 0) {
				if (this.ps[1] >= this.ps[0] && this.ps[1] >= this.ps[2] && this.ps[1] >= this.ps[3]) {
					pa.jos[1].recevoir_pts(pts, 1);
					set_log(pa.jos[1].nom+" reçoit "+pts+" points. (chevalier)");
				}
				pa.jos[1].recuperer_ps(this.ps[1], 1);
			}
			// joueur3
			if (this.ps[2] != 0) {
				if (this.ps[2] >= this.ps[0] && this.ps[2] >= this.ps[1] && this.ps[2] >= this.ps[3]) {
					pa.jos[2].recevoir_pts(pts, 2);
					set_log(pa.jos[2].nom+" reçoit "+pts+" points. (chevalier)");
				}
				pa.jos[2].recuperer_ps(this.ps[2], 2);
			}
			// joueur4
			if (this.ps[3] != 0) {
				if (this.ps[3] >= this.ps[0] && this.ps[3] >= this.ps[1] && this.ps[3] >= this.ps[2]) {
					pa.jos[3].recevoir_pts(pts, 3);
					set_log(pa.jos[3].nom+" reçoit "+pts+" points. (chevalier)");
				}
				pa.jos[3].recuperer_ps(this.ps[3], 3);
			}
		}
		this.termine = true;
		this.ps = [0,0,0,0];
	};
}