function EZ() {
	this.id_bz = []; // bout de zone
	this.nb_cs_inacheves = 0;
	this.presence_ps = false; // presence partisan
	this.ps = [0,0,0,0]; // partisans
	this.id_ps = []; // id partisan
	this.termine = false;
	
	this.ajouter_bz = function(i) {
		this.id_bz[this.id_bz.length] = i;
		for (var j = 0, l = gt.bz[i].ts.length; j < l; j++)
			if (gt.bz[i].ts[j] === false)
				this.nb_cs_inacheves++;
	};
	
	this.diminuer_nb_cs_inacheves = function() {
		this.nb_cs_inacheves--;
	};
	
	this.fusioner = function(propre_id, id_ez) {
		var ez;
		if (ez = gt.ez[id_ez]) {
			// recuperation des bouts de zone
			for (var i = 0, c = ez.id_bz.length; i < c; i++) {
				gt.bz[ez.id_bz[i]].id_ez = propre_id;
				this.id_bz[this.id_bz.length] = ez.id_bz[i];
			}
			// faire la somme des nb_cs_inacheves
			this.nb_cs_inacheves += ez.nb_cs_inacheves;
			// recuperation des partisans
			if (ez.presence_ps)
				this.presence_ps = true;
			for (i = 0; i < 4; i++)
				this.ps[i] = this.ps[i]+ez.ps[i];
			for (i = 0, k = this.id_ps.length, l = ez.id_ps.length; i < l; i++)
				this.id_ps[i+k] = ez.id_ps[i];
			// suppression de l'ensemble
			gt.ez[id_ez] = false;
		} else {
			db.afficher_ensemble(propre_id);
			set_log("Erreur: id_ez='"+id_ez+"' incorrect !");
			set_log("La fusion des ensembles zone n'a pas eu lieu !");
			set_log("La partie est corrompue !");
			alert("Saperlipopette ! La troll box n'existe pas !");
		}
	};
	
	this.ajouter_ps = function(id, faction) {
		this.ps[faction]++;
		this.id_ps[this.id_ps.length] = id;
		this.presence_ps = true;
	};
	
	this.compter_pts = function() {
		if (this.presence_ps) {
			// calcul des points
			for (var i = 0, j, c = this.id_bz.length, id_ev = [], c1, c2, b; i < c; i++) {
				for (j = 0, c1 = gt.bz[this.id_bz[i]].id_bvA.length; j < c1; j++) {
					for (k = 0, b = false, c2 = id_ev.length; k < c2; k++)
						if (b = gt.bv[gt.bz[this.id_bz[i]].id_bvA[j]].id_ev == id_ev[k])
							break;
					if (!b)
						if (gt.ev[gt.bv[gt.bz[this.id_bz[i]].id_bvA[j]].id_ev].nb_cs_inacheves == 0)
							id_ev[c2] = gt.bv[gt.bz[this.id_bz[i]].id_bvA[j]].id_ev;
				}
			}
			var pts = 2*id_ev.length;
			// suppression des partisans
			ap.supprimer(this.id_ps);
			// joueur1
			if (this.ps[0] != 0) {
				if (this.ps[0] >= this.ps[1] && this.ps[0] >= this.ps[2] && this.ps[0] >= this.ps[3]) {
					pa.jos[0].recevoir_pts(pts, 0);
					set_log(pa.jos[0].nom+" reçoit "+pts+" points. (paysan)");
				}
				pa.jos[0].recuperer_ps(this.ps[0], 0);
			}
			// joueur2
			if (this.ps[1] != 0) {
				if (this.ps[1] >= this.ps[0] && this.ps[1] >= this.ps[2] && this.ps[1] >= this.ps[3]) {
					pa.jos[1].recevoir_pts(pts, 1);
					set_log(pa.jos[1].nom+" reçoit "+pts+" points. (paysan)");
				}
				pa.jos[1].recuperer_ps(this.ps[1], 1);
			}
			// joueur3
			if (this.ps[2] != 0) {
				if (this.ps[2] >= this.ps[0] && this.ps[2] >= this.ps[1] && this.ps[2] >= this.ps[3]) {
					pa.jos[2].recevoir_pts(pts, 2);
					set_log(pa.jos[2].nom+" reçoit "+pts+" points. (paysan)");
				}
				pa.jos[2].recuperer_ps(this.ps[2], 2);
			}
			// joueur4
			if (this.ps[3] != 0) {
				if (this.ps[3] >= this.ps[0] && this.ps[3] >= this.ps[1] && this.ps[3] >= this.ps[2]) {
					pa.jos[3].recevoir_pts(pts, 3);
					set_log(pa.jos[3].nom+" reçoit "+pts+" points. (paysan)");
				}
				pa.jos[3].recuperer_ps(this.ps[3], 3);
			}
		}
		this.ps = [0,0,0,0];
		this.termine = true;
	};
}