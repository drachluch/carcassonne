function PP() { // partisan provisoire
	this.x = 0;
	this.y = 0;
	
	this.initialiser = function(span) {
		var img = document.createElement('img');
		img.id = 'partisanProvisoire';
		img.style.display = 'none';
		img.style.position = 'absolute';
		span.appendChild(img);
	};
	
	this.activer = function() {
		var coordonnees_relatives = this.donne_moi_les_coordonnees_relatives();
		this.x = 6+(tj.tp.x+pl.x_decal-pl.x_min)*70+coordonnees_relatives[0];
		this.y = 68+(tj.tp.y+pl.y_decal-pl.y_min)*70+coordonnees_relatives[1];
		var img = document.getElementById('partisanProvisoire');
		img.src = 'icone/partisan_f'+(tj.akiceltour_t+1)+'.png';
		img.style.display = 'block';
		img.style.left = this.x+'px';
		img.style.top = this.y+'px';
	};
	
	this.desactiver = function() {
		document.getElementById('partisanProvisoire').style.display = 'none';
	};
	
	this.exporter = function(id_bx) {
		var coordonnees_relatives = this.donne_moi_les_coordonnees_relatives();
		this.x = 6+(tj.tp.x+pl.x_decal-pl.x_min)*70+coordonnees_relatives[0];
		this.y = 68+(tj.tp.y+pl.y_decal-pl.y_min)*70+coordonnees_relatives[1];
		var id_ps = ap.ajouter(tj.akiceltour_t, this.x, this.y);
		switch(tj.pss_ps[tj.psc_ps[0]][0]) {
			case 'c':
				gt.ec[ gt.bc[id_bx].id_ec ].ajouter_ps(id_ps, tj.akiceltour_t);
				set_log(pa.jos[tj.akiceltour_t].nom+" a placé un partisan (voleur).");
				break;
			case 'v':
				gt.ev[ gt.bv[id_bx].id_ev ].ajouter_ps(id_ps, tj.akiceltour_t);
				set_log(pa.jos[tj.akiceltour_t].nom+" a placé un partisan (chevalier).");
				break;
			case 'z':
				gt.ez[ gt.bz[id_bx].id_ez ].ajouter_ps(id_ps, tj.akiceltour_t);
				set_log(pa.jos[tj.akiceltour_t].nom+" a placé un partisan (paysan).");
				break;
			case 'a':
				gt.ab[ id_bx ].ajouter_ps(id_ps, tj.akiceltour_t);
				set_log(pa.jos[tj.akiceltour_t].nom+" a placé un partisan (moine).");
				break;
			default:
				set_log("/!\ La ligne 48 de PP te salue.");
				break;
		}
	};
	
	this.donne_moi_les_coordonnees_relatives = function() {
		switch(tj.pss_ps[tj.psc_ps[0]][0]) {
			case 'c':
				switch(tj.tp.bc[ tj.pss_ps[tj.psc_ps[0]][tj.psc_ps[1]+1] ].cs[0]) {
					case 0: return [47,24]; break; // done
					case 1:	return [25,0]; break;
					case 2: return [0,24]; break;
					case 3: return [25,47]; break;
					default: alert("Une erreur s'est produite: tp.donne_moi_les_coordonnees_relatives : premier coté d'un chemin erroné."); break;
				}
				break;
			case 'v':
				switch(tj.tp.bv[ tj.pss_ps[tj.psc_ps[0]][tj.psc_ps[1]+1] ].cs[0]) {
					case 0: return [47,24]; break;
					case 1:	return [25,0]; break; // done
					case 2: return [0,24]; break;
					case 3: return [25,47]; break;
					default: alert("Une erreur s'est produite: tp.donne_moi_les_coordonnees_relatives : premier coté d'un marché."); break;
				}
				break;
			case 'z':
				switch(tj.tp.bz[ tj.pss_ps[tj.psc_ps[0]][tj.psc_ps[1]+1] ].cs[0]) {
					case 0: return [47,41]; break;
					case 1: return [47,6]; break;
					case 2: return [41,0]; break;
					case 3: return [6,0]; break;
					case 4: return [0,6]; break;
					case 5: return [0,41]; break;
					case 6: return [6,47]; break;
					case 7: return [41,47]; break;
					default:
						set_log("tj.tp.bz[tj.pss_ps[tj.psc_ps[0]][tj.psc_ps[1]+1]].cs[0]: "+tj.tp.bz[ tj.pss_ps[tj.psc_ps[0]][tj.psc_ps[1]+1] ].cs[0]);
						alert("Une erreur s'est produite: tour_de_jeu.donne_moi_les_coordonnees_relatives : premier coté d'une zone erroné.");
						return [0,0];
						break;
				}
				break;
			case 'a':
				return [22,22];
				break;
			default: set_log("Erreur à la ligne 99 de class_pp.js."); break;
		}
	};
}