function PA() {
	this.jos = [];
	
	this.x_f = false;
	this.x_c = false;
	this.x_l = false;
	
	this.creer_les_jo = function(noms) {
		document.getElementById("li_aucun_joueur").style.display = "none";
		for (var i = 0, c = noms.length; i < c; i++) {
			this.jos[i] = new JO(noms[i]);
			this.jos[i].initialiser_dans_UL(i);
		}
	};
	
	this.lancement_partie = function() {
		var lt = new LT();
		lt.definir_ordre_des_tuiles();
		//lt.definir_ordre_des_tuiles_test();
		set_log("Lancement de la partie.");
		set_etat("Plateau.");
		for (var i = 1; i < 5; i++)
			document.getElementById("tour_tuile_joueur"+i).src = 'icone/vide.png';
		ph1_lancement();
	};
}