function JO(nom) {
	this.nom = nom;
	this.ps_dispo = 7;
	this.pts = 0;
	
	this.initialiser_dans_UL = function(propre_id) {
		var inom_j = document.getElementById("inom_j"+(propre_id+1));
		inom_j.replaceChild(document.createTextNode(this.nom), inom_j.firstChild);
		var nb_ps = document.getElementById("nb_partisans_joueur"+(propre_id+1));
		nb_ps.replaceChild(document.createTextNode(this.ps_dispo), nb_ps.firstChild);
		var nb_pts = document.getElementById("points_joueur"+(propre_id+1));
		nb_pts.replaceChild(document.createTextNode(this.pts), nb_pts.firstChild);
		
		document.getElementById("li_j"+(propre_id+1)).style.display = "block";
	};
	
	this.recuperer_ps = function(nb_ps, propre_id) {
		this.ps_dispo += nb_ps;
		var span = document.getElementById("nb_partisans_joueur"+(propre_id+1));
		span.replaceChild(document.createTextNode(this.ps_dispo), span.firstChild);
	};
	
	this.recevoir_pts = function(nb_pts, propre_id) {
		this.pts += nb_pts;
		var span = document.getElementById("points_joueur"+(propre_id+1));
		span.replaceChild(document.createTextNode(this.pts), span.firstChild);
	};
	
	this.placer_ps = function(propre_id) {
		this.ps_dispo--;
		var span = document.getElementById("nb_partisans_joueur"+(propre_id+1));
		span.replaceChild(document.createTextNode(this.ps_dispo), span.firstChild);
	};
}