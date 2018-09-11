function ph2_lancement() {
	phase = 0;
	if (pa.jos[tj.akiceltour_t].ps_dispo > 0) {
		tj.creer_tp();
		// calcul des possibilites
		tj.psc_ps = [0,0];
		tj.pss_ps = [];
		tj.pss_c = [];
		tj.pss_v = [];
		tj.pss_z = [];
		tj.pss_a = [];
		tj.tp.determiner_possibilites_placement_partisan_sur_bc();
		tj.tp.determiner_possibilites_placement_partisan_sur_bv();
		tj.tp.determiner_possibilites_placement_partisan_sur_bz();
		tj.tp.determiner_possibilite_placement_partisan_sur_ab();
		tj.construire_pss_ps();
		
		// => il faudrait retoucher la fonction qui donne les coordonnees_relatives du partisan en fonction de son métier ect.
		
		if (tj.psc_ps.length) {
			tj.phase = 2;
			pp.activer();
			rs.activer("v");
			set_etat("Placement d'un partisan par "+pa.jos[tj.akiceltour_t].nom+". ("+(tj.pss_ps[0][0] == 'c' ? "voleur" : (tj.pss_ps[0][0] == 'v' ? "chevalier" : (tj.pss_ps[0][0] == 'z' ? "paysan" : "moine")))+")", "fond");
			phase = 2;
		} else {
			set_message("Aucun partisan ne peut être placé sur cette tuile.", "rouge");
			tj.tp = false;
			phase = 1;
		}
	} else {
		set_message(pa.jos[tj.akiceltour_t].nom+" n'a aucun partisan disponible.", "rouge");
		phase = 1;
	}
}

function ph2_position_suivante() {
	phase = 0;
	tj.psc_ps[1] = tj.psc_ps[1] >= tj.pss_ps[tj.psc_ps[0]].length-2 ? 0 : tj.psc_ps[1]+1;
	pp.activer();
	phase = 2;
}

function ph2_metier_suivant() {
	phase = 0;
	tj.psc_ps[1] = 0;
	tj.psc_ps[0] = tj.psc_ps[0] >= tj.pss_ps.length-1 ? 0 : tj.psc_ps[0]+1;
	set_etat("Placement d'un partisan par "+pa.jos[tj.akiceltour_t].nom+". ("+(tj.pss_ps[tj.psc_ps[0]][0] == 'c' ? "voleur" : (tj.pss_ps[tj.psc_ps[0]][0] == 'v' ? "chevalier" : (tj.pss_ps[tj.psc_ps[0]][0] == 'z' ? "paysan" : "moine")))+")", "fond");
	pp.activer();
	phase = 2;
}

function ph2_annuler() {
	phase = 0;
	tj.tp = false;
	tj.phase = 1;
	pp.desactiver();
	rs.activer("b");
	set_message("Le placement du partisan a été annulé.", "fond");
	set_etat("Placement d'une tuile par "+pa.jos[tj.akiceltour_t].nom+".", "fond");
	phase = 1;
}