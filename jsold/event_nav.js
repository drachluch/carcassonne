// NAV
addEvent(document.getElementById("nav_bouton_nouvelle_partie"), "click", function() {
	set_etat("Formulaire de nouvelle partie.", "fond");
	set_message("Aucun message à afficher.", "fond");
	document.getElementById("form_nouvelle_partie").style.display = "block";
	document.getElementById("form_charger_partie").style.display = "none";
	document.getElementById("form_sauvegarder_partie").style.display = "none";
	document.getElementById("form_aide").style.display = "none";
	
	document.getElementById("formulaire").style.display = "block";
	document.getElementById("plateau").style.display = "none";
	document.getElementById("le_span_du_plateau").style.display = "none";
});

// NAV
addEvent(document.getElementById("nav_bouton_mettre_fin_partie"), "click", function() {
	if (confirm("Êtes vous sûr(e) de vouloir mettre fin à la partie ?")) {
		tj.fin_de_partie();
	}
});

// NAV
addEvent(document.getElementById("nav_bouton_aide_apc"), "click", function() {
	document.getElementById("form_nouvelle_partie").style.display = "none";
	document.getElementById("form_charger_partie").style.display = "none";
	document.getElementById("form_sauvegarder_partie").style.display = "none";
	document.getElementById("form_aide").style.display = "block";
	
	document.getElementById("formulaire").style.display = "block";
	document.getElementById("plateau").style.display = "none";
	document.getElementById("le_span_du_plateau").style.display = "none";
});

// NAV
addEvent(document.getElementById("nav_bouton_aide_pc"), "click", function() {
	document.getElementById("nav_bouton_aide_pc").style.display = "none";
	document.getElementById("nav_bouton_retour_a_la_partie").style.display = "inline-block";
	phase = 0;
	document.getElementById("form_nouvelle_partie").style.display = "none";
	document.getElementById("form_charger_partie").style.display = "none";
	document.getElementById("form_sauvegarder_partie").style.display = "none";
	document.getElementById("form_aide").style.display = "block";
	
	document.getElementById("formulaire").style.display = "block";
	document.getElementById("plateau").style.display = "none";
	document.getElementById("le_span_du_plateau").style.display = "none";
});

// NAV
addEvent(document.getElementById("nav_bouton_retour_a_la_partie"), "click", function() {
	document.getElementById("nav_bouton_aide_pc").style.display = "inline-block";
	document.getElementById("nav_bouton_retour_a_la_partie").style.display = "none";
	phase = tj.phase;
	document.getElementById("form_nouvelle_partie").style.display = "none";
	document.getElementById("form_charger_partie").style.display = "none";
	document.getElementById("form_sauvegarder_partie").style.display = "none";
	document.getElementById("form_aide").style.display = "none";
	
	document.getElementById("formulaire").style.display = "none";
	document.getElementById("plateau").style.display = "block";
	document.getElementById("le_span_du_plateau").style.display = "block";
});

// FORMULAIRE NOUVELLE PARTIE
addEvent(document.getElementById("radio_2j"), "click", function() {
	document.getElementById("champ_j3").style.display = "none";
	document.getElementById("champ_j4").style.display = "none";
});

// FORMULAIRE NOUVELLE PARTIE
addEvent(document.getElementById("radio_3j"), "click", function() {
	document.getElementById("champ_j3").style.display = "block";
	document.getElementById("champ_j4").style.display = "none";
});

// FORMULAIRE NOUVELLE PARTIE
addEvent(document.getElementById("radio_4j"), "click", function() {
	document.getElementById("champ_j3").style.display = "block";
	document.getElementById("champ_j4").style.display = "block";
});

// FORMULAIRE NOUVELLE PARTIE
addEvent(document.getElementById("champ_nom_j1"), "blur", function() {
	var champ_nom_j1 = document.getElementById("champ_nom_j1");
	if (/^[-_A-Za-z0-9]{2,26}$/.test(champ_nom_j1.value)) {
		champ_nom_j1.style.color = "#000000";
		var champ_nom_j2 = document.getElementById("champ_nom_j2"), champ_nom_j3 = document.getElementById("champ_nom_j3");
		var champ_nom_j4 = document.getElementById("champ_nom_j4");
		if (champ_nom_j1.value == champ_nom_j2.value)
			champ_nom_j2.style.color = "#ff6a00";
		if (champ_nom_j1.value == champ_nom_j3.value)
			champ_nom_j3.style.color = "#ff6a00";
		if (champ_nom_j1.value == champ_nom_j4.value)
			champ_nom_j4.style.color = "#ff6a00";
	} else
		champ_nom_j1.style.color = "#ff0000";
});

