function EC() {
	this.id_bc = []; // id bout de chemin
	this.nb_cs_inacheves = 0;
	this.presence_lac = false;
	this.ps = [0,0,0,0];
	this.id_ps = [];
	this.presence_ps = false;
	this.termine = false;
	
	this.ajouter_bc = function(i) {
		this.id_bc[this.id_bc.length] = i;
		if (gt.bc[i].presence_lac)
			this.presence_lac = true;
		for (var j = 0, l = gt.bc[i].ts.length; j < l; j++)
			if (gt.bc[i].ts[j] === false)
				this.nb_cs_inacheves++;
	};
	
	this.diminuer_nb_cs_inacheves = function() {
		this.nb_cs_inacheves--;
	};
	
	this.fusioner = function(propre_id, id_ec) {
		// déplacer les bc
		for (var i = 0, l = gt.ec[id_ec].id_bc.length; i < l; i++) {
			gt.bc[ gt.ec[id_ec].id_bc[i] ].id_ec = propre_id;
			this.id_bc[this.id_bc.length] = gt.ec[id_ec].id_bc[i];
		}
		// faire la somme des nb_cs_inacheves
		this.nb_cs_inacheves += gt.ec[id_ec].nb_cs_inacheves;
		// "déplacer" la présence d'un lac
		if (gt.ec[id_ec].presence_lac)
			this.presence_lac = true;
		// déplacer les partisans
		if (gt.ec[id_ec].presence_ps)
			this.presence_ps = true;
		for (var i = 0, k, l; i < 4; i++)
			this.ps[i] += gt.ec[id_ec].ps[i];
		for (i = 0, k = this.id_ps.length, l = gt.ec[id_ec].id_ps.length; i < l; i++)
			this.id_ps[i+k] = gt.ec[id_ec].id_ps[i];
		// supprimer l'id_ec vidé
		gt.ec[id_ec] = false;
	};
	
	this.ajouter_ps = function(id, faction) {
		this.ps[faction]++;
		this.id_ps[this.id_ps.length] = id;
		this.presence_ps = true;
	};
	
	this.compter_les_points = function() {
		if (this.presence_ps) {
			// calcul des points
			for (var i = 0, c = this.id_bc.length, t = [], j, ct, b; i < c; i++) {
				for (j = 0, ct = t.length, b = false; j < ct; j++)
					if (b = (gt.bc[this.id_bc[i]].x == t[j][0] && gt.bc[this.id_bc[i]].y == t[j][1]))
						break;
				if (!b)
					t[ct] = [gt.bc[this.id_bc[i]].x, gt.bc[this.id_bc[i]].y];
			}
			var pts = (this.presence_lac) ? (this.termine ? t.length*2 : 0) : t.length;
			// suppression des partisans
			ap.supprimer(this.id_ps);
			// joueur1
			if (this.ps[0] != 0) {
				if (this.ps[0] >= this.ps[1] && this.ps[0] >= this.ps[2] && this.ps[0] >= this.ps[3]) {
					pa.jos[0].recevoir_pts(pts, 0);
					set_log(pa.jos[0].nom+" reçoit "+pts+" points. (voleur)");
				}
				pa.jos[0].recuperer_ps(this.ps[0], 0);
			}
			// joueur2
			if (this.ps[1] != 0) {
				if (this.ps[1] >= this.ps[0] && this.ps[1] >= this.ps[2] && this.ps[1] >= this.ps[3]) {
					pa.jos[1].recevoir_pts(pts, 1);
					set_log(pa.jos[1].nom+" reçoit "+pts+" points. (voleur)");
				}
				pa.jos[1].recuperer_ps(this.ps[1], 1);
			}
			// joueur3
			if (this.ps[2] != 0) {
				if (this.ps[2] >= this.ps[0] && this.ps[2] >= this.ps[1] && this.ps[2] >= this.ps[3]) {
					pa.jos[2].recevoir_pts(pts, 2);
					set_log(pa.jos[2].nom+" reçoit "+pts+" points. (voleur)");
				}
				pa.jos[2].recuperer_ps(this.ps[2], 2);
			}
			// joueur4
			if (this.ps[3] != 0) {
				if (this.ps[3] >= this.ps[0] && this.ps[3] >= this.ps[1] && this.ps[3] >= this.ps[2]) {
					pa.jos[3].recevoir_pts(pts, 3);
					set_log(pa.jos[3].nom+" reçoit "+pts+" points. (voleur)");
				}
				pa.jos[3].recuperer_ps(this.ps[3], 3);
			}
		}
		this.ps = [0,0,0,0];
		this.termine = true;
	};
}