function GT() { // GestionTuile
	this.t_dispo = []; // tuiles disponibles
	this.t_fleuve = []; // tuiles fleuves disponibles
	this.t2e_chance = []; // tuiles deuxieme chance
	
	this.emp_dispo = [[0,0]]; // emplacements disponibles
	this.dt = []; // disposition tuiles
	
	this.bc = []; // bout de chemin
	this.bf = []; // bout de fleuve
	this.bv = []; // bout de ville
	this.bz = []; // bout de zone
	
	this.ec = []; // ensemble de chemin
	this.ev = []; // ensemble de ville
	this.ez = []; // ensemble de zone
	this.ab = []; // abbaye
	
	this.ajouter = function (Bx, idr) {
		if (tj.tp === false)
			tj.creer_tp();
		var td = new TD(tj.tp.x, tj.tp.y, tj.tp.nom, tj.tp.rotation);
		var id_bv = []; // liste des identifiants des villes nouvellement ajoutées
		var id_bx = false;
		// ajout des Bx
		for (var i = 0, j = this.bc.length, l0, l = tj.tp.bc.length; i < l; i++) {
			this.bc[i+j] = tj.tp.bc[i];
			if (this.bc[i+j].id_ec === false) {
				this.bc[i+j].id_ec = this.creer_ec(i+j);
			} else {
				this.ec[ this.bc[i+j].id_ec ].ajouter_bc(i+j);
			}
			td.id_bc[td.id_bc.length] = i+j;
			if (Bx == 'c' && idr == i)
				id_bx = i+j;
		}
		for (i = 0, j = this.bv.length, l = tj.tp.bv.length; i < l; i++) {
			id_bv[i] = i+j;
			this.bv[i+j] = tj.tp.bv[i];
			if (this.bv[i+j].id_ev === false) {
				this.bv[i+j].id_ev = this.creer_ev(i+j);
			} else {
				this.ev[ this.bv[i+j].id_ev ].ajouter_bv(i+j);
			}
			td.id_bv[td.id_bv.length] = i+j;
			if (Bx == 'v' && idr == i)
				id_bx = i+j;
		}
		for (i = 0, j = this.bf.length, l = tj.tp.bf.length; i < l; i++) {
			this.bf[i+j] = tj.tp.bf[i];
			td.id_bf[td.id_bf.length] = i+j;
		}
		for (i = 0, j = this.bz.length, l = tj.tp.bz.length; i < l; i++) {
			this.bz[i+j] = tj.tp.bz[i];
			if (this.bz[i+j].id_ez === false) {
				this.bz[i+j].id_ez = this.creer_ez(i+j);
			} else {
				this.ez[ this.bz[i+j].id_ez ].ajouter_bz(i+j);
			}
			this.bz[i+j].recevoir_id_bvA(id_bv);
			td.id_bz[td.id_bz.length] = i+j;
			if (Bx == 'z' && idr == i)
				id_bx = i+j;
		}
		if (tj.tp.ab != false) {
			if (Bx == 'a')
				id_bx = this.ab.length;
			this.ab[this.ab.length] = tj.tp.ab;
		}
		// supprimer cet emplacement disponible
		this.supprimer_emp_dispo(td.x, td.y);
		// extraction des info à partir du nom de la tuile
		if (!this.dt[td.x])
			this.dt[td.x] = [];
		this.dt[td.x][td.y] = td;
		
		// - cs terminés
		for (i = 0, l = tj.tp.bc_influences.length; i < l; i++) {
			this.bc[ tj.tp.bc_influences[i][0] ].ts[ tj.tp.bc_influences[i][1] ] = true;
			this.ec[ this.bc[ tj.tp.bc_influences[i][0] ].id_ec ].diminuer_nb_cs_inacheves();
		}
		for (i = 0, l = tj.tp.bv_influences.length; i < l; i++) {
			this.bv[ tj.tp.bv_influences[i][0] ].ts[ tj.tp.bv_influences[i][1] ] = true;
			this.ev[ this.bv[ tj.tp.bv_influences[i][0] ].id_ev ].diminuer_nb_cs_inacheves();
		}
		for (i = 0, l = tj.tp.bz_influences.length; i < l; i++) {
			this.bz[ tj.tp.bz_influences[i][0] ].ts[ tj.tp.bz_influences[i][1] ] = true;
			this.ez[ this.bz[ tj.tp.bz_influences[i][0] ].id_ez ].diminuer_nb_cs_inacheves();
		}
		// - fusion nécessaires
		for (i = 0, l = tj.tp.ec_influences.length; i < l; i++)
			for (j = 1, l0 = tj.tp.ec_influences[i].length; j < l0; j++)
				this.ec[ tj.tp.ec_influences[i][0] ].fusioner(tj.tp.ec_influences[i][0], tj.tp.ec_influences[i][j]);
		// - vérification des ensembles terminés
		for (i = 0; i < l; i++)
			if (gt.ec[ tj.tp.ec_influences[i][0] ].nb_cs_inacheves <= 0)
				gt.ec[ tj.tp.ec_influences[i][0] ].compter_les_points();
		// - fusion nécessaires
		for (i = 0, l = tj.tp.ev_influences.length; i < l; i++)
			for (j = 1, l0 = tj.tp.ev_influences[i].length; j < l0; j++)
				this.ev[ tj.tp.ev_influences[i][0] ].fusioner(tj.tp.ev_influences[i][0], tj.tp.ev_influences[i][j]);
		// - vérification des ensembles terminés
		for (i = 0; i < l; i++)
			if (gt.ev[ tj.tp.ev_influences[i][0] ].nb_cs_inacheves <= 0)
				gt.ev[ tj.tp.ev_influences[i][0] ].compter_pts();
		// - fusion nécessaires
		for (i = 0, l = tj.tp.ez_influences.length; i < l; i++)
			for (j = 1, l0 = tj.tp.ez_influences[i].length; j < l0; j++) {
				this.ez[ tj.tp.ez_influences[i][0] ].fusioner(tj.tp.ez_influences[i][0], tj.tp.ez_influences[i][j]);
			}
		// - vérification des ensembles terminés => aucune nécessité.
		// - vérification des abbayes
		for (i = 0, l = this.ab.length; i < l; i++)
			if (this.ab[i].termine == false) {
				if (this.ab[i].x-td.x >= -1 && this.ab[i].x-td.x <= 1 && this.ab[i].y-td.y >= -1 && this.ab[i].y-td.y <= 1)
					this.ab[i].diminuer_nb_ts_inacheves();
				if (this.ab[i].nb_ts_inacheves <= 0)
					this.ab[i].compter_pts();
			}
		
		return id_bx;
	};
	
	this.determiner_nouveaux_emp_dispo = function () {
		var i, c = this.emp_dispo.length, b;
		var x = tj.tp.x, y = tj.tp.y;
		// A GAUCHE
		if (this.dt[x+1] ? !this.dt[x+1][y] : true) {
			for (i = 0, b = false; i < c; i++)
				if (b = this.emp_dispo[i][0] == x+1 && this.emp_dispo[i][1] == y)
					break;
			if (!b)
				// if (!gr.verifier_presence_rempart(x+1,y))
					this.emp_dispo[this.emp_dispo.length] = [x+1,y];
		}
		// EN HAUT
		if (this.dt[x] ? !this.dt[x][y-1] : true) {
			for (i = 0, b = false; i < c; i++)
				if (b = this.emp_dispo[i][0] == x && this.emp_dispo[i][1] == y-1)
					break;
			if (!b)
				// if (!gr.verifier_presence_rempart(x,y-1))
					this.emp_dispo[this.emp_dispo.length] = [x,y-1];
		}
		// A DROITE
		if (this.dt[x-1] ? !this.dt[x-1][y] : true) {
			for (i = 0, b = false; i < c; i++)
				if (b = this.emp_dispo[i][0] == x-1 && this.emp_dispo[i][1] == y)
					break;
			if (!b)
				// if (!gr.verifier_presence_rempart(x-1,y))
					this.emp_dispo[this.emp_dispo.length] = [x-1,y];
		}
		// EN BAS
		if (this.dt[x] ? !this.dt[x][y+1] : true) {
			for (i = 0, b = false; i < c; i++)
				if (b = this.emp_dispo[i][0] == x && this.emp_dispo[i][1] == y+1)
					break;
			if (!b)
				// if (!gr.verifier_presence_rempart(x, y+1))
					this.emp_dispo[this.emp_dispo.length] = [x,y+1];
		}
	};
	
	// Ex
	this.creer_ec = function(id_bc) {
		var ec = new EC();
		ec.ajouter_bc(id_bc);
		for (var i = 0, c = this.ec.length, id = false; i < c; i++)
			if (!this.ec[i]) {
				id = i;
				break;
			}
		if (id === false)
			id = c;
		this.ec[id] = ec;
		return id;
	};
	
	this.creer_ev = function(id_bv) {
		var ev = new EV();
		ev.ajouter_bv(id_bv);
		for (var i = 0, c = this.ev.length, id = false; i < c; i++)
			if (!this.ev[i]) {
				id = i;
				break;
			}
		if (id === false)
			id = c;
		this.ev[id] = ev;
		return id;
	};
	
	this.creer_ez = function(id_bz) {
		var ez = new EZ();
		ez.ajouter_bz(id_bz);
		for (var i = 0, c = this.ez.length, id = false; i < c; i++)
			if (!this.ez[i]) {
				id = i;
				break;
			}
		if (id === false)
			id = c;
		this.ez[id] = ez;
		return id;
	};
	
	this.contrainte_environnement = function(x, y, c) {
		if (this.dt[x])
			if (this.dt[x][y]) {
				for (var i = 0, j, c1, c2 = this.dt[x][y].id_bc.length; i < c2; i++)
					for (j = 0, c1 = this.bc[this.dt[x][y].id_bc[i]].cs.length; j < c1; j++)
						if (this.bc[this.dt[x][y].id_bc[i]].cs[j] == c)
							return 1;
				for (i = 0, c2 = this.dt[x][y].id_bv.length; i < c2; i++)
					for (j = 0, c1 = this.bv[this.dt[x][y].id_bv[i]].cs.length; j < c1; j++)
						if (this.bv[this.dt[x][y].id_bv[i]].cs[j] == c)
							return 2;
				for (i = 0, c2 = this.dt[x][y].id_bf.length; i < c2; i++)
					for (j = 0, c1 = this.bf[this.dt[x][y].id_bf[i]].cs.length; j < c1; j++)
						if (this.bf[this.dt[x][y].id_bf[i]].cs[j] == c)
							return 3;
				return 0; // ne surtout pas mettre en commentaire cette ligne, sinon ce sera l'anarchie
			}
		return -1;
	};
	
	this.remettre_imageVide_sur_emp_dispo = function() {
		for (var i = 0, img, l = this.emp_dispo.length; i < l; i++) {
			img = document.getElementById('img'+this.emp_dispo[i][0]+';'+this.emp_dispo[i][1]);
			img.src = 'tuiles/vide.png';
		}
	};
	
	this.supprimer_emp_dispo = function(x,y) {
		for (var i = 0, t = [], c = this.emp_dispo.length; i < c; i++)
			if (this.emp_dispo[i][0] != x || this.emp_dispo[i][1] != y)
				t[t.length] = this.emp_dispo[i];
		this.emp_dispo = t;
	};
}