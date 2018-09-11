function TJ() { // tour de jeu
	
	this.akiceltour_t = 0; // akiceltour tuile
	
	this.tc = ""; // nom de la tuile choisie
	this.tp = false; // tuile provisoire
	
	this.psc = [0,0]; // possibilite choisie
	this.pss = []; // possibilites
	
	this.psc_ps = [0,0]; // possibilite choisie ps
	this.pss_ps = []; // possibilites ps
	this.pss_c = [];
	this.pss_v = [];
	this.pss_z = [];
	this.pss_a = [];
	
	this.construire_pss_ps = function() {
		var id, l;
		if (l = this.pss_c.length) {
			id = this.pss_ps.length;
			this.pss_ps[id] = ['c'];
			for (i = 0; i < l; i++)
				this.pss_ps[id][i+1] = this.pss_c[i];
		}
		if (l = this.pss_v.length) {
			id = this.pss_ps.length;
			this.pss_ps[id] = ['v'];
			for (i = 0; i < l; i++)
				this.pss_ps[id][i+1] = this.pss_v[i];
		}
		if (l = this.pss_z.length) {
			id = this.pss_ps.length;
			this.pss_ps[id] = ['z'];
			for (i = 0; i < l; i++)
				this.pss_ps[id][i+1] = this.pss_z[i];
		}
		if (this.pss_a.length) {
			this.pss_ps[this.pss_ps.length] = ['a', 1];
		}
	};
	
	// TUILE PROVISOIRE
	this.creer_tp = function() {
		this.tp = new TP(this.pss[this.psc[0]][0], this.pss[this.psc[0]][1], this.tc, this.pss[this.psc[0]][this.psc[1]+2]);
		this.tp.extraction_donnees();
		this.tp.gerer_Ex();
	};
	
	// FIN DE PARTIE
	this.condition_fin_de_partie = function() {
		if (gt.t_dispo.length+gt.t2e_chance.length != 0) {
			document.getElementById("tour_tuile_joueur"+(parseInt(tj.akiceltour_t)+1)).src = 'icone/vide.png';
			this.akiceltour_t = pa.jos.length-1 == this.akiceltour_t ? 0 : this.akiceltour_t+1;
			ph1_lancement();
		} else {
			this.fin_de_partie();
		}
	};
	
	this.fin_de_partie = function() {
		phase = this.phase = 0;
		
		for (var i = 0, l = gt.ec.length; i < l; i++)
			if (gt.ec[i])
				if (!gt.ec[i].termine)
					gt.ec[i].compter_les_points();
		for (i = 0, l = gt.ez.length; i < l; i++)
			if (gt.ez[i])
				gt.ez[i].compter_pts();
		for (i = 0, l = gt.ev.length; i < l; i++)
			if (gt.ev[i])
				if (!gt.ev[i].termine)
					gt.ev[i].compter_pts();
		for (i = 0, l = gt.ab.length; i < l; i++)
			if (!gt.ab[i].termine)
				gt.ab[i].compter_pts();
		
		set_message("La partie a pris fin.", "vert");
		set_etat("Partie terminée.", "fond");
		document.getElementById("form_nouvelle_partie").style.display = "block";
		document.getElementById("nav_aucune_partie_en_cours").style.display = "block";
		document.getElementById("nav_partie_en_cours").style.display = "none";
		pl.x_decal = 0;
		pl.y_decal = 0;
		rs.desactiver();
		document.getElementById("plateau").style.left = (pl.x_decal*70)+"px";
		document.getElementById("plateau").style.top = (pl.y_decal*70)+"px";
		set_log("-------------------------");
	};
}