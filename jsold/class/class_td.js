function TD(x,y,nom,rotation) { // tuile disposée
	this.nom = nom;
	this.rotation = rotation;
	
	this.x = x;
	this.y = y;
	
	this.id_bc = [];
	this.id_bv = [];
	this.id_bf = [];
	this.id_bz = [];
	
	this.integrer_bc = function(id) { this.id_bc.push(id); };
	this.integrer_bv = function(id) { this.id_bv.push(id); };
	this.integrer_bf = function(id) { this.id_bf.push(id); };
	this.integrer_bz = function(id) { this.id_bz.push(id); };
}