// FORMULAIRE NOUVELLE PARTIE
addEvent(document.getElementById("champ_nom_j2"), "blur", function() {
	var champ_nom_j2 = document.getElementById("champ_nom_j2");
	if (/^[-_A-Za-z0-9]{2,26}$/.test(champ_nom_j2.value)) {
		champ_nom_j2.style.color = "#000000";
		var champ_nom_j1 = document.getElementById("champ_nom_j1"), champ_nom_j3 = document.getElementById("champ_nom_j3");
		var champ_nom_j4 = document.getElementById("champ_nom_j4");
		if (champ_nom_j2.value == champ_nom_j1.value)
			champ_nom_j2.style.color = "#ff6a00";
		if (champ_nom_j2.value == champ_nom_j3.value)
			champ_nom_j3.style.color = "#ff6a00";
		if (champ_nom_j2.value == champ_nom_j4.value)
			champ_nom_j4.style.color = "#ff6a00";
	} else
		champ_nom_j2.style.color = "#ff0000";
});

// FORMULAIRE NOUVELLE PARTIE
addEvent(document.getElementById("champ_nom_j3"), "blur", function() {
	var champ_nom_j3 = document.getElementById("champ_nom_j3");
	if (/^[-_A-Za-z0-9]{2,26}$/.test(champ_nom_j3.value)) {
		champ_nom_j3.style.color = "#000000";
		var champ_nom_j1 = document.getElementById("champ_nom_j1"), champ_nom_j2 = document.getElementById("champ_nom_j2");
		var champ_nom_j4 = document.getElementById("champ_nom_j4");
		if (champ_nom_j1.value == champ_nom_j3.value)
			champ_nom_j3.style.color = "#ff6a00";
		if (champ_nom_j2.value == champ_nom_j3.value)
			champ_nom_j3.style.color = "#ff6a00";
		if (champ_nom_j3.value == champ_nom_j4.value)
			champ_nom_j4.style.color = "#ff6a00";
	} else
		champ_nom_j3.style.color = "#ff0000";
});

// FORMULAIRE NOUVELLE PARTIE
addEvent(document.getElementById("champ_nom_j4"), "blur", function() {
	var champ_nom_j4 = document.getElementById("champ_nom_j4");
	if (/^[-_A-Za-z0-9]{2,26}$/.test(champ_nom_j4.value)) {
		champ_nom_j4.style.color = "#000000";
		var champ_nom_j1 = document.getElementById("champ_nom_j1"), champ_nom_j2 = document.getElementById("champ_nom_j2");
		var champ_nom_j3 = document.getElementById("champ_nom_j3");
		if (champ_nom_j1.value == champ_nom_j4.value)
			champ_nom_j4.style.color = "#ff6a00";
		if (champ_nom_j2.value == champ_nom_j4.value)
			champ_nom_j4.style.color = "#ff6a00";
		if (champ_nom_j3.value == champ_nom_j4.value)
			champ_nom_j4.style.color = "#ff6a00";
	} else
		champ_nom_j4.style.color = "#ff0000";
});

// FORMULAIRE NOUVELLE PARTIE
addEvent(document.getElementById("bouton_valider_nouvelle_partie"), "click", function() {
	var noms = [];
	// récupérer les noms des joueurs
	noms.push(document.getElementById('champ_nom_j1').value);
	noms.push(document.getElementById('champ_nom_j2').value);
	if (document.getElementById('radio_3j').checked || document.getElementById('radio_4j').checked) {
		noms.push(document.getElementById('champ_nom_j3').value);
		if (document.getElementById('radio_4j').checked)
			noms.push(document.getElementById('champ_nom_j4').value);
	}
	// vérifier qu'ils ont tous un nom correct
	for (var i = 0, b = true, l = noms.length; i < l; i++)
		if (!/^[-_A-Za-z0-9]{2,26}$/.test(noms[i])) {
			b = false;
			set_etat("Au moins un nom de joueur est incorrect.");
			break;
		}
	if (b) {
		// vérifier qu'ils ont tous un nom différent
		function ont_ils_tous_un_nom_different(noms) {
			for (var i = 0, j, c = noms.length; i < c; i++)
				for (j = 0; j < c; j++)
					if (noms[i] === noms[j] && i != j) {
						set_etat("Au moins un nom de joueur est incorrect.", 'rouge');
						document.getElementById("champ_nom_j"+(i<j ? j+1 : i+1)).style.color = "#ff6a00";
						return false;
					}
			return true;
		}
		if (ont_ils_tous_un_nom_different(noms)) {
			// Initialisation de la partie
			pa = new PA();
			pa.x_f = document.getElementById("extension_fleuve").checked;
			pa.x_c = document.getElementById("extension_cathedrale").checked;
			pa.x_l = document.getElementById("extension_lac").checked;
			pa.creer_les_jo(noms);
			
			ap = new AP();
			db = new DB();
			gt = new GT();
			pp = new PP();
			rs = new RS();
			tj = new TJ();
			
			pl = new PL();
			pl.construire();
			document.getElementById("formulaire").style.display = "none";
			document.getElementById("plateau").style.display = "block";
			document.getElementById("le_span_du_plateau").style.display = "block";
			
			set_message("La partie a commencé.", "vert");
			set_etat("La partie a commencé.", "fond");
			document.getElementById("nav_aucune_partie_en_cours").style.display = "none";
			document.getElementById("nav_partie_en_cours").style.display = "block";
			pa.lancement_partie();
			
		}
	}
});