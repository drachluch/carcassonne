function TP(x,y, nom, rotation) {
	this.nom = nom;
	this.rotation = rotation;
	
	this.x = x;
	this.y = y;
	
	/*
	Les bc ont pour id_ec uniquement les id_ec tels que : id_ec = this.ec_influences[n][0];
	de même pour les bv et bz
	*/
	
	this.bc = [];
	this.bv = [];
	this.bf = [];
	this.bz = [];
	this.ab = false;
	
	this.bc_influences = [];
	this.ec_influences = [];
	
	this.bv_influences = [];
	this.ev_influences = [];
	
	this.bz_influences = [];
	this.ez_influences = [];
	
	this.extraction_donnees = function() {
		var B, id_B, donnees = nom.split('_');
		// Bx
		for (var i = 1, c = donnees.length; i < c; i++) // TO DO, toutes les fonctions ici présentes et les autres et le reste + finir le projet
			switch(donnees[i][0]) {
				case 'a':
					this.ab = new AB(x,y);
					break;
				case 'c':
					B = new BC(x,y);
					B.read(donnees[i], this.rotation);
					this.bc[this.bc.length] = B;
					break;
				case 'v':
					B = new BV(x,y);
					B.read(donnees[i], this.rotation);
					this.bv[this.bv.length] = B;
					break;
				case 'f':
					B = new BF(x, y);
					B.read(donnees[i], this.rotation);
					this.bf[this.bf.length] = B;
					break;
				case 'z':
					B = new BZ(x, y);
					B.read(donnees[i], this.rotation);
					this.bz[this.bz.length] = B;
					break;
				default:
					set_log("Le nom de la tuile contient une erreur (premier caractère après _): "+this.nom+".");
					break;
			}
	};
	
	this.gerer_Ex = function() {
		for (var i = 0, l = this.bc.length; i < l; i++)
			for (j = 0, l1 = this.bc[i].cs.length; j < l1; j++)
				switch(this.bc[i].cs[j]) {
					case 0: this.decider_bc(i, j, x+1, y, 2); break;
					case 1: this.decider_bc(i, j, x, y-1, 3); break;
					case 2: this.decider_bc(i, j, x-1, y, 0); break;
					case 3: this.decider_bc(i, j, x, y+1, 1); break;
					default: break;
				}
		for (var i = 0, l = this.bv.length; i < l; i++)
			for (j = 0, l1 = this.bv[i].cs.length; j < l1; j++)
				switch(this.bv[i].cs[j]) {
					case 0: this.decider_bv(i, j, x+1, y, 2); break;
					case 1: this.decider_bv(i, j, x, y-1, 3); break;
					case 2: this.decider_bv(i, j, x-1, y, 0); break;
					case 3: this.decider_bv(i, j, x, y+1, 1); break;
					default: break;
				}
		for (var i = 0, l = this.bz.length; i < l; i++)
			for (j = 0, l1 = this.bz[i].cs.length; j < l1; j++)
				switch(this.bz[i].cs[j]) {
					case 0: this.decider_bz(i, j, x+1, y, 5); break;
					case 1: this.decider_bz(i, j, x+1, y, 4); break;
					case 2: this.decider_bz(i, j, x, y-1, 7); break;
					case 3: this.decider_bz(i, j, x, y-1, 6); break;
					case 4: this.decider_bz(i, j, x-1, y, 1); break;
					case 5: this.decider_bz(i, j, x-1, y, 0); break;
					case 6: this.decider_bz(i, j, x, y+1, 3); break;
					case 7: this.decider_bz(i, j, x, y+1, 2); break;
					default: break;
				}
		if (this.ab) {
			this.ab.calculer_nb_ts_inacheves();
		}
	};
	
	this.decider_bc = function(i, j, x, y, c) {
		if (gt.dt[x])
			if (gt.dt[x][y]) {
				this.bc[i].ts[j] = true;
				for (var i0 = 0, j0, l1, t = gt.dt[x][y].id_bc, l = t.length; i0 < l; i0++) {
					for (j0 = 0, l1 = gt.bc[t[i0]].cs.length; j0 < l1; j0++)
						if (gt.bc[t[i0]].cs[j0] == c) {
							this.bc_influences[this.bc_influences.length] = [t[i0], j0];
							var herbert = this.presence_id_ec_dans_ec_fusion(gt.bc[t[i0]].id_ec);
							if (this.bc[i].id_ec === false) {
								if (herbert === false) {
									this.bc[i].id_ec = gt.bc[t[i0]].id_ec;
									this.ec_influences[this.ec_influences.length] = [this.bc[i].id_ec];
								} else {
									this.bc[i].id_ec = this.ec_influences[herbert][0];
								}
							} else {
								if (herbert === false) {
									this.ajouter_id_ec_fusion(this.bc[i].id_ec, gt.bc[t[i0]].id_ec);
								} else {
									if (this.bc[i].id_ec != this.ec_influences[herbert][0]) {
										this.deplacer_id_ec_fusion(this.bc[i].id_ec, herbert);
									}
								}
							}
							return true;
						}
				}
			}
	};
	
	this.decider_bv = function(i, j, x, y, c) {
		if (gt.dt[x])
			if (gt.dt[x][y]) {
				this.bv[i].ts[j] = true;
				for (var i0 = 0, j0, l1, t = gt.dt[x][y].id_bv, l = t.length; i0 < l; i0++) {
					for (j0 = 0, l1 = gt.bv[t[i0]].cs.length; j0 < l1; j0++)
						if (gt.bv[t[i0]].cs[j0] == c) {
							this.bv_influences[this.bv_influences.length] = [t[i0], j0];
							var herbert = this.presence_id_ev_dans_ev_fusion(gt.bv[t[i0]].id_ev);
							if (this.bv[i].id_ev === false) {
								if (herbert === false) {
									this.bv[i].id_ev = gt.bv[t[i0]].id_ev;
									this.ev_influences[this.ev_influences.length] = [this.bv[i].id_ev];
								} else {
									this.bv[i].id_ev = this.ev_influences[herbert][0];
								}
							} else {
								if (herbert === false) {
									this.ajouter_id_ev_fusion(this.bv[i].id_ev, gt.bv[t[i0]].id_ev);
								} else {
									if (this.bv[i].id_ev != this.ev_influences[herbert][0]) {
										this.deplacer_id_ev_fusion(this.bv[i].id_ev, herbert);
									}
								}
							}
							return true;
						}
				}
			}
	};
	
	this.decider_bz = function (i, j, x, y, c) {
		if (gt.dt[x])
			if (gt.dt[x][y]) {
				this.bz[i].ts[j] = true;
				for (var i0 = 0, j0, l1, t = gt.dt[x][y].id_bz, l = t.length; i0 < l; i0++) {
					for (j0 = 0, l1 = gt.bz[t[i0]].cs.length; j0 < l1; j0++)
						if (gt.bz[t[i0]].cs[j0] == c) {
							this.bz_influences[this.bz_influences.length] = [t[i0], j0];
							var herbert = this.presence_id_ez_dans_ez_fusion(gt.bz[t[i0]].id_ez);
							if (this.bz[i].id_ez === false) {
								if (herbert === false) {
									this.bz[i].id_ez = gt.bz[t[i0]].id_ez;
									this.ez_influences[this.ez_influences.length] = [this.bz[i].id_ez];
								} else {
									this.bz[i].id_ez = this.ez_influences[herbert][0];
								}
							} else {
								if (herbert === false) {
									this.ajouter_id_ez_fusion(this.bz[i].id_ez, gt.bz[t[i0]].id_ez);
								} else {
									if (this.bz[i].id_ez != this.ez_influences[herbert][0]) {
										this.deplacer_id_ez_fusion(this.bz[i].id_ez, herbert);
									}
								}
							}
							return true;
						}
				}
			}
	};
	
	this.presence_id_ec_dans_ec_fusion = function(id_ec) {
		for (var i = 0, j, l0, l = this.ec_influences.length; i < l; i++)
			for (j = 0, l0 = this.ec_influences[i].length; j < l0; j++)
				if (this.ec_influences[i][j] == id_ec)
					return i;
		return false;
	};
	
	this.presence_id_ev_dans_ev_fusion = function(id_ev) {
		for (var i = 0, j, l0, l = this.ev_influences.length; i < l; i++)
			for (j = 0, l0 = this.ev_influences[i].length; j < l0; j++)
				if (this.ev_influences[i][j] == id_ev)
					return i;
		return false;
	};
	
	this.presence_id_ez_dans_ez_fusion = function(id_ez) {
		for (var i = 0, j, l0, l = this.ez_influences.length; i < l; i++)
			for (j = 0, l0 = this.ez_influences[i].length; j < l0; j++)
				if (this.ez_influences[i][j] == id_ez)
					return i;
		return false;
	};
	
	this.deplacer_id_ec_fusion = function(id_ec, herbert) {
		// modification de l'id_ec des bc concernés, car l'id_ec doit vérifier: bc.id_ec = this.ec_influences[n][0]
		for (var i = 0, j, k, l = this.bc.length; i < l; i++)
			if (this.bc[i].id_ec == this.ec_influences[herbert][0])
				this.bc[i].id_ec = id_ec;
		// obtention du rang i qui vérifie la condition ci-dessous
		for (i = 0, l = this.ec_influences.length; i < l; i++)
			if (this.ec_influences[i][0] == id_ec)
				break;
		// déplacement du contenu du tableau de rang herbert vers celui de rang i
		for (j = 0, k = this.ec_influences[i].length, l = this.ec_influences[herbert].length; j < l; j++)
			this.ec_influences[i][j+k] = this.ec_influences[herbert][k];
		// déplacement des tableau de rang supérieur à herbert afin de boucher le trou
		for (i = herbert+1, l = this.ec_influences.length; i < l; i++)
			this.ec_influences[i-1] = this.ec_influences[i];
		// suppression du dernier rang, puisqu'on a déplacé le trou jusqu'à lui
		this.ec_influences.pop();
	};
	
	this.deplacer_id_ev_fusion = function(id_ev, herbert) {
		for (var i = 0, j, k, l = this.bv.length; i < l; i++)
			if (this.bv[i].id_ev == this.ev_influences[herbert][0])
				this.bv[i].id_ev = id_ev;
		for (i = 0, l = this.ev_influences.length; i < l; i++)
			if (this.ev_influences[i][0] == id_ev)
				break;
		for (j = 0, k = this.ev_influences[i].length, l = this.ev_influences[herbert].length; j < l; j++)
			this.ev_influences[i][j+k] = this.ev_influences[herbert][k];
		for (i = herbert+1, l = this.ev_influences.length; i < l; i++)
			this.ev_influences[i-1] = this.ev_influences[i];
		this.ev_influences.pop();
	};
	
	this.deplacer_id_ez_fusion = function(id_ez, herbert) {
		for (var i = 0, j, k, l = this.bz.length; i < l; i++)
			if (this.bz[i].id_ez == this.ez_influences[herbert][0])
				this.bz[i].id_ez = id_ez;
		for (i = 0, l = this.ez_influences.length; i < l; i++)
			if (this.ez_influences[i][0] == id_ez)
				break;
		for (j = 0, k = this.ez_influences[i].length, l = this.ez_influences[herbert].length; j < l; j++)
			this.ez_influences[i][j+k] = this.ez_influences[herbert][k];
		for (i = herbert+1, l = this.ez_influences.length; i < l; i++)
			this.ez_influences[i-1] = this.ez_influences[i];
		this.ez_influences.pop();
	};
	
	this.ajouter_id_ec_fusion = function(id_ec0, id_ec_a_ajouter) {
		for (var i = 0, l = this.ec_influences.length; i < l; i++)
			if (this.ec_influences[i][0] == id_ec0) {
				this.ec_influences[i][this.ec_influences[i].length] = id_ec_a_ajouter;
				break;
			}
	};
	
	this.ajouter_id_ev_fusion = function(id_ev0, id_ev_a_ajouter) {
		for (var i = 0, l = this.ev_influences.length; i < l; i++)
			if (this.ev_influences[i][0] == id_ev0) {
				this.ev_influences[i][this.ev_influences[i].length] = id_ev_a_ajouter;
				break;
			}
	};
	
	this.ajouter_id_ez_fusion = function(id_ez0, id_ez_a_ajouter) {
		for (var i = 0, l = this.ez_influences.length; i < l; i++)
			if (this.ez_influences[i][0] == id_ez0) {
				this.ez_influences[i][this.ez_influences[i].length] = id_ez_a_ajouter;
				break;
			}
	};
	
	this.determiner_possibilites_placement_partisan_sur_bc = function() {
		for (var i = 0, n, j, k, l0, l1, somme_nb_cs_inacheves, l = this.bc.length; i < l; i++) {
			if (this.bc[i].id_ec === false) {
				tj.pss_c[tj.pss_c.length] = i;
			} else {
				// recherche du rang n tel que this.bc[i].id_ec = this.ec_influences[n][0]
				for (n = 0, l0 = this.ec_influences.length; n < l0; n++)
					if (this.bc[i].id_ec == this.ec_influences[n][0])
						break;
				// s'il n'y a aucun partisan dans chacun des ensembles qui fusionnent
				for (j = 0, l0 = this.ec_influences[n].length; j < l0; j++)
					if (gt.ec[ this.ec_influences[n][j] ].presence_ps) {
						j = false;
						break;
					}
				
				if (j !== false) {
					// si le bout de chemin qu'on étudie propose un coté inachevé
					for (j = 0, somme_nb_cs_inacheves = 0, l0 = this.bc[i].ts.length; j < l0; j++)
						if (this.bc[i].ts[j] === false)
							somme_nb_cs_inacheves++;
					
					if (somme_nb_cs_inacheves > 0) {
						tj.pss_c[tj.pss_c.length] = i;
					} else {
						// si la somme les nb_cs_inacheves n'est pas nul
						for (j = 0, somme_nb_cs_inacheves = 0, l0 = this.ec_influences[n].length, l1 = this.bc_influences.length; j < l0; j++) {
							somme_nb_cs_inacheves += gt.ec[ this.ec_influences[n][j] ].nb_cs_inacheves;
							for (k = 0; k < l1; k++) {
								if (gt.bc[ this.bc_influences[k][0] ].id_ec == this.ec_influences[n][j]) {
									somme_nb_cs_inacheves--;
								}
							}
						}
						
						if (somme_nb_cs_inacheves > 0) {
							tj.pss_c[tj.pss_c.length] = i;
						} else {
							if (somme_nb_cs_inacheves < 0) {
								alert("Erreur ! somme_nb_cs_inacheves négatives !! (class_tp/l:173)");
							}
						}
					}
				}
			}
		}
	};
	
	this.determiner_possibilites_placement_partisan_sur_bv = function() {
		for (var i = 0, n, j, k, l0, l1, somme_nb_cs_inacheves, l = this.bv.length; i < l; i++) {
			if (this.bv[i].id_ev === false) {
				tj.pss_v[tj.pss_v.length] = i;
			} else {
				for (n = 0, l0 = this.ev_influences.length; n < l0; n++)
					if (this.bv[i].id_ev == this.ev_influences[n][0])
						break;
				for (j = 0, l0 = this.ev_influences[n].length; j < l0; j++)
					if (gt.ev[ this.ev_influences[n][j] ].presence_ps) {
						j = false;
						break;
					}
				
				if (j !== false) {
					for (j = 0, somme_nb_cs_inacheves = 0, l0 = this.bv[i].ts.length; j < l0; j++)
						if (this.bv[i].ts[j] === false)
							somme_nb_cs_inacheves++;
					
					if (somme_nb_cs_inacheves > 0) {
						tj.pss_v[tj.pss_v.length] = i;
					} else {
						// si la somme les nb_cs_inacheves n'est pas nul
						for (j = 0, somme_nb_cs_inacheves = 0, l0 = this.ev_influences[n].length, l1 = this.bv_influences.length; j < l0; j++) {
							somme_nb_cs_inacheves += gt.ev[ this.ev_influences[n][j] ].nb_cs_inacheves;
							for (k = 0; k < l1; k++) {
								if (gt.bv[ this.bv_influences[k][0] ].id_ev == this.ev_influences[n][j]) {
									somme_nb_cs_inacheves--;
								}
							}
						}
						
						if (somme_nb_cs_inacheves > 0) {
							tj.pss_v[tj.pss_v.length] = i;
						}
					}
				}
			}
		}
	};
	
	this.determiner_possibilites_placement_partisan_sur_bz = function() {
		for (var i = 0, n, j, k, l0, l1, somme_nb_cs_inacheves, l = this.bz.length; i < l; i++) {
			if (this.bz[i].id_ez === false) {
				tj.pss_z[tj.pss_z.length] = i;
			} else {
				for (n = 0, l0 = this.ez_influences.length; n < l0; n++)
					if (this.bz[i].id_ez == this.ez_influences[n][0])
						break;
				for (j = 0, l0 = this.ez_influences[n].length; j < l0; j++)
					if (gt.ez[ this.ez_influences[n][j] ].presence_ps) {
						j = false;
						break;
					}
				
				if (j !== false) {
					for (j = 0, somme_nb_cs_inacheves = 0, l0 = this.bz[i].ts.length; j < l0; j++)
						if (this.bz[i].ts[j] === false)
							somme_nb_cs_inacheves++;
					
					if (somme_nb_cs_inacheves > 0) {
						tj.pss_z[tj.pss_z.length] = i;
					} else {
						// si la somme les nb_cs_inacheves n'est pas nul
						for (j = 0, somme_nb_cs_inacheves = 0, l0 = this.ez_influences[n].length, l1 = this.bz_influences.length; j < l0; j++) {
							somme_nb_cs_inacheves += gt.ez[ this.ez_influences[n][j] ].nb_cs_inacheves;
							for (k = 0; k < l1; k++) {
								if (gt.bz[ this.bz_influences[k][0] ].id_ez == this.ez_influences[n][j]) {
									somme_nb_cs_inacheves--;
								}
							}
						}
						
						if (somme_nb_cs_inacheves > 0) {
							tj.pss_z[tj.pss_z.length] = i;
						}
					}
				}
			}
		}
	};
	
	this.determiner_possibilite_placement_partisan_sur_ab = function() {
		if (this.ab !== false) {
			tj.pss_a[0] = 1;
		}
	};
}