var phase = 0;
/* **********************************************
phase = 0: aucune entrée au clavier ne doit être prise en compte;
phase = 1: sélection de l'emplacement de la tuile et de son sens;
phase = 2: sélection de l'emplacement du partisan et de son type;
phase = 3: comptage des points pour les ensembles terminés;
phase = 4: dans le formulaire de nouvelle partie;
phase = 5: dans l'aide (affichage "configuration" des touches);
********************************************** */
addEvent(document, 'keydown', function(e) {
	// flecheGauche: 37, flecheHaut: 38, flecheDroite: 39, flecheBas: 40, entree: 13, echap: 27, z90; s83; q81; d68; p80; x88; m77; r82; tab18; k:75;
	switch(e.which) {
		// entree (standard + pave numérique)
		case 13:
			if (phase == 1)
				fin_ph1(false);
			else if (phase == 2)
				fin_ph1(true);
			break;
		// espace
		case 32:
			if (phase == 1)
				fin_ph1(false);
			else if (phase == 2)
				fin_ph1(true);
			break;
		// <>
		case 60:
			if (phase == 1)
				ph1_position_suivante();
			else if (phase == 2)
				ph2_position_suivante();
			break;
		// fleche gauche
		case 37:
			if (phase == 1)
				ph1_diminuerX();
			break;
		// fleche haut
		case 38:
			if (phase == 1)
				ph1_diminuerY();
			break;
		// fleche droite
		case 39:
			if (phase == 1)
				ph1_augmenterX();
			break;
		// fleche bas
		case 40:
			if (phase == 1)
				ph1_augmenterY();
			break;
		// d
		case 68:
			if (db)
				db.basculer_activer_desactiver();
			break;
		// k
		// case 75:
			// db.afficher_ensemble();
			// break;
		// m
		case 77:
			if (phase == 2)
				ph2_metier_suivant();
			break;
		// p
		case 80:
			if (phase == 1)
				ph2_lancement();
			else if (phase == 2)
				ph2_annuler();
			break;
		// r
		case 82:
			if (phase == 1)
				ph1_rotation_tuile();
			break;
		// 2 (pavé numérique)
		case 98:
			if (document.getElementById("plateau").style.display == "block")
				phx_decaler_plateau_y(true);
			break;
		// 4 (pavé numérique)
		case 100:
			if (document.getElementById("plateau").style.display == "block")
				phx_decaler_plateau_x(false);
			break;
		// 6 (pavé numérique)
		case 102:
			if (document.getElementById("plateau").style.display == "block")
				phx_decaler_plateau_x(true);
			break;
		// 7 (pavé numérique)
		case 103:
			if (document.getElementById("plateau").style.display == "block")
				phx_decaler_plateau_init();
			break;
		// 8 (pavé numérique)
		case 104:
			if (document.getElementById("plateau").style.display == "block")
				phx_decaler_plateau_y(false);
			break;
		default: break;
	}
});