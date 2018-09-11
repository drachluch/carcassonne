function ph1_lancement() {
	phase = 0;
	document.getElementById("tour_tuile_joueur"+(parseInt(tj.akiceltour_t)+1)).src = 'icone/akiceltour_tuile.png';
	var pile_principale;
	var pile_2e_chance;
	var donnees;
	var i, j, c, c1;
	var cs;
	
	tj.tp = false; // initialisation de la tuile provisoire
	
	do {
		tj.tc = "";
		tj.pss = [];
		cs = [0, 0, 0, 0];
		
		pile_principale = gt.t_dispo.length != 0;
		pile_2e_chance = gt.t2e_chance.length != 0;
		
		if (pile_principale || pile_2e_chance) {
			if (pile_principale) {
				tj.tc = gt.t_dispo[0];
				gt.t_dispo.shift();
			} else {
				tj.tc = gt.t2e_chance[0];
				gt.t2e_chance.shift();
			}
			
			donnees = tj.tc.split('_');
			for (i = 1, c = donnees.length; i < c; i++)
				switch(donnees[i][0]) {
					case 'c':
						donnees[i] = donnees[i].split('');
						for (j = 1, c1 = donnees[i].length; j < c1; j++)
							cs[donnees[i][j]] = 1;
						break;
					case 'v':
						donnees[i] = donnees[i].split('');
						for (j = 1, c1 = donnees[i].length; j < c1; j++)
							cs[donnees[i][j]] = 2;
						break;
					case 'f':
						donnees[i] = donnees[i].split('');
						for (j = 1, c1 = donnees[i].length; j < c1; j++)
							cs[donnees[i][j]] = 3;
						break;
					default: break;
				}
			
			for (i = 0, c = gt.emp_dispo.length; i < c; i++) {
				j = [gt.emp_dispo[i][0], gt.emp_dispo[i][1]];
				c1 = [-1,-1,-1,-1];
				c1[0] = gt.contrainte_environnement(gt.emp_dispo[i][0]+1, gt.emp_dispo[i][1]  , 2);
				c1[1] = gt.contrainte_environnement(gt.emp_dispo[i][0]  , gt.emp_dispo[i][1]-1, 3);
				c1[2] = gt.contrainte_environnement(gt.emp_dispo[i][0]-1, gt.emp_dispo[i][1]  , 0);
				c1[3] = gt.contrainte_environnement(gt.emp_dispo[i][0]  , gt.emp_dispo[i][1]+1, 1);
				
				if ((c1[0] == -1 || c1[0] == cs[0]) && (c1[1] == -1 || c1[1] == cs[1]) && (c1[2] == -1 || c1[2] == cs[2]) && (c1[3] == -1 || c1[3] == cs[3]))
					j[j.length] = 0;
				if ((c1[0] == -1 || c1[0] == cs[3]) && (c1[1] == -1 || c1[1] == cs[0]) && (c1[2] == -1 || c1[2] == cs[1]) && (c1[3] == -1 || c1[3] == cs[2]))
					j[j.length] = 1;
				if ((c1[0] == -1 || c1[0] == cs[2]) && (c1[1] == -1 || c1[1] == cs[3]) && (c1[2] == -1 || c1[2] == cs[0]) && (c1[3] == -1 || c1[3] == cs[1]))
					j[j.length] = 2;
				if ((c1[0] == -1 || c1[0] == cs[1]) && (c1[1] == -1 || c1[1] == cs[2]) && (c1[2] == -1 || c1[2] == cs[3]) && (c1[3] == -1 || c1[3] == cs[0]))
					j[j.length] = 3;
				
				if (j.length > 2) {
					tj.pss[tj.pss.length] = j;
					document.getElementById("img"+j[0]+";"+j[1]).src = "tuiles/emplacement_possible.png";
				}
			}
		} else {
			set_log("Erreur: Aucune tuile disponible. Fin de partie déclenché.");
			set_message("Erreur: Aucune tuile disponible.", "rouge");
			tj.fin_de_partie();
			tj.tc = "";
		}
	} while(tj.pss.length == 0);
	
	if (tj.tc != "") {
		tj.psc = [0,0];
		
		document.getElementById("img"+tj.pss[0][0]+";"+tj.pss[0][1]).src = "tuiles/"+tj.pss[0][2]+tj.tc+".png";
		
		rs.X = tj.pss[0][0];
		rs.Y = tj.pss[0][1];
		rs.activer("b");
		set_etat("Placement d'une tuile par "+pa.jos[tj.akiceltour_t].nom+".", "fond");
		
		tj.phase = 1;
		phase = 1;
	}
}

function ph1_position_suivante() {
	phase = 0;
	document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/emplacement_possible.png";
	tj.psc[0] = tj.psc[0] == tj.pss.length-1 ? 0 : tj.psc[0]+1;
	tj.psc[1] = 0;
	document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/"+tj.pss[tj.psc[0]][2]+tj.tc+".png";
	
	rs.X = tj.pss[tj.psc[0]][0];
	rs.Y = tj.pss[tj.psc[0]][1];
	rs.activer("b");
	phase = 1;
}

function ph1_rotation_tuile() {
	phase = 0;
	if (rs.X == tj.pss[tj.psc[0]][0] && rs.Y == tj.pss[tj.psc[0]][1]) {
		tj.psc[1] = tj.psc[1] == tj.pss[tj.psc[0]].length-3 ? 0 : tj.psc[1]+1;
		document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/"+tj.pss[tj.psc[0]][tj.psc[1]+2]+tj.tc+".png";
	}
	phase = 1;
}

function ph1_augmenterX() {
	phase = 0;
	if (rs.X < pl.x_max) {
		if (rs.X == tj.pss[tj.psc[0]][0] && rs.Y == tj.pss[tj.psc[0]][1])
			document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/emplacement_possible.png";
		rs.X++;
		var herbert = rs.test_pss_xy();
		if (herbert == -1) {
			rs.activer("r");
		} else {
			tj.psc = [herbert, 0];
			document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/"+tj.pss[tj.psc[0]][2]+tj.tc+".png";
			rs.activer("b");
		}
	}
	phase = 1;
}

function ph1_augmenterY() {
	phase = 0;
	if (rs.Y < pl.y_max) {
		if (rs.X == tj.pss[tj.psc[0]][0] && rs.Y == tj.pss[tj.psc[0]][1])
			document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/emplacement_possible.png";
		rs.Y++;
		var herbert = rs.test_pss_xy();
		if (herbert == -1) {
			rs.activer("r");
		} else {
			tj.psc = [herbert, 0];
			document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/"+tj.pss[tj.psc[0]][2]+tj.tc+".png";
			rs.activer("b");
		}
	}
	phase = 1;
}

function ph1_diminuerX() {
	phase = 0;
	if (rs.X > pl.x_min) {
		if (rs.X == tj.pss[tj.psc[0]][0] && rs.Y == tj.pss[tj.psc[0]][1])
			document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/emplacement_possible.png";
		rs.X--;
		var herbert = rs.test_pss_xy();
		if (herbert == -1) {
			rs.activer("r");
		} else {
			tj.psc = [herbert, 0];
			document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/"+tj.pss[tj.psc[0]][2]+tj.tc+".png";
			rs.activer("b");
		}
	}
	phase = 1;
}

function ph1_diminuerY() {
	phase = 0;
	if (rs.Y > pl.y_min) {
		if (rs.X == tj.pss[tj.psc[0]][0] && rs.Y == tj.pss[tj.psc[0]][1])
			document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/emplacement_possible.png";
		rs.Y--;
		var herbert = rs.test_pss_xy();
		if (herbert == -1) {
			rs.activer("r");
		} else {
			tj.psc = [herbert, 0];
			document.getElementById("img"+tj.pss[tj.psc[0]][0]+";"+tj.pss[tj.psc[0]][1]).src = "tuiles/"+tj.pss[tj.psc[0]][2]+tj.tc+".png";
			rs.activer("b");
		}
	}
	phase = 1;
}

function fin_ph1(partisan) {
	phase = 0;
	if (rs.X == tj.pss[tj.psc[0]][0] && rs.Y == tj.pss[tj.psc[0]][1]) {
		set_log(pa.jos[tj.akiceltour_t].nom+" a placé une tuile.");
		rs.desactiver();
		var id_bx = gt.ajouter((partisan ? tj.pss_ps[tj.psc_ps[0]][0] : false), (partisan ? tj.pss_ps[tj.psc_ps[0]][tj.psc_ps[1]+1] : 0));
		
		pl.determiner_elargissements_necessaires();
		gt.remettre_imageVide_sur_emp_dispo();
		gt.determiner_nouveaux_emp_dispo();
		
		if (partisan) {
			pp.desactiver();
			pa.jos[tj.akiceltour_t].placer_ps(tj.akiceltour_t);
			pp.exporter(id_bx);
		}
		
		tj.phase = 0;
		tj.condition_fin_de_partie();
	} else {
		phase = 1;
	}
